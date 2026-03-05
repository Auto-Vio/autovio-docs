---
title: Installation
description: Install AutoVio locally with Bun or Node. Requirements, clone, install, and run backend and frontend.
---

# Installation

This guide covers installing and running AutoVio on your machine.

## Requirements

- **[Bun](https://bun.sh/)** >= 1.0 (recommended) or Node.js >= 18
- **MongoDB** — Local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **FFmpeg** — Required for video export. The backend uses the `ffmpeg` and `ffprobe` CLI tools to render the final video from timeline clips, overlays, and audio. Install so that `ffmpeg` and `ffprobe` are available on your `PATH`.
- **API keys** for at least one AI provider (e.g. Google Gemini, OpenAI, Anthropic)

### Installing FFmpeg

- **macOS (Homebrew):** `brew install ffmpeg`
- **Ubuntu/Debian:** `sudo apt update && sudo apt install ffmpeg`
- **Windows:** Download from [ffmpeg.org](https://ffmpeg.org/download.html) or use a package manager such as Chocolatey: `choco install ffmpeg`

After installing, verify with `ffmpeg -version` and `ffprobe -version`.

## Steps

### 1. Clone and install

```bash
git clone <repository-url>
cd AutoVio
bun install
```

If you use npm:

```bash
npm install
```

### 2. Configure environment

Copy the example environment file and edit it:

```bash
cp .env.example .env
```

Set at least:

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT tokens (use a strong value in production)

See [Configuration](/getting-started/configuration/) for all environment variables.

### 3. Run the application

Start both backend and frontend:

```bash
bun run dev
```

- **Backend** — `http://localhost:3001`
- **Frontend** — `http://localhost:5173`

Run only backend or frontend:

```bash
bun run dev:backend   # backend only
bun run dev:frontend  # frontend only
```

### 4. Open the app

Open [http://localhost:5173](http://localhost:5173) in your browser. Register or log in, then create a project and a work to start the video pipeline.

## Next Steps

- [Quick Start](/getting-started/quickstart/) — Create your first video
- [Configuration](/getting-started/configuration/) — Environment variables reference
