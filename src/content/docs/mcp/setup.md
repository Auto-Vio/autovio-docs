---
title: MCP Setup
description: Install and run the AutoVio MCP server. Configuration, CLI flags, and environment variables.
---

# MCP Setup

This page shows how to install and run the **AutoVio MCP server** so MCP clients (like Claude Desktop) can call the AutoVio API.

## Installation

From the `AutoVio-MCP` directory:

```bash
npm install
npm run build
```

This compiles the TypeScript sources into `dist/` and prepares the CLI entry point.

## Running the server

You can run the MCP server directly with Node:

```bash
# Default (env or default baseUrl/token)
node dist/index.js

# With config file
node dist/index.js --config examples/config.example.json

# Development (watch)
npm run dev
```

The entry point (`src/index.ts`) loads configuration, sets the log level, and then calls `startServer` with stdio transport.

## Configuration sources and precedence

Configuration is merged from four sources with this priority (highest first):

1. **CLI parameters**
2. **Environment variables**
3. **Config file (JSON)**
4. **Defaults**

### 1. CLI parameters

CLI flags cover AutoVio connection, logging, and the 4 AI model+key pairs:

| Flag | Description |
|------|-------------|
| `--config` | Path to JSON config file. |
| `--autovio-base-url` | AutoVio API base URL. |
| `--autovio-api-token` | AutoVio API token. |
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

The server reads the following env variables:

- `AUTOVIO_BASE_URL`
- `AUTOVIO_API_TOKEN`
- `AUTOVIO_VISION_MODEL`, `AUTOVIO_VISION_API_KEY`
- `AUTOVIO_LLM_MODEL`, `AUTOVIO_LLM_API_KEY`
- `AUTOVIO_IMAGE_MODEL`, `AUTOVIO_IMAGE_API_KEY`
- `AUTOVIO_VIDEO_MODEL`, `AUTOVIO_VIDEO_API_KEY`
- `AUTOVIO_LOG_LEVEL`
- `AUTOVIO_MCP_CONFIG` (JSON config string)

### 3. Config file

You can pass a JSON config via `--config` or load it through env. Example (`examples/config.example.json`):

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

At runtime the merged config has this shape:

| Section | Fields | Description |
|---------|--------|-------------|
| `server` | `name`, `version` | MCP server metadata. |
| `autovio` | `baseUrl`, `apiToken` | AutoVio REST API connection. |
| `providers` | `vision`, `llm`, `image`, `video` | Model+API key pairs for each AI category. |
| `features` | `enableResources`, `enablePrompts`, `cacheResponses`, `logLevel` | MCP feature flags and logging. |

Each provider entry is:

| Field | Type | Description |
|-------|------|-------------|
| `model` | string | Model name (e.g. `gemini-2.0-flash-exp`). |
| `apiKey` | string | API key for that model. |

The server derives the provider ID from the model name (e.g. `gemini`, `claude`, `openai`) before calling the AutoVio API.

## Requirements

- Node.js >= 18 (enforced by `engines.node` in `package.json`)
- A running AutoVio backend (see [Installation](../getting-started/installation/))
- An AutoVio API token or user credentials
- API keys for the AI providers you want to use

## See also

- [MCP Overview](../mcp/overview/)
- [Claude Desktop Integration](../mcp/claude-desktop/)
- [MCP Tools Reference](../mcp/tools-reference/)

