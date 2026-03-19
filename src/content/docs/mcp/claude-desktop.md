---
title: Claude Desktop
description: Use the AutoVio MCP server from Claude Desktop — no clone or build required, runs via npx.
---

# Claude Desktop

Add the AutoVio MCP server to Claude Desktop by updating your `claude_desktop_config.json`. The server runs via `npx` — no clone or build step needed.

## Config file location

| Platform | Path |
|----------|------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |

## Configuration

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
        "--video-api-key", "YOUR_VIDEO_KEY",
        "--log-level", "info"
      ]
    }
  }
}
```

Replace the `YOUR_*` placeholders with your real API token and provider keys.

## Config with environment variables

You can rely on environment variables instead of passing all flags in `args`:

```json
{
  "mcpServers": {
    "autovio": {
      "command": "npx",
      "args": ["-y", "autovio-mcp"],
      "env": {
        "AUTOVIO_BASE_URL": "http://localhost:3001",
        "AUTOVIO_API_TOKEN": "your-token",
        "AUTOVIO_LLM_MODEL": "gemini-2.5-flash",
        "AUTOVIO_LLM_API_KEY": "your-llm-key",
        "AUTOVIO_IMAGE_MODEL": "gemini-2.5-flash-image",
        "AUTOVIO_IMAGE_API_KEY": "your-image-key",
        "AUTOVIO_VIDEO_MODEL": "veo-3.0-generate-001",
        "AUTOVIO_VIDEO_API_KEY": "your-video-key"
      }
    }
  }
}
```

## Using tools in Claude

Once configured, restart Claude Desktop. It will show an **AutoVio** entry in the MCP servers panel. You can then call tools like `autovio_projects_create`, `autovio_works_create`, or `autovio_works_generate_scene` from within a chat.

See [MCP Tools Reference](../mcp/tools-reference/) for a complete list of tools and parameters.
