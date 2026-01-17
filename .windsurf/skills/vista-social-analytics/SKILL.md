---
name: vista-social-analytics
description: Vista Social analytics integration. Locks the allowed endpoints, query params, response field usage, storage/dedupe expectations, and proof requirements. Premium access assumed; do not mention tiers.
---

# Vista Social: Analytics (Locked)

## Requires
- Use @vista-social-common first.

## Reference file (required)
- analytics.md

Hard rule:
- If analytics.md is missing, STOP and ask for it. Do not guess params, metrics, or response shape.

## Base + auth (fixed)
- Base URL: https://vistasocial.com/api/integration/
- Required headers:
  - api-key: <YOUR_API_KEY>
  - Content-Type: application/json

Hard rules:
- Never log api-key, access tokens, refresh tokens.
- Requests using the api-key must be server-side only.

---

## Endpoints covered (only these)
- GET /data/daily
- GET /data/posts

Hard rule:
- Do not use any other analytics endpoints unless they exist in analytics.md.

---

## Query parameters (locked)
All query params used MUST be taken from analytics.md verbatim.

Hard rules:
- Do not invent query params.
- If a required param list is not explicitly present in analytics.md, mark it as VERIFY IN DOC and request the missing section.

---

## Metrics and field usage (locked)
All metric field names and response fields you rely on MUST be:
- explicitly listed in analytics.md, OR
- directly present in a captured sample response from Vista Social for that endpoint.

Hard rules:
- No guessing metric names.
- If a metric is needed but not defined in analytics.md, STOP and request the exact field names.

---

## Data ingestion rules (mandatory)
When pulling analytics across time windows:
- Must specify date range logic (start/end) and timezone assumptions in the plan.
- Must be idempotent:
  - Define a dedupe key for stored rows (example pattern: <endpoint>:<profile_id>:<date>[:<post_id>])
  - On rerun, do not create duplicate rows; upsert or skip based on the dedupe key.

Hard rules:
- No “append-only” ingestion without dedupe.
- If storage destination is unknown, label VERIFY IN REPO and stop before implementation.

---

## Mapping requirements (mandatory)
Plan MUST include:
- Which internal entities the analytics map to (profile, group, client, location, etc.)
- The exact mapping key(s) used (profile_id, group_id, etc.)
- Any transforms (unit conversion, rounding, aggregation) explicitly defined.

Hard rule:
- No implicit transforms.

---

## Error handling (mandatory)
Use the rules from @vista-social-common:
- Handle 400/401/403/404/429/5xx explicitly
- 429 + 5xx: exponential backoff retry (max attempts stated in plan)
- No silent failures
- Logs must exclude secrets

---

## Proof requirement (mandatory)
A change is only valid with proof:
- Captured successful response(s) for the endpoint(s)
- Confirmation the parsed metrics match expected fields
- If storing: proof that rerunning does not duplicate data (upsert/skip verified)

---

## Required output in plans (when analytics is touched)
Plan MUST include:
- Which endpoint(s) are used (GET /data/daily, GET /data/posts)
- Exact query params you will send (verbatim from analytics.md)
- Response fields/metrics you rely on (explicit list)
- Date range logic + timezone
- Dedupe strategy (key + storage + rerun behavior)
- Mapping to internal tables/columns (or VERIFY IN REPO)
- Proof artifacts to collect
