from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCKERFILE = ROOT / "backend" / "Dockerfile"
ROOT_IGNORE = ROOT / ".dockerignore"


def test_backend_image_uses_only_explicit_runtime_inputs():
    source = DOCKERFILE.read_text(encoding="utf-8")
    assert "COPY . ." not in source
    for required in (
        "backend/package.json backend/package-lock.json",
        "backend/src ./src",
        "backend/app/templates ./app/templates",
        "config/feature-flags.json /config/feature-flags.json",
        "content /content",
        "scripts/generate-city-pages.mjs /scripts/generate-city-pages.mjs",
    ):
        assert required in source
    assert "USER node" in source
    assert "npm ci --omit=dev --ignore-scripts" in source


def test_build_context_excludes_local_secrets_and_heavy_dev_trees():
    patterns = set(ROOT_IGNORE.read_text(encoding="utf-8").splitlines())
    assert {"**/.env", "**/managed.env", "**/.venv", "**/node_modules"} <= patterns
