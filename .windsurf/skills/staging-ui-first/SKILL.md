---
name: staging-ui-first
description: UI-first rule + backend artifact staging under /supabase. Create only; do not apply/deploy/publish until post-UI gate.
---

# UI-First + Backend Artifact Staging

## UI-first rule (critical)
If feature involves DB migrations, Edge Functions, Assistant instructions:
1) UI completed first
2) Backend artifacts created but staged
3) Nothing applied/deployed/published

## Backend artifacts location
All under /supabase

### Migrations
- /supabase/migrations
- Create files only
- Production-safe
- No placeholders
- Do not apply

### Edge Functions
- /supabase/functions
- Write code only
- Do not deploy

### Assistant instructions
- Stored under /supabase
- Draft only
- Do not publish

## Post-UI review gate
After UI completion:
- revalidate schema
- revalidate edge payloads
- revalidate assistant outputs
Only then apply/deploy/publish

## Output requirement (plan)
- List staged artifacts and label them CREATE ONLY
- Explicitly state what is NOT being applied/deployed
