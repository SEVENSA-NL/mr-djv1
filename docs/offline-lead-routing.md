# Offline lead routing

Issue [#329](https://github.com/SEVENSA-NL/mr-djv1/issues/329) chooses a
fail-closed public contract. The Next.js contact and availability routes do not
store, queue, or claim delivery when `BACKEND_API_URL` is unavailable.

## Public behavior

| Condition | HTTP | Safe code | GA4 success event |
|---|---:|---|---|
| `BACKEND_API_URL` absent | 503 | `LEAD_BACKEND_UNCONFIGURED` | No |
| Configured backend cannot be reached or times out | 503 | `LEAD_BACKEND_UNAVAILABLE` | No |
| Configured backend returns non-2xx | 502 | `LEAD_BACKEND_REJECTED` | No |
| Configured backend accepts the lead with 2xx | 200 | `LEAD_DELIVERED` | Yes |

Logs contain only the route, safe code, and, when present, the numeric backend
status. They never contain the request body, lead fields, backend key, backend
URL, exception, or provider response body.

## Recovery

There is no local retry or durable queue. An operator must restore and validate
the configured backend before asking the user to submit again. Do not replay a
captured browser request or reconstruct a lead from logs: neither is a
supported recovery source and either can create duplicate or unauthorised
submissions.

Recovery sequence:

1. Confirm `BACKEND_API_URL` and, where required, `BACKEND_API_KEY` are present
   in the intended runtime without printing their values.
2. Validate the backend health and one synthetic, non-PII lead through the
   applicable environment runbook.
3. Confirm the route returns `LEAD_DELIVERED`.
4. Ask the user to resubmit only when the backend is healthy.

Source merge does not deploy this behavior. Production activation, validation,
and rollback require their own approved deployment runbook. Source rollback is
the focused revert of the two route changes.
