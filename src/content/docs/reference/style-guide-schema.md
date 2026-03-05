---
title: StyleGuide Schema
description: Reference for the StyleGuide object used to control tone, colors, tempo, and camera style.
---

# StyleGuide Schema

The **StyleGuide** object captures brand and visual style preferences for a project or work. It is used in scenario, image, and video generation.

## TypeScript interface

The core definition lives in `packages/shared/src/types/style-guide.ts`:

```ts
export interface StyleGuide {
  tone?: string;
  color_palette?: string[];
  tempo?: "fast" | "medium" | "slow";
  camera_style?: string;
  brand_voice?: string;
  must_include?: string[];
  must_avoid?: string[];
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tone | string | No | Overall tone (e.g. `"energetic"`, `"professional"`). |
| color_palette | string[] | No | Hex color codes (e.g. `["#FF5733", "#33C3FF"]`). |
| tempo | `"fast" \| "medium" \| "slow"` | No | Pacing of the video. |
| camera_style | string | No | Camera movement preferences (e.g. `"Static and slow pans"`). |
| brand_voice | string | No | Brand communication tone (used in prompts). |
| must_include | string[] | No | Elements that should appear (e.g. `"logo watermark"`). |
| must_avoid | string[] | No | Elements to avoid (e.g. `"heavy shadows"`, `"neon colors"`). |

These fields are exposed in the API schema as `StyleGuide` (see `components.schemas.StyleGuide` in the OpenAPI document).

## Where it is used

- **Project** (`project.styleGuide`) — Set via [Projects API](/api/projects/) and used across all works.
- **Scenario** (`styleGuide` in scenario request) — Appended to the scenario system prompt as "Project Style Guide".
- **Image generation** — Backend builds a style prefix in `prompts/image.ts` using tone, colors, and tempo.
- **Video generation** — Backend builds a style prefix in `prompts/video.ts` using camera_style, tempo, and tone.

## Derived helpers

The shared library also provides utility functions:

- `styleGuideFromAnalysis(analysis: AnalysisResult): Partial<StyleGuide>` — Maps video analysis data (tone, color palette, tempo, first scene camera movement) into a style guide.
- `isStyleGuideEmpty(guide?: StyleGuide): boolean` — Returns `true` if no meaningful fields are set.

## See also

- [Concepts: Projects and Works](/concepts/projects-and-works/)
- [System Prompts Overview](/system-prompts/overview/)

