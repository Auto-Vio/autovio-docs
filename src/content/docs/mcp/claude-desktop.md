---
title: Claude Desktop
description: Use the AutoVio MCP server from Claude Desktop with mcpServers configuration.
---

# Claude Desktop

You can use the **AutoVio MCP server** directly from Claude Desktop by adding it under `mcpServers` in the Claude config.

## Config with CLI arguments

This example is taken from `examples/claude-desktop-config.json` in the MCP project:

```json
{
  "mcpServers": {
    "autovio": {
      "command": "node",
      "args": [
        "/path/to/AutoVio-MCP/dist/index.js",
        "--autovio-base-url",
        "http://localhost:3001",
        "--autovio-api-token",
        "YOUR_API_TOKEN",
        "--vision-model",
        "gemini-2.0-flash-exp",
        "--vision-api-key",
        "YOUR_VISION_KEY",
        "--llm-model",
        "gemini-2.5-flash",
        "--llm-api-key",
        "YOUR_LLM_KEY",
        "--image-model",
        "gemini-2.5-flash-image",
        "--image-api-key",
        "YOUR_IMAGE_KEY",
        "--video-model",
        "veo-3.0-generate-001",
        "--video-api-key",
        "YOUR_VIDEO_KEY",
        "--log-level",
        "info"
      ]
    }
  }
}
```

Replace:

- `/path/to/AutoVio-MCP/dist/index.js` with the absolute path to your built MCP server entry.
- `YOUR_API_TOKEN` with an AutoVio API token.
- `YOUR_*_KEY` values with real provider keys.

## Config with environment variables

You can also rely on environment variables instead of passing all flags in `args`. Example from the MCP README:

```json
{
  "mcpServers": {
    "autovio": {
      "command": "node",
      "args": ["/path/to/AutoVio-MCP/dist/index.js"],
      "env": {
        "AUTOVIO_BASE_URL": "http://localhost:3001",
        "AUTOVIO_API_TOKEN": "your-token",
        "AUTOVIO_LLM_API_KEY": "your-llm-key"
      }
    }
  }
}
```

You can add additional env keys such as:

- `AUTOVIO_VISION_MODEL`, `AUTOVIO_VISION_API_KEY`
- `AUTOVIO_LLM_MODEL`, `AUTOVIO_LLM_API_KEY`
- `AUTOVIO_IMAGE_MODEL`, `AUTOVIO_IMAGE_API_KEY`
- `AUTOVIO_VIDEO_MODEL`, `AUTOVIO_VIDEO_API_KEY`
- `AUTOVIO_LOG_LEVEL`

The MCP server merges CLI flags, env vars, config file, and defaults as described in [MCP Setup](../mcp/setup/).

## Using tools in Claude

Once configured and running:

- Claude Desktop will show an **AutoVio** MCP server entry.
- You can call tools like `autovio_projects_create`, `autovio_works_create`, or `autovio_works_generate_scene` from within a chat.

See [MCP Tools Reference](../mcp/tools-reference/) for a complete list of tools and parameters.

