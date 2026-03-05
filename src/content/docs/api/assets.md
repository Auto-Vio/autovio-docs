---
title: Assets API
description: Upload and manage project-level media assets (images, video, audio, fonts) for the editor and templates.
---

# Assets API

Project **assets** are reusable media files (logos, product shots, music, fonts) that you can use across all works in a project:

- Logo and watermark overlays in the editor
- Intro/outro clips and background footage
- Music or voice-over audio
- Custom fonts for text overlays

Assets are stored per project and exposed via `/api/projects/:projectId/assets`.

## Endpoints

| Method | Endpoint | Auth | Scope | Description |
|--------|----------|------|-------|-------------|
| GET | `/api/projects/:projectId/assets` | Yes | projects:read | List assets (optional `type` filter). |
| POST | `/api/projects/:projectId/assets` | Yes | projects:write | Upload an asset (multipart). |
| GET | `/api/projects/:projectId/assets/:assetId/meta` | Yes | projects:read | Get asset metadata (JSON). |
| PUT | `/api/projects/:projectId/assets/:assetId` | Yes | projects:write | Update asset metadata (name, tags). |
| GET | `/api/projects/:projectId/assets/:assetId` | Yes | projects:read | Get asset file (binary stream). |
| DELETE | `/api/projects/:projectId/assets/:assetId` | Yes | projects:write | Delete asset and its file. |

All routes require authentication. Scopes are checked via user JWT or API token.

## Asset object

**Asset metadata** (stored in MongoDB, returned from list/meta endpoints):

| Field | Type | Description |
|-------|------|-------------|
| id | string | Asset ID (e.g. `asset_xxx`). |
| projectId | string | Owning project ID. |
| name | string | Display name in the UI. |
| type | string | `image` \| `video` \| `audio` \| `font`. |
| filename | string | Filename on disk under the project assets directory. |
| mimeType | string | MIME type (e.g. `image/webp`). |
| size | number | File size in bytes. |
| width | number? | Image/video width (when known). |
| height | number? | Image/video height (when known). |
| duration | number? | Video/audio duration in seconds (when known). |
| tags | string[]? | Optional tags for filtering (e.g. `["logo", "brand"]`). |
| thumbnail | string? | Optional thumbnail reference. |
| createdAt | number | Unix timestamp (ms). |
| updatedAt | number | Unix timestamp (ms). |
| url | string | URL for the file: `/api/projects/:projectId/assets/:assetId`. |

The **list** and **meta** endpoints automatically add the `url` field so you can use it directly in the UI.

## List assets (GET /api/projects/:projectId/assets)

List all assets for a project. You can filter by type.

**Query parameters:**

| Name | Type | Description |
|------|------|-------------|
| type | string? | Optional `image` \| `video` \| `audio` \| `font`. |

**Example:**

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://api.autovio.com/api/projects/proj_123/assets?type=image"
```

**Response:**

```json
{
  "assets": [
    {
      "id": "asset_logo",
      "projectId": "proj_123",
      "name": "Brand Logo",
      "type": "image",
      "filename": "asset_logo.webp",
      "mimeType": "image/webp",
      "size": 123456,
      "width": 512,
      "height": 512,
      "tags": ["logo", "brand"],
      "createdAt": 1700000000000,
      "updatedAt": 1700000001000,
      "url": "/api/projects/proj_123/assets/asset_logo"
    }
  ],
  "totalSize": 123456,
  "count": 1
}
```

## Upload asset (POST /api/projects/:projectId/assets)

Upload an asset using `multipart/form-data`.

**Request:**

- Content-Type: `multipart/form-data`
- Fields:
  - `file` — required, the binary file
  - `name` — optional, display name (defaults to original filename)
  - `tags` — optional, JSON string or repeated field (e.g. `["logo","brand"]`)

**Example:**

```bash
curl -X POST "https://api.autovio.com/api/projects/proj_123/assets" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@logo.webp" \
  -F 'name=Brand Logo' \
  -F 'tags=["logo","brand"]'
```

**Response (201):**

```json
{
  "id": "asset_logo",
  "projectId": "proj_123",
  "name": "Brand Logo",
  "type": "image",
  "filename": "asset_logo.webp",
  "mimeType": "image/webp",
  "size": 123456,
  "width": 512,
  "height": 512,
  "tags": ["logo", "brand"],
  "createdAt": 1700000000000,
  "updatedAt": 1700000000000,
  "url": "/api/projects/proj_123/assets/asset_logo"
}
```

If no file is provided, the API returns `400 { "error": "No file uploaded" }`.

## Get asset metadata (GET /api/projects/:projectId/assets/:assetId/meta)

Return metadata plus `url` for a single asset.

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://api.autovio.com/api/projects/proj_123/assets/asset_logo/meta"
```

Useful when you need asset dimensions/duration in automation or UI logic.

## Update asset metadata (PUT /api/projects/:projectId/assets/:assetId)

Update `name` and/or `tags` without re-uploading the file.

**Request body (JSON):**

```json
{
  "name": "New Logo Name",
  "tags": ["logo", "hero"]
}
```

**Response:** Updated asset metadata with `url`. If the asset does not exist, returns `404`.

## Get asset file (GET /api/projects/:projectId/assets/:assetId)

Stream the asset file. This endpoint:

- Enforces authentication and `projects:read` scope.
- Sets `Content-Type` to the asset `mimeType`.
- Sets `Content-Disposition: inline; filename="Name.ext"` so browsers can preview images and videos.

**Token in query (for `<img>` / public links):**

If you cannot set `Authorization` headers (e.g. in an `<img>` tag), you can pass a token in the query:

```html
<img src="https://api.autovio.com/api/projects/proj_123/assets/asset_logo?token=YOUR_API_TOKEN" />
```

The server maps `?token=` to `Authorization: Bearer ...` internally.

## Delete asset (DELETE /api/projects/:projectId/assets/:assetId)

Delete metadata and the underlying file from disk.

**Response:**

- `204 No Content` on success.
- `404` if the asset does not exist.

Be careful: works and templates that referenced this asset will no longer be able to render it.

## Usage in the editor & templates

- The **Project Assets Panel** in the UI uses this API to list, upload, preview, and delete assets.
- The editor’s **image overlays** and **Templates panel** reference assets by `assetId` and resolve them to URLs using this API.
- The export pipeline pulls image/video assets from disk via these URLs when rendering overlays into the final MP4.

## See also

- [UI Guide: Step 5 – Editor](/ui-guide/step-5-editor/)
- [UI Guide: Templates](/ui-guide/templates/)
- [Templates API](/api/templates/)

