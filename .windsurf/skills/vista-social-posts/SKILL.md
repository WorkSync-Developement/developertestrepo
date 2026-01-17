---
name: vista-social-posts
description: Vista Social Posts + Comments integration. Locks endpoints, params, request/response shapes, safe write rules, idempotency, and logging. Premium access assumed; do not mention tiers.
---

# Vista Social: Posts + Comments (Locked)

## Requires
- Use @vista-social-common first.

## Reference file (required)
- posts.md

Hard rule:
- If posts.md is missing, STOP and ask for it. Do not guess params, fields, or response shape.

## Base + auth (fixed)
- Base URL: https://vistasocial.com/api/integration/
- Required headers:
  - api-key: <YOUR_API_KEY>
  - Content-Type: application/json (for POST only)

Hard rules:
- Never log api-key, access tokens, refresh tokens.
- Requests using the api-key must be server-side only.
- Do not log full post bodies or comment bodies; log ids + metadata only unless explicitly required.

---

## Endpoint 1: GET /posts

### Allowed query params (only these)
- status (string): published | scheduled | draft | failed
- id (string): optional specific post ID

Hard rules:
- Do not invent additional query params.
- Treat response shape as canonical per posts.md. Do not assume additional fields.

### Canonical response fields (safe to rely on)
Post:
- id (string)
- message (string) NOTE: do not log full content
- publish_at (string, ISO 8601)
- timezone (string)
- author (object):
  - name (string)
  - email (string)
- profile (object):
  - name (string)

---

## Endpoint 2: POST /posts

### Canonical request body (allowed fields only)
- message (string) REQUIRED IF media_url is not provided
- profile_id (number[]) REQUIRED
- publish_at (string) REQUIRED
  - allowed values include: now | queue_next | queue_last | ISO 8601 datetime | unix timestamp
- media_url (string[]) optional
- draft (boolean) optional
- comments (string[]) optional (max 10)
- like (boolean) optional
- labels (string[]) optional

Platform-specific optional fields (only these)
- facebook_publish_as (REELS|STORY|VIDEO|IMAGE)
- instagram_publish_as (REELS|STORY|FEED)
- instagram_collaborators (string[])
- snapchat_publish_as (STORY|SAVED_STORY|SPOTLIGHT)
- pinterest_board_name (string)
- pinterest_section_name (string)
- subreddit_name (string)
- youtube_title (string)
- youtube_category (string)
- tags (string[])

Hard rules:
- Do not send fields not listed above.
- Validate inputs before sending:
  - profile_id must be a non-empty array of numbers
  - publish_at must be one of the allowed formats/values
  - message is required when media_url is absent
  - comments length must be <= 10
- Implement idempotency to prevent duplicate scheduled posts:
  - Idempotency key MUST be: post:<sorted_profile_ids_joined>:<publish_at_normalized>:<sha256(message|media_url_joined)>
  - Store it in your system (DB/Redis/log table). Window must be stated (e.g., 24h).
  - On duplicate: do not send; log "duplicate prevented".
- Create an audit log entry for every attempted post create:
  - actor (user/system)
  - profile_id list
  - publish_at
  - idempotency key
  - outcome (success/failure)
  - response status
  - created post ids (if success)

### Canonical response fields (exact)
CreatePostResponse:
- id (string[]) array of created post IDs

Hard rule:
- Do not assume any additional response fields.

---

## Endpoint 3: GET /comments

### Allowed query params (only these)
- post_id (string) REQUIRED

Hard rules:
- Do not invent additional query params.
- Treat response shape as canonical per posts.md.

### Canonical response fields (safe to rely on)
Comment:
- id (string)
- link (string)
- message (string) NOTE: do not log full content
- created_at (string, ISO 8601)
- user (object):
  - email (string)
  - first_name (string)
  - last_name (string)
  - picture (string)

---

## Error handling (mandatory)
Use the rules from @vista-social-common:
- Handle 400/401/403/404/429/5xx explicitly
- 429 + 5xx: exponential backoff retry (max attempts must be stated in plan)
- No silent failures
- Logs must exclude secrets and full message bodies

---

## Proof requirement (mandatory)
A change is only valid with proof:
- GET /posts: captured 200 response sample + correct parsing of required fields
- POST /posts: captured 200 response with created id[] AND proof duplicates are prevented (rerun does not create additional posts)
- GET /comments: captured 200 response sample + correct parsing of required fields

---

## Required output in plans (when posts/comments is touched)
Plan MUST include:
- Which endpoint(s) are used (GET /posts, POST /posts, GET /comments)
- Exact query params and/or request body you will send
- Which response fields you rely on (explicit list)
- Idempotency strategy (key + storage + window + duplicate behavior) for POST /posts
- Audit logging destination + fields
- Proof artifacts to collect
