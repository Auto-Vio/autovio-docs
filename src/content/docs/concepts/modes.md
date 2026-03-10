---
title: Generation Modes
description: style_transfer vs content_remix. When to use each mode in AutoVio.
---

# Generation Modes

AutoVio supports two modes for how a video is conceived and styled: **style_transfer** and **content_remix**.

## style_transfer

**Goal:** Reuse the visual style and structure of an existing video with new content.

- You **upload a reference video** in the Init step.
- In **Analyze**, vision AI extracts: scenes, tone, color palette, tempo, camera movements, text overlays.
- That **analysis** is passed into **Scenario** so the LLM generates scenes that match the reference’s style and structure.
- You can save the analysis as the project **style guide** so all works in the project can use that look and feel.

**Use when:** You have a reference ad or template and want to create a new version with different product or messaging but the same style and pacing.

---

## content_remix

**Goal:** Create a new video from text only, without a reference video.

- No reference video is required. You describe the video via product name, description, target audience, duration, scene count.
- **Analyze** is skipped (or optional if you later add a reference).
- **Scenario** uses only **user intent** (and optional project style guide and knowledge) to generate scene-by-scene prompts.
- Image and video generation still use the project/work style guide and instructions if set.

**Use when:** You’re starting from an idea or brief and don’t have a reference clip, or you want the AI to invent structure and style from your description.

---

## Comparison

| Aspect | style_transfer | content_remix |
|--------|----------------|---------------|
| Reference video | Required (upload in Init) | Not required |
| Analyze step | Run to get structure & style | Skipped (or optional) |
| Scenario input | Analysis + intent | Intent (+ optional style guide) |
| Typical use | “Like this video, but for my product” | “Make a video from this description” |

---

## Mode in the API

When creating or updating a work, set `mode` to `"style_transfer"` or `"content_remix"`. The same field is used in scenario and analyze requests so the backend and prompts can adapt (e.g. analyzer prompt focuses on style for style_transfer and on content/story for content_remix).

See [Projects & Works](../concepts/projects-and-works/) and [Pipeline Overview](../concepts/pipeline-overview/).
