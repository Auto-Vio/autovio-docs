---
title: Pipeline Overview
description: The 5-step AutoVio video generation pipeline from init to export.
---

# Pipeline Overview

AutoVio uses a **5-step pipeline**. Each step is saved to the work so you can pause and resume anytime.

```
Init → Analyze → Scenario → Generate → Editor
 0       1          2           3         4
```

## Step 0: Init

**Purpose:** Set mode and product/subject info; optionally upload a reference video.

- Choose **mode**: `style_transfer` (replicate reference style) or `content_remix` (new content from text).
- Enter product name, description, target audience, language, duration, scene count.
- For style transfer, upload the reference video here.

Output: Work configuration and, if applicable, reference video stored.

---

## Step 1: Analyze

**Purpose:** Extract structure and style from the reference video using vision AI.

- Skipped if there is no reference video (e.g. content_remix without reference).
- Backend sends the video to the vision provider (Gemini, Claude, or OpenAI).
- Returns: scene count, overall tone, color palette, tempo, text overlays, per-scene descriptions and camera movement.

You can **Save as Project Style Guide** to map analysis (tone, colors, tempo, camera) into the project’s style guide for use in later steps.

---

## Step 2: Scenario

**Purpose:** Generate scene-by-scene prompts for image and video generation.

- Inputs: analysis (if any), user intent (mode, product, duration, scene count), optional system prompt and knowledge, optional **project style guide**.
- LLM returns a JSON array of scenes: for each scene, `image_prompt`, `negative_prompt`, `video_prompt`, `duration_seconds`, `text_overlay`, `transition`.

You can edit the generated scenario before moving to generation.

---

## Step 3: Generate

**Purpose:** Generate an image and then a video for each scene.

- Per scene: **Generate image** → review → approve → **Generate video**.
- Status flow: `pending` → `generating_image` → `image_ready` → `generating_video` → `done` (or `error`).
- Image and video prompts are built from: style guide prefix + (work/project) image/video instruction + scene prompt.
- Media is stored under the work; URLs are saved in `generatedScenes`.

---

## Step 4: Editor

**Purpose:** Arrange clips, add overlays and audio, export the final video.

- **Timeline:** Video track (with trim and per-clip transition), text track, image track (project assets), audio track.
- **Overlays:** Text overlays (position, font, color); image overlays (asset, size, position, opacity, rotation).
- **Transitions:** cut, fade, dissolve, wipe, slide (with duration).
- **Export:** Renders to MP4 with FFmpeg (video + text + image overlays + audio).

Editor state (timeline, overlays, export settings) is saved in the work’s `editorState`.

---

## Data flow summary

| Step   | Main output |
|--------|-------------|
| Init   | Work config, reference video (optional) |
| Analyze| AnalysisResult (scenes, tone, colors, tempo) |
| Scenario | ScenarioScene[] (image_prompt, video_prompt, etc.) |
| Generate | GeneratedSceneSnapshot[] (imageUrl, videoUrl, status) |
| Editor | EditorStateSnapshot → exported MP4 |

All of this is persisted on the **Work** document so you can leave and come back at any step.

## See also

- [Generation Modes](../concepts/modes/) — style_transfer vs content_remix
- [UI Guide](../ui-guide/step-1-init/) — Step-by-step UI
