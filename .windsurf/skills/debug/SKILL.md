---
name: debug
description: Use for diagnosing, confirming, and correcting bugs/regressions/data mismatches/auth failures/broken UI/incorrect outputs. Enforces repro-first, trace-end-to-end, plan+approval gate, and proof-based fixes.
---

# Issue Identification + Correction Workflow (Hard Constraints)

## 0) Architecture context (mandatory)
Before any work, determine ownership using @architecture-context.

Hard rule:
- Business logic/control -> coverage-nextjs
- Public site UI -> template-coverage-creatives
- Never mix responsibilities.

## 1) Intake and reconfirm (no code)
Given a list of issues, you MUST reconfirm each issue before proposing any fix.

For EACH issue output:
1. Issue statement (1–2 lines)
2. Current behavior
3. Expected behavior
4. Where it likely lives:
   - project
   - route/page/component
   - function/handler
5. Confidence level: confirmed / likely / unclear

Hard rule:
- If unclear, explicitly state what is missing (logs, repro steps, payloads, screenshots), AND still outline best-effort investigation steps.

## 2) Reproduction first (mandatory)
For EACH issue define:
1. Minimal repro path:
   - exact page/action
   - inputs
   - user role
   - environment (local/stage/prod)
2. Proof artifact to confirm:
   - console error
   - network request + response
   - server logs
   - DB row before/after
   - screenshot

Hard rule:
- No fix proposal without a repro path.

## 3) Auth patterns (locked)
Auth is LOCKED. Use @auth-locked.
Hard rule:
- Never create new auth routes.
- Never invent role/permission logic.
- If auth does not fit, STOP and escalate.

## 4) Trace the failure end-to-end (mandatory)
Before touching code, trace:
- UI field or trigger
- Network payload
- API handler
- Query/mutation
- DB table and column
- Returned output back to UI

Hard rule:
- Never guess schema, routes, or payload shapes.

## 5) Classify the issue type (mandatory)
For EACH issue classify ONE:
- UI rendering/state bug
- API contract mismatch
- Auth/permission failure
- RLS/service role misuse
- DB schema mismatch
- Data mapping/column alignment bug
- Integration/third-party API bug
- Race condition/timing
- Regression from prior change

This classification determines investigation order.

## 6) Validate any outlined solution (mandatory)
If any proposed solution exists (yours or someone else’s), evaluate:

1. Does it address the actual failure point?
2. Does it preserve locked auth patterns? (see @auth-locked)
3. Does it use an allowed Supabase pattern? (see @supabase-patterns)
4. Does it follow existing routing conventions?
5. Does it require schema changes, and are they justified?
6. Does it introduce new risk?
7. Is there a simpler fix?

For EACH issue output:
- Proposed solution verdict: correct / partially correct / wrong / unverified
- Why
- What must change

## 7) Supabase usage patterns (locked)
Supabase patterns are LOCKED. Use @supabase-patterns.

Hard rule:
- Choose only one allowed client type per usage (browser vs server vs admin).
- If the required functions cannot be found, STOP and ask for the correct file paths.

## 8) Locate existing working patterns (mandatory)
You MUST:
1. Find the closest existing feature that works.
2. Compare:
   - route structure
   - auth usage
   - payload shape
   - query shape
   - error handling
3. Identify deviations causing the issue.

Hard rule:
- Do not invent new structure when a working reference exists.

## 9) Plan the fix (required before implementation)
Before any fix, create:

/docs/working-on/fix-<issue-key>.md

The plan MUST include:
1. Issue summary + repro steps
2. Suspected root cause(s)
3. Evidence to collect
4. Files to read
5. Files to edit
6. Routes affected
7. Types reused or edited
8. Tables touched
9. Schema changes (yes/no)
10. Supabase access pattern (per @supabase-patterns)
11. Auth and permission checks (per @auth-locked)
12. Test plan (commands + expected result)
13. Rollback plan

Hard rule:
- No implementation before this file exists.

## 10) Checklist + approval gate (mandatory)
Inside the SAME plan file:
1. Convert the plan into a checklist.
2. Each item is a single action.
3. Backend artifacts MUST be labeled: CREATE ONLY — DO NOT APPLY/DEPLOY
4. Present checklist.
5. STOP and wait for approval.

Hard rule:
- No approval, no work.

## 11) Fix sequencing rules
If UI + backend involved:
1. Confirm repro in UI
2. Stage backend artifacts (create only)
3. Fix UI and wiring
4. Validate, then apply/deploy

If backend-only:
- Stage first, apply only after validation.

## 12) Backend artifact staging (Supabase)
All artifacts live under /supabase.

Migrations:
- /supabase/migrations
- Create only
- Production-safe
- No placeholders
- Do not apply

Edge Functions:
- /supabase/functions
- Write only
- Do not deploy

Assistant instructions:
- Stored under /supabase
- Draft only
- Do not publish

## 13) Root-cause proof requirement (mandatory)
A fix is valid only with proof, e.g.:
- failing request now passes
- error log eliminated
- DB write corrected
- output matches expected behavior

Hard rule:
- No “seems fixed” without evidence.

## 14) Verification (mandatory)
You MUST:
1. lint, typecheck, build
2. verify routes and exports
3. confirm auth behavior
4. validate DB writes
5. validate UI vs repro
6. update tests if applicable

## 15) Final report (mandatory)
Update the SAME fix md file with:
- Issues addressed
- Root causes
- Proof artifacts
- Files changed
- Routes touched
- Types reused/modified
- Tables and columns
- Migrations created (not applied)
- Edge functions created (not deployed)
- Assistant instruction drafts
- Commands run + results
- Anything pending/blocked
