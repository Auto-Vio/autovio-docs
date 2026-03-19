---
title: AI Endpoints
description: Analyze, scenario, generate image, generate video, and export.
---

# AI Endpoints

Endpoints that call AI providers or run the export pipeline. All require authentication and the appropriate scope (e.g. `ai:analyze`, `ai:generate`).

## Analyze

**POST** `/api/analyze`

Analyze a reference video with vision AI.

**Headers:** `x-vision-provider`, `x-model-id` (optional), `x-api-key`

**Request:** Multipart form with `video` (file), `mode` (style_transfer | content_remix), `analyzerPrompt` (optional).

**Response:** AnalysisResult — `scene_count`, `overall_tone`, `color_palette`, `tempo`, `has_text_overlay`, `scenes[]`.

---

## Scenario

**POST** `/api/scenario`

Generate scene-by-scene scenario with the LLM.

**Headers:** `x-llm-provider`, `x-model-id` (optional), `x-api-key`

**Request body:**

```json
{
  "analysis": { ... },
  "intent": {
    "mode": "content_remix",
    "product_name": "EcoBottle",
    "product_description": "...",
    "target_audience": "...",
    "language": "en",
    "video_duration": 30,
    "scene_count": 5
  },
  "systemPrompt": "...",
  "knowledge": "...",
  "styleGuide": { ... }
}
```

**Response:** `{ scenes: ScenarioScene[] }` — each with scene_index, duration_seconds, image_prompt, negative_prompt, video_prompt, text_overlay, transition.

---

## Generate image

**POST** `/api/generate/image`

Generate one image from a text prompt.

**Headers:** `x-image-provider`, `x-model-id` (optional), `x-api-key`

**Request body:**

```json
{
  "prompt": "Photo of a bottle on a table...",
  "negative_prompt": "blurry, text",
  "image_instruction": "...",
  "styleGuide": { ... },
  "resolution": { "width": 1080, "height": 1920 }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| prompt | string | Yes | Image generation prompt. |
| negative_prompt | string | No | What to avoid in the image. |
| image_instruction | string | No | Extra style instructions appended to the prompt. |
| styleGuide | object | No | Brand style guide. |
| resolution | object | No | Output resolution `{ width, height }`. Maps to DALL-E 3 `size` (portrait→`1024x1792`, landscape→`1792x1024`, square→`1024x1024`). No effect on Gemini image provider (no resolution parameter). |

**Response:** `{ imageUrl: string }` — URL to the generated image (or upload to work media and return that URL).

---

## Generate video

**POST** `/api/generate/video`

Image-to-video: animate an image with a prompt.

**Headers:** `x-video-provider`, `x-model-id` (optional), `x-api-key`

**Request body:**

```json
{
  "image_url": "https://... or /api/.../media/scene/0/image",
  "prompt": "Slow push in toward the bottle",
  "duration": 5,
  "video_instruction": "...",
  "styleGuide": { ... },
  "resolution": { "width": 1080, "height": 1920 }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| image_url | string | Yes | Source image URL or internal media path. |
| prompt | string | Yes | Motion/animation prompt. |
| duration | number | No | Duration in seconds (default: 5). |
| video_instruction | string | No | Extra instructions appended to the prompt. |
| styleGuide | object | No | Brand style guide. |
| resolution | object | No | Output resolution `{ width, height }`. Maps to Runway `ratio` (portrait→`"768:1280"`, landscape→`"1280:768"`, square→omitted) or Gemini Veo `aspectRatio` (`"9:16"`, `"16:9"`, `"1:1"`). |

If `image_url` is an internal media URL, the backend resolves it with auth and passes a data URL to the provider.

**Response:** `{ videoUrl: string }`

---

## Export

**POST** `/api/export`

Produce the final MP4 from the editor state.

**Request body:** ExportRequest — projectId, workId, clips (sceneIndex, position, end, cutFrom, transition, transitionDuration), texts (text overlays), images (assetId, position, end, width, height, x, y, opacity, rotation), audio (volume, audioUrl), options (width, height, fps).

**Response:** Binary MP4 (e.g. `Content-Disposition: attachment`).

The backend uses FFmpeg to composite video clips (with transitions), text overlays, image overlays (project assets), and audio into one file.

## See also

- [Providers](../api/providers/) — List providers
- [System Prompts](../system-prompts/overview/)
