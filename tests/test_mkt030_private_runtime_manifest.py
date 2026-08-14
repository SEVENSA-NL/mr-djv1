from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "infra" / "k8s" / "mkt030-private-backend.yaml"
EXPECTED_KEYS = {
    "DATABASE_URL",
    "REDIS_URL",
    "RENTGUY_API_BASE_URL",
    "RENTGUY_API_KEY",
    "SEVENSA_SUBMIT_URL",
    "N8N_PERSONALIZATION_WEBHOOK_URL",
    "SEO_AUTOMATION_API_URL",
    "SEO_AUTOMATION_API_KEY",
    "SEO_AUTOMATION_KEYWORDSET_ID",
    "OPENAI_API_KEY",
    "MAIL_API_KEY",
    "HCAPTCHA_SITE_KEY",
    "HCAPTCHA_SECRET_KEY",
}


def documents():
    return list(yaml.safe_load_all(MANIFEST.read_text(encoding="utf-8")))


def test_secret_binding_is_exact_and_owned():
    external = next(item for item in documents() if item["kind"] == "ExternalSecret")
    assert external["spec"]["secretStoreRef"] == {
        "kind": "ClusterSecretStore",
        "name": "openbao-psra",
    }
    assert external["spec"]["target"]["creationPolicy"] == "Owner"
    assert {item["secretKey"] for item in external["spec"]["data"]} == EXPECTED_KEYS
    assert {item["remoteRef"]["key"] for item in external["spec"]["data"]} == {"mr-dj/backend"}


def test_runtime_is_immutable_nonroot_private_and_no_send():
    docs = documents()
    deployment = next(item for item in docs if item["kind"] == "Deployment")
    service = next(item for item in docs if item["kind"] == "Service")
    policy = next(item for item in docs if item["kind"] == "NetworkPolicy")
    pod = deployment["spec"]["template"]["spec"]
    container = pod["containers"][0]
    env = {item["name"]: item["value"] for item in container["env"]}

    assert container["image"].endswith(
        "@sha256:984d6692099ddc19ad4234a05c35e61a7104b472e06e16b4f97f35c8c5415293"
    )
    assert pod["automountServiceAccountToken"] is False
    assert pod["securityContext"]["runAsNonRoot"] is True
    assert container["securityContext"]["readOnlyRootFilesystem"] is True
    assert container["securityContext"]["allowPrivilegeEscalation"] is False
    assert set(container["securityContext"]["capabilities"]["drop"]) == {"ALL"}
    for key in (
        "HCAPTCHA_ENABLED",
        "FLAG_RENTGUY_INTEGRATION",
        "FLAG_SEVENSA_INTEGRATION",
        "FLAG_PERSONALIZATION",
        "FLAG_AUTOMATION",
        "FLAG_TELEMETRY",
    ):
        assert env[key] == "false"
    assert service["spec"]["type"] == "ClusterIP"
    assert not any(item["kind"] in {"Ingress", "IngressRoute"} for item in docs)
    egress_ports = {
        port["port"] for rule in policy["spec"]["egress"] for port in rule.get("ports", [])
    }
    assert egress_ports == {53, 5432, 6379}
