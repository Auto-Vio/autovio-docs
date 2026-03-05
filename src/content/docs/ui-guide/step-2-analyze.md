---
title: Step 2 - Analyze
description: Reference video analysis with vision AI. Scenes, tone, colors, tempo.
---

# Step 2: Analyze

The **Analyze** step runs vision AI on the reference video to extract structure and style.

## When it runs

- You must have uploaded a **reference video** in Init (style transfer).
- If there is no reference video, this step is typically skipped (e.g. content_remix).

## What happens

1. The frontend sends the reference video to `POST /api/analyze` with mode and optional custom analyzer prompt.
2. The backend uses the **vision** provider (Gemini, Claude, or OpenAI) to analyze the video.
3. The response is an **AnalysisResult**: scene count, overall tone, color palette, tempo, has_text_overlay, and per-scene details (description, transition, text_overlay, camera_movement).

## Save as style guide

After analysis, you can click **Save as Project Style Guide** to map the result into the project’s style guide (tone, color_palette, tempo, camera from the first scene). That style guide is then used in scenario, image, and video generation for consistency.

## Headers

The analyze request uses vision provider headers, e.g.:

- `x-vision-provider` — e.g. gemini, claude, openai
- `x-model-id` — optional model
- `x-api-key` — provider API key

## Next step

Use the analysis in **Step 3: Scenario**. The scenario API accepts the analysis object so the LLM can generate scenes that match the reference’s style and structure.

See [Scenario step](/ui-guide/step-3-scenario/) and [AI Endpoints](/api/ai-endpoints/).
