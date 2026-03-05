---
title: AI Providers
description: Vision, LLM, image, and video providers supported by AutoVio (Gemini, OpenAI, Claude, Runway).
---

# AI Providers

AutoVio delegates different tasks to different AI providers. You choose the provider (and optionally model) per request via headers or via the Settings UI.

## Provider categories

| Category | Purpose | Example providers |
|----------|---------|--------------------|
| **Vision** | Analyze reference video (scenes, tone, colors, tempo, camera) | Gemini, Claude, OpenAI |
| **LLM** | Generate scenario (scene-by-scene image/video prompts) | Gemini, Claude, OpenAI |
| **Image** | Generate a single image from a text prompt | Gemini (Imagen), DALL-E |
| **Video** | Image-to-video (animate an image into a clip) | Gemini (Veo), Runway |

The backend registry can include more providers over time (e.g. Luma, Kling, Ideogram, Flux); the [API](/api/providers/) and UI list what is available.

## How providers are selected

- **Web UI:** In Settings you configure which provider and API key to use for each category (vision, LLM, image, video). The frontend sends the chosen provider and key in request headers.
- **REST API:** The client sends headers such as `x-vision-provider`, `x-llm-provider`, `x-image-provider`, `x-video-provider`, and optionally `x-model-id` and `x-api-key`.
- **MCP server:** The MCP server is configured with model names and API keys (e.g. via CLI or config file); it maps those to the backend’s provider IDs and sends the appropriate headers.

## Listing providers

`GET /api/providers` returns all registered providers and their models (no auth required). Response shape is provider-dependent; typically each entry has `id`, `name`, `category`, `description`, and `models`.

## API keys

- API keys are **not** stored in the backend `.env`. They are provided per request (e.g. from the logged-in user’s settings or from the MCP config).
- The backend forwards the key to the external provider when making vision, LLM, image, or video calls.

## See also

- [API: Providers](/api/providers/) — List providers endpoint
- [AI Endpoints](/api/ai-endpoints/) — Analyze, scenario, generate image/video
- [MCP Setup](/mcp/setup/) — Configuring providers for MCP
