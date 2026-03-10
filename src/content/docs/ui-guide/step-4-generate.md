---
title: Step 4 - Generate
description: Image and video generation per scene. Approve and regenerate.
---

# Step 4: Generate

The **Generate** step produces an image and then a video for each scene.

![Step 4](/ui-guide/step-4.png)

## Per-scene flow

1. **Generate image** — Backend uses the scene’s `image_prompt` (plus style guide prefix and image instruction) and calls the image provider. Status: `generating_image` → `image_ready`.
2. **Review** — You see the image; you can approve or edit the prompt and regenerate.
3. **Generate video** — After approval, backend uses the image and `video_prompt` (plus style prefix and video instruction) and calls the video provider. Status: `generating_video` → `done` (or `error`).

## Status values

- `pending` — Not started
- `generating_image` — Image in progress
- `image_ready` — Image done, awaiting approval before video
- `generating_video` — Video in progress
- `done` — Scene complete
- `error` — Failed (with message)

## Bulk actions

- **Generate All Images** — Runs image generation for all scenes that are still pending. Video is still triggered per scene after you approve each image.

## Inline editing

Side panels (e.g. Image Edit, Video Edit) let you change the prompt for a scene and regenerate without leaving the step.

## Style and instructions

- The backend builds a **style prefix** from the project/work style guide (see [Image Prompt](../system-prompts/image-prompt/), [Video Prompt](../system-prompts/video-prompt/)).
- Final image prompt: `[style prefix] + [image_instruction or default] + [scene image_prompt]`.
- Final video prompt: same idea for video. If `image_url` is an internal media URL, the backend resolves it with auth and passes a data URL to the video provider.

## Storage

Generated image and video files are stored under the work via:

- `POST /api/projects/:id/works/:id/media/scene/:index/image`
- `POST /api/projects/:id/works/:id/media/scene/:index/video`

Media URLs in the UI that point to the API are loaded with auth (e.g. blob URLs) so previews work.

## Next step

Go to **Step 5: Editor** to arrange clips on the timeline, add overlays and audio, and export.

See [Editor step](../ui-guide/step-5-editor/) and [AI Endpoints](../api/ai-endpoints/).
