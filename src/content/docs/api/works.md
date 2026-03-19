---
title: Works API
description: Create and manage works (video pipelines). CRUD and media endpoints.
---

# Works API

A **work** is one video pipeline inside a project. Endpoints are under `/api/projects/:projectId/works`.

## CRUD

| Method | Endpoint | Auth | Scope | Description |
|--------|----------|------|-------|-------------|
| GET | `/api/projects/:projectId/works` | Yes | works:read | List works in the project. |
| POST | `/api/projects/:projectId/works` | Yes | works:write | Create work. |
| GET | `/api/projects/:projectId/works/:workId` | Yes | works:read | Get full work (scenes, generatedScenes, editorState). |
| PUT | `/api/projects/:projectId/works/:workId` | Yes | works:write | Update work. |
| DELETE | `/api/projects/:projectId/works/:workId` | Yes | works:write | Delete work and its media. |

## Create work (POST)

**Request body:**

```json
{
  "name": "My Video",
  "mode": "content_remix",
  "productName": "EcoBottle",
  "productDescription": "Eco-friendly bottle",
  "targetAudience": "Consumers",
  "language": "en",
  "videoDuration": 30,
  "sceneCount": 5,
  "selectedAssetIds": ["asset_logo", "asset_product1"],
  "assetUsageMode": "direct",
  "resolution": { "width": 1080, "height": 1920 }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | No | Work name. |
| mode | string | No | `style_transfer` or `content_remix`. |
| productName | string | No | Product/subject name. |
| productDescription | string | No | Description. |
| targetAudience | string | No | Target audience. |
| language | string | No | Language code (e.g. `en`, `tr`). |
| videoDuration | number | No | Target duration in seconds. |
| sceneCount | number | No | Number of scenes to generate. |
| selectedAssetIds | string[] | No | Asset IDs to use in video generation. |
| assetUsageMode | string | No | How to use assets: `reference` or `direct`. |
| resolution | object | No | Output resolution `{ width, height }`. Determines image/video provider sizing and initial `exportSettings`. Default: `{ width: 1080, height: 1920 }` (Portrait 9:16). |

New work inherits project's default prompts and instructions.

## Resolution

The `resolution` field controls the output dimensions for image and video generation in this work. It is stored on the work and passed to each provider during generation.

**Standard presets:**

| Preset | `width` | `height` | Description |
|--------|---------|----------|-------------|
| Portrait 9:16 | 1080 | 1920 | Default. Vertical/mobile format. |
| Landscape 16:9 | 1920 | 1080 | Horizontal/widescreen format. |
| Square 1:1 | 1080 | 1080 | Square format. |

**Provider mapping:**

| Provider | Portrait 9:16 | Landscape 16:9 | Square 1:1 |
|----------|--------------|----------------|------------|
| DALL-E 3 (`dalle`) | `size: "1024x1792"` | `size: "1792x1024"` | `size: "1024x1024"` |
| Runway (`runway`) | `ratio: "768:1280"` | `ratio: "1280:768"` | *(omitted)* |
| Gemini Veo (`gemini` video) | `aspectRatio: "9:16"` | `aspectRatio: "16:9"` | `aspectRatio: "1:1"` |
| Gemini Image (`gemini` image) | *(no resolution parameter)* | *(no resolution parameter)* | *(no resolution parameter)* |

The `exportSettings` in the work's `editorState` is also initialized from `resolution` when a new work is created.

## Asset Usage Modes

When you specify `selectedAssetIds`, control how those assets are used with `assetUsageMode`:

| Mode | Description |
|------|-------------|
| `reference` | AI analyzes assets and generates similar-looking images. Best for style consistency. Assets should have descriptions (use the analyze endpoint first). |
| `direct` | Skip AI image generation. Use actual asset images directly and only generate video (animation). Best for product photos, screenshots. Scene count auto-adjusts to match asset count. |

## Media endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `.../works/:workId/media/reference` | Upload reference video (multipart). |
| GET | `.../works/:workId/media/reference` | Download reference video. |
| POST | `.../works/:workId/media/scene/:index/image` | Upload scene image (generated). |
| GET | `.../works/:workId/media/scene/:index/image` | Get scene image. |
| POST | `.../works/:workId/media/scene/:index/video` | Upload scene video. |
| GET | `.../works/:workId/media/scene/:index/video` | Get scene video. |
| POST | `.../works/:workId/media/audio` | Upload work-level audio. |

All require auth and appropriate scope. Scene `index` is 0-based. Media URLs returned in the work (e.g. in `generatedScenes`) point to these endpoints; use the same auth when fetching (e.g. for preview or video provider).

## Work object (summary)

Includes: id, projectId, name, mode, productName, productDescription, targetAudience, language, videoDuration, sceneCount, selectedAssetIds, assetUsageMode, resolution, currentStep, hasReferenceVideo, systemPrompt, analyzerPrompt, imageSystemPrompt, videoSystemPrompt, analysis, scenes, generatedScenes, editorState, createdAt, updatedAt.

## See also

- [Concepts: Projects & Works](../concepts/projects-and-works/)
- [AI Endpoints](../api/ai-endpoints/) — Analyze, scenario, generate, export
- [Assets API](../api/assets/) — Upload and manage assets for video generation
