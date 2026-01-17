# Vista Social API - Posts Endpoints

> **Base URL:** `https://vistasocial.com/api/integration/`  
> **Authentication:** API Key (header: `api-key`)

---

## 1. Get Posts

Retrieve all scheduled, published, draft, or failed posts.

### Request

```
GET https://vistasocial.com/api/integration/posts
```

### Headers

| Header | Value | Required |
|--------|-------|----------|
| `api-key` | Your API key | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Post status: `published`, `scheduled`, `draft`, or `failed` |
| `id` | string | No | Optional specific post ID |

### Example Request

```bash
curl --location 'https://vistasocial.com/api/integration/posts?status=published' \
  --header 'api-key: YOUR_API_KEY'
```

### Example Response (200 OK)

```json
[
  {
    "id": "67e264e28882f2b01a79bd01",
    "author": {
      "name": "Mike Dossa",
      "email": "mike@someemail.com"
    },
    "message": "Hello world",
    "publish_at": "2025-03-24T21:10:10-11:00",
    "timezone": "Pacific/Pago_Pago",
    "profile": {
      "name": "Mike Dossa"
    }
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique post identifier |
| `author` | object | Author information |
| `author.name` | string | Author's display name |
| `author.email` | string | Author's email |
| `message` | string | Post content/caption |
| `publish_at` | string | Scheduled/published datetime (ISO 8601) |
| `timezone` | string | Timezone of the post |
| `profile` | object | Profile information |
| `profile.name` | string | Profile name |

---

## 2. Create Post

Create and schedule a new post to connected profiles.

### Request

```
POST https://vistasocial.com/api/integration/posts
```

### Headers

| Header | Value | Required |
|--------|-------|----------|
| `api-key` | Your API key | Yes |
| `Content-Type` | `application/json` | Yes |

### Request Body

```json
{
  "message": "Hello world",
  "profile_id": [7],
  "publish_at": "now",
  "media_url": ["https://example.com/media/video.mp4"]
}
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | string | Conditional | Post message. Required if `media_url` is not specified |
| `profile_id` | number[] | Yes | Array of profile IDs where the post will be scheduled |
| `publish_at` | string | Yes | Publish date (see values below) |
| `media_url` | string[] | No | Array of media URLs |
| `draft` | boolean | No | Save post as draft (`true` or `false`) |
| `comments` | string[] | No | Up to 10 comments. Array of strings |
| `like` | boolean | No | Auto-like the post (`true` or `false`) |
| `labels` | string[] | No | Array of post labels |

### `publish_at` Values

| Value | Description |
|-------|-------------|
| `now` | Publish immediately |
| `queue_next` | Add to queue as next post |
| `queue_last` | Add to queue as last post |
| `2025-02-08 09:30` | ISO 8601 formatted date |
| `1707388200` | Unix timestamp |

### Platform-Specific Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `facebook_publish_as` | string | `REELS`, `STORY`, `VIDEO`, `IMAGE` |
| `instagram_publish_as` | string | `REELS`, `STORY`, `FEED` |
| `instagram_collaborators` | string[] | Array of usernames (public profiles only) |
| `snapchat_publish_as` | string | `STORY`, `SAVED_STORY`, `SPOTLIGHT` |
| `pinterest_board_name` | string | Name of the Pinterest board |
| `pinterest_section_name` | string | Name of the Pinterest board section |
| `subreddit_name` | string | Name of subreddit |
| `youtube_title` | string | YouTube video title |
| `youtube_category` | string | YouTube category |
| `tags` | string[] | YouTube video tags |

### Example Request

```bash
curl --location 'https://vistasocial.com/api/integration/posts' \
  --header 'api-key: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "message": "Hello world",
    "profile_id": [7],
    "publish_at": "now",
    "media_url": ["https://example.com/media/video.mp4"]
  }'
```

### Example Response (200 OK)

```json
{
  "id": [
    "67e67dd9f45f192980ecb96a"
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string[] | Array of created post IDs |

---

## 3. Get Comments

Retrieve all Vista Social comments for a given post.

### Request

```
GET https://vistasocial.com/api/integration/comments
```

### Headers

| Header | Value | Required |
|--------|-------|----------|
| `api-key` | Your API key | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `post_id` | string | Yes | The post ID to get comments for |

### Example Request

```bash
curl --location 'https://vistasocial.com/api/integration/comments?post_id=67d21830566885abd9124df9' \
  --header 'api-key: YOUR_API_KEY'
