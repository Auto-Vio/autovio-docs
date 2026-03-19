---
title: MCP Setup
description: Install and run the AutoVio MCP server. Configuration, CLI flags, and environment variables.
---

# MCP Setup

The AutoVio MCP server is published on npm as [`autovio-mcp`](https://www.npmjs.com/package/autovio-mcp). No clone or build step is needed — run it directly with `npx`.

## Installation

![AutoVio MCP Setup](/autovio-docs/setup.gif)

No installation required. `npx` downloads and runs the latest version automatically:

```bash
npx autovio-mcp --autovio-base-url http://localhost:3001 --autovio-api-token YOUR_TOKEN
```

To install globally and skip the `npx` prefix:

```bash
npm install -g autovio-mcp
```

## Running the server

```bash
# With CLI flags
npx autovio-mcp --autovio-base-url http://localhost:3001 --autovio-api-token YOUR_TOKEN

# With a config file
npx autovio-mcp --config /path/to/config.json

# With environment variables (no flags needed)
AUTOVIO_BASE_URL=http://localhost:3001 AUTOVIO_API_TOKEN=your-token npx autovio-mcp
```

## Configuration sources and precedence

Configuration is merged from four sources with this priority (highest first):

1. **CLI parameters**
2. **Environment variables**
3. **Config file (JSON)**
4. **Defaults**

### 1. CLI parameters

| Flag | Description |
|------|-------------|
| `--autovio-base-url` | AutoVio API base URL. |
| `--autovio-api-token` | AutoVio API token. |
| `--config` | Path to JSON config file. |
| `--vision-model` | Vision model (e.g. `gemini-2.0-flash-exp`). |
| `--vision-api-key` | Vision API key. |
| `--llm-model` | LLM model (e.g. `gemini-2.5-flash`). |
| `--llm-api-key` | LLM API key. |
| `--image-model` | Image model (e.g. `gemini-2.5-flash-image`). |
| `--image-api-key` | Image API key. |
| `--video-model` | Video model (e.g. `veo-3.0-generate-001`). |
| `--video-api-key` | Video API key. |
| `--log-level` | `debug` \| `info` \| `warn` \| `error`. |
| `--enable-resources` | `true` \| `false`. |
| `--enable-prompts` | `true` \| `false`. |

CamelCase variants like `--autovioBaseUrl` are also accepted.

### 2. Environment variables

```
AUTOVIO_BASE_URL        AUTOVIO_API_TOKEN
AUTOVIO_VISION_MODEL    AUTOVIO_VISION_API_KEY
AUTOVIO_LLM_MODEL       AUTOVIO_LLM_API_KEY
AUTOVIO_IMAGE_MODEL     AUTOVIO_IMAGE_API_KEY
AUTOVIO_VIDEO_MODEL     AUTOVIO_VIDEO_API_KEY
AUTOVIO_LOG_LEVEL       AUTOVIO_MCP_CONFIG
```

### 3. Config file

Pass a JSON config via `--config`. Example (`examples/config.example.json` in the [autovio-mcp](https://github.com/Auto-Vio/autovio-mcp) repo):

```json
{
  "server": {
    "name": "autovio-mcp-server",
    "version": "1.0.0"
  },
  "autovio": {
    "baseUrl": "http://localhost:3001",
    "apiToken": "YOUR_AUTOVIO_API_TOKEN"
  },
  "providers": {
    "vision": {
      "model": "gemini-2.0-flash-exp",
      "apiKey": "YOUR_VISION_API_KEY"
    },
    "llm": {
      "model": "gemini-2.5-flash",
      "apiKey": "YOUR_LLM_API_KEY"
    },
    "image": {
      "model": "gemini-2.5-flash-image",
      "apiKey": "YOUR_IMAGE_API_KEY"
    },
    "video": {
      "model": "veo-3.0-generate-001",
      "apiKey": "YOUR_VIDEO_API_KEY"
    }
  },
  "features": {
    "enableResources": true,
    "enablePrompts": false,
    "cacheResponses": false,
    "logLevel": "info"
  }
}
```

### 4. Default structure

| Section | Fields | Description |
|---------|--------|-------------|
| `server` | `name`, `version` | MCP server metadata. |
| `autovio` | `baseUrl`, `apiToken` | AutoVio REST API connection. |
| `providers` | `vision`, `llm`, `image`, `video` | Model + API key pairs for each AI role. |
| `features` | `enableResources`, `enablePrompts`, `cacheResponses`, `logLevel` | MCP feature flags and logging. |

The server derives the provider ID from the model name (e.g. `gemini`, `claude`, `openai`) before calling the AutoVio API.

## Requirements

- Node.js >= 18
- A running AutoVio backend (see [Installation](../getting-started/installation/))
- An AutoVio API token or user credentials
- API keys for the AI providers you want to use

## See also

- [MCP Overview](../mcp/overview/)
- [Claude Desktop Integration](../mcp/claude-desktop/)
- [MCP Tools Reference](../mcp/tools-reference/)
