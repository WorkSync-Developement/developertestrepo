# Vista Social API - Profiles & Groups Endpoints

> **Base URL:** `https://vistasocial.com/api/integration/`  
> **Authentication:** API Key (header: `api-key`)

---

## 1. Get Profiles

Retrieve all connected social profiles.

### Request

```
GET https://vistasocial.com/api/integration/profiles
```

### Headers

| Header | Value | Required |
|--------|-------|----------|
| `api-key` | Your API key | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | No | Optional name of the profile to filter |
| `group_id` | string | No | Optional group ID to filter profiles |

### Example Request

```bash
curl --location 'https://vistasocial.com/api/integration/profiles' \
  --header 'api-key: YOUR_API_KEY'
```

### Example Response (200 OK)

```json
[
  {
    "id": 296909191199,
    "name": "Vista",
    "network": "Facebook"
  },
  {
    "id": 233019103131,
    "name": "Vista",
    "network": "LinkedIn"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique profile identifier |
| `name` | string | Profile display name |
| `network` | string | Social network (e.g., `Facebook`, `LinkedIn`, `Instagram`) |

---

## 2. Get Groups

Retrieve all profile groups.

### Request

```
GET https://vistasocial.com/api/integration/groups
```

### Headers

| Header | Value | Required |
|--------|-------|----------|
| `api-key` | Your API key | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | No | Optional name of the group to filter |

### Example Request

```bash
curl --location 'https://vistasocial.com/api/integration/groups' \
  --header 'api-key: YOUR_API_KEY'
```

### Example Response (200 OK)

```json
[
  {
    "id": "32d28f80-9a3f-11ec-bf56-259a4e8b1b33",
    "name": "Client",
    "type": "CLIENT"
  },
  {
    "id": "476ec8e0-ad6c-11ee-8abb-dde18c739062",
    "name": "Project",
    "type": "PROJECT"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique group identifier (UUID) |
| `name` | string | Group display name |
| `type` | string | Group type: `CLIENT` or `PROJECT` |

---

## TypeScript Types

```typescript
interface Profile {
  id: number;
  name: string;
  network: string;
}

interface Group {
  id: string;
  name: string;
  type: 'CLIENT' | 'PROJECT';
}

// API Response Types
type GetProfilesResponse = Profile[];
type GetGroupsResponse = Group[];
```

---

## Usage Examples

### Fetch All Profiles

```typescript
async function getProfiles(apiKey: string): Promise<Profile[]> {
  const response = await fetch(
    'https://vistasocial.com/api/integration/profiles',
    {
      headers: {
        'api-key': apiKey
      }
    }
  );
  return response.json();
}
```

### Fetch Profiles by Group

```typescript
async function getProfilesByGroup(apiKey: string, groupId: string): Promise<Profile[]> {
  const response = await fetch(
    `https://vistasocial.com/api/integration/profiles?group_id=${groupId}`,
    {
      headers: {
        'api-key': apiKey
      }
    }
  );
  return response.json();
}
```

### Fetch All Groups

```typescript
async function getGroups(apiKey: string): Promise<Group[]> {
  const response = await fetch(
    'https://vistasocial.com/api/integration/groups',
    {
      headers: {
        'api-key': apiKey
      }
    }
  );
  return response.json();
}
```
