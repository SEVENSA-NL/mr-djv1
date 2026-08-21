# Mister DJ FAQ release adapter

`scripts/faq_release.py` emits the central ADR-0005 `faq-release-artifact-v1`
envelope from the 30-item source at `frontend-nextjs/lib/data/mrDjFaq.ts` and
its canonical markdown bank. It requires the caller-provided exact
`--allowlist-sha256` and records source commit, source-manifest hash, content
hash, owner/review dates, source references, classification, and fallback for
each item. `--validate` runs the local fail-closed contract.

`scripts/faq_release_executor.py` is a preflight-only adapter. It requires
`--gate-root` and invokes that root's
`services/publish-gate/verify_faq_decision.py` as the sole decision/audit
verifier. It then requires the requested Mister DJ bindings, a resolved
`sha256:` image digest, prestate image digest, rollback digest, deployment
`mr-dj-frontend`, and management route `sevensa-admin`. It deliberately
performs no GHCR, k3s, SSH, or public-network operation.

Central registry expansion remains required before central loading can accept
this artifact: `mr_dj` must map to tenant `mr_dj`, site `mr-dj-frontend`,
executor `mr_dj_ghcr_faq`, rollback `ghcr-image-digest-v1`, and route
`/nl/veelgestelde-vragen` (or the central route matcher must account for the
locale prefix). No automation registry was changed here.
