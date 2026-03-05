---
title: Templates API
description: Manage editor templates for reusable overlay compositions and apply them to works.
---

# Templates API

Templates are **project-level reusable overlay compositions** used by the editor. A template can contain:

- Text overlays (titles, CTAs, lower-thirds)
- Image overlays (logos, watermarks, badges) referencing **project assets**
- Optional default transition and export settings (width, height, fps)

Templates live under a project and can be applied to any work (video pipeline) in that project.

## Endpoints

| Method | Endpoint | Auth | Scope | Description |
|--------|----------|------|-------|-------------|
| GET | `/api/projects/:projectId/templates` | Yes | projects:read | List templates (meta only). |
| POST | `/api/projects/:projectId/templates` | Yes | projects:write | Create a new template. |
| GET | `/api/projects/:projectId/templates/:templateId` | Yes | projects:read | Get full template with content. |
| PUT | `/api/projects/:projectId/templates/:templateId` | Yes | projects:write | Update template (name, tags, content). |
| DELETE | `/api/projects/:projectId/templates/:templateId` | Yes | projects:write | Delete template. |
| POST | `/api/projects/:projectId/templates/:templateId/apply` | Yes | projects:read | Apply template and get overlay data (does **not** save work). |
| POST | `/api/projects/:projectId/works/:workId/apply-template` | Yes | works:write | Apply template to a work and **persist** editor state. |

All endpoints require authentication. Scopes are enforced via API tokens or user JWT.

## Template object

**Template meta (list item)** — returned by `GET /api/projects/:projectId/templates`:

| Field | Type | Description |
|-------|------|-------------|
| id | string | Template ID. |
| name | string | Template name shown in the UI. |
| description | string? | Optional human-readable description. |
| thumbnail | string? | Optional URL to a preview thumbnail. |
| createdAt | number | Unix timestamp (ms). |
| updatedAt | number | Unix timestamp (ms). |
| tags | string[]? | Optional tags for filtering/search. |
| textOverlayCount | number | Number of text overlays in the template. |
| imageOverlayCount | number | Number of image overlays in the template. |
| hasExportSettings | boolean | Whether export settings are included. |

**Full template** — returned by `GET /api/projects/:projectId/templates/:templateId` and `POST /api/projects/:projectId/templates`:

| Field | Type | Description |
|-------|------|-------------|
| id | string | Template ID. |
| projectId | string | Owning project ID. |
| name | string | Template name. |
| description | string? | Optional description. |
| thumbnail | string? | Optional thumbnail URL/path. |
| content | object | Template content (text/image overlays, default transition, exportSettings). |
| tags | string[]? | Optional tags. |
| createdAt | number | Unix timestamp (ms). |
| updatedAt | number | Unix timestamp (ms). |

**Template content** (`content` field):

| Field | Type | Description |
|-------|------|-------------|
| textOverlays | TemplateTextOverlay[] | Text overlays with timing. |
| imageOverlays | TemplateImageOverlay[] | Image overlays using project assets. |
| defaultTransition | object? | Optional `{ type, duration }` applied when no per-clip transition is set. |
| exportSettings | object? | Optional `{ width, height, fps }` export defaults. |

Each **TemplateTextOverlay**:

| Field | Type | Description |
|-------|------|-------------|
| id | string | Overlay ID inside the template. |
| text | string | Text content (supports placeholders like `{{product_name}}`). |
| fontSize | number | Font size in pixels. |
| fontColor | string | CSS color (e.g. `#FFFFFF`). |
| centerX | number | X position (center-relative) in pixels. |
| centerY | number | Y position (center-relative) in pixels. |
| timingMode | string | `"relative"` or `"absolute"`. |
| startPercent | number? | Relative start time (0–100) when `timingMode = "relative"`. |
| endPercent | number? | Relative end time (0–100) when `timingMode = "relative"`. |
| startSeconds | number? | Absolute start time in seconds when `timingMode = "absolute"`. |
| endSeconds | number? | Absolute end time in seconds when `timingMode = "absolute"`. |

Each **TemplateImageOverlay**:

| Field | Type | Description |
|-------|------|-------------|
| id | string | Overlay ID inside the template. |
| assetId | string | Project asset ID (see [Assets](/api/assets/)). |
| width | number | Width in pixels. |
| height | number | Height in pixels. |
| centerX | number | X position (center-relative). |
| centerY | number | Y position (center-relative). |
| opacity | number | Opacity (0–1). |
| rotation | number | Rotation in degrees. |
| maintainAspectRatio | boolean | Keep original aspect ratio. |
| timingMode | string | `"relative"` or `"absolute"`. |
| startPercent | number? | Relative start time (0–100). |
| endPercent | number? | Relative end time (0–100). |
| startSeconds | number? | Absolute start time in seconds. |
| endSeconds | number? | Absolute end time in seconds. |

## List templates (GET /api/projects/:projectId/templates)

List project-level templates (meta only).

**Response:**

