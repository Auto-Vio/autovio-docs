---
title: Works Panel
description: Works list and create work in the AutoVio UI. One work = one video pipeline.
---

# Works Panel

When you open a **project**, the **Works** panel shows all works (video pipelines) in that project.


![Works panel](/ui-guide/works-panel.png)

## Works list

- Each row is one work: name, last updated, and optionally status or step.
- Click a work to open it and run through the 5-step pipeline (Init → Analyze → Scenario → Generate → Editor).

![Works panel list](/ui-guide/works-panel-list.png)

## Create work

Click **New Work** (or "Create work"). You’ll set:

- **Name** — e.g. "Product Demo Q1"
- **Mode** — `style_transfer` or `content_remix`
- **Product name** (or subject) and optionally description, target audience, language, duration, scene count

The work is created with the project’s default prompts and instructions; you can override them in the work’s settings.

## After creating a work

1. **Init (Step 1)** — Confirm or edit mode and product info; for style transfer, upload the reference video.
2. **Analyze (Step 2)** — Run analysis on the reference video (if any).
3. **Scenario (Step 3)** — Generate and optionally edit the scenario.
4. **Generate (Step 4)** — Generate image then video per scene.
5. **Editor (Step 5)** — Timeline, overlays, export.

Progress is saved automatically so you can leave and resume later.

## See also

- [Step 1: Init](../ui-guide/step-1-init/) — First step details
- [Pipeline Overview](../concepts/pipeline-overview/)
- [API: Works](../api/works/)
