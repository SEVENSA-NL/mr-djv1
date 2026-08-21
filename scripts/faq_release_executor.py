"""Fail-closed Mister DJ GHCR/k3s release preflight.

Only immutable image digests and the exact deployment/management route are
accepted.  This local adapter performs no GHCR, kubectl, SSH, or public-IP
operation; a future runner may call ``network_apply`` only after preflight.
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path
from typing import Any

from faq_release import load_artifact

DIGEST = re.compile(r"^sha256:[0-9a-f]{64}$")
EXPECTED = {"brand": "mr_dj", "tenant": "mr_dj", "site": "mr-dj-frontend", "executor": "mr_dj_ghcr_faq", "rollback_profile": "ghcr-image-digest-v1"}
ALLOWED_DEPLOYMENT = "mr-dj-frontend"
ALLOWED_ROUTE = "sevensa-admin"


def _run_central_verifier(gate_root: Path, artifact_path: Path, decision_path: Path) -> dict[str, Any]:
    verifier = gate_root / "services" / "publish-gate" / "verify_faq_decision.py"
    if not verifier.is_file():
        raise ValueError("central_verifier_missing")
    result = subprocess.run(
        [sys.executable, str(verifier), "--artifact", str(artifact_path), "--decision", str(decision_path),
         "--gate-state-dir", str(gate_root / "content")],
        cwd=verifier.parent, capture_output=True, text=True, check=False,
    )
    if result.returncode != 0:
        detail = (result.stderr or result.stdout).strip().splitlines()
        raise ValueError("central_gate_verification_failed" + (f":{detail[-1]}" if detail else ""))
    try:
        response = json.loads(result.stdout)
    except json.JSONDecodeError as exc:
        raise ValueError("central_verifier_invalid_response") from exc
    if response.get("status") != "PASS":
        raise ValueError("central_gate_verification_failed")
    return response


def validate_preflight(artifact_path: Path, decision_path: Path, *, gate_root: Path, image_digest: str, prestate_image_digest: str, rollback_digest: str, deployment: str, route: str) -> dict[str, Any]:
    artifact = load_artifact(artifact_path)
    central = _run_central_verifier(gate_root, artifact_path, decision_path)
    if not all(DIGEST.fullmatch(value) for value in (image_digest, prestate_image_digest, rollback_digest)):
        raise ValueError("immutable_image_and_rollback_digests_required")
    if deployment != ALLOWED_DEPLOYMENT:
        raise ValueError("deployment_not_allowed")
    if route != ALLOWED_ROUTE:
        raise ValueError("management_route_not_allowed")
    for field, value in EXPECTED.items():
        if artifact.get(field) != value:
            raise ValueError(f"{field}_binding_invalid")
    return {"artifact_sha256": artifact["artifact_sha256"], "decision_sha256": central["decision_sha256"], "image_digest": image_digest, "prestate_image_digest": prestate_image_digest, "rollback_digest": rollback_digest, "deployment": deployment, "route": route, "network": "not_contacted"}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--artifact", type=Path, required=True)
    parser.add_argument("--decision", type=Path, required=True)
    parser.add_argument("--gate-root", type=Path, required=True)
    parser.add_argument("--image-digest", required=True)
    parser.add_argument("--prestate-image-digest", required=True)
    parser.add_argument("--rollback-digest", required=True)
    parser.add_argument("--deployment", default=ALLOWED_DEPLOYMENT)
    parser.add_argument("--route", default=ALLOWED_ROUTE)
    args = parser.parse_args()
    print(json.dumps(validate_preflight(args.artifact, args.decision, gate_root=args.gate_root, image_digest=args.image_digest, prestate_image_digest=args.prestate_image_digest, rollback_digest=args.rollback_digest, deployment=args.deployment, route=args.route)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
