---
title: n8n Integration
description: Trigger AutoVio API workflows from n8n using HTTP Request nodes and API tokens.
---

# n8n Integration

You can call the **AutoVio REST API** from n8n to automate video creation workflows (e.g. on webhook, schedule, or form submission).

## Prerequisites

- AutoVio is running (backend on `http://localhost:3001` or your base URL).
- You have an **API token** with the required scopes (see [Authentication](/api/authentication/)).

## Create an API token

Use the UI or call `POST /api/tokens` to create a token:

```json
{
  "name": "n8n workflow",
  "scopes": ["projects:read", "projects:write", "works:read", "works:write", "ai:analyze", "ai:generate"],
  "expiresInDays": 90
}
```

Use the returned `token` in the `Authorization` header:

```text
Authorization: Bearer <token>
```

## Example flow – create project and work

In n8n, you typically use **HTTP Request** nodes to call the API.

### 1. Create project (HTTP Request)

- Method: `POST`
- URL: `{{ $env.AUTOVIO_BASE_URL }}/api/projects`
- Headers:
  - `Authorization: Bearer {{ $env.AUTOVIO_API_TOKEN }}`
  - `Content-Type: application/json`
- Body (JSON):

```json
{
  "name": "n8n Demo Project",
  "styleGuide": {
    "tone": "professional",
    "tempo": "medium"
  }
}
```

Store the response `id` (e.g. using n8n expressions) as `projectId`.

### 2. Create work (HTTP Request)

- Method: `POST`
- URL: `{{ $env.AUTOVIO_BASE_URL }}/api/projects/{{ $json.projectId }}/works`
- Headers: same as above.
- Body (JSON):

```json
{
  "name": "n8n Demo Work",
  "mode": "content_remix",
  "productName": "EcoBottle",
  "sceneCount": 5,
  "videoDuration": 30
}
```

Store the `workId` from the response for later steps.

## Example flow – generate scenario and scenes

### 1. Generate scenario for work

Call `POST /api/projects/:projectId/works/:workId/scenario` with headers:

- `Authorization: Bearer <token>`
- `x-llm-provider`, `x-model-id`, `x-api-key` as described in [AI Endpoints](/api/ai-endpoints/).

This updates `work.scenes` and returns the generated scenes.

### 2. Generate image+video per scene

For each `sceneIndex` (0-based), call:

- `POST /api/projects/:projectId/works/:workId/generate/scene/:sceneIndex`

with:

- `Authorization: Bearer <token>`
- `x-api-key` and provider headers for image/video.

The response includes `imageUrl` and `videoUrl` for that scene.

## Tips

- Use n8n **environment variables** (`$env.AUTOVIO_BASE_URL`, `$env.AUTOVIO_API_TOKEN`) so you don’t hardcode secrets in nodes.
- Use **Set** and **Function** nodes to map incoming data (e.g. webhook payload) into product name, description, or target audience before calling the API.

## See also

- [API Overview](/api/overview/)
- [Works API](/api/works/)
- [AI Endpoints](/api/ai-endpoints/)

