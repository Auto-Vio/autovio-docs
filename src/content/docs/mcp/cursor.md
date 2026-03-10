---
title: Cursor IDE
description: Use the AutoVio MCP server from MCP-compatible IDEs like Cursor.
---

# Cursor IDE

The AutoVio MCP server is a standard **Model Context Protocol** server. Any MCP-compatible IDE or assistant that can run a Node.js command and connect over stdio can use it, including Cursor.

## Command to run

MCP clients should run the built server entry point with Node:

```bash
node /path/to/AutoVio-MCP/dist/index.js \
  --autovio-base-url http://localhost:3001 \
  --autovio-api-token YOUR_API_TOKEN \
  --vision-model gemini-2.0-flash-exp --vision-api-key YOUR_VISION_KEY \
  --llm-model gemini-2.5-flash --llm-api-key YOUR_LLM_KEY \
  --image-model gemini-2.5-flash-image --image-api-key YOUR_IMAGE_KEY \
  --video-model veo-3.0-generate-001 --video-api-key YOUR_VIDEO_KEY
```

This is the same pattern used in the Claude Desktop example; see [MCP Setup](../mcp/setup/) and [Claude Desktop](../mcp/claude-desktop/).

## Environment variables

Instead of passing all flags in the command, you can configure the environment:

- `AUTOVIO_BASE_URL`
- `AUTOVIO_API_TOKEN`
- `AUTOVIO_VISION_MODEL`, `AUTOVIO_VISION_API_KEY`
- `AUTOVIO_LLM_MODEL`, `AUTOVIO_LLM_API_KEY`
- `AUTOVIO_IMAGE_MODEL`, `AUTOVIO_IMAGE_API_KEY`
- `AUTOVIO_VIDEO_MODEL`, `AUTOVIO_VIDEO_API_KEY`
- `AUTOVIO_LOG_LEVEL`

The MCP server will read these and merge them with any CLI flags or config file values.

## Using tools from the IDE

Once the IDE is configured to start the AutoVio MCP server:

- It can call tools like `autovio_projects_create`, `autovio_works_generate_scenario`, or `autovio_ai_generate_image`.
- Each tool returns JSON text content that you can inspect or pipe into further actions.

Refer to your IDE’s MCP documentation for the exact configuration format, and use [MCP Tools Reference](../mcp/tools-reference/) for the list of available tools and parameters.

