---
title: Analyzer Prompt
description: Default video analysis prompt. Structure and style extraction.
---

# Analyzer Prompt

The **analyzer** prompt instructs the vision model how to analyze a reference video. The default is `DEFAULT_ANALYZER_PROMPT` in the shared package.

## Role

- You are a professional video analyst. Analyze the given social media video **scene by scene**.
- **style_transfer**: Focus on visual style, colors, transitions, camera movements, composition.
- **content_remix**: Focus on content structure, messaging, storytelling flow, audience engagement.

## Output format

Return **only** a JSON object with this structure:

```json
{
  "scene_count": <number>,
  "overall_tone": "<string>",
  "color_palette": ["<hex colors>"],
  "tempo": "fast | medium | slow",
  "has_text_overlay": <boolean>,
  "scenes": [
    {
      "index": <1-based>,
      "duration_seconds": <number>,
      "description": "<detailed visual description>",
      "transition": "cut | fade | dissolve | slide | zoom",
      "text_overlay": "<text shown in scene, if any>",
      "camera_movement": "<static | pan left | zoom in | etc>"
    }
  ]
}
```

No extra text — only the JSON. The backend parses this into an **AnalysisResult** and can map it to the project style guide (tone, color_palette, tempo, camera_style) when the user clicks "Save as Project Style Guide".

The exact default text is in `packages/shared/src/types/project.ts` as `DEFAULT_ANALYZER_PROMPT`. Projects can override via `analyzerPrompt`.

See [Step 2: Analyze](../ui-guide/step-2-analyze/) and [Customization](../system-prompts/customization/).
