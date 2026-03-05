---
title: Authentication
description: Login, register, refresh token, and API tokens for the AutoVio API.
---

# Authentication

AutoVio supports **JWT** (for the web app) and **API tokens** (for scripts, MCP, and integrations).

## Register

**POST** `/api/auth/register`

Create a new user account.

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "min 8 characters",
  "name": "Display Name"
}
```

**Response:** `{ user: User, accessToken: string, refreshToken: string }`

---

## Login

**POST** `/api/auth/login`

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Response:** `{ user: User, accessToken: string, refreshToken: string }`

Use `accessToken` in the `Authorization` header: `Bearer <accessToken>`.

---

## Refresh

**POST** `/api/auth/refresh`

**Request body:**

```json
{
  "refreshToken": "<refreshToken>"
}
```

**Response:** `{ accessToken: string, refreshToken: string }`

Use when the access token expires. Refresh tokens have a longer lifetime (e.g. 30 days).

---

## Me

**GET** `/api/auth/me`

**Headers:** `Authorization: Bearer <accessToken>`

**Response:** Current user object (id, email, name, etc.).

---

## API tokens

For programmatic access (MCP, n8n, scripts), create an **API token** so you don’t use a user password.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tokens` | List your API tokens (requires auth). |
| POST | `/api/tokens` | Create a new token. |
| DELETE | `/api/tokens/:id` | Revoke a token. |

**Create token (POST /api/tokens)**

**Request body:**

```json
{
  "name": "MCP Server",
  "scopes": ["projects:read", "projects:write", "works:read", "works:write", "ai:analyze", "ai:generate"],
  "expiresInDays": 90
}
```

**Response:** `{ token: string, meta: APITokenMeta }`. Store the `token` once; it is not shown again.

**Scopes:** `projects:read`, `projects:write`, `works:read`, `works:write`, `ai:analyze`, `ai:generate`. Use the minimum required for your use case.

Use the token as: `Authorization: Bearer <token>`.

## See also

- [API Overview](/api/overview/)
- [MCP Setup](/mcp/setup/) — Using a token with the MCP server