```

### Example Response (200 OK)

```json
[
  {
    "id": "67e3b1a44c94cce0b54d6e4e",
    "link": "https://vistasocial.com/calendar?id=67d21830566885abd9124df9",
    "message": "awesome",
    "created_at": "2025-03-26T07:49:56.519Z",
    "user": {
      "email": "mike@someemail.com",
      "first_name": "Mike",
      "last_name": "Dossa",
      "picture": "https://dc4ifv9abstiv.cloudfront.net/user/46afa183-5211-11ec-902a-0a6cb397b46f.png"
    }
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique comment identifier |
| `link` | string | Link to the comment in Vista Social |
| `message` | string | Comment content |
| `created_at` | string | ISO 8601 timestamp when comment was created |
| `user` | object | User who made the comment |
| `user.email` | string | User's email |
| `user.first_name` | string | User's first name |
| `user.last_name` | string | User's last name |
| `user.picture` | string | User's profile picture URL |

---

## TypeScript Types

```typescript
// Author information
interface PostAuthor {
  name: string;
  email: string;
}

// Profile information in post response
interface PostProfile {
  name: string;
}

// Post response from GET /posts
interface Post {
  id: string;
  author: PostAuthor;
  message: string;
  publish_at: string;
  timezone: string;
  profile: PostProfile;
}

// Create post request body
interface CreatePostRequest {
  message?: string;
  profile_id: number[];
  publish_at: string | 'now' | 'queue_next' | 'queue_last';
  media_url?: string[];
  draft?: boolean;
  comments?: string[];
  like?: boolean;
  labels?: string[];
  // Platform-specific
  facebook_publish_as?: 'REELS' | 'STORY' | 'VIDEO' | 'IMAGE';
  instagram_publish_as?: 'REELS' | 'STORY' | 'FEED';
  instagram_collaborators?: string[];
  snapchat_publish_as?: 'STORY' | 'SAVED_STORY' | 'SPOTLIGHT';
  pinterest_board_name?: string;
  pinterest_section_name?: string;
  subreddit_name?: string;
  youtube_title?: string;
  youtube_category?: string;
  tags?: string[];
}

// Create post response
interface CreatePostResponse {
  id: string[];
}

// Comment user
interface CommentUser {
  email: string;
  first_name: string;
  last_name: string;
  picture: string;
}

// Comment response
interface Comment {
  id: string;
  link: string;
  message: string;
  created_at: string;
  user: CommentUser;
}

// API Response Types
type GetPostsResponse = Post[];
type GetCommentsResponse = Comment[];
```

---

## Usage Examples

### Get Published Posts

```typescript
async function getPublishedPosts(apiKey: string): Promise<Post[]> {
  const response = await fetch(
    'https://vistasocial.com/api/integration/posts?status=published',
    {
      headers: {
        'api-key': apiKey
      }
    }
  );
  return response.json();
}
```

### Schedule a Post

```typescript
async function schedulePost(
  apiKey: string, 
  profileIds: number[], 
  message: string,
  publishAt: string
): Promise<CreatePostResponse> {
  const response = await fetch(
    'https://vistasocial.com/api/integration/posts',
    {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        profile_id: profileIds,
        publish_at: publishAt
      })
    }
  );
  return response.json();
}
```

### Post with Media

```typescript
async function postWithMedia(
  apiKey: string,
  profileIds: number[],
  message: string,
  mediaUrls: string[]
): Promise<CreatePostResponse> {
  const response = await fetch(
    'https://vistasocial.com/api/integration/posts',
    {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        profile_id: profileIds,
        publish_at: 'now',
        media_url: mediaUrls
      })
    }
  );
  return response.json();
}
```

### Get Comments for a Post

```typescript
async function getPostComments(apiKey: string, postId: string): Promise<Comment[]> {
  const response = await fetch(
    `https://vistasocial.com/api/integration/comments?post_id=${postId}`,
    {
      headers: {
        'api-key': apiKey
      }
    }
  );
  return response.json();
}
```
