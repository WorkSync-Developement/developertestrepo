# Vista Social API - Inbox Endpoints (Premium)

> **Base URL:** `https://vistasocial.com/api/integration/`  
> **Authentication:** API Key (header: `api-key`)  
> **Note:** These are **Premium API endpoints** requiring account provisioning.

---

## 1. Get Inbox

Retrieve items from your inbox such as comments and messages.

### Request

```
GET https://vistasocial.com/api/integration/inbox
```

### Headers

| Header | Value | Required |
|--------|-------|----------|
| `api-key` | Your API key | Yes |
| `Content-Type` | `application/json` | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `profile_id` | string | No | Comma-delimited list of profile IDs |
| `type` | string | No | Comma-delimited list of types: `comment`, `mention`, `message`, `share` |

### Example Request

```bash
curl --location 'https://vistasocial.com/api/integration/inbox?profile_id=17&type=comment,message' \
  --header 'api-key: YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```

### Example Response (200 OK)

```json
[
  {
    "id": "18078359080972895",
    "url": "https://www.instagram.com/reel/DOLfYykE-1M/",
    "network": "instagram",
    "message": "And then 5 more to go after that 😂",
    "type": "comment",
    "acknowledged": false,
    "starred": false,
    "dark": false,
    "sentiment": {
      "name": "positive",
      "value": 7,
      "reason": "The message expresses humor and enthusiasm.",
      "specifics": "The use of '😂' indicates amusement and a light-hearted tone about completing tasks."
    },
    "parent": {
      "url": "https://www.instagram.com/reel/DOLfYykE-1M/",
      "message": "Sure, let's spend more time talking about work instead of doing it\nㅤ\n#marketinghumor #marketingmemes #digitalmarketing #socialmediamanager #socialmediamanagerlife #socialmediamarketing",
      "type": "post"
    },
    "user": {
      "name": "Dani | Organic Instagram Growth 🚀",
      "username": "wheeler_marketing_agency",
      "picture_url": "https://dc4ifv9abstiv.cloudfront.net/inbox/instagram/6262b4c66def065638635e3f.jpg?v=1757086258364"
    },
    "received": "2025-09-05T15:30:57.000Z",
    "profile_id": 17
  },
  {
    "id": "aWdfZAG1faXRlbToxOklHTWVzc2FnZAUlEOjE3ODQxNDQ4OTYyMzE0NDc0OjM0MDI4MjM2Njg0MTcxMDMwMTI0NDI3NjIyOTMyMTkyNjcxOTA1NDozMjQxMTkxNTI2MTc5NjY4MjE2NTAzNDMyNzYxMjU4ODAzMgZDZD",
    "network": "instagram",
    "message": "Hi Team,\nI know things can get busy so just circling back on your Digital Marketing Manager role. If it helps, I can share a couple of quick process tweaks, like lightweight AI-assisted reporting dashboards, that save time and make performance insights clearer for clients. I've seen this kind of shift free up teams to focus on higher-value strategy work. Even if you're not ready to move forward, you would still walk away with a few practical ideas to test.",
    "type": "message",
    "acknowledged": false,
    "starred": false,
    "sentiment": {
      "name": "positive",
      "value": 6,
      "reason": "Supportive communication with an offer to help",
      "specifics": "Willingness to provide assistance with process tweaks for the role"
    },
    "user": {
      "name": "Mohd Farhan | Business And Marketing",
      "username": "gallantfarhan",
      "picture_url": "https://dc4ifv9abstiv.cloudfront.net/inbox/instagram/68b59b13f9622cff850672e1.jpg?v=1757053448262"
    },
    "received": "2025-09-05T06:24:07.062Z",
    "profile_id": 17
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique inbox item identifier |
| `url` | string | URL to the original content |
| `network` | string | Social network (e.g., `instagram`, `facebook`) |
| `message` | string | Content of the comment/message |
| `type` | string | Item type: `comment`, `mention`, `message`, `share` |
| `acknowledged` | boolean | Whether item has been acknowledged |
| `starred` | boolean | Whether item is starred |
| `dark` | boolean | Dark mode flag |
| `sentiment` | object | AI-analyzed sentiment data |
| `sentiment.name` | string | Sentiment category: `positive`, `negative`, `neutral` |
| `sentiment.value` | number | Sentiment score (1-10) |
| `sentiment.reason` | string | Explanation of sentiment |
| `sentiment.specifics` | string | Detailed sentiment analysis |
| `parent` | object | Parent post information (for comments) |
| `parent.url` | string | URL to parent post |
| `parent.message` | string | Parent post content |
| `parent.type` | string | Parent type (e.g., `post`) |
| `user` | object | User who sent the item |
| `user.name` | string | User's display name |
| `user.username` | string | User's username/handle |
| `user.picture_url` | string | User's profile picture URL |
| `received` | string | ISO 8601 timestamp when received |
| `profile_id` | number | Associated profile ID |

---

## 2. Reply to Inbox Item

Reply to an inbox item such as a comment or message.

### Request

```
POST https://vistasocial.com/api/integration/reply
```

### Headers

| Header | Value | Required |
|--------|-------|----------|
| `api-key` | Your API key | Yes |
| `Content-Type` | `application/json` | Yes |

### Request Body

```json
{
  "message_id": "68bae68137be9ffd5704ad91",
  "conversation_id": "68bae68137be9ffd5704ad8d",
  "message": "Your reply"
}
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message_id` | string | Yes | ID of the message to reply to |
| `conversation_id` | string | Yes | ID of the conversation thread |
| `message` | string | Yes | Your reply text |

### Example Request

```bash
curl --location 'https://vistasocial.com/api/integration/reply' \
  --header 'api-key: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "message_id": "68bae68137be9ffd5704ad92",
    "conversation_id": "68bae68137be9ffd5704ad8d",
    "message": "Your reply"
  }'
