---
title: MCP Tools Reference
description: Complete list of AutoVio MCP tools with parameters and example payloads.
---

# MCP Tools Reference

This page lists all tools exposed by the AutoVio MCP server. Each tool returns JSON text in its `content` field.

## Health

### autovio_health

Check if the AutoVio API server is running.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| *(none)* | - | - | No input. |

**Example args:**

```json
{}
```

## Authentication

### autovio_auth_login

Login with email and password. Returns JWT access token and user info. The client updates its API token automatically when `accessToken` is present.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| email | string | Yes | User email address. |
| password | string | Yes | User password. |

**Example args:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

### autovio_auth_register

Create a new user account.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| email | string | Yes | Email (must be unique). |
| password | string | Yes | Password (minimum 8 characters). |
| name | string | Yes | Display name. |

### autovio_auth_me

Get the current authenticated user.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| *(none)* | - | - | No input. |

## Projects

### autovio_projects_list

List all projects for the current user. Returns an array of project meta objects.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| *(none)* | - | - | No input. |

### autovio_projects_create

Create a new project (container for works, style guide, and prompts).

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| name | string | No | Project name (default: `"Yeni Proje"`). |
| systemPrompt | string | No | Custom scenario system prompt. |
| knowledge | string | No | Brand context or background info. |
| styleGuide | object | No | Style guide (tone, color_palette, tempo, camera_style, brand_voice, must_include, must_avoid). |
| imageSystemPrompt | string | No | Extra instruction for image generation. |
| videoSystemPrompt | string | No | Extra instruction for video generation. |

**Example args:**

```json
{
  "name": "Summer Campaign",
  "styleGuide": {
    "tone": "professional",
    "color_palette": ["#FF5733", "#3498DB"],
    "tempo": "medium"
  }
}
```

### autovio_projects_get

Get full project details, including style guide and prompts.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID (e.g. `proj_xxx`). |

### autovio_projects_update

Update project settings.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| id | string | Yes | Project ID to update. |
| name | string | Yes | Project name. |
| userId | string | No | User ID. |
| systemPrompt | string | No | Scenario system prompt. |
| knowledge | string | No | Brand context. |
| analyzerPrompt | string | No | Video analysis prompt. |
| styleGuide | object | No | Style guide fields. |
| imageSystemPrompt | string | No | Image instruction. |
| videoSystemPrompt | string | No | Video instruction. |
| createdAt | number | No | Creation timestamp (ms). |
| updatedAt | number | No | Last update timestamp (ms). |

### autovio_projects_delete

Delete a project and all its works, templates, and assets.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID to delete. |

## Works

### autovio_works_list

List all works (video pipelines) in a project.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID containing the works. |

### autovio_works_create

Create a new work inside a project.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID. |
| name | string | No | Work name (default: `"Yeni Çalışma"`). |
| mode | string | No | `"style_transfer"` or `"content_remix"`. |
| productName | string | No | Product/subject name. |
| productDescription | string | No | Description. |
| targetAudience | string | No | Target audience. |
| language | string | No | Language code (e.g. `en`, `tr`). |
| videoDuration | number | No | Target duration in seconds. |
| sceneCount | number | No | Number of scenes to generate. |

**Example args:**

```json
{
  "projectId": "proj_123",
  "name": "Product Demo",
  "mode": "content_remix",
  "productName": "EcoBottle",
  "sceneCount": 5
}
```

### autovio_works_get

Get full work details, including scenes, generated media URLs, and editor state.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID. |
| workId | string | Yes | Work ID (e.g. `work_xxx`). |

### autovio_works_update

