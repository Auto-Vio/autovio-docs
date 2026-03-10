---
title: Scene Schema
description: Reference for ScenarioScene and related analysis fields used in the video pipeline.
---

# Scene Schema

Scenes appear in two main places:

- **AnalysisResult.scenes[]** — Output from video analysis.
- **ScenarioScene[]** — Output from scenario generation and input to image/video generation.

## UserIntent (scenario input)

Defined in `packages/shared/src/types/scenario.ts` as `UserIntentSchema`:

```ts
export const UserIntentSchema = z.object({
  mode: z.enum(["style_transfer", "content_remix"]),
  product_name: z.string().optional(),
  product_description: z.string().optional(),
  target_audience: z.string().optional(),
  language: z.string().optional(),
  video_duration: z.number().optional(),
  scene_count: z.number().optional(),
});
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| mode | `"style_transfer" \| "content_remix"` | Yes | Video generation mode. |
| product_name | string | No | Product or subject name. |
| product_description | string | No | Description of the product/subject. |
| target_audience | string | No | Target audience. |
| language | string | No | Output language code. |
| video_duration | number | No | Total video duration in seconds. |
| scene_count | number | No | Number of scenes to generate. |

## ScenarioScene (scenario output)

Defined in `ScenarioSceneSchema` in `packages/shared/src/types/scenario.ts` and mirrored in the OpenAPI `ScenarioResponse`:

```ts
export const ScenarioSceneSchema = z.object({
  scene_index: z.number(),
  duration_seconds: z.number(),
  image_prompt: z.string(),
  negative_prompt: z.string().nullable().default(""),
  video_prompt: z.string(),
  text_overlay: z.string().nullable().optional(),
  transition: z.string().nullable().default("cut"),
});
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| scene_index | number | Yes | 0-based scene index. |
| duration_seconds | number | Yes | Scene duration in seconds. |
| image_prompt | string | Yes | Prompt for image generation. |
| negative_prompt | string | No | What to avoid in the image (may be `""`). |
| video_prompt | string | Yes | Motion/camera prompt for image-to-video. |
| text_overlay | string | No | Optional on-screen text for the scene. |
| transition | string | No | Transition type to the next scene (e.g. `"cut"`, `"fade"`, `"dissolve"`). |

## AnalysisResult scenes (analysis output)

In `ARCHITECTURE.md` and the OpenAPI `ScenarioAnalysisInput`, analysis scenes look like:

| Field | Type | Description |
|-------|------|-------------|
| index | number | 1-based scene index. |
| duration_seconds | number | Scene duration. |
| description | string | Visual description of the scene. |
| transition | string | Transition type between scenes. |
| text_overlay | string | Text shown in the scene, if any. |
| camera_movement | string | Camera movement (e.g. `"pan left"`, `"zoom in"`). |

These analysis scenes can be passed into scenario generation (as `analysis`) to influence the resulting `ScenarioScene` array.

## Relationship in the pipeline

- **Analyze step** → returns **AnalysisResult.scenes[]** with structural info.
- **Scenario step** → takes `UserIntent` and optional `analysis.scenes[]` to produce **ScenarioScene[]**.
- **Generate step** → uses `ScenarioScene.image_prompt`, `negative_prompt`, `video_prompt`, and `duration_seconds` for image and video generation.

## See also

- [Pipeline Overview](../concepts/pipeline-overview/)
- [UI Guide: Scenario](../ui-guide/step-3-scenario/)
- [AI Endpoints](../api/ai-endpoints/)

