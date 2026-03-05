---
title: OpenCode Integration
description: Use the AutoVio MCP server from OpenCode or other MCP-based coding tools.
---

# OpenCode Integration

OpenCode (and similar coding tools) can connect to AutoVio via the **Model Context Protocol** using the AutoVio MCP server.

## MCP server command

Configure OpenCode to start the AutoVio MCP server as an external process, using the same entry point as other MCP clients:

```bash
node /path/to/AutoVio-MCP/dist/index.js \
  --autovio-base-url http://localhost:3001 \
  --autovio-api-token YOUR_API_TOKEN \
  --vision-model gemini-2.0-flash-exp --vision-api-key YOUR_VISION_KEY \
  --llm-model gemini-2.5-flash --llm-api-key YOUR_LLM_KEY \
  --image-model gemini-2.5-flash-image --image-api-key YOUR_IMAGE_KEY \
  --video-model veo-3.0-generate-001 --video-api-key YOUR_VIDEO_KEY
```

See [MCP Setup](/mcp/setup/) for all supported flags and environment variables.

## Environment-based configuration

Alternatively, run the server with env variables:

```bash
AUTOVIO_BASE_URL=http://localhost:3001 \
AUTOVIO_API_TOKEN=your-token \
AUTOVIO_LLM_API_KEY=your-llm-key \
node /path/to/AutoVio-MCP/dist/index.js
```

You can add additional env variables for vision, image, and video models and keys as needed.

## Available tools

Once OpenCode connects to the MCP server, it can use the same tools documented in [MCP Tools Reference](/mcp/tools-reference/), including:

- `autovio_projects_*` — manage projects
- `autovio_works_*` — manage works and run the pipeline
- `autovio_ai_*` — direct AI operations
- `autovio_templates_*` — manage templates
- `autovio_providers_list` — discover providers and models

Refer to OpenCode’s MCP documentation for how to register an MCP server; the AutoVio side only requires the command and configuration described here.

## See also

- [MCP Overview](/mcp/overview/)
- [Claude Desktop](/mcp/claude-desktop/)
- [MCP Tools Reference](/mcp/tools-reference/)

