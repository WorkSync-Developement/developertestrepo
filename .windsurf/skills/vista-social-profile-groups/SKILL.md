---
name: vista-social-profiles-groups
description: Vista Social Profiles + Groups integration. Locks endpoints, allowed query params, canonical response fields, mapping expectations, and verification. Premium access assumed; do not mention tiers.
---

# Vista Social: Profiles + Groups (Locked)

## Requires
- Use @vista-social-common first.

## Reference file (required)
- profiles-groups.md

Hard rule:
- If profiles-groups.md is missing, STOP and ask for it. Do not guess params, fields, or response shape.

## Base + auth (fixed)
- Base URL: https://vistasocial.com/api/integration/
- Required header:
  - api-key: <YOUR_API_KEY>

Hard rules:
- Never log api-key, access tokens, refresh tokens.
- Requests using the api-key must be server-side only.

---

## Endpoint 1: GET /profiles

### Allowed query params (only these)
- q (string): optional profile name filter
- group_id (string): optional group id filter

Hard rules:
- Do not invent additional query params.
- Treat response shape as canonical per profiles-groups.md. Do not assume additional fields.

### Canonical response fields (safe to rely on)
Profile:
- id (number)
- name (string)
- network (string)

Hard rule:
- Do not assume profile objects include any other fields.

---

## Endpoint 2: GET /groups

### Allowed query params (only these)
- q (string): optional group name filter

Hard rules:
- Do not invent additional query params.
- Treat response shape as canonical per profiles-groups.md. Do not assume additional fields.

### Canonical response fields (safe to rely on)
Group:
- id (string, UUID)
- name (string)
- type (CLIENT|PROJECT)

Hard rule:
- Do not assume group objects include any other fields.

---

## Mapping and usage rules (mandatory)
If these endpoints are used to populate or sync internal entities, the plan MUST state:
- What internal entity is being mapped (client/location/account/etc.)
- The exact mapping key(s) used (profile.id and/or group.id)
- Where the mapping is stored (table/columns) OR mark VERIFY IN REPO

Hard rules:
- Do not infer relationships between profiles and groups beyond the explicit filters provided (group_id on /profiles).
- If the integration requires a profile->client linkage, you must define and store that linkage explicitly.

---

## Error handling (mandatory)
Use the rules from @vista-social-common:
- Handle 400/401/403/404/429/5xx explicitly
- 429 + 5xx: exponential backoff retry (max attempts must be stated in plan)
- No silent failures
- Logs must exclude secrets

---

## Proof requirement (mandatory)
A change is only valid with proof:
- Captured 200 response samples for:
  - GET /profiles
  - GET /groups
- Proof the fields used match the canonical list above
- If mapping is stored: proof rerun does not create duplicates (upsert/skip strategy documented)

---

## Required output in plans (when profiles/groups is touched)
Plan MUST include:
- Which endpoint(s) are used (GET /profiles, GET /groups)
- Exact query params you will send (if any)
- Which response fields you rely on (explicit list)
- Mapping/storage strategy (or VERIFY IN REPO)
- Proof artifacts to collect
