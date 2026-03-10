---
title: System Prompts Overview
description: How prompts flow through AutoVio. Scenario, analyzer, image, and video prompts.
---

# System Prompts Overview

AutoVio uses several prompts to control AI behavior. They flow from project/work settings into the backend and then to the providers.

## Where prompts are defined

| Prompt | Default source | Override |
|--------|----------------|----------|
| **Scenario** | `DEFAULT_SCENARIO_SYSTEM_PROMPT` (shared) | Project `systemPrompt`; work can override. |
| **Analyzer** | `DEFAULT_ANALYZER_PROMPT` (shared) | Project `analyzerPrompt`. |
| **Image** | Style prefix from style guide + `DEFAULT_IMAGE_INSTRUCTION` | Project/work `imageSystemPrompt` (or custom instruction in request). |
| **Video** | Style prefix from style guide + `DEFAULT_VIDEO_INSTRUCTION` | Project/work `videoSystemPrompt` (or custom in request). |

When you create a new project, it gets the default scenario, analyzer, image, and video prompts from shared. New works inherit from the project; you can override at the work level.

## Flow

1. **Scenario** — User intent (+ analysis + style guide) and system prompt are sent to the LLM. Output: scene array (image_prompt, video_prompt, etc.).
2. **Analyzer** — Reference video + analyzer prompt (and mode) are used for vision analysis. Output: AnalysisResult.
3. **Image** — For each scene: backend builds `[style prefix] + [image_instruction] + [scene image_prompt]` and sends to the image provider.
4. **Video** — For each scene: backend builds `[style prefix] + [video_instruction] + [scene video_prompt]`, resolves the image URL if internal, and sends to the video provider.

## Style guide

When a project (or work) has a **style guide** (tone, color_palette, tempo, camera_style, brand_voice, must_include, must_avoid):

- **Scenario** — The style guide is appended to the system prompt as "Project Style Guide".
- **Image** — Backend builds an image style prefix (e.g. professional photography, natural lighting + color/tone/tempo) in `prompts/image.ts`.
- **Video** — Backend builds a video style prefix (camera, tempo, tone) in `prompts/video.ts`.

## Customization

- **Project settings** — Edit system prompt, analyzer prompt, image instruction, video instruction, and style guide.
- **Work settings** — Override system prompt and image/video instructions per work.
- **API** — Same fields can be sent in create/update project, create/update work, and in analyze/scenario/generate request bodies or headers where supported.

See [Scenario Prompt](../system-prompts/scenario-prompt/), [Analyzer Prompt](../system-prompts/analyzer-prompt/), [Image Prompt](../system-prompts/image-prompt/), [Video Prompt](../system-prompts/video-prompt/), and [Customization](../system-prompts/customization/).
