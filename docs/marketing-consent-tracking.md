# Marketing Consent and Social Tracking Scripts

The consent framework now governs when third-party social tracking tools such as Facebook Pixel load.

- Facebook Pixel script and `<noscript>` beacon are injected only when marketing consent is granted. When consent is revoked the script nodes are removed and `fbq('consent', 'revoke')` is issued to disable tracking immediately.
- A custom browser event, `mr-dj:marketing-consent-change`, is dispatched whenever marketing consent toggles. Integrations like TikTok can listen for this event or use the `subscribeToMarketingConsent` helper exposed by `useConsent()`.
- Automated Cypress coverage in `tests/frontend/consent.cy.ts` verifies that marketing consent fully controls the Facebook Pixel lifecycle and the related events, ensuring future changes preserve GDPR compliance.

To integrate additional marketing platforms, subscribe to the marketing consent change event (either through the DOM event or the React helper) and mirror the Facebook implementation by loading and unloading scripts based on the granted flag.

## Phase A – RentGuy Tags Temporarily Disabled for Marketing Site Stability

Until the onboarding portal and RentGuy APIs are fully ready, the marketing site (`https://mr-dj.sevensa.nl`) must not call `https://mr-dj.rentguy.nl/api/session` from the browser. The Next.js codebase is already clean (no direct `mr-dj.rentguy.nl` references), so the remaining integration points are in GTM/consent tooling.

**GTM (GTM-NST23HJX) – one-time ops step**

- Open the Mister DJ GTM container and search for `mr-dj.rentguy.nl` and `/api/session`.
- For every tag that loads a script such as `frame_ant.js` or otherwise calls `mr-dj.rentguy.nl`:
  - Change the status to *paused* or remove the production trigger.
  - Add a note: “Temporarily disabled – RentGuy onboarding API not CORS-ready (Phase A disconnect).”
- Publish a new GTM version and record the version ID in `DEPLOYMENT_LOG.md`.

**Consent / CMP configuration**

- In Complianz or the active CMP, check all “Custom script” or “Onboarding / CRM” services.
- Disable any service that injects scripts pointing to `mr-dj.rentguy.nl` or `onboarding.rentguy`.
- Ensure these services are not auto-enabled on first page load; they may be re-enabled in a later sprint when the backend proxy is live.

**Verification checklist (Phase A done)**

- Open `https://mr-dj.sevensa.nl` in an incognito window after the GTM publish.
- In DevTools → Network:
  - No requests to `mr-dj.rentguy.nl` should appear while browsing home, services, pakketten or steden.
- In DevTools → Console:
  - No CORS errors referencing `mr-dj.rentguy.nl` or `frame_ant.js`.

When this checklist passes, Phase A (marketing-site isolation from RentGuy in the browser) is considered complete. Later phases will reintroduce onboarding via backend/proxy flows only.
