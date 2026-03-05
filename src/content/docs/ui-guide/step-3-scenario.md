---
title: Step 3 - Scenario
description: Scenario generation with LLM. Scene-by-scene image and video prompts.
---

# Step 3: Scenario

The **Scenario** step generates a scene-by-scene script for the video using the LLM.

## What you do

1. Click **Generate scenario** (or equivalent). The app sends analysis (if any), intent (mode, product, duration, scene count), optional system prompt, knowledge, and **project style guide** to `POST /api/scenario`.
2. The LLM returns an array of **ScenarioScene** objects: for each scene, `image_prompt`, `negative_prompt`, `video_prompt`, `duration_seconds`, `text_overlay`, `transition`.
3. You can **edit** any scene’s text in the UI before moving to generation.

## Inputs

| Input | Description |
|-------|-------------|
| **Analysis** | From Step 2 (reference video analysis). Optional. |
| **Intent** | mode, product_name, product_description, target_audience, language, video_duration, scene_count. |
| **System prompt** | Override for the scenario LLM (default from project). |
| **Knowledge** | Extra context (from project or work). |
| **Style guide** | Project style guide; when present, appended as "Project Style Guide" in the system prompt. |

## Output

Each scene has:

- `scene_index`, `duration_seconds`
- `image_prompt` — used for image generation
- `negative_prompt` — what to exclude from the image
- `video_prompt` — motion/camera for image-to-video
- `text_overlay` — optional on-screen text
- `transition` — e.g. cut, fade, dissolve

## Default behavior

The default scenario system prompt (see [Scenario Prompt](/system-prompts/scenario-prompt/)) instructs the LLM to produce **photorealistic** content unless the style guide asks for something else. Image prompts are written like “photo of…”, “shot on…”; video prompts describe realistic motion.

## Next step

In **Step 4: Generate** you generate an image for each scene from `image_prompt`, then a video from that image using `video_prompt`.

See [Step 4: Generate](/ui-guide/step-4-generate/) and [System Prompts: Scenario](/system-prompts/scenario-prompt/).
