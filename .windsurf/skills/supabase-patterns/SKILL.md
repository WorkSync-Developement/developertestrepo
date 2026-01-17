---
name: supabase-patterns
description: Locked Supabase client patterns for coverage-nextjs. Only 3 clients allowed. Never add new factories. Enforce env var rules and RLS boundaries.
---

# Supabase Patterns (Locked) — coverage-nextjs

## Source of truth files
- Browser client: `@/lib/supabase/client.ts`
- Server + admin clients: `@/lib/supabase/server.ts`

## Allowed client types (ONLY these)

### 1) Browser Client (singleton)
Function: `getSupabaseClient()` from `@/lib/supabase/client.ts`

Use for:
- Client components
- React hooks
- `AuthContext`

Hard rules:
- Client components MUST use `getSupabaseClient()`
- Do not create alternate browser clients
- No secrets in browser

### 2) Server Client (user-context, RLS enforced)
Function: `createSupabaseServerClient(req, res)` from `@/lib/supabase/server.ts`

Use for:
- API routes that require user context
- Cookie-based session
- RLS MUST be enforced via the user session

Hard rules:
- API routes with user context MUST use `createSupabaseServerClient(req, res)`
- Do not bypass RLS for user-context routes
- Do not create new per-route client factories

### 3) Admin Client (service-role, bypasses RLS)
Function: `createSupabaseAdminClient()` from `@/lib/supabase/server.ts`

Use for:
- Server-only operations requiring RLS bypass
- Admin actions
- Background jobs / provisioning

Hard rules:
- Admin client is SERVER ONLY
- Never expose service role key to browser
- Use only when bypassing RLS is explicitly required and justified

## Environment variables (locked)
- `NEXT_PUBLIC_SUPABASE_URL` (client + server)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (client + server; RLS enforced)
- `SUPABASE_SERVICE_ROLE_KEY` (SERVER ONLY; bypasses RLS)

Hard rules:
- `SUPABASE_SERVICE_ROLE_KEY` must never appear in client-side code or shipped bundles
- Do not introduce new env var names for Supabase

## Absolute prohibitions
- Never create additional Supabase client factories
- Never introduce a 4th “pattern”
- Never “just use createClient” in random places
- Never bypass RLS for standard user flows
- If the required functions (getSupabaseClient, createSupabaseServerClient, createSupabaseAdminClient) cannot be located in the repo, STOP and ask for the correct file paths. Do not invent alternatives.

## Required output in the plan (when Supabase is touched)
Plan MUST state:
- Which client type is used (browser vs server vs admin)
- Exact callsite(s) (file/route)
- RLS expectation (enforced vs bypassed) and why
- Tables/columns touched
- Any schema/migration artifacts to be created (CREATE ONLY — DO NOT APPLY)

## Usage requirements (quick rules)
- Client component => `getSupabaseClient()`
- API route needing user session => `createSupabaseServerClient(req, res)`
- Server-only bypass RLS => `createSupabaseAdminClient()`