Update work settings, scenes, or editor state.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| id | string | Yes | Work ID. |
| projectId | string | Yes | Project ID. |
| name | string | No | Work name. |
| createdAt | number | No | Creation timestamp (ms). |
| updatedAt | number | No | Update timestamp (ms). |
| currentStep | number | No | Pipeline step (0–4). |
| hasReferenceVideo | boolean | No | Whether a reference video was uploaded. |
| mode | string | No | `"style_transfer"` or `"content_remix"`. |
| systemPrompt | string | No | Scenario system prompt. |
| analyzerPrompt | string | No | Analyzer prompt. |
| imageSystemPrompt | string | No | Image instruction. |
| videoSystemPrompt | string | No | Video instruction. |
| productName | string | No | Product name. |
| productDescription | string | No | Product description. |
| targetAudience | string | No | Target audience. |
| language | string | No | Language code. |
| videoDuration | number | No | Duration in seconds. |
| sceneCount | number | No | Number of scenes. |
| analysis | any | No | AnalysisResult. |
| scenes | object[] | No | Scene list (scenario output). |
| generatedScenes | any[] | No | Generated media status per scene. |
| editorState | object | No | Editor state (tracks, overlays, export settings). |

### autovio_works_delete

Delete a work and all generated media for it.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID. |
| workId | string | Yes | Work ID to delete. |

### autovio_works_apply_template

Apply a template to a work and save the updated editor state.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID. |
| workId | string | Yes | Work ID. |
| templateId | string | Yes | Template ID to apply. |
| placeholderValues | object | No | Map of placeholder keys to values (e.g. `{ "product_name": "EcoBottle" }`). |

### autovio_works_generate_scenario

Generate a scenario for a work using its settings. Scenes are saved to the work.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID. |
| workId | string | Yes | Work ID. |

### autovio_works_generate_scene

Generate image and video for one scene of a work. Media is saved to the work.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID. |
| workId | string | Yes | Work ID. |
| sceneIndex | number | Yes | Scene index (0-based). |

## AI

### autovio_ai_analyze_video

Analyze a reference video with vision AI.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| videoBase64 | string | Yes | Video file encoded as base64. |
| mode | string | Yes | `"style_transfer"` or `"content_remix"`. |
| analyzerPrompt | string | No | Custom analysis instructions. |

### autovio_ai_generate_scenario

Generate a scene-by-scene scenario using the LLM (not tied to a specific work).

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| intent | object | Yes | Intent (mode, product_name, product_description, target_audience, language, video_duration, scene_count). |
| analysis | any | No | Reference video analysis object. |
| systemPrompt | string | No | Custom system prompt. |
| knowledge | string | No | Brand or product context. |
| styleGuide | object | No | Style guide (tone, color_palette, tempo, camera_style, brand_voice, must_include, must_avoid). |

### autovio_ai_generate_image

Generate an image from a text prompt.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| prompt | string | Yes | Image generation prompt. |
| negative_prompt | string | No | What to avoid in the image. |
| image_instruction | string | No | Extra style instructions. |
| styleGuide | object | No | Style guide. |

### autovio_ai_generate_video

Generate a video from an image (image-to-video).

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| image_url | string | Yes | Source image URL. |
| prompt | string | Yes | Motion/action prompt. |
| duration | number | No | Duration in seconds (default: 5). |
| video_instruction | string | No | Extra video instructions. |
| styleGuide | object | No | Style guide. |

## Providers

### autovio_providers_list

List available AI providers and models.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| *(none)* | - | - | No input. |

## Templates

### autovio_templates_list

List templates in a project (meta and counts).

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID. |

### autovio_templates_get

Get full template details, including overlay content.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID. |
| templateId | string | Yes | Template ID. |

### autovio_templates_create

Create a template with text/image overlays.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID. |
| name | string | Yes | Template name. |
| description | string | No | Description. |
| tags | string[] | No | Tags for organization. |
| content | object | Yes | Template content (textOverlays, imageOverlays, exportSettings, etc.). |

### autovio_templates_update

Update template metadata or content.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID. |
| templateId | string | Yes | Template ID. |
| name | string | No | New name. |
| description | string | No | New description. |
| tags | string[] | No | New tags. |
| content | object | No | New content. |

### autovio_templates_delete

Delete a template from a project.

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| projectId | string | Yes | Project ID. |
| templateId | string | Yes | Template ID to delete. |

## See also

- [MCP Overview](/mcp/overview/)
- [MCP Setup](/mcp/setup/)
- [Workflows](/mcp/workflows/)

