# /new-feature — Orchestrated Feature Workflow (Hard Constraints)

You MUST follow the steps in order. No code changes until the plan file exists and checklist is approved.

## Step A — Create the plan file (no code)
Create: /docs/working-on/<feature-name>.md

Populate it using:
- @feature-orchestrator
- @architecture-context
- @auth-locked
- @supabase-patterns
- @schema-trace
- @staging-ui-first
- @verification-final-report

## Step B — Convert plan into checklist + approval gate
Inside the same plan file:
- Convert each planned action into a single checklist item
- Label backend artifacts as "CREATE ONLY — DO NOT APPLY/DEPLOY"
- Present checklist
- STOP and wait for approval

## Step C — Implementation phase (after approval only)
Follow the checklist exactly.
- No placeholders
- No hardcoded mock data
- No silent scope changes (requires plan update + re-approval)

## Step D — Verification + final report
Run required commands and update the same plan file with:
- Files changed
- Routes touched
- Types reused/created
- Tables/columns touched
- Migrations created (not applied)
- Edge functions created (not deployed)
- Assistant instructions drafted (not published)
- Commands run + results
- Anything pending/blocked (explicit)
