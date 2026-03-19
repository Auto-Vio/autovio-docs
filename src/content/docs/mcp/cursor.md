---
title: Cursor IDE
description: Use the AutoVio MCP server from Cursor IDE — runs via npx, no clone or build required.
---

# Cursor IDE

The AutoVio MCP server runs as a standard **Model Context Protocol** server over stdio. Cursor and any other MCP-compatible IDE can use it with `npx` — no clone or build needed.

## Configuration

In Cursor's MCP settings (`.cursor/mcp.json` or the global MCP config), add:

```json
{
  "mcpServers": {
    "autovio": {
      "command": "npx",
      "args": [
        "-y", "autovio-mcp",
        "--autovio-base-url", "http://localhost:3001",
        "--autovio-api-token", "YOUR_API_TOKEN",
        "--vision-model", "gemini-2.0-flash-exp",
        "--vision-api-key", "YOUR_VISION_KEY",
        "--llm-model", "gemini-2.5-flash",
        "--llm-api-key", "YOUR_LLM_KEY",
        "--image-model", "gemini-2.5-flash-image",
        "--image-api-key", "YOUR_IMAGE_KEY",
        "--video-model", "veo-3.0-generate-001",
        "--video-api-key", "YOUR_VIDEO_KEY"
      ]
    }
  }
}
```

## Configuration with environment variables

Instead of passing all flags in `args`, you can set environment variables:

```
AUTOVIO_BASE_URL        AUTOVIO_API_TOKEN
AUTOVIO_VISION_MODEL    AUTOVIO_VISION_API_KEY
AUTOVIO_LLM_MODEL       AUTOVIO_LLM_API_KEY
AUTOVIO_IMAGE_MODEL     AUTOVIO_IMAGE_API_KEY
AUTOVIO_VIDEO_MODEL     AUTOVIO_VIDEO_API_KEY
AUTOVIO_LOG_LEVEL
```

Then the minimal config becomes:

```json
{
  "mcpServers": {
    "autovio": {
      "command": "npx",
      "args": ["-y", "autovio-mcp"]
    }
  }
}
```

## Using tools from the IDE

Once configured, Cursor can call tools like `autovio_projects_create`, `autovio_works_generate_scenario`, or `autovio_ai_generate_image` directly in the chat or agent panel.

Each tool returns JSON text content that you can inspect or pass to further actions. See [MCP Tools Reference](../mcp/tools-reference/) for the complete list of tools and their parameters.

See also [MCP Setup](../mcp/setup/) for the full configuration reference.
