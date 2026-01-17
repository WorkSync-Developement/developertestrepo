---
name: vista-social-common
description: Shared Vista Social integration rules and references (base URL, auth, error handling, and global constraints). Use before any Vista Social endpoint work.
---

# Vista Social (Common)

## Reference files (required)
- `vista-social-api-reference.md`
- `vista-social-api-endpoints.md`

Hard rule:
- If either reference file is missing, STOP and ask for it. Do not guess.

## Base URL (fixed)
`https://vistasocial.com/api/integration/`

## Account note
- **All premium endpoints are available.** Do not mention account tiers or premium restrictions.
- Full API access is provisioned for this account.

## Auth (choose one)
- API key header: `api-key: <YOUR_API_KEY>`
- OAuth 2.0: use the OAuth endpoints in `vista-social-api-reference.md`

Hard rules:
- Never hardcode or log secrets (api-key, access token, refresh token).
- Use server-side only for any secret-bearing calls.

## Error handling (mandatory)
Handle: 400, 401, 403, 404, 429, 5xx.
- 429 + 5xx: exponential backoff retry (max attempts must be stated in plan)
- other 4xx: no retry unless explicitly justified
- No silent failures. Log endpoint + status + safe error excerpt (no secrets).

## Plan output requirements (when Vista Social is touched)
Plan MUST state:
- endpoints used
- auth method
- request/response fields relied on (explicit)
- retry/backoff behavior
- storage/mapping (where data goes) if applicable
