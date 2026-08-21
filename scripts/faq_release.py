"""Deterministic, local ADR-0005 Mister DJ FAQ release adapter.

The output intentionally matches ``automations/services/publish-gate/faq_release.py``
field-for-field.  It never contacts a provider; deployment is a separate,
fail-closed preflight in :mod:`faq_release_executor`.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
from datetime import date
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
FAQ_MODULE = ROOT / "frontend-nextjs/lib/data/mrDjFaq.ts"
FAQ_SOURCE = ROOT / "frontend-nextjs/docs/faq-content-bank-2026-08-21.md"
FAQ_ROUTE = "/nl/veelgestelde-vragen"
ALLOWLIST_SHA256 = re.compile(r"^[0-9a-f]{64}$")
COMMIT_SHA256 = re.compile(r"^[0-9a-f]{40}$")

SOURCE_FILES = (
    ("frontend-nextjs/docs/faq-content-bank-2026-08-21.md", "faq-content"),
    ("frontend-nextjs/lib/data/mrDjFaq.ts", "canonical-faq-adapter"),
    ("frontend-nextjs/app/(nl)/veelgestelde-vragen/page.tsx", "faq-route"),
)
TOP_LEVEL_KEYS = {
    "artifact_type",
    "schema_version",
    "artifact_sha256",
    "brand",
    "tenant",
    "site",
    "target_routes",
    "faq_items",
    "source_manifest_sha256",
    "source_manifest",
    "content_sha256",
    "allowlist_sha256",
    "source_commit",
    "executor",
    "rollback_profile",
}


def canonical_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def sha256(value: bytes | str) -> str:
    return hashlib.sha256(value.encode("utf-8") if isinstance(value, str) else value).hexdigest()


def artifact_digest(artifact: dict[str, Any]) -> str:
    return sha256(canonical_json({k: v for k, v in artifact.items() if k != "artifact_sha256"}))


def content_digest(artifact: dict[str, Any]) -> str:
    return sha256(
        canonical_json({k: artifact[k] for k in ("brand", "site", "target_routes", "faq_items")})
    )


def source_manifest_digest(manifest: list[dict[str, str]]) -> str:
    return sha256(canonical_json(manifest))


def _read_items(text: str) -> list[tuple[str, str]]:
    pattern = re.compile(
        r"^### (\d+)\. (.+)\r?\n\r?\n([\s\S]*?)(?=\r?\n### |\r?\n## |\r?\n---|$)", re.M
    )
    items = [(m.group(2).strip(), m.group(3).strip()) for m in pattern.finditer(text)]
    if len(items) != 30:
        raise ValueError(f"expected 30 FAQ items, found {len(items)}")
    return items


def _slug(value: str) -> str:
    value = value.lower().encode("ascii", "ignore").decode()
    return re.sub(r"^-|-$", "", re.sub(r"[^a-z0-9]+", "-", value))


def _git_blob(commit: str, relative: str) -> bytes:
    try:
        return subprocess.check_output(["git", "show", f"{commit}:{relative}"], cwd=ROOT)
    except subprocess.CalledProcessError as exc:
        raise ValueError(f"source_missing_at_commit:{relative}") from exc


def _source_manifest(commit: str) -> list[dict[str, str]]:
    entries = []
    for relative, role in SOURCE_FILES:
        entries.append(
            {"path": relative, "sha256": sha256(_git_blob(commit, relative)), "role": role}
        )
    return sorted(entries, key=lambda e: (e["path"], e["role"], e["sha256"]))


def git_commit() -> str:
    return subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip()


def _require_commit(commit: str) -> None:
    if not COMMIT_SHA256.fullmatch(commit):
        raise ValueError("source_commit must be a 40-character commit SHA")
    try:
        subprocess.check_call(
            ["git", "cat-file", "-e", f"{commit}^{{commit}}"],
            cwd=ROOT,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
    except subprocess.CalledProcessError as exc:
        raise ValueError("source_commit_not_found") from exc


def build_artifact(
    *, allowlist_sha256: str, source_commit: str | None = None, today: date | None = None
) -> dict[str, Any]:
    if not ALLOWLIST_SHA256.fullmatch(allowlist_sha256):
        raise ValueError("allowlist_sha256 must be 64 lowercase hex characters")
    commit = source_commit or git_commit()
    _require_commit(commit)
    reviewed = (today or date.today()).isoformat()
    due = date(
        (today or date.today()).year + 1, (today or date.today()).month, (today or date.today()).day
    ).isoformat()
    source_text = _git_blob(commit, "frontend-nextjs/docs/faq-content-bank-2026-08-21.md").decode(
        "utf-8"
    )
    manifest = _source_manifest(commit)
    refs = [
        entry["path"]
        for entry in manifest
        if entry["role"] in {"faq-content", "canonical-faq-adapter"}
    ]
    items = []
    for index, (question, answer) in enumerate(_read_items(source_text), 1):
        items.append(
            {
                "id": f"faq-{index}-{_slug(question)}",
                "question": question,
                "answer": answer,
                "provenance_owner": "mr-dj-content",
                "reviewed_on": reviewed,
                "review_due": due,
                "source_refs": refs,
                "claim_classification": "safe",
                "fallback": "Neem contact op voor een antwoord op maat.",
            }
        )
    artifact: dict[str, Any] = {
        "artifact_type": "faq_release",
        "schema_version": "faq-release-artifact-v1",
        "artifact_sha256": "",
        "brand": "mr_dj",
        "tenant": "mr_dj",
        "site": "mr-dj-frontend",
        "target_routes": [FAQ_ROUTE],
        "faq_items": items,
        "source_manifest_sha256": source_manifest_digest(manifest),
        "source_manifest": manifest,
        "content_sha256": "",
        "allowlist_sha256": allowlist_sha256,
        "source_commit": commit,
        "executor": "mr_dj_ghcr_faq",
        "rollback_profile": "ghcr-image-digest-v1",
    }
    artifact["content_sha256"] = content_digest(artifact)
    artifact["artifact_sha256"] = artifact_digest(artifact)
    return artifact


def validate_artifact(artifact: dict[str, Any], *, today: date | None = None) -> dict[str, Any]:
    """Validate the local contract before it can be handed to the central gate."""
    if not isinstance(artifact, dict) or set(artifact) != TOP_LEVEL_KEYS:
        raise ValueError("artifact_schema_invalid")
    if (
        artifact["artifact_type"] != "faq_release"
        or artifact["schema_version"] != "faq-release-artifact-v1"
    ):
        raise ValueError("artifact_type_or_schema_invalid")
    if artifact_digest(artifact) != artifact["artifact_sha256"]:
        raise ValueError("artifact_sha256_mismatch")
    expected = {
        "brand": "mr_dj",
        "tenant": "mr_dj",
        "site": "mr-dj-frontend",
        "executor": "mr_dj_ghcr_faq",
        "rollback_profile": "ghcr-image-digest-v1",
    }
    for field, value in expected.items():
        if artifact.get(field) != value:
            raise ValueError(f"{field}_binding_invalid")
    if artifact.get("target_routes") != [FAQ_ROUTE]:
        raise ValueError("target_route_invalid")
    if not ALLOWLIST_SHA256.fullmatch(str(artifact.get("allowlist_sha256", ""))):
        raise ValueError("allowlist_sha256_invalid")
    commit = str(artifact.get("source_commit", ""))
    _require_commit(commit)
    manifest = artifact.get("source_manifest")
    if not isinstance(manifest, list) or manifest != sorted(
        manifest, key=lambda e: (e["path"], e["role"], e["sha256"])
    ):
        raise ValueError("source_manifest_not_canonical")
    expected_manifest = _source_manifest(commit)
    if manifest != expected_manifest:
        raise ValueError("source_manifest_commit_mismatch")
    if artifact["source_manifest_sha256"] != source_manifest_digest(manifest):
        raise ValueError("source_manifest_sha256_mismatch")
    items = artifact.get("faq_items")
    if (
        not isinstance(items, list)
        or len(items) != 30
        or len({item.get("id") for item in items}) != 30
    ):
        raise ValueError("faq_items_invalid")
    cutoff = today or date.today()
    for item in items:
        required = {
            "id",
            "question",
            "answer",
            "provenance_owner",
            "reviewed_on",
            "review_due",
            "source_refs",
            "claim_classification",
            "fallback",
        }
        if (
            set(item) != required
            or not item["source_refs"]
            or any(ref not in [e["path"] for e in manifest] for ref in item["source_refs"])
        ):
            raise ValueError("faq_item_schema_invalid")
        if date.fromisoformat(item["review_due"]) < cutoff:
            raise ValueError("faq_item_review_expired")
    if artifact["content_sha256"] != content_digest(artifact):
        raise ValueError("content_sha256_mismatch")
    return artifact


def load_artifact(path: Path) -> dict[str, Any]:
    try:
        artifact = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        raise ValueError("artifact_invalid_json") from exc
    return validate_artifact(artifact)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--allowlist-sha256", required=True)
    parser.add_argument("--source-commit")
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--validate", action="store_true")
    args = parser.parse_args()
    artifact = build_artifact(
        allowlist_sha256=args.allowlist_sha256, source_commit=args.source_commit
    )
    if args.validate:
        validate_artifact(artifact)
    args.output.write_text(
        json.dumps(artifact, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(
        json.dumps(
            {
                "artifact": str(args.output),
                "artifact_sha256": artifact["artifact_sha256"],
                "faq_count": 30,
            }
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