```json
{
  "templates": [
    {
      "id": "tmpl_123",
      "name": "Brand Intro",
      "description": "Logo + headline intro overlay",
      "thumbnail": "/api/projects/proj_123/templates/tmpl_123/thumbnail",
      "createdAt": 1700000000000,
      "updatedAt": 1700000001000,
      "tags": ["intro", "brand"],
      "textOverlayCount": 1,
      "imageOverlayCount": 1,
      "hasExportSettings": true
    }
  ],
  "count": 1
}
```

Use this endpoint to power the **Templates panel** in the editor.

## Create template (POST /api/projects/:projectId/templates)

Save the current overlay layout as a reusable template.

**Request body:**

```json
{
  "name": "Brand Intro",
  "description": "Logo on top, CTA text in the middle",
  "tags": ["intro", "brand"],
  "content": {
    "textOverlays": [
      {
        "id": "title-1",
        "text": "{{product_name}} in 30 seconds",
        "fontSize": 42,
        "fontColor": "#FFFFFF",
        "centerX": 540,
        "centerY": 300,
        "timingMode": "relative",
        "startPercent": 10,
        "endPercent": 40
      }
    ],
    "imageOverlays": [
      {
        "id": "logo-1",
        "assetId": "asset_logo",
        "width": 160,
        "height": 160,
        "centerX": 180,
        "centerY": 220,
        "opacity": 0.9,
        "rotation": 0,
        "maintainAspectRatio": true,
        "timingMode": "relative",
        "startPercent": 0,
        "endPercent": 100
      }
    ],
    "defaultTransition": {
      "type": "fade",
      "duration": 0.5
    },
    "exportSettings": {
      "width": 1080,
      "height": 1920,
      "fps": 30
    }
  }
}
```

**Response:** Full `EditorTemplate` object including `id`, `projectId`, timestamps, and content.

## Get / Update / Delete template

- **GET** `/api/projects/:projectId/templates/:templateId` — fetch full template with `content`.
- **PUT** `/api/projects/:projectId/templates/:templateId` — update `name`, `description`, `tags`, or full `content`.
- **DELETE** `/api/projects/:projectId/templates/:templateId` — remove the template.

All three require the project owner and the correct scopes.

## Apply template (project-level, no save)

**POST** `/api/projects/:projectId/templates/:templateId/apply`

Use this when you want to **preview or merge a template into the current editor state** without automatically saving the work. The backend:

1. Loads the template.
2. Uses `videoDuration` (seconds) to resolve relative timing.
3. Applies placeholder values (e.g. `{{product_name}}`) from `placeholderValues`.
4. Returns text/image overlays and track actions you can merge into the editor state.

**Request body:**

```json
{
  "videoDuration": 30,
  "placeholderValues": {
    "product_name": "EcoBottle",
    "brand": "Acme Co."
  }
}
```

**Response:**

```json
{
  "textOverlays": {
    "title-1": {
      "text": "EcoBottle in 30 seconds",
      "fontSize": 42,
      "fontColor": "#FFFFFF",
      "centerX": 540,
      "centerY": 300
    }
  },
  "textTrackActions": [
    { "id": "title-1", "start": 3, "end": 12 }
  ],
  "imageOverlays": {
    "logo-1": {
      "assetId": "asset_logo",
      "width": 160,
      "height": 160,
      "centerX": 180,
      "centerY": 220,
      "opacity": 0.9,
      "rotation": 0,
      "maintainAspectRatio": true
    }
  },
  "imageTrackActions": [
    { "id": "logo-1", "start": 0, "end": 30 }
  ],
  "exportSettings": {
    "width": 1080,
    "height": 1920,
    "fps": 30
  },
  "missingAssetIds": []
}
```

The client is responsible for:

- Merging overlays and track actions into the current work’s `editorState`.
- Persisting changes by calling `PUT /api/projects/:projectId/works/:workId`.

## Apply template to work (with save)

**POST** `/api/projects/:projectId/works/:workId/apply-template`

Use this to **apply a template and save the updated editor state** in one call. The backend:

1. Loads the project, work, and template.
2. Computes video duration from `work.videoDuration` or `sum(work.scenes[].duration_seconds)`.
3. Applies the template (overlays + track actions) and merges into `work.editorState`.
4. Persists the work and returns the full `Work` object (`WorkResponse`).

**Request body:**

```json
{
  "templateId": "tmpl_123",
  "placeholderValues": {
    "product_name": "EcoBottle",
    "brand": "Acme Co."
  }
}
```

**Response:** Full `Work` with updated `editorState` (including new `imageTrack` / `textTrack` actions and overlays).

## Placeholders

Templates can contain placeholders such as `{{product_name}}`, `{{brand}}`, or any custom key. When applying:

- `placeholderValues` is a map of `key -> value`.
- All occurrences of `{{key}}` in text overlays are replaced with the provided value.

If a placeholder is not provided, it remains as-is in the overlay text.

## See also

- [UI Guide: Templates](/ui-guide/templates/)
- [Editor & Export](/ui-guide/step-5-editor/)
- [Assets API](/api/assets/) — Assets referenced by templates

