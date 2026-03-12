---
title: Claude Code Integration
description: Use the AutoVio MCP server from Claude Code or MCP-enabled coding environments.
---

# Claude Code Integration

Claude Code (and other MCP-enabled coding environments) can call AutoVio through the **AutoVio MCP server**.

## Configure the MCP server

Claude Code needs to run the AutoVio MCP server as a command and connect over stdio. Use the same entry point and configuration pattern as in other MCP clients:

```bash
node /path/to/AutoVio-MCP/dist/index.js \
  --autovio-base-url http://localhost:3001 \
  --autovio-api-token YOUR_API_TOKEN \
  --vision-model gemini-2.0-flash-exp --vision-api-key YOUR_VISION_KEY \
  --llm-model gemini-2.5-flash --llm-api-key YOUR_LLM_KEY \
  --image-model gemini-2.5-flash-image --image-api-key YOUR_IMAGE_KEY \
  --video-model veo-3.0-generate-001 --video-api-key YOUR_VIDEO_KEY
```

Environment variables (`AUTOVIO_BASE_URL`, `AUTOVIO_API_TOKEN`, and the model/key envs) can also be used as described in [MCP Setup](../mcp/setup/).

## Using tools from the editor

Once Claude Code is connected to the MCP server, it can:

- List projects (`autovio_projects_list`) and works (`autovio_works_list`).
- Create projects with type presets (`autovio_projects_create` with `projectType`).
- Create and update works (`autovio_works_create`, `autovio_works_update`) with asset selection (`selectedAssetIds`, `assetUsageMode`).
- Manage project assets (`autovio_assets_list`, `autovio_assets_get`, `autovio_assets_analyze`, `autovio_assets_analyze_batch`, `autovio_assets_delete`).
- Generate scenarios and scenes (`autovio_works_generate_scenario`, `autovio_works_generate_scene`).
- Call direct AI tools (`autovio_ai_analyze_video`, `autovio_ai_generate_scenario`, `autovio_ai_generate_image`, `autovio_ai_generate_video`).

Use [MCP Tools Reference](../mcp/tools-reference/) for arguments and expected outputs, and Claude Code's documentation for how to invoke MCP tools from within the editor.

## Asset-based video generation

With asset tools, you can:

1. **List assets** for a project with `autovio_assets_list`.
2. **Analyze assets** to generate descriptions using `autovio_assets_analyze_batch` (useful for reference mode).
3. **Create works** with `selectedAssetIds` pointing to your assets.
4. Choose `assetUsageMode`:
   - `reference` — AI generates images matching asset style.
   - `direct` — Use actual asset photos, skip AI image generation.

## See also

- [MCP Overview](../mcp/overview/)
- [Cursor IDE](../mcp/cursor/)
- [MCP Workflows](../mcp/workflows/)
