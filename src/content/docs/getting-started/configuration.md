---
title: Configuration
description: AutoVio environment variables. MongoDB, JWT, port, and optional settings.
---

# Configuration

AutoVio is configured via environment variables. Copy `.env.example` to `.env` and set the values below.

## Required

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string (e.g. `mongodb://localhost:27017` or Atlas URI). |
| `JWT_SECRET` | Secret key for signing JWT access and refresh tokens. Use a long, random value in production. |

## Optional – Server

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend HTTP port. | `3001` |
| `VIRAGEN_DATA_DIR` | Root directory for binary files (project/work media, assets). | `packages/backend/data` |

## Optional – MongoDB

If you don't embed credentials in `MONGODB_URI`, you can set:

| Variable | Description |
|----------|-------------|
| `MONGODB_USERNAME` | Database username. |
| `MONGODB_PASSWORD` | Database password. |
| `MONGODB_DB_NAME` | Database name. | `autovio` |
| `MONGODB_AUTH_SOURCE` | Auth source (e.g. `admin`). |

## Optional – JWT

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_EXPIRES_IN` | Access token expiry (e.g. `7d`). | `7d` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry (e.g. `30d`). | `30d` |

## Optional – Default admin

For migrations or initial setup, you can create a default admin user:

| Variable | Description |
|----------|-------------|
| `DEFAULT_ADMIN_EMAIL` | Admin email (e.g. `admin@autovio.local`). |
| `DEFAULT_ADMIN_PASSWORD` | Admin password (change in production). |
| `DEFAULT_ADMIN_NAME` | Admin display name. |

## AI provider keys

AI provider API keys are **not** set in the backend `.env`. They are configured per user in the **Settings** UI (or via API/MCP). The backend reads provider and API key from request headers (e.g. `x-llm-provider`, `x-api-key`) or from the MCP server configuration.

## Example `.env`

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=autovio
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
```

:::caution
Never commit `.env` or real API keys to version control.
:::
