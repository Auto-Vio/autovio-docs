---
title: MCP Overview
description: Use AutoVio through the Model Context Protocol (MCP) with Claude Code, Claude Desktop, Cursor, and other MCP clients.
---

# MCP Overview

The **AutoVio MCP server** lets you call the AutoVio API directly from MCP-compatible clients such as Claude Code, Claude Desktop, and Cursor. It exposes tools for:

- Health checks
- Authentication (login/register/me)
- Project and work management
- AI analysis, scenario, image and video generation
- Provider and template management

Instead of writing HTTP requests by hand, you call MCP tools like `autovio_projects_create` or `autovio_ai_generate_image` from your AI assistant.

## How it works

The MCP server is published on npm as [`autovio-mcp`](https://www.npmjs.com/package/autovio-mcp) and runs via `npx` — no clone or build needed.

When started, the server:

1. Loads configuration (AutoVio base URL, API token, AI models and keys).
2. Creates an `AutoVioClient` to talk to the AutoVio REST API.
3. Registers tools with the MCP SDK.
4. Communicates with the MCP client over **stdio**.

Clients start the server with `"command": "npx", "args": ["-y", "autovio-mcp", ...]` in their MCP config.

When you call a tool in the MCP client, the server:

1. Validates the tool input with Zod schemas.
2. Calls the corresponding AutoVio API endpoint(s).
3. Returns formatted JSON text back to the client.

## Tool groups

| Group | Examples | Description |
|-------|----------|-------------|
| Health | `autovio_health` | Check API and MCP connectivity. |
| Auth | `autovio_auth_login`, `autovio_auth_register`, `autovio_auth_me` | Authenticate and fetch current user info. |
| Projects | `autovio_projects_list`, `autovio_projects_create`, `autovio_projects_get`, `autovio_projects_update`, `autovio_projects_delete` | Manage projects. |
| Works | `autovio_works_list`, `autovio_works_create`, `autovio_works_get`, `autovio_works_update`, `autovio_works_delete`, `autovio_works_apply_template`, `autovio_works_generate_scenario`, `autovio_works_generate_scene` | Manage works and run the video pipeline. |
| AI | `autovio_ai_analyze_video`, `autovio_ai_generate_scenario`, `autovio_ai_generate_image`, `autovio_ai_generate_video` | Direct AI operations not tied to a specific work. |
| Providers | `autovio_providers_list` | List AI providers and models. |
| Templates | `autovio_templates_list`, `autovio_templates_get`, `autovio_templates_create`, `autovio_templates_update`, `autovio_templates_delete` | Manage editor templates. |

See [MCP Tools Reference](../mcp/tools-reference/) for full input schemas and usage examples.

## When to use MCP vs REST API

Use **MCP** when:

- You are inside an AI IDE or assistant (Claude Code, Claude Desktop, Cursor, etc.).
- You want the assistant to call tools directly without managing HTTP and auth.

Use the **REST API** when:

- You integrate AutoVio into your own backend services or automation workflows.
- You want full control over HTTP requests and responses.

## Requirements

- Node.js >= 18
- Access to an AutoVio API instance (base URL + API token or credentials)

## See also

- [MCP Setup](../mcp/setup/)
- [MCP Tools Reference](../mcp/tools-reference/)
- [API Overview](../api/overview/)
