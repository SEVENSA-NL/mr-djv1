import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).parents[1] / "scripts"))
from faq_release import (
    artifact_digest,
    build_artifact,
    canonical_json,
    source_manifest_digest,
    validate_artifact,
)  # noqa: E402
from faq_release_executor import validate_preflight  # noqa: E402

ALLOWLIST = "0123456789abcdef" * 4
COMMIT = "a0bcf41a42d1583cd8b40e1b21844198de41d58b"


def decision_digest(decision):
    return hashlib.sha256(
        canonical_json(
            {key: value for key, value in decision.items() if key != "decision_sha256"}
        ).encode()
    ).hexdigest()


class FaqReleaseTests(unittest.TestCase):
    def setUp(self):
        self.artifact = build_artifact(allowlist_sha256=ALLOWLIST, source_commit=COMMIT)

    def test_deterministic_and_valid_30_item_artifact(self):
        other = build_artifact(allowlist_sha256=ALLOWLIST, source_commit=COMMIT)
        self.assertEqual(self.artifact, other)
        self.assertEqual(self.artifact["artifact_sha256"], artifact_digest(self.artifact))
        self.assertEqual(len(self.artifact["faq_items"]), 30)
        validate_artifact(self.artifact)

    def test_source_manifest_must_match_bytes_at_source_commit(self):
        tampered = json.loads(json.dumps(self.artifact))
        tampered["source_manifest"][0]["sha256"] = "f" * 64
        tampered["source_manifest_sha256"] = source_manifest_digest(tampered["source_manifest"])
        tampered["artifact_sha256"] = artifact_digest(tampered)
        with self.assertRaisesRegex(ValueError, "source_manifest_commit_mismatch"):
            validate_artifact(tampered)

    def test_tamper_is_rejected(self):
        tampered = json.loads(json.dumps(self.artifact))
        tampered["faq_items"][0]["answer"] += " gewijzigd"
        with self.assertRaisesRegex(ValueError, "artifact_sha256_mismatch"):
            validate_artifact(tampered)

    def test_executor_rejects_wrong_tenant_path_and_missing_rollback_before_network(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            artifact_path = root / "artifact.json"
            artifact_path.write_text(json.dumps(self.artifact), encoding="utf-8")
            decision = {
                **{
                    key: self.artifact[key]
                    for key in (
                        "artifact_sha256",
                        "content_sha256",
                        "source_manifest_sha256",
                        "allowlist_sha256",
                        "source_commit",
                        "brand",
                        "tenant",
                        "site",
                        "executor",
                        "rollback_profile",
                    )
                },
                "decision": "PUBLISH",
                "gates": {"all": True},
                "review": {
                    "artifact_sha256": self.artifact["artifact_sha256"],
                    "content_sha256": self.artifact["content_sha256"],
                    "score": 90,
                },
            }
            decision["decision_sha256"] = decision_digest(decision)
            decision_path = root / "decision.json"
            decision_path.write_text(json.dumps(decision), encoding="utf-8")
            kwargs = dict(
                artifact_path=artifact_path,
                decision_path=decision_path,
                gate_root=Path(r"C:\Dev\automations"),
                image_digest="sha256:" + "a" * 64,
                prestate_image_digest="sha256:" + "b" * 64,
                rollback_digest="sha256:" + "c" * 64,
                deployment="mr-dj-frontend",
                route="sevensa-admin",
            )
            with patch(
                "faq_release_executor._run_central_verifier",
                return_value={"status": "PASS", "decision_sha256": decision["decision_sha256"]},
            ):
                self.assertEqual(validate_preflight(**kwargs)["network"], "not_contacted")
                with self.assertRaisesRegex(ValueError, "deployment_not_allowed"):
                    validate_preflight(**{**kwargs, "deployment": "other"})
                with self.assertRaisesRegex(
                    ValueError, "immutable_image_and_rollback_digests_required"
                ):
                    validate_preflight(**{**kwargs, "rollback_digest": ""})

    def test_forged_or_no_audit_decision_is_rejected_by_central_verifier(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            artifact_path = root / "artifact.json"
            decision_path = root / "decision.json"
            artifact_path.write_text(json.dumps(self.artifact), encoding="utf-8")
            decision_path.write_text("{}", encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "central_gate_verification_failed"):
                from faq_release_executor import _run_central_verifier

                _run_central_verifier(Path(r"C:\Dev\automations"), artifact_path, decision_path)


if __name__ == "__main__":
    unittest.main()
