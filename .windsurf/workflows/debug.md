# /debug — Issue Identification + Correction (Hard Constraints)

Use this workflow whenever diagnosing, confirming, or correcting issues (bugs, regressions, data mismatches, auth failures, broken UI, incorrect outputs).

## Step 0 — Inputs required (no code)
Collect (or ask for) the minimum required info:
- Issue list (each as one sentence)
- Environment: local / stage / prod
- User role(s)
- Repro steps (if known)
- Any proof artifacts available (console, network, logs, screenshots, DB before/after)

Hard rule: If any of the above is missing, ask for it, but still proceed with best-effort investigation steps.

## Step 1 — Reconfirm each issue (no fixes yet)
For EACH issue, output:
1) Issue statement (1–2 lines)
2) Current behavior
3) Expected behavior
4) Where it likely lives (project + route/page/component + handler/function)
5) Confidence: confirmed / likely / unclear

## Step 2 — Define repro + proof (mandatory)
For EACH issue, define:
- Minimal repro path (page/action, inputs, role, env)
- Proof artifact to confirm (console, network req/resp, server logs, DB row before/after, screenshot)

Hard rule: No fix proposal without a repro path.

## Step 3 — Create the fix plan file (required before implementation)
Create:
`/docs/working-on/fix-<issue-key>.md`

Then populate it using `@debug` (the debug skill) AND the locked modules it references:
- @architecture-context
- @auth-locked
- @supabase-patterns

The plan MUST include:
1) Issue summary + repro steps
2) Suspected root cause(s)
3) Evidence to collect
4) Files to read
5) Files to edit
6) Routes affected
7) Types reused/edited
8) Tables touched
9) Schema changes (yes/no)
10) Supabase access pattern
11) Auth and permission checks
12) Test plan (commands + expected result)
13) Rollback plan

Hard rule: No implementation before this file exists.

## Step 4 — Convert plan to checklist + approval gate (STOP HERE)
Inside the SAME fix md file:
- Convert the plan into a checklist (single action per item)
- Label backend artifacts: CREATE ONLY — DO NOT APPLY/DEPLOY
- Present checklist
- STOP and wait for approval

Hard rule: No approval, no work.

## Step 5 — Implementation (after approval only)
Follow the approved checklist exactly:
- No placeholders
- No hardcoded mock data
- No silent scope changes (requires plan update + re-approval)

## Step 6 — Proof + verification + final report
Proof requirement:
- Fix is valid only with evidence (request passes, error gone, DB write correct, output matches expected)

Verification:
- lint, typecheck, build
- verify routes/exports
- confirm auth behavior
- validate DB writes
- validate UI vs repro
- update tests if applicable

Final report (update SAME fix md file):
- Issues addressed
- Root causes
- Proof artifacts
- Files changed
- Routes touched
- Types reused/modified
- Tables/columns
- Migrations created (not applied)
- Edge functions created (not deployed)
- Assistant instruction drafts
- Commands run + results
- Pending/blocked items
