---
title: EditorState Schema
description: Reference for EditorStateSnapshot, TimelineActionSnapshot, and overlay snapshots used by the editor.
---

# EditorState Schema

The **EditorStateSnapshot** captures the full state of the editor timeline, overlays, audio, and export settings. It is stored on each work and used to restore the editor after reload.

## TypeScript interfaces

Defined in `packages/shared/src/types/project.ts`:

```ts
export interface TimelineActionSnapshot {
  id: string;
  start: number;
  end: number;
  sceneIndex?: number;
  trimStart?: number;
  trimEnd?: number;
  transitionType?: string;
  transitionDuration?: number;
}

export interface TextOverlaySnapshot {
  text: string;
  fontSize: number;
  fontColor: string;
  centerX: number;
  centerY: number;
}

export interface ImageOverlaySnapshot {
  assetId: string;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  opacity: number;
  rotation: number;
  maintainAspectRatio?: boolean;
}

export interface EditorStateSnapshot {
  editorData: {
    videoTrack: TimelineActionSnapshot[];
    textTrack: TimelineActionSnapshot[];
    imageTrack?: TimelineActionSnapshot[];
    audioTrack: TimelineActionSnapshot[];
  };
  textOverlays: Record<string, TextOverlaySnapshot>;
  imageOverlays?: Record<string, ImageOverlaySnapshot>;
  audioUrl?: string;
  audioVolume: number;
  exportSettings: {
    width: number;
    height: number;
    fps: number;
  };
}
```

## TimelineActionSnapshot

Represents a clip or overlay action on a track.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique ID of the action. |
| start | number | Yes | Start time (seconds) on the timeline. |
| end | number | Yes | End time (seconds) on the timeline. |
| sceneIndex | number | No | Associated scene index (if any). |
| trimStart | number | No | Trim start offset within the source. |
| trimEnd | number | No | Trim end offset within the source. |
| transitionType | string | No | Transition type to the next clip (e.g. `fade`, `dissolve`). |
| transitionDuration | number | No | Transition duration in seconds. |

Used on:

- `videoTrack`
- `textTrack`
- `imageTrack`
- `audioTrack`

## Overlays

**TextOverlaySnapshot**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| text | string | Yes | Overlay text content. |
| fontSize | number | Yes | Font size in pixels. |
| fontColor | string | Yes | CSS color (e.g. `#FFFFFF`). |
| centerX | number | Yes | X position (center-relative) in pixels. |
| centerY | number | Yes | Y position (center-relative) in pixels. |

**ImageOverlaySnapshot**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| assetId | string | Yes | Project asset ID (see [Assets](/api/assets/)). |
| width | number | Yes | Width in pixels. |
| height | number | Yes | Height in pixels. |
| centerX | number | Yes | X position (center-relative). |
| centerY | number | Yes | Y position (center-relative). |
| opacity | number | Yes | Opacity (0–1). |
| rotation | number | Yes | Rotation in degrees. |
| maintainAspectRatio | boolean | No | Whether to preserve aspect ratio. |

Overlays are referenced from tracks by ID via `editorData` actions.

## EditorStateSnapshot

Top-level structure stored on a work:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| editorData | object | Yes | Track actions for video, text, image, and audio. |
| textOverlays | record | Yes | Map of text overlay ID → `TextOverlaySnapshot`. |
| imageOverlays | record | No | Map of image overlay ID → `ImageOverlaySnapshot`. |
| audioUrl | string | No | Work-level audio URL. |
| audioVolume | number | Yes | Audio volume (default 1). |
| exportSettings | object | Yes | Export resolution and fps. |

**exportSettings**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| width | number | Yes | Output width in pixels. |
| height | number | Yes | Output height in pixels. |
| fps | number | Yes | Frames per second. |

## Where it is stored

- On the **Work** model (`works.editorState`).
- Serialized via the [Works API](/api/works/) when you `PUT` a work.
- Populated by the editor UI when saving the timeline.

## See also

- [UI Guide: Step 5 – Editor](/ui-guide/step-5-editor/)
- [API: Works](/api/works/)