```

### Example Response (200 OK)

```json
{
  "inbox_id": "68bc1072e3ab07e2ca3e206a",
  "conversation_id": "68bae68137be9ffd5704ad8d",
  "url": "https://www.linkedin.com/feed/update/urn:li:activity:7369719861469528064/?commentUrn=urn%3Ali%3Acomment%3A(7369724175290224641%2C7370044101024714752)"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `inbox_id` | string | ID of the created inbox item |
| `conversation_id` | string | ID of the conversation thread |
| `url` | string | URL to the published reply |

---

## TypeScript Types

```typescript
// Sentiment analysis
interface Sentiment {
  name: 'positive' | 'negative' | 'neutral';
  value: number;
  reason: string;
  specifics: string;
}

// User who sent the inbox item
interface InboxUser {
  name: string;
  username: string;
  picture_url: string;
}

// Parent post (for comments)
interface InboxParent {
  url: string;
  message: string;
  type: string;
}

// Inbox item types
type InboxItemType = 'comment' | 'mention' | 'message' | 'share';

// Inbox item
interface InboxItem {
  id: string;
  url?: string;
  network: string;
  message: string;
  type: InboxItemType;
  acknowledged: boolean;
  starred: boolean;
  dark: boolean;
  sentiment: Sentiment;
  parent?: InboxParent;
  user: InboxUser;
  received: string;
  profile_id: number;
}

// Reply request body
interface ReplyRequest {
  message_id: string;
  conversation_id: string;
  message: string;
}

// Reply response
interface ReplyResponse {
  inbox_id: string;
  conversation_id: string;
  url: string;
}

// API Response Types
type GetInboxResponse = InboxItem[];
```

---

## Usage Examples

### Get All Inbox Items

```typescript
async function getInbox(apiKey: string): Promise<InboxItem[]> {
  const response = await fetch(
    'https://vistasocial.com/api/integration/inbox',
    {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.json();
}
```

### Get Comments Only

```typescript
async function getComments(apiKey: string, profileId: number): Promise<InboxItem[]> {
  const params = new URLSearchParams({
    profile_id: profileId.toString(),
    type: 'comment'
  });
  
  const response = await fetch(
    `https://vistasocial.com/api/integration/inbox?${params}`,
    {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.json();
}
```

### Get Unacknowledged Items

```typescript
async function getUnacknowledgedItems(apiKey: string): Promise<InboxItem[]> {
  const items = await getInbox(apiKey);
  return items.filter(item => !item.acknowledged);
}
```

### Filter by Sentiment

```typescript
async function getNegativeSentimentItems(apiKey: string): Promise<InboxItem[]> {
  const items = await getInbox(apiKey);
  return items.filter(item => item.sentiment.name === 'negative');
}
```

### Reply to a Message

```typescript
async function replyToMessage(
  apiKey: string,
  messageId: string,
  conversationId: string,
  replyText: string
): Promise<ReplyResponse> {
  const response = await fetch(
    'https://vistasocial.com/api/integration/reply',
    {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message_id: messageId,
        conversation_id: conversationId,
        message: replyText
      })
    }
  );
  return response.json();
}
```

### Auto-Reply to New Comments

```typescript
async function autoReplyToComments(
  apiKey: string,
  replyTemplate: string
): Promise<ReplyResponse[]> {
  const comments = await getComments(apiKey, 17);
  const unacknowledged = comments.filter(c => !c.acknowledged);
  
  const replies: ReplyResponse[] = [];
  for (const comment of unacknowledged) {
    const reply = await replyToMessage(
      apiKey,
      comment.id,
      comment.id, // conversation_id may be same as message_id for comments
      replyTemplate
    );
    replies.push(reply);
  }
  
  return replies;
}
```
