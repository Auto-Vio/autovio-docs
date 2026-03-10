---
title: Providers API
description: List available AI providers and models for analysis, scenario generation, image generation, and video generation.
---

# Providers API

The **Providers API** exposes all AI providers and models that AutoVio can use for:

- Video analysis (vision)
- Scenario generation (LLM)
- Image generation
- Video generation (image-to-video)

Use this endpoint to build provider/model pickers in your UI or to validate configuration in automation tools.

## Endpoint

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/providers` | No | List all available AI providers and their models. |

This endpoint does **not** require authentication.

## Response shape

The response is a **flat array** of providers. Each entry represents a provider category (vision, llm, image, or video) with its models.

**Response example:**

```json
[
  {
    "id": "gemini",
    "name": "Google Gemini",
    "category": "vision",
    "description": "Video and image analysis with multimodal models.",
    "models": [
      {
        "id": "gemini-2.0-flash",
        "name": "Gemini 2.0 Flash",
        "description": "Fast, low-latency vision model (default)."
      }
    ]
  },
  {
    "id": "gemini",
    "name": "Google Gemini",
    "category": "llm",
    "description": "Text generation for scenarios and style guides.",
    "models": [
      {
        "id": "gemini-2.0-flash",
        "name": "Gemini 2.0 Flash",
        "description": "Default LLM for scenario generation."
      }
    ]
  }
]
```

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | Provider ID (used in headers, e.g. `gemini`, `claude`, `openai`, `dalle`, `runway`). |
| name | string | Human-readable provider name. |
| category | string | `"vision"` \| `"llm"` \| `"image"` \| `"video"`. |
| description | string | Short description for UI. |
| models | object[] | Supported models for this provider/category. |

Each **model**:

| Field | Type | Description |
|-------|------|-------------|
| id | string | Model ID passed in `x-model-id` (or provider-specific model header). |
| name | string | Human-readable model name. |
| description | string | Description / recommended use. |

## Categories and typical providers

The exact list may evolve, but the architecture includes:

- **Vision (`category = "vision"`):**
  - Providers: `gemini`, `claude`, `openai`
  - Used by: `/api/analyze`
- **LLM (`category = "llm"`):**
  - Providers: `gemini`, `claude`, `openai`
  - Used by: `/api/scenario`, `/api/style-guide/extract`
- **Image (`category = "image"`):**
  - Providers: `dalle`, `gemini`
  - Used by: `/api/generate/image`
- **Video (`category = "video"`):**
  - Providers: `runway`, `gemini`
  - Used by: `/api/generate/video`

Always read the live `/api/providers` response to know the exact set of models and their descriptive names.

## Using providers in AI endpoints

AI endpoints use HTTP headers to select provider and model. You typically:

1. Call **`GET /api/providers`** to populate UI dropdowns.
2. Let the user pick a provider + model per category.
3. Send the chosen values in headers when calling AI endpoints.

**Headers (summary):**

| Header | Used by | Category |
|--------|--------|----------|
| `x-vision-provider` | `/api/analyze` | vision |
| `x-llm-provider` | `/api/scenario`, `/api/style-guide/extract` | llm |
| `x-image-provider` | `/api/generate/image` | image |
| `x-video-provider` | `/api/generate/video` | video |
| `x-model-id` | all AI endpoints | model within the selected provider |
| `x-api-key` | all AI endpoints | API key for chosen external provider |

If `x-model-id` is omitted, the backend uses the default model configured for that provider/category.

**Example – generate image with selected provider:**

```bash
curl -X POST "https://api.autovio.com/api/generate/image" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "x-image-provider: gemini" \
  -H "x-model-id: gemini-2.5-flash-image" \
  -H "x-api-key: PROVIDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Product photo, studio lighting",
    "negative_prompt": "blurry, low quality"
  }'
```

## Best practices

- **Persist choices per user**: Store provider/model selections in local storage or user settings so they persist between sessions.
- **Validate before calling**: Use `/api/providers` to validate that a stored model ID still exists.
- **Surface categories clearly**: Group providers by category (Vision, LLM, Image, Video) in your UI to match how endpoints use them.

## See also

- [API Overview](../api/overview/) — Provider headers summary
- [AI Endpoints](../api/ai-endpoints/) — Analyze, scenario, generate image/video
- [Concepts: Providers](../concepts/providers/)

