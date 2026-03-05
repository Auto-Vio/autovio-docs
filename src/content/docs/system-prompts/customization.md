---
title: Customization
description: How to customize scenario, analyzer, image, and video prompts in AutoVio.
---

# Customization

You can override the default prompts at the project level and, where applicable, at the work level or per request.

## Project level

When **creating or editing a project** (UI or API):

| Field | Effect |
|-------|--------|
| `systemPrompt` | Replaces the default scenario system prompt for all works in this project. |
| `analyzerPrompt` | Replaces the default analyzer prompt for reference video analysis. |
| `imageSystemPrompt` | Default extra instruction prepended to every image prompt (used if work/request doesn’t override). |
| `videoSystemPrompt` | Default extra instruction prepended to every video prompt. |
| `knowledge` | Extra context appended for the LLM in scenario generation. |
| `styleGuide` | Tone, colors, tempo, camera, brand voice, must_include, must_avoid — applied in scenario (as "Project Style Guide"), image prefix, and video prefix. |

New projects are initialized with the shared defaults (`DEFAULT_SCENARIO_SYSTEM_PROMPT`, `DEFAULT_ANALYZER_PROMPT`, `DEFAULT_IMAGE_INSTRUCTION`, `DEFAULT_VIDEO_INSTRUCTION`). You can then edit them in project settings.

## Work level

When **creating or editing a work** (UI or API):

- `systemPrompt` — Overrides the project’s scenario system prompt for this work.
- `imageSystemPrompt` — Overrides the project’s image instruction for this work.
- `videoSystemPrompt` — Overrides the project’s video instruction for this work.
- `analyzerPrompt` — Overrides the project’s analyzer prompt for this work.

If a work leaves these empty, the project (or shared) defaults are used.

## Per request (API)

- **Scenario** — Request body can send `systemPrompt`, `knowledge`, `styleGuide` in addition to intent and analysis. These override or extend what’s stored on the project/work when the API uses them.
- **Analyze** — Request can send a custom `analyzerPrompt`.
- **Generate image / video** — Request can send `image_instruction`, `video_instruction`, `styleGuide`. If provided, they are used instead of work/project settings for that call.

## Summary

1. **Defaults** — In shared (TypeScript); used when no project/work override exists.
2. **Project** — Set once; applies to all works unless overridden.
3. **Work** — Override per video pipeline.
4. **Request** — Override per API call when the endpoint supports it.

See [Overview](/system-prompts/overview/) and [API: Projects](/api/projects/), [API: Works](/api/works/).
