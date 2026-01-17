---
name: integration-contracts
description: Enforce canonical payload/type definitions for cross-system boundaries in Coverage Creatives. Contracts are defined primarily via TypeScript types + inline edge function schemas + assistant instructions. No guessing.
---

# Integration Contracts (Practical, Repo-Accurate)

## What “contract” means here
A contract is the CANONICAL definition of payload shape at a boundary:
- required fields
- optional fields
- naming convention
- types
- example payload (when boundary is external)

Contracts are NOT a special folder (none exists today). They live where the code already defines them.

## Canonical locations (source of truth)
### coverage-nextjs
- Shared/internal payload shapes: `@/types/*`
- API route request/response shapes: defined in `/pages/api/**/*.ts` but SHOULD reference `@/types/*` when reused
- Edge function I/O: inline under `/supabase/edge-functions/*`
- Assistant I/O: `/supabase/assistant-instructions/*`

### template-coverage-creatives
- Rendering payload shapes: `lib/types/*`
- Edge function I/O: inline under `/supabase/edge-functions/*`

Hard rule:
- Do not invent a “contracts folder” that the repo doesn’t use unless explicitly instructed.

## When you MUST apply this skill
Any time data crosses one of these boundaries:
- n8n -> coverage-nextjs API
- coverage-nextjs -> template-coverage-creatives (website/theme/location payloads)
- API <-> Edge function payloads
- AI assistant inputs/outputs used by automation
- Any webhook/event payload

## Versioning rule (lightweight)
- Additive changes only (new optional fields) unless you explicitly coordinate breaking changes.
- If a change would break a consumer, you MUST:
  - either keep backward compatibility, or
  - bump a version in the payload (e.g., `schema_version: 2`) and handle both.

## Validation rule (mandatory)
At each boundary, you must:
- identify the canonical type/schema location
- verify required fields exist
- verify naming convention (snake vs camel) is consistent
- verify types (string/number/boolean/array/object) are consistent

Hard rule:
- Never guess field names or types. If repo access is not available, label VERIFY IN REPO.

## Ownership / source of truth (mandatory)
For each boundary payload, state:
- Producer system
- Consumer system(s)
- Which system is source of truth for each field (one owner per field)

Hard rule:
- Two systems may not both author the same field without explicit arbitration logic.

## Required output in plans (when integrations are touched)
- Boundary name (e.g., n8n->API: syncMetrics)
- Producer/consumer
- Canonical type/schema location (exact file path)
- Payload field list (required/optional)
- Compatibility note (backwards-compatible YES/NO and why)
- Validation strategy (fail fast vs log + stop)
