# Vista Social API - Analytics Endpoints (Premium)

> **Base URL:** `https://vistasocial.com/api/integration/`  
> **Authentication:** API Key (header: `api-key`)  
> **Note:** These are **Premium API endpoints** requiring account provisioning.

---

## 1. Get Daily Performance

Retrieve daily performance data for profiles.

### Request

```
GET https://vistasocial.com/api/integration/data/daily
```

### Headers

| Header | Value | Required |
|--------|-------|----------|
| `api-key` | Your API key | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date_from` | string | Yes | Start date in `YYYYMMDD` format |
| `date_to` | string | Yes | End date in `YYYYMMDD` format |
| `profile_id` | string | Conditional | Required if `group_id` is not specified |
| `group_id` | string | Conditional | Required if `profile_id` is not specified |

### Example Request

```bash
curl --location 'https://vistasocial.com/api/integration/data/daily?date_from=20250301&date_to=20250325&profile_id=36' \
  --header 'api-key: YOUR_API_KEY'
```

### Example Response (200 OK)

```json
[
  {
    "id": "67d40a05c003684424af0967",
    "date": "20250301",
    "profile": "profile name",
    "network": "facebook",
    "engagement": 0,
    "followers": 2,
    "stories": 0
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique record identifier |
| `date` | string | Date in `YYYYMMDD` format |
| `profile` | string | Profile name |
| `network` | string | Social network |
| `engagement` | number | Daily engagement count |
| `followers` | number | Follower count |
| `stories` | number | Stories count |

---

## 2. Get Post Performance

Retrieve daily post performance data matching Vista Social's Post Performance Report.

### Request

```
GET https://vistasocial.com/api/integration/data/posts
```

### Headers

| Header | Value | Required |
|--------|-------|----------|
| `api-key` | Your API key | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date_from` | string | Yes | Start date in `YYYYMMDD` format |
| `date_to` | string | Yes | End date in `YYYYMMDD` format |
| `profile_id` | string | Conditional | Required if `group_id` is not specified |
| `group_id` | string | Conditional | Required if `profile_id` is not specified |

### Example Request

```bash
curl --location 'https://vistasocial.com/api/integration/data/posts?date_from=20250301&date_to=20250325&profile_id=36' \
  --header 'api-key: YOUR_API_KEY'
```

### Example Response (200 OK)

```json
[
  {
    "id": "385540005404700_997550272478908",
    "date": "March 5, 2025",
    "time": "4:32 PM",
    "timezone": "Europe/London",
    "status": "PUBLISHED",
    "message": "Awesome!",
    "labels": "",
    "published_link": "https://facebook.com/385540005404700_997550272478908",
    "profile": "Pagename",
    "network": "facebook",
    "profile_link": "https://facebook.com/385540005404700",
    "impressions": 1000,
    "impressions_paid": 800,
    "impressions_organic": 200,
    "likes": 250,
    "dislikes": 2,
    "comments": 12,
    "shares": 10,
    "retweets": 15,
    "quotes": 12,
    "engagement": 0,
    "engagement_organic": 10,
    "engagement_paid": 12,
    "clicks": 5,
    "views": 5,
    "plays": 5
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique post identifier |
| `date` | string | Publication date (human-readable) |
| `time` | string | Publication time |
| `timezone` | string | Timezone of the post |
| `status` | string | Post status (e.g., `PUBLISHED`) |
| `message` | string | Post content/caption |
| `labels` | string | Associated labels |
| `published_link` | string | URL to the published post |
| `profile` | string | Profile name |
| `network` | string | Social network (e.g., `facebook`, `instagram`) |
| `profile_link` | string | URL to the profile |
| `impressions` | number | Total impressions |
| `impressions_paid` | number | Paid impressions |
| `impressions_organic` | number | Organic impressions |
| `likes` | number | Like count |
| `dislikes` | number | Dislike count |
| `comments` | number | Comment count |
| `shares` | number | Share count |
| `retweets` | number | Retweet count |
| `quotes` | number | Quote count |
| `engagement` | number | Total engagement |
| `engagement_organic` | number | Organic engagement |
| `engagement_paid` | number | Paid engagement |
| `clicks` | number | Click count |
| `views` | number | View count |
| `plays` | number | Play count (video) |

---

## TypeScript Types

```typescript
// Daily performance data
interface DailyPerformance {
  id: string;
  date: string;
  profile: string;
  network: string;
  engagement: number;
  followers: number;
  stories: number;
}

// Post performance data
interface PostPerformance {
  id: string;
  date: string;
  time: string;
  timezone: string;
  status: string;
  message: string;
  labels: string;
  published_link: string;
  profile: string;
  network: string;
  profile_link: string;
  impressions: number;
  impressions_paid: number;
  impressions_organic: number;
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
  retweets: number;
  quotes: number;
  engagement: number;
  engagement_organic: number;
  engagement_paid: number;
  clicks: number;
  views: number;
  plays: number;
}

// Query parameters for analytics endpoints
interface AnalyticsQueryParams {
  date_from: string; // YYYYMMDD format
  date_to: string;   // YYYYMMDD format
  profile_id?: string;
  group_id?: string;
}

// API Response Types
type GetDailyPerformanceResponse = DailyPerformance[];
type GetPostPerformanceResponse = PostPerformance[];
```

---

## Usage Examples

### Get Daily Performance for Date Range

```typescript
async function getDailyPerformance(
  apiKey: string,
  dateFrom: string,
  dateTo: string,
  profileId: string
): Promise<DailyPerformance[]> {
  const params = new URLSearchParams({
    date_from: dateFrom,
    date_to: dateTo,
    profile_id: profileId
  });
  
  const response = await fetch(
    `https://vistasocial.com/api/integration/data/daily?${params}`,
    {
      headers: {
        'api-key': apiKey
      }
    }
  );
  return response.json();
}
```

### Get Post Performance

```typescript
async function getPostPerformance(
  apiKey: string,
  dateFrom: string,
  dateTo: string,
  profileId: string
): Promise<PostPerformance[]> {
  const params = new URLSearchParams({
    date_from: dateFrom,
    date_to: dateTo,
    profile_id: profileId
  });
  
  const response = await fetch(
    `https://vistasocial.com/api/integration/data/posts?${params}`,
    {
      headers: {
        'api-key': apiKey
      }
    }
  );
  return response.json();
}
```

### Calculate Total Engagement

```typescript
async function getTotalEngagement(
  apiKey: string,
  dateFrom: string,
  dateTo: string,
  profileId: string
): Promise<number> {
  const posts = await getPostPerformance(apiKey, dateFrom, dateTo, profileId);
  return posts.reduce((sum, post) => sum + post.engagement, 0);
}
```

### Get Performance by Group

```typescript
async function getGroupPerformance(
  apiKey: string,
  dateFrom: string,
  dateTo: string,
  groupId: string
): Promise<DailyPerformance[]> {
  const params = new URLSearchParams({
    date_from: dateFrom,
    date_to: dateTo,
    group_id: groupId
  });
  
  const response = await fetch(
    `https://vistasocial.com/api/integration/data/daily?${params}`,
    {
      headers: {
        'api-key': apiKey
      }
    }
  );
  return response.json();
}
```
