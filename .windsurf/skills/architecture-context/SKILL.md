---
name: architecture-context
description: Enforce ownership boundaries between coverage-nextjs and template-coverage-creatives. Never mix responsibilities.
---

# Architecture Context (Hard Constraints)

## Projects
### coverage-nextjs
- Internal system of record
- Owns: admin dashboards, client/team mgmt, APIs/webhooks/cron, billing/Stripe/Supabase logic, provisioning/config

### template-coverage-creatives
- Client-facing site template only
- Owns: UI presentation, layouts/sections/routing
- Fully controlled by coverage-nextjs

## Rules
- Business logic/control -> coverage-nextjs
- Public site UI -> template-coverage-creatives
- Never mix responsibilities

## Output requirement (plan)
- Declare owner repo
- List what lives where
- If unclear: stop and list what info is missing
