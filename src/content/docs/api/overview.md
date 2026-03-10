---
title: API Overview
description: AutoVio REST API. Authentication, base URL, and main endpoint groups.
---

# API Overview

The AutoVio backend exposes a **REST API** under `/api`. You can use it to manage projects, works, run the video pipeline (analyze, scenario, generate, export), and manage assets and templates.

## Base URL

When running locally: `http://localhost:3001`. All endpoints are prefixed with `/api`.

## Authentication

Most endpoints require authentication:

- **Web UI**: Uses **JWT** (access token from login/register). The frontend sends `Authorization: Bearer <accessToken>`.
- **API tokens**: For server-to-server or MCP, create an **API token** in the UI (or via `POST /api/tokens`) with scopes (e.g. `projects:read`, `works:write`, `ai:generate`). Send it as `Authorization: Bearer <token>`.

See [Authentication](../api/authentication/) for login, register, refresh, and token scopes.

## Provider headers (AI endpoints)

For analyze, scenario, and generate endpoints, the client tells the backend which AI provider and key to use via headers:

| Header | Used by | Example |
|--------|--------|---------|
| `x-vision-provider` | Analyze | gemini, claude, openai |
| `x-llm-provider` | Scenario | gemini, claude, openai |
| `x-image-provider` | Generate image | gemini, dalle |
| `x-video-provider` | Generate video | gemini, runway |
| `x-model-id` | Optional model | e.g. gemini-2.0-flash-exp |
| `x-api-key` | Provider API key | (key for the chosen provider) |

The backend forwards the key to the external provider; it does not store provider keys in env.

## Main endpoint groups

| Group | Description |
|-------|-------------|
| [Authentication](../api/authentication/) | Register, login, refresh, me |
| [Projects](../api/projects/) | CRUD projects |
| [Works](../api/works/) | CRUD works, media (reference, scene image/video) |
| [AI Endpoints](../api/ai-endpoints/) | Analyze, scenario, generate image/video, export |
| [Templates](../api/templates/) | List, create, get, update, delete, apply templates |
| [Assets](../api/assets/) | List, upload, get, update, delete project assets |
| [Providers](../api/providers/) | List available AI providers (no auth) |

## OpenAPI

When the backend is running, OpenAPI documentation is available at `/api/docs` (Swagger UI or equivalent). Use it for exact request/response schemas and examples.

## See also

- [Authentication](../api/authentication/)
- [Projects](../api/projects/), [Works](../api/works/), [AI Endpoints](../api/ai-endpoints/)
