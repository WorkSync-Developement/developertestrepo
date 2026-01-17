# Vista Social API Endpoints Reference

> **Base URL:** `https://vistasocial.com/api/integration/`  
> **Authentication:** API Key (header: `api-key`) or OAuth 2.0  
> **Note:** All endpoints are available. Full API access is provisioned for this account.

---

## Endpoints Overview

| # | Method | Endpoint | Description | Available |
|---|--------|----------|-------------|-----------|
| 1 | `GET` | `/profiles` | Get all connected social profiles | ✅ |
| 2 | `GET` | `/groups` | Get all profile groups | ✅ |
| 3 | `GET` | `/posts` | Get scheduled/published/draft/failed posts | ✅ |
| 4 | `POST` | `/posts` | Create/schedule a new post | ✅ |
| 5 | `GET` | `/comments` | Get comments for a post | ✅ |
| 6 | `GET` | `/data/daily` | Get daily performance metrics | ✅ |
| 7 | `GET` | `/data/posts` | Get post performance metrics | ✅ |
| 8 | `GET` | `/inbox` | Retrieve inbox items (comments, messages) | ✅ |
| 9 | `POST` | `/reply` | Reply to inbox items | ✅ |

---

## Documentation Files

Detailed documentation for each endpoint category:

| File | Endpoints | Description |
|------|-----------|-------------|
| [profiles-groups.md](./endpoints/profiles-groups.md) | 1-2 | Get Profiles, Get Groups |
| [posts.md](./endpoints/posts.md) | 3-5 | Get Posts, Create Post, Get Comments |
| [analytics.md](./endpoints/analytics.md) | 6-7 | Daily Performance, Post Performance (Premium) |
| [inbox.md](./endpoints/inbox.md) | 8-9 | Get Inbox, Reply (Premium) |

Each file includes:
- Full request/response documentation
- Query parameters and body parameters
- Example cURL requests
- Example JSON responses
- TypeScript type definitions
- Usage examples

---

## Quick Reference

### Authentication

All requests require the `api-key` header:

```bash
curl --location 'https://vistasocial.com/api/integration/profiles' \
  --header 'api-key: YOUR_API_KEY'
```

### Error Handling

| Status Code | Description | Action |
|-------------|-------------|--------|
| `200` | Success | Process response data |
| `400` | Bad Request | Check request parameters |
| `401` | Unauthorized | Verify API key or OAuth token |
| `403` | Forbidden | Account not provisioned for API |
| `404` | Not Found | Check endpoint URL |
| `429` | Rate Limited | Implement backoff and retry |
| `500` | Server Error | Retry with exponential backoff |

---

## Current Usage in Codebase

### Vista Social Routes (`/pages/api/vista-social/`)
| Route | Vista Endpoint | Method | Purpose |
|-------|----------------|--------|---------|
| `profiles.ts` | `/profiles` | GET | Fetch profiles by group_id for scheduling |
| `groups.ts` | `/groups` | GET | Fetch groups for location mapping |
| `connect.ts` | — | — | Maps Vista group to location (Supabase only) |
| `disconnect.ts` | — | — | Unmaps Vista group from location (Supabase only) |
| `schedule-posts.ts` | — | — | Inserts to social_posts (n8n handles Vista POST) |

### Social Leads Routes (`/pages/api/social-leads/`)
| Route | Vista Endpoint | Method | Purpose |
|-------|----------------|--------|---------|
| `sync.ts` | `/profiles` | GET | Fetch profiles for location's group |
| `sync.ts` | `/inbox` | GET | Fetch inbox items (reviews, comments, messages) |
| `respond.ts` | `/inbox/{id}/reply` | POST | Reply to inbox item |
| `generate-response.ts` | — | — | OpenAI only |
| `handoff.ts` | — | — | Supabase only |
| `presets.ts` | — | — | Supabase only |
| `request-review.ts` | — | — | Supabase only |

### n8n Workflows (Planned)
| Workflow | Vista Endpoint | Method | Purpose |
|----------|----------------|--------|---------|
| Posting Workflow | `/posts` | POST | Create/schedule posts |
| Posting Workflow | `/posts` | GET | Verify post status after creation |

---

## Notes

- All endpoints are available (full API access provisioned)
- Data from **X (Twitter)** is not available through the API
- **Paid/Ad Account data** is not available through the API
- Sentiment analysis is automatically provided for inbox items

---

*Last Updated: January 2026*
