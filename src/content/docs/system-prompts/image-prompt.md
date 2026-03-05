---
title: Image Prompt
description: How image prompts are built. Style prefix and image instruction.
---

# Image Prompt

The backend builds the **final image prompt** sent to the image provider by combining a style prefix, an instruction, and the scene’s image prompt.

## Formula

```
[style prefix from style guide] + [image_instruction or DEFAULT_IMAGE_INSTRUCTION] + [scene image_prompt]
```

## Style prefix

When the project or work has a **style guide**, the backend builds a style prefix in `prompts/image.ts` (`buildImageStylePrefix`). It typically includes:

- Base: e.g. "Professional photography, natural lighting, lifelike textures"
- Color palette (if set)
- Tone and tempo (if set)

This prefix is prepended so all generated images match the project’s look.

## Image instruction

- **Default**: `DEFAULT_IMAGE_INSTRUCTION` from shared: "Realistic photography style. Photo of real-world scene, natural lighting and lifelike textures."
- **Override**: Project or work `imageSystemPrompt`, or the value sent in the generate request (`image_instruction`). If empty, the default is used.

## Negative prompt

The scene’s `negative_prompt` is sent as-is to the image provider (when supported) to exclude unwanted elements.

## See also

- [Video Prompt](/system-prompts/video-prompt/) — Same idea for video
- [Customization](/system-prompts/customization/)
- [API: Generate image](/api/ai-endpoints/)
