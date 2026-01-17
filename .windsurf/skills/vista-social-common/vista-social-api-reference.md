# Vista Social API Reference

> **Documentation URL:** https://apidocs.vistasocial.com/  
> **Developer Terms:** https://vistasocial.com/api-terms-of-service/

---

## Overview

Vista Social API provides an externally accessible API for accessing owned social profile data. This enables powering custom dashboards and automating reporting workflows.

**Important:** Your account must be provisioned for API use by your Vista Social account representative before accessing the API.

---

## Available Data

### ✅ Included

| Data Type | Description |
|-----------|-------------|
| **Owned Profile Data** | Matches data available in Vista Social's Social Media Performance report |
| **Post Data** | Matches data available in Vista Social's Post Performance Report |
| **Comment Data** | Detailed information and metadata about post comments |
| **Schedule Posts** | Schedule posts to profiles connected to your Vista Social account |

### 🚫 Not Included

- Paid (Ad Account) data
- Data from X (formerly Twitter)

---

## Authentication

Vista Social API supports two authentication methods:

### 1. API Key Authentication

The simplest method for server-to-server integrations.

**Setup:**
1. Navigate to **Settings > Integrations** in Vista Social
2. Generate an API key

**Usage:**
```
Header: api-key: YOUR_API_KEY
```

Pass the `api-key` header on every request.

---

### 2. OAuth 2.0 Authentication

For applications that need to act on behalf of users. Contact Vista Social support to set up your OAuth 2.0 client.

#### OAuth Endpoints

| Endpoint | URL |
|----------|-----|
| Authorize | `https://vistasocial.com/api/oauth/authorize` |
| Token | `https://vistasocial.com/api/oauth/token` |
| Who Am I (Debug) | `https://vistasocial.com/api/oauth/me` |

---

## OAuth 2.0 Authorization Code Flow (PKCE S256)

### Step 1: Redirect User to Authorize

```
GET https://vistasocial.com/api/oauth/authorize
```

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `response_type` | Yes | Must be `code` |
| `client_id` | Yes | Your OAuth client ID |
| `redirect_uri` | Yes | Must match one of the client's allowed redirect URIs |
| `scope` | No | Space-delimited scopes |
| `state` | Recommended | Opaque value returned back unchanged (prevents CSRF) |
| `code_challenge` | Yes* | PKCE challenge (*required by many clients) |
| `code_challenge_method` | Yes* | Must be `S256` |
| `resource` | No | Optional resource indicator (e.g., your MCP server URL) |

### Step 2: Authorization Redirect Response

After the user signs in and approves, Vista Social redirects back to `redirect_uri` with:

| Parameter | Description |
|-----------|-------------|
| `code` | Authorization code to exchange for tokens |
| `state` | The state value if provided in Step 1 |

### Step 3: Exchange Code for Tokens (PKCE)

```
POST https://vistasocial.com/api/oauth/token
```

**Headers:**
```
Content-Type: application/x-www-form-urlencoded
```

**Client Authentication:** Either Basic Auth or `client_id`/`client_secret` in body

**Body Parameters (x-www-form-urlencoded):**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `grant_type` | Yes | Must be `authorization_code` |
| `code` | Yes | Authorization code from Step 2 |
| `redirect_uri` | Yes | Must match what was used in Step 1 |
| `code_verifier` | Yes* | PKCE verifier (*required when PKCE was used) |
| `resource` | No | If provided, must match what was authorized |

---

## Refresh Token Flow

```
POST https://vistasocial.com/api/oauth/token
```

**Body Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `grant_type` | Yes | Must be `refresh_token` |
| `refresh_token` | Yes | Refresh token previously issued |

---

## Token Format Notes

- Tokens are **opaque strings** (not JWTs)
- Access tokens are prefixed with `tk_`
- Refresh tokens are prefixed with `rt_`
- PKCE S256 is supported and enforced when `code_challenge` is used during authorization
- `state` is returned back unchanged and should be used to prevent CSRF and correlate requests
- `redirect_uri` must match the client's allowed redirect URIs

---

## SDK & Code Examples

The Vista Social API documentation (hosted on Postman) provides code examples in multiple languages:

- **C#** (HttpClient, RestSharp)
- **cURL**
- **Dart** (http)
- **Go** (Native)
- **Java** (OkHttp, Unirest)
- **JavaScript** (Fetch, jQuery, XHR)
- **Node.js** (Axios, Native, Request, Unirest)
- **Objective-C** (NSURLSession)
- **OCaml** (Cohttp)
- **PHP** (cURL, Guzzle, HTTP_Request2, pecl_http)
- **PowerShell** (RestMethod)
- **Python** (http.client, Requests)
- **R** (httr, RCurl)
- **Ruby** (Net::HTTP)
- **Shell** (Httpie, wget)
- **Swift** (URLSession)

---

## Quick Start Checklist

1. [ ] Contact Vista Social account representative to provision API access
2. [ ] Review and agree to [Developer Terms](https://vistasocial.com/api-terms-of-service/)
3. [ ] Choose authentication method:
   - **API Key:** Generate in Settings > Integrations
   - **OAuth 2.0:** Contact support for client setup
4. [ ] Test authentication using the `/api/oauth/me` endpoint (for OAuth)
5. [ ] Begin integrating with available endpoints

---

## Integration Considerations

### Rate Limiting
Check the API documentation for current rate limit policies. Implement exponential backoff for retry logic.

### Error Handling
Implement proper error handling for:
- Authentication failures (401)
- Rate limiting (429)
- Server errors (5xx)

### Data Freshness
Profile and post data matches what's available in Vista Social reports. Consider caching strategies based on your reporting needs.

---

## Related Resources

- **API Documentation:** https://apidocs.vistasocial.com/
- **Developer Terms:** https://vistasocial.com/api-terms-of-service/
- **Vista Social Main Site:** https://vistasocial.com/

---

*Last Updated: January 2026*
