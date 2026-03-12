---
title: MCP Workflows
description: Example workflows using AutoVio MCP tools to run the video pipeline end-to-end.
---

# MCP Workflows

This page shows example workflows using the AutoVio MCP tools to drive the video pipeline.

All examples assume:

- The AutoVio MCP server is running and configured (see [MCP Setup](../mcp/setup/)).
- The MCP client can call tools with a JSON `args` object and display JSON text results.

## Workflow 1 – Create project and work

### 1. Create a project

Use **`autovio_projects_create`** with a project type for optimized prompts:

```json
{
  "name": "MCP Demo Project",
  "projectType": "ecommerce",
  "knowledge": "We sell eco-friendly products for outdoor enthusiasts."
}
```

Project types: `blank`, `saas`, `news`, `social`, `ecommerce`, `educational`. Each comes with optimized prompts and style guide.

Copy the returned `id` as `projectId`.

### 2. Create a work

Call **`autovio_works_create`**:

```json
{
  "projectId": "proj_123",
  "name": "MCP Demo Video",
  "mode": "content_remix",
  "productName": "EcoBottle",
  "productDescription": "Eco-friendly reusable bottle",
  "sceneCount": 5,
  "videoDuration": 30
}
```

Copy the returned `id` as `workId`.

## Workflow 2 – Generate scenario and scenes for a work

### 1. Generate scenario for the work

Use **`autovio_works_generate_scenario`**:

```json
{
  "projectId": "proj_123",
  "workId": "work_123"
}
```

The response contains `scenes` for the work. The work in the backend is also updated.

### 2. Generate image and video for each scene

For each scene index (0-based), call **`autovio_works_generate_scene`**:

```json
{
  "projectId": "proj_123",
  "workId": "work_123",
  "sceneIndex": 0
}
```

Repeat for `sceneIndex` 1, 2, etc. Each call:

- Generates an image and video for the scene.
- Saves media under the work’s media endpoints.
- Updates `generatedScenes` for that scene.

### 3. Inspect the work

Optionally call **`autovio_works_get`**:

```json
{
  "projectId": "proj_123",
  "workId": "work_123"
}
```

This returns the full work object, including scenes, generated media URLs, and editor state (if previously saved by the UI or API).

## Workflow 3 – Use direct AI tools

You can also use AI tools that are not tied to a specific work.

### 1. Analyze a reference video

Encode a small video file as base64 and call **`autovio_ai_analyze_video`**:

```json
{
  "videoBase64": "BASE64_CONTENT_HERE",
  "mode": "style_transfer",
  "analyzerPrompt": "Focus on camera movement and text overlays."
}
```

The result is an analysis object you can feed into scenario generation.

### 2. Generate a scenario

Use **`autovio_ai_generate_scenario`**:

```json
{
  "intent": {
    "mode": "content_remix",
    "product_name": "EcoBottle",
    "product_description": "Eco-friendly reusable bottle",
    "target_audience": "Eco-conscious users",
    "language": "en",
    "video_duration": 30,
    "scene_count": 3
  },
  "analysis": { "...": "output from analyze_video" },
  "knowledge": "Brand focuses on sustainability.",
  "styleGuide": {
    "tone": "professional"
  }
}
```

The response contains a `scenes` array with prompts you can then use with `autovio_ai_generate_image` and `autovio_ai_generate_video`.

## Workflow 4 – Apply a template to a work

### 1. List templates

Call **`autovio_templates_list`**:

```json
{
  "projectId": "proj_123"
}
```

Pick a `templateId` from the result.

### 2. Apply template to the work

Use **`autovio_works_apply_template`**:

```json
{
  "projectId": "proj_123",
  "workId": "work_123",
  "templateId": "tmpl_123",
  "placeholderValues": {
    "product_name": "EcoBottle",
    "brand": "Acme Co."
  }
}
```

The response is the updated work with merged editor state (timeline, overlays, export settings).

## Workflow 5 – Asset-based video generation

Use project assets directly in video generation instead of AI-generated images.

### 1. List project assets

Call **`autovio_assets_list`**:

```json
{
  "projectId": "proj_123",
  "type": "image"
}
```

Note the `id` values for assets you want to use.

### 2. (Optional) Analyze assets for reference mode

For reference mode, analyze assets to generate descriptions:

```json
{
  "projectId": "proj_123",
  "assetIds": ["asset_1", "asset_2", "asset_3"]
}
```

Use **`autovio_assets_analyze_batch`**. Descriptions help AI generate similar-looking images.

### 3. Create work with assets

Use **`autovio_works_create`** with asset selection:

```json
{
  "projectId": "proj_123",
  "name": "Product Showcase",
  "mode": "content_remix",
  "productName": "EcoBottle",
  "selectedAssetIds": ["asset_1", "asset_2", "asset_3"],
  "assetUsageMode": "direct"
}
```

Asset usage modes:
- `direct` — Use actual asset images, skip AI image generation. Scene count auto-adjusts to asset count.
- `reference` — AI generates new images matching asset style (requires analyzed assets).

### 4. Generate scenario and scenes

With `direct` mode, scenario generation creates scenes matching your asset count. Image generation is skipped; only video (animation) is generated from your actual photos.

## See also

- [Quick Start](../getting-started/quickstart/) — UI-based pipeline
- [AI Endpoints](../api/ai-endpoints/) — Underlying REST API
- [MCP Tools Reference](../mcp/tools-reference/)

