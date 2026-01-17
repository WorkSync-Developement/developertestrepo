---
name: auth-locked
description: Locked auth + authorization pattern for coverage-nextjs. Always reuse AuthContext + withAuth + existing helpers. Never create new auth routes or invent roles/permission logic.
---

# Auth Pattern (Locked) — coverage-nextjs

## Source of truth files
- Client auth context: `@/contexts/AuthContext.tsx`
- API auth middleware: `@/middleware/auth.ts`
- Supabase client: `@/lib/supabase/client.ts` (`getSupabaseClient()`)
- Supabase server client: `@/lib/supabase/server.ts` (`createSupabaseServerClient(req, res)`)

## Client-side (fixed)
- App uses `AuthContext` to expose: `session`, `user`, `lastEvent`, `initializing`, `refreshSession`, `setSession`, `setUser`
- Uses `getSupabaseClient()` and calls `supabase.auth.getSession()` on mount
- `onAuthStateChange` listener exists but is currently commented out
- Consumers must use `useAuthContext()`

Hard rules:
- Do not create new client auth systems or duplicate AuthContext behavior
- Do not invent alternate session storage mechanisms

## Server-side (fixed)
All API routes must use:
- `withAuth(handler, options)` from `@/middleware/auth.ts`

Authentication order (fixed):
1) Session cookies first (`supabase.auth.getUser()`)
2) Fallback to `Authorization: Bearer <token>`

Role resolution (fixed):
- Role is fetched from `profiles` table

Roles (fixed):
- `admin`
- `admin_team_member` (elevated to admin if active)
- `client`
- `user`

withAuth options you may use (do not invent new ones):
- `requireAuth`
- `requireRole`
- `requireDepartment`
- `allowSelfAccess`
- `requireTeamAccess`

Hard rules:
- Never create new auth routes
- Never invent roles or role elevation logic
- Always reuse `withAuth`
- Always resolve role from `profiles` (do not hardcode)
- If requirements do not fit current options/helpers: STOP and escalate

## Authorization helpers (use, don’t duplicate)
- `requireDepartmentAccess()`
- `requireClientAccess()`
- `requireTaskAccess()`
- `requireClientTeamAccess()`
- `hasTeamPermission()`
- `getUserPermissions()`

Hard rules:
- Use the existing helpers for access checks
- Do not create parallel permission systems
- Do not bypass `withAuth` to “save time”

## Required output in the plan (when auth is touched)
The plan section MUST state:
- which API routes/handlers are protected
- which `withAuth` options are used and why
- which role(s) are allowed
- which helper(s) enforce access (department/client/task/team)
- whether frontend needs `getUserPermissions()` output

## Required pattern (API route)
Use this pattern only:

```ts
export default withAuth(async (req, res) => {
  // req.user is populated with id, email, role, permissions
}, { requireAuth: true, requireRole: 'admin' });
