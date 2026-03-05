---
title: Introduction
description: What is AutoVio? AI video generation pipeline for automated video creation from text and reference videos.
---

# Introduction

AutoVio is an **open-source AI video generation pipeline** that connects multiple AI providers (Google Gemini, OpenAI, Anthropic Claude) to automate video production. It handles the full workflow: scenario writing, image generation, image-to-video conversion, and timeline editing.

## What You Can Do

- **Text to video** — Create videos from text descriptions. Describe your product or idea; AutoVio generates scenes, images, and video clips.
- **Reference video analysis** — Upload an existing video. Vision AI extracts style, tone, colors, and structure so you can replicate or remix it.
- **Scene-by-scene control** — Each scene has an image prompt and video prompt. Edit them, regenerate per scene, and approve before moving on.
- **Timeline editing** — Arrange clips, add text and image overlays, set transitions, and export a final MP4.

## Architecture at a Glance

AutoVio is a **monorepo** with three packages:

| Package | Role |
|---------|------|
| **Backend** | Express.js REST API. Orchestrates AI providers, MongoDB, file storage, and video export (FFmpeg). |
| **Frontend** | React SPA. Step-by-step pipeline UI and timeline editor. |
| **Shared** | TypeScript types and Zod schemas used by both backend and frontend. |

You can use the **web UI**, the **REST API**, or the **MCP server** (for Claude Desktop, Cursor, etc.) to create videos.

## Next Steps

- [Installation](/getting-started/installation/) — Set up AutoVio locally
- [Quick Start](/getting-started/quickstart/) — Create your first video in minutes
- [Concepts](/concepts/projects-and-works/) — Projects, works, and the 5-step pipeline
