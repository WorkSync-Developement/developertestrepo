---
name: feature-orchestrator
description: Generate the required feature plan file skeleton and enforce section outputs + Touched YES/NO gates.
---

# Feature Plan Orchestrator (Hard Constraints)

## Output target
Write ONLY into: /docs/working-on/<feature-name>.md

## Rules
- No code changes in this step.
- Every section below MUST exist in the plan.
- Each section MUST include: Touched: YES/NO + a 1–2 sentence proof.
- If Touched: YES, include the required checklist items for that section.

## Required Plan Sections (in this exact order)
1. Feature Summary (3–5 bullets)
2. Ownership Decision (coverage-nextjs vs template-coverage-creatives)
3. Touchpoints Inventory (routes/handlers, types, auth path, tables/columns, schema changes YES/NO)
4. Auth & Permissions (MUST follow @auth-locked)
5. Supabase Access Pattern (MUST follow @supabase-patterns)
6. Schema Trace End-to-End (MUST follow @schema-trace)
7. Files to Read / Files to Edit
8. Routes Affected
9. Types Reused / Created
10. Tables Touched / Columns Touched
11. Backend Artifacts Staging (MUST follow @staging-ui-first)
12. Tests & Commands
13. Risks / Open Questions
14. Checklist (initial draft — will be finalized in the approval gate)
