You are given a feature plan (.md). Convert it into a phased execution workflow for ONE developer.

Goal: split the plan into a small set of phase files that are safe, non-ambiguous, and easy to execute in order. Add missing build/type/lint checks where necessary. Keep it strict and concrete.

Input:
- Feature name: <FEATURE_NAME>
- Plan markdown: <PASTE_PLAN>
- Repo access: <YES/NO> (if YES, validate file paths and commands; if NO, mark items “VERIFY IN REPO”)

Output requirements:
1) Create this folder layout:
   /docs/working-on/<feature-name>/
2) Generate these files:
   - 00-overview.md
   - phase-01.md
   - phase-02.md
   - phase-03.md
   - ... (as many as needed, but prefer 3–7 phases total)
   - 99-final-report.md

3) 00-overview.md must include:
   - Feature summary (3–5 bullets)
   - Architecture ownership (where work lives)
   - Routes affected
   - Tables/columns touched
   - Types reused/created
   - Supabase access pattern selected
   - Auth/permission checks summary
   - UI-first note (if migrations/edge functions/assistant instructions are involved)
   - Phase list with one-line goal per phase

4) Each phase file must include:
   A) Objective (1–2 sentences)
   B) Scope (IN / OUT)
   C) Preconditions (what must already be true)
   D) Files to read (explicit paths)
   E) Files to edit/create (explicit paths)
   F) Routes/handlers impacted (explicit)
   G) Data path trace (UI -> payload -> handler -> DB table.column [+ type if known])
   H) Checklist (single-action items only, ordered)
   I) Build checks (exact commands to run) + expected outcome
   J) Stop conditions (what would force escalation / plan revision)

5) Gates (mandatory):
   - If the plan includes DB migrations / edge functions / assistant instruction changes:
     - Put ALL UI work in earlier phases.
     - Backend artifacts must be “create-only, staged” after UI is complete.
     - Explicitly label: “Create only – do not apply/deploy”.
   - No step may guess schema. If repo access is NO, every schema item must be labeled “VERIFY IN REPO”.

6) Build checks rules:
   - Add checks at least at the end of every phase:
     - lint (if exists)
     - typecheck (if exists)
     - build (if exists)
     - tests if applicable
   - If repo access YES, confirm the exact commands exist (package.json) and use them.
   - If repo access NO, write “RUN PROJECT LINT/TYPECHECK/BUILD COMMANDS (VERIFY IN REPO)” as placeholders only for the command names, not fake commands.

7) Output format:
- Output the full contents of each file in order, with clear file headers like:
  === /docs/working-on/<feature-name>/phase-01.md ===
- Do not include code implementation. This is phase planning only.
