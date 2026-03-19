---
title: Projects and Works
description: Project vs work hierarchy in AutoVio. Projects hold settings and assets; works are individual video pipelines.
---

# Projects and Works

AutoVio organizes everything in a two-level hierarchy: **projects** and **works**.

## Projects

A **project** is the top-level container. It holds:

- **Name** and metadata
- **Project type** — Determines default prompts and style: `blank`, `saas`, `news`, `social`, `ecommerce`, `educational`
- **Style guide** — Tone, color palette, tempo, camera style, brand voice, must-include / must-avoid (used in scenario, image, and video generation)
- **System prompts** — Default scenario prompt, analyzer prompt, image instruction, video instruction (all can be overridden per work)
- **Knowledge** — Extra context sent to the LLM for scenario generation
- **Project assets** — Images, video, audio, fonts (e.g. logos, watermarks, product photos) reusable across works and in video generation
- **Editor templates** — Reusable overlay compositions (text + image) that can be applied to any work in the project

Projects are scoped to a user. You list, create, update, and delete projects via the UI or [Projects API](../api/projects/).

### Project types

When creating a project, you can choose a **project type** to start with optimized prompts:

| Type | Description |
|------|-------------|
| `blank` | Photorealistic defaults. Fully customizable. |
| `saas` | SaaS product demos. UI/UX focused, dashboard walkthroughs. |
| `news` | News/media content. Broadcast journalism, documentary style. |
| `social` | Social media/marketing. Trendy, engaging, brand-focused. |
| `ecommerce` | E-commerce products. Product showcases, lifestyle shots. |
| `educational` | Tutorials. Clear instruction, step-by-step guides. |

Each type pre-configures `systemPrompt`, `imageSystemPrompt`, `videoSystemPrompt`, and `styleGuide`.

## Works

A **work** is one video pipeline inside a project. Each work has:

- **Name**, **mode** (`style_transfer` or `content_remix`)
- **Product/subject info** — productName, productDescription, targetAudience, language, videoDuration, sceneCount
- **Resolution** — Output dimensions for image/video generation and export (`{ width, height }`). Default: `{ width: 1080, height: 1920 }` (Portrait 9:16)
- **Reference video** (optional) — For style transfer; uploaded and analyzed in the pipeline
- **Selected assets** — Asset IDs from the project to use in video generation
- **Asset usage mode** — How to use selected assets: `reference` (AI learns style) or `direct` (use actual images)
- **Analysis** — Result of reference video analysis (scenes, tone, colors, tempo)
- **Scenes** — Scenario output (image_prompt, video_prompt, duration, transition per scene)
- **Generated scenes** — Per-scene image and video URLs and status
- **Editor state** — Timeline (video, text, image, audio tracks), overlays, transitions, export settings

One project can have many works. Each work progresses through the same 5-step pipeline (Init → Analyze → Scenario → Generate → Editor).

### Asset usage modes

When a work has selected assets, you can control how they're used:

| Mode | Behavior |
|------|----------|
| `reference` | AI analyzes asset descriptions and generates similar-looking images. Assets should have descriptions (use Vision AI analyze). |
| `direct` | Skip AI image generation. Use actual asset images directly, only generate video (animation). Scene count auto-adjusts to match asset count. |

## Relationship

```
User
 └── Project (style guide, prompts, assets, templates)
       ├── Work 1 (one video)
       ├── Work 2 (another video)
       └── Work 3 …
```

When you create a work, it inherits the project’s system prompt, analyzer prompt, and image/video instructions. You can override them at the work level. The project style guide is applied in scenario, image, and video generation unless overridden.

## See also

- [Pipeline Overview](../concepts/pipeline-overview/) — The 5 steps in detail
- [API: Projects](../api/projects/), [API: Works](../api/works/)
