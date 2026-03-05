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
  "sceneCount": 5
}
```

`name` and `mode` are required; others optional. New work gets project’s default prompts and instructions.

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

Includes: id, projectId, name, mode, productName, productDescription, targetAudience, language, videoDuration, sceneCount, currentStep, hasReferenceVideo, systemPrompt, analyzerPrompt, imageSystemPrompt, videoSystemPrompt, analysis, scenes, generatedScenes, editorState, createdAt, updatedAt.

## See also

- [Concepts: Projects & Works](/concepts/projects-and-works/)
- [AI Endpoints](/api/ai-endpoints/) — Analyze, scenario, generate, export
