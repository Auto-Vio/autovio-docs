---
title: Quick Start
description: Create your first video with AutoVio in 5 minutes. From project to export.
---

# Quick Start

This guide walks you through creating your first video with AutoVio in a few minutes.

## Prerequisites

- AutoVio is [installed](../getting-started/installation/) and running (backend on port 3001, frontend on 5173).
- You have at least one AI provider configured (e.g. Gemini API key in Settings).

## Step 1: Create a project

1. Log in to the app.
2. Click **New Project** and give it a name (e.g. "My First Video").
3. Optionally set a **Style Guide** (tone, colors, tempo) in project settings for consistent look across videos.

## Step 2: Create a work

1. Open the project and click **New Work** (or "Create work").
2. Choose a **mode**:
   - **Style transfer** — You will upload a reference video; AutoVio will replicate its style with your content.
   - **Content remix** — No reference needed; you describe the video in text.
3. Enter **product name** (or subject) and optionally **description**, **target audience**, **language**, **duration**, and **scene count**.

## Step 3: Reference video (style transfer only)

If you chose **style transfer**, upload a reference video in the Init step. Then go to **Step 2: Analyze** and run analysis. The AI will extract scenes, tone, colors, and camera style.

## Step 4: Generate scenario

1. Go to **Step 3: Scenario**.
2. Click **Generate scenario**. The LLM will produce scene-by-scene prompts (image prompt, video prompt, duration, transition) for each scene.
3. Edit any scene text if needed.

## Step 5: Generate images and videos

1. Go to **Step 4: Generate**.
2. For each scene: trigger **Generate image**, wait for the result, approve (or edit prompt and regenerate), then trigger **Generate video**.
3. You can use **Generate All Images** to run image generation for all scenes, then approve and generate videos per scene.

## Step 6: Edit and export

1. Go to **Step 5: Editor**.
2. Arrange clips on the timeline, trim if needed, set transitions.
3. Add **text overlays** and **image overlays** (e.g. logo from project assets).
4. Optionally add audio.
5. Click **Export** to render and download the final MP4.

## Next Steps

- [Concepts: Projects & Works](../concepts/projects-and-works/) — Hierarchy and data model
- [Pipeline Overview](../concepts/pipeline-overview/) — The 5-step flow in detail
- [UI Guide](../ui-guide/projects-panel/) — Panels and steps explained
