---
title: Projects API
description: Create and manage projects. CRUD and project settings.
---

# Projects API

Projects are the top-level container for style guide, prompts, assets, and works.

## Endpoints

| Method | Endpoint | Auth | Scope | Description |
|--------|----------|------|-------|-------------|
| GET | `/api/projects` | Yes | projects:read | List all projects for the current user. |
| GET | `/api/projects/:id` | Yes | projects:read | Get project by ID (full details). |
| POST | `/api/projects` | Yes | projects:write | Create project. |
| PUT | `/api/projects/:id` | Yes | projects:write | Update project. |
| DELETE | `/api/projects/:id` | Yes | projects:write | Delete project and all its works, templates, assets. |

## Project object

| Field | Type | Description |
|-------|------|-------------|
| id | string | Project ID. |
| userId | string | Owner user ID. |
| name | string | Project name. |
| systemPrompt | string | Default scenario system prompt. |
| knowledge | string | Extra context for LLM. |
| styleGuide | object | Optional StyleGuide (tone, color_palette, tempo, camera_style, brand_voice, must_include, must_avoid). |
| analyzerPrompt | string | Optional analyzer prompt override. |
| imageSystemPrompt | string | Optional image instruction override. |
| videoSystemPrompt | string | Optional video instruction override. |
| createdAt | number | Unix timestamp. |
| updatedAt | number | Unix timestamp. |

## Create project (POST /api/projects)

**Request body:**

```json
{
  "name": "My Project",
  "systemPrompt": "...",
  "knowledge": "",
  "styleGuide": { "tone": "professional", "color_palette": ["#333"] }
}
```

Only `name` is required. Other fields get defaults (e.g. shared default prompts) if omitted.

**Response:** Full project object with `id`, `createdAt`, `updatedAt`.

## Update project (PUT /api/projects/:id)

Send the fields you want to change (e.g. `name`, `styleGuide`, `systemPrompt`). Unset optional fields can be omitted or set to null depending on API contract.

## See also

- [Concepts: Projects & Works](../concepts/projects-and-works/)
- [Assets](../api/assets/), [Templates](../api/templates/)
