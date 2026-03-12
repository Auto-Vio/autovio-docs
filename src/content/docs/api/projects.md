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
| projectType | string | Project type: `blank`, `saas`, `news`, `social`, `ecommerce`, `educational`. Determines default prompts. |
| systemPrompt | string | Default scenario system prompt. |
| knowledge | string | Extra context for LLM. |
| styleGuide | object | Optional StyleGuide (tone, color_palette, tempo, camera_style, brand_voice, must_include, must_avoid). |
| analyzerPrompt | string | Optional analyzer prompt override. |
| imageSystemPrompt | string | Optional image instruction override. |
| videoSystemPrompt | string | Optional video instruction override. |
| createdAt | number | Unix timestamp. |
| updatedAt | number | Unix timestamp. |

## Project Types

When creating a project, you can specify a `projectType` to start with optimized prompts and style settings:

| Type | Description |
|------|-------------|
| `blank` | Default photorealistic style. Fully customizable. |
| `saas` | SaaS product demos. Modern UI/UX focused, dashboard walkthroughs. |
| `news` | News/media content. Broadcast journalism, documentary style. |
| `social` | Social media/marketing. Engaging, trendy, brand-focused. |
| `ecommerce` | E-commerce products. Product showcases, lifestyle shots. |
| `educational` | Educational/tutorial. Clear instruction, step-by-step guides. |

Each type comes with pre-configured `systemPrompt`, `imageSystemPrompt`, `videoSystemPrompt`, and `styleGuide` optimized for that content type.

## Create project (POST /api/projects)

**Request body:**

```json
{
  "name": "My Project",
  "projectType": "saas",
  "knowledge": "We are building a project management tool..."
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | No | Project name (default: "Yeni Proje"). |
| projectType | string | No | One of: `blank`, `saas`, `news`, `social`, `ecommerce`, `educational`. Default: `blank`. |
| systemPrompt | string | No | Custom scenario prompt (overrides preset). |
| knowledge | string | No | Brand context for AI. |
| styleGuide | object | No | Style settings (overrides preset defaults). |
| imageSystemPrompt | string | No | Custom image instruction (overrides preset). |
| videoSystemPrompt | string | No | Custom video instruction (overrides preset). |

When `projectType` is specified, the project is initialized with optimized prompts and style guide for that content type. You can still override individual fields.

**Response:** Full project object with `id`, `createdAt`, `updatedAt`.

## Update project (PUT /api/projects/:id)

Send the fields you want to change (e.g. `name`, `styleGuide`, `systemPrompt`). Unset optional fields can be omitted or set to null depending on API contract.

## See also

- [Concepts: Projects & Works](../concepts/projects-and-works/)
- [Assets](../api/assets/), [Templates](../api/templates/)
