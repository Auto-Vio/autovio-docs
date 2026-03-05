---
title: Video Prompt
description: How video prompts are built. Style prefix and video instruction.
---

# Video Prompt

The backend builds the **final video prompt** for image-to-video by combining a style prefix, an instruction, and the scene’s video prompt.

## Formula

```
[style prefix from style guide] + [video_instruction or DEFAULT_VIDEO_INSTRUCTION] + [scene video_prompt]
```

## Style prefix

When a **style guide** is present, the backend builds a video style prefix in `prompts/video.ts` (`buildVideoStylePrefix`). It typically encodes:

- Camera style
- Tempo (motion pacing)
- Tone

So the generated motion matches the project’s style.

## Video instruction

- **Default**: `DEFAULT_VIDEO_INSTRUCTION` from shared: "Maintain photorealistic, live-action quality. Realistic motion and physics."
- **Override**: Project or work `videoSystemPrompt`, or the value sent in the generate request (`video_instruction`). If empty, the default is used.

## Image URL

- The request sends `image_url` (the scene’s generated image). If this is an **internal** media URL (e.g. `/api/projects/.../works/.../media/scene/:index/image`), the backend fetches the image with the request’s auth, converts it to a data URL, and passes that to the video provider so it can load the image without 401.

## See also

- [Image Prompt](/system-prompts/image-prompt/)
- [Customization](/system-prompts/customization/)
- [API: Generate video](/api/ai-endpoints/)
