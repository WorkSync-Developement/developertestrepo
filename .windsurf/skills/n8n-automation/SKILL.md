---
name: n8n-automation
description: Locked patterns for building n8n automations in this stack. Enforces triggers, idempotency, retries, logging, secrets handling, and strict JSON contracts between nodes.
---

# n8n Automation Patterns (Locked)

## Hard rules (do not violate)
- No credentials, tokens, or secrets hardcoded in nodes.
- Every workflow MUST be safe to re-run (idempotent).
- Every workflow MUST define failure handling (retry + dead-letter/logging).
- Every workflow MUST define a JSON contract for each external boundary (in/out).
- If required context is missing (API endpoint, payload schema, table), STOP and request it. Do not invent.

## 1) Triggers (choose explicitly)
Allowed triggers:
- Webhook trigger (preferred for event-driven)
- Cron trigger (for scheduled)
- Manual trigger (for maintenance/test)

Plan MUST state:
- Trigger type
- Expected frequency
- Source system initiating the workflow

## 2) Idempotency (mandatory)
Every workflow MUST define:
- Idempotency key: `<event_type>:<primary_id>:<version>` (or equivalent)
- Where it is stored (DB table, Redis, n8n static data, etc.)
- Dedupe window (e.g., 24h) if applicable
- Behavior on duplicate: skip + log (or return cached result)

Hard rule:
- No “at least once” triggers without dedupe.

## 3) Retries + failure handling (mandatory)
For each external call (HTTP/DB/3rd party), define:
- Retry policy (attempt count + delay)
- What errors are retryable vs terminal
- Dead-letter behavior:
  - Persist a failure record with payload + error + timestamp
  - Tag as recoverable vs unrecoverable
  - Provide replay strategy

Hard rule:
- No silent failures.

## 4) Logging + observability (mandatory)
Each workflow MUST log:
- Start event (ids + trigger)
- Key branch decisions
- External request/response status (no secrets)
- Completion summary (success/fail, affected entity ids)

If you have a central log table, use it. If not, create a single consistent log destination and reference it.

## 5) JSON Contracts between nodes (mandatory)
Every boundary MUST have an explicit contract:
- Required fields
- Optional fields
- Field naming convention (snake_case or camelCase)
- Types (string/number/boolean/array/object)
- Example payload

Hard rule:
- If a field is unknown or missing, workflow must either:
  - fail fast (preferred), or
  - log as contract violation and stop.

## 6) Secrets handling (mandatory)
Allowed:
- n8n credentials store
- environment variables
- external secret manager (if present)

Not allowed:
- plain text tokens in node JSON
- copying service-role keys into headers manually

## 7) Rollback / safety (required)
Plan MUST state:
- What changes are reversible
- What data writes occur
- How to undo or compensate if needed

## Required output in plans (when n8n is touched)
- Workflow name + trigger
- Idempotency key definition + storage
- Retry + dead-letter strategy
- Logging location
- Node-to-node JSON contracts
- External endpoints/tables touched
