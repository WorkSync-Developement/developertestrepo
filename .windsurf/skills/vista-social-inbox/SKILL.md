---
name: vista-social-inbox
description: Vista Social Inbox + Reply integration. Enforces exact endpoints, params, payload shapes, idempotency, and audit logging. Premium access assumed; do not mention tiers.
---

# Vista Social: Inbox + Reply (Locked)

## Requires
- Use @vista-social-common first.

## Reference file (required)
- inbox.md

Hard rule:
- If inbox.md is missing, STOP and ask for it. Do not guess params, fields, or response shape.

## Base + auth (fixed)
- Base URL: https://vistasocial.com/api/integration/
- Required headers:
  - api-key: <YOUR_API_KEY>
  - Content-Type: application/json

Hard rules:
- Never log api-key, access tokens, refresh tokens.
- Requests using the api-key must be server-side only.
- Never log full message bodies from inbox items; log ids + metadata only.

---

## Endpoint: GET /inbox

### Allowed query params (only these)
- profile_id (string): comma-delimited list of profile IDs
- type (string): comma-delimited list of types: comment, mention, message, share

Hard rules:
- Use query params for filtering when possible (do not fetch-all + filter unless explicitly required).
- Treat the response shape as canonical per inbox.md. Do not assume additional fields.

### Canonical fields (safe to rely on)
- id (string)
- profile_id (number)
- network (string)
- type (comment|mention|message|share)
- message (string)  NOTE: do not log full content
- acknowledged (boolean)
- starred (boolean)
- dark (boolean)
- received (ISO string)
Optional:
- url (string)
- sentiment (object: name/value/reason/specifics)
- parent (object: url/message/type)
- user (object: name/username/picture_url)

---

## Endpoint: POST /reply

### Canonical request body (exact)
Request JSON must be exactly these fields:
- message_id (string)
- conversation_id (string)
- message (string)

Hard rules:
- Validate all 3 fields are present and non-empty before sending.
- Implement idempotency to prevent duplicate replies:
  - Idempotency key MUST be: reply:<message_id>:<sha256(message)>
  - Store it in your system (DB/Redis/log table). Window must be stated (e.g., 24h).
  - On duplicate: do not send; log "duplicate prevented".
- Create an audit log entry for every attempted reply:
  - actor (user/system)
  - message_id
  - conversation_id
  - timestamp
  - idempotency key
  - outcome (success/failure)
  - response status
  - reply url (if success)

### Canonical response fields (exact)
- inbox_id (string)
- conversation_id (string)
- url (string)

Hard rule:
- Do not assume any additional response fields.

---

## Error handling (mandatory)
Use the rules from @vista-social-common:
- Handle 400/401/403/404/429/5xx explicitly
- 429 + 5xx: exponential backoff retry (max attempts must be stated in plan)
- No silent failures
- Logs must exclude secrets and full message bodies

---

## Required output in plans (when inbox/reply is touched)
Plan MUST include:
- Which endpoint(s) are used (GET /inbox, POST /reply)
- Exact query params and/or request body you will send
- Which response fields you rely on (explicit list)
- Idempotency strategy (key + storage + window + duplicate behavior)
- Audit logging destination + fields
- Proof artifact for success (captured 200 response + reply url OR verified state)
