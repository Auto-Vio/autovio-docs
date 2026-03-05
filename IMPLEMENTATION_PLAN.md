# AutoVio Documentation Site - Implementation Plan

Astro + Starlight ile docs sitesi implementasyon planı.

## Tech Stack

- **Framework:** Astro + Starlight
- **Content:** Markdown/MDX
- **Styling:** Starlight default + custom CSS
- **Search:** Pagefind (Starlight built-in)
- **Deployment:** Vercel/Netlify (static)

---

## Phase 1: Project Setup
All docs must be english

### 1.1 Initialize Astro + Starlight

```bash
cd AutoVio-Docs
npm create astro@latest -- --template starlight
npm install
```

### 1.2 Configure `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'AutoVio Docs',
      social: {
        github: 'https://github.com/your-repo/autovio',
      },
      sidebar: [
        // Phase 2'de detaylandırılacak
      ],
    }),
  ],
});
```

---

## Phase 2: Documentation Structure

### 2.1 Sidebar & Page Structure

```
src/content/docs/
├── index.mdx                     # Homepage
├── getting-started/
│   ├── introduction.md           # What is AutoVio
│   ├── installation.md           # Local setup
│   ├── quickstart.md             # First video in 5 minutes
│   └── configuration.md          # Environment variables
│
├── concepts/
│   ├── projects-and-works.md     # Project vs Work hierarchy
│   ├── pipeline-overview.md      # 5-step video pipeline
│   ├── modes.md                  # style_transfer vs content_remix
│   └── providers.md              # AI providers (Gemini, OpenAI, etc.)
│
├── ui-guide/
│   ├── projects-panel.md         # Projects list, create, settings
│   ├── works-panel.md            # Works list, create work
│   ├── step-1-init.md            # Init step (product info, mode)
│   ├── step-2-analyze.md         # Reference video analysis
│   ├── step-3-scenario.md        # Scenario generation
│   ├── step-4-generate.md        # Image & video generation
│   ├── step-5-editor.md          # Timeline editor, overlays
│   └── templates.md              # Template system
│
├── system-prompts/
│   ├── overview.md               # How prompts work
│   ├── scenario-prompt.md        # DEFAULT_SCENARIO_SYSTEM_PROMPT
│   ├── analyzer-prompt.md        # DEFAULT_ANALYZER_PROMPT
│   ├── image-prompt.md           # Image generation prompt building
│   ├── video-prompt.md           # Video generation prompt building
│   └── customization.md         # How to customize prompts
│
├── api/
│   ├── overview.md               # API introduction, auth
│   ├── authentication.md         # Login, register, tokens
│   ├── projects.md               # Projects CRUD
│   ├── works.md                  # Works CRUD + generate endpoints
│   ├── ai-endpoints.md           # /analyze, /scenario, /generate/*
│   ├── templates.md              # Templates CRUD + apply
│   ├── assets.md                 # Asset upload/management
│   └── providers.md              # /providers endpoint
│
├── mcp/
│   ├── overview.md               # What is MCP, why use it
│   ├── setup.md                  # Installation, configuration
│   ├── claude-desktop.md         # Claude Desktop integration
│   ├── cursor.md                 # Cursor IDE integration
│   ├── tools-reference.md        # All MCP tools list
│   └── workflows.md              # Example workflows
│
├── integrations/
│   ├── n8n.md                    # n8n workflow examples
│   ├── opencode.md               # opencode (mcp) 
│   └── claude-code               # claude code mcp
│
└── reference/
    ├── style-guide-schema.md     # StyleGuide object reference
    ├── scene-schema.md           # Scene object reference
    ├── editor-state-schema.md    # EditorState object reference
    └── error-codes.md            # API error codes
```

---

## Phase 3: Content Sources & Data Extraction

### 3.1 Getting Started Section

| Page | Source | Notes |
|------|--------|-------|
| `introduction.md` | `AutoVio/README.md` | What is AutoVio, features |
| `installation.md` | `AutoVio/README.md` + `.env.example` | Setup steps, env vars |
| `quickstart.md` | New content | Step-by-step first video |
| `configuration.md` | `AutoVio/.env.example` | All env variables explained |

### 3.2 Concepts Section

| Page | Source | Notes |
|------|--------|-------|
| `projects-and-works.md` | `packages/shared/src/types/project.ts` | Project/WorkSnapshot interfaces |
| `pipeline-overview.md` | UI components analysis | 5-step pipeline flow |
| `modes.md` | `prompts/scenario.ts`, `prompts/analyzer.ts` | style_transfer vs content_remix |
| `providers.md` | `backend/src/providers/registry.ts` | Provider list, models |

### 3.3 UI Guide Section

| Page | Source | Notes |
|------|--------|-------|
| `projects-panel.md` | `components/ProjectsList.tsx` | Screenshots + description |
| `works-panel.md` | `components/WorksList.tsx` | Screenshots + description |
| `step-1-init.md` | `components/steps/InitStep.tsx` | Fields: productName, mode, etc. |
| `step-2-analyze.md` | `components/steps/AnalyzeStep.tsx` | Reference video upload, analysis |
| `step-3-scenario.md` | `components/steps/ScenarioStep.tsx` | Scenario generation UI |
| `step-4-generate.md` | `components/steps/GenerateStep.tsx` | Image/video generation |
| `step-5-editor.md` | `components/steps/EditorStep.tsx` | Timeline, overlays, export |
| `templates.md` | `components/editor/TemplatesPanel.tsx` | Template create/apply |

### 3.4 System Prompts Section

| Page | Source | Notes |
|------|--------|-------|
| `overview.md` | New content | How prompts flow through system |
| `scenario-prompt.md` | `packages/shared/src/types/project.ts` → `DEFAULT_SCENARIO_SYSTEM_PROMPT` | Full prompt + explanation |
| `analyzer-prompt.md` | `packages/shared/src/types/project.ts` → `DEFAULT_ANALYZER_PROMPT` | Full prompt + explanation |
| `image-prompt.md` | `backend/src/prompts/image.ts` | buildImageStylePrefix logic |
| `video-prompt.md` | `backend/src/prompts/video.ts` | buildVideoStylePrefix logic |
| `customization.md` | Project settings | How users can override |

### 3.5 API Section

| Page | Source | Notes |
|------|--------|-------|
| All API pages | `backend/src/openapi/document.ts` | OpenAPI spec → markdown |

**OpenAPI to Markdown conversion:**
- Each endpoint group gets a page
- Request/response schemas with examples
- Header requirements (x-api-key, x-llm-provider, etc.)

### 3.6 MCP Section

| Page | Source | Notes |
|------|--------|-------|
| `overview.md` | `AutoVio-MCP/README.md` | What is MCP |
| `setup.md` | `AutoVio-MCP/README.md` | CLI params, env vars |
| `claude-desktop.md` | `AutoVio-MCP/examples/claude-desktop-config.json` | Config example |
| `cursor.md` | New content | Cursor MCP setup |
| `tools-reference.md` | `AutoVio-MCP/src/tools/*.ts` | All tools with descriptions |
| `workflows.md` | New content | Example: create video step by step |

### 3.7 Reference Section

| Page | Source | Notes |
|------|--------|-------|
| `style-guide-schema.md` | `packages/shared/src/types/style-guide.ts` | StyleGuide interface |
| `scene-schema.md` | `packages/shared/src/types/scenario.ts` | ScenarioScene interface |
| `editor-state-schema.md` | `packages/shared/src/types/project.ts` | EditorStateSnapshot interface |
| `error-codes.md` | `backend/src/openapi/document.ts` | Error schema |

---

## Phase 4: Implementation Steps

### Step 1: Project Initialization
1. Create Astro + Starlight project
2. Configure `astro.config.mjs` with sidebar structure
3. Set up custom CSS for branding
4. Add favicon, logo

### Step 2: Getting Started Pages
1. Write `introduction.md` - adapt from README
2. Write `installation.md` - local setup steps
3. Write `quickstart.md` - first video tutorial
4. Write `configuration.md` - env vars table

### Step 3: Concepts Pages
1. Write `projects-and-works.md` - hierarchy explanation
2. Write `pipeline-overview.md` - 5-step flow diagram
3. Write `modes.md` - mode comparison
4. Write `providers.md` - provider/model table

### Step 4: UI Guide Pages
1. Take screenshots of each UI panel
2. Write description for each step
3. Document all form fields and their effects
4. Add tips and best practices

### Step 5: System Prompts Pages
1. Extract prompts from source code
2. Format with code blocks
3. Add explanations for each section
4. Document customization options

### Step 6: API Documentation
1. Parse OpenAPI document
2. Generate endpoint pages
3. Add request/response examples
4. Document authentication flow

### Step 7: MCP Documentation
1. Adapt MCP README content
2. Document all 27 tools
3. Add workflow examples
4. Add integration configs

### Step 8: Reference Pages
1. Extract TypeScript interfaces
2. Convert to documentation tables
3. Add field descriptions
4. Add examples

### Step 9: Polish & Deploy
1. Review all pages
2. Add search keywords
3. Test navigation
4. Deploy to Vercel/Netlify

---

## Phase 5: File Templates

### 5.1 API Endpoint Page Template

```markdown
---
title: Projects API
description: Create and manage video projects
---

## Overview

Projects are the top-level containers for your video work...

## Endpoints

### List Projects

`GET /api/projects`

**Headers:**
| Header | Required | Description |
|--------|----------|-------------|
| Authorization | Yes | Bearer token |

**Response:**
\`\`\`json
[
  {
    "id": "proj_xxx",
    "name": "My Project",
    "updatedAt": 1234567890
  }
]
\`\`\`

### Create Project

`POST /api/projects`

**Request Body:**
\`\`\`json
{
  "name": "New Project",
  "styleGuide": { ... }
}
\`\`\`
```

### 5.2 MCP Tool Page Template

```markdown
---
title: MCP Tools Reference
description: Complete list of AutoVio MCP tools
---

## Works Tools

### autovio_works_create

Create a new work (video pipeline) in a project.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| projectId | string | Yes | Project ID |
| name | string | No | Work name |
| mode | string | No | style_transfer or content_remix |
| productName | string | No | Product name for the video |

**Example:**
\`\`\`json
{
  "projectId": "proj_xxx",
  "name": "Product Demo",
  "mode": "style_transfer",
  "productName": "EcoBottle"
}
\`\`\`
```

---

## Phase 6: Astro Config Template

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'AutoVio',
      logo: {
        src: './src/assets/logo.svg',
      },
      social: {
        github: 'https://github.com/your-repo/autovio',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/getting-started/introduction/' },
            { label: 'Installation', link: '/getting-started/installation/' },
            { label: 'Quick Start', link: '/getting-started/quickstart/' },
            { label: 'Configuration', link: '/getting-started/configuration/' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Projects & Works', link: '/concepts/projects-and-works/' },
            { label: 'Pipeline Overview', link: '/concepts/pipeline-overview/' },
            { label: 'Generation Modes', link: '/concepts/modes/' },
            { label: 'AI Providers', link: '/concepts/providers/' },
          ],
        },
        {
          label: 'UI Guide',
          items: [
            { label: 'Projects Panel', link: '/ui-guide/projects-panel/' },
            { label: 'Works Panel', link: '/ui-guide/works-panel/' },
            { label: 'Step 1: Init', link: '/ui-guide/step-1-init/' },
            { label: 'Step 2: Analyze', link: '/ui-guide/step-2-analyze/' },
            { label: 'Step 3: Scenario', link: '/ui-guide/step-3-scenario/' },
            { label: 'Step 4: Generate', link: '/ui-guide/step-4-generate/' },
            { label: 'Step 5: Editor', link: '/ui-guide/step-5-editor/' },
            { label: 'Templates', link: '/ui-guide/templates/' },
          ],
        },
        {
          label: 'System Prompts',
          items: [
            { label: 'Overview', link: '/system-prompts/overview/' },
            { label: 'Scenario Prompt', link: '/system-prompts/scenario-prompt/' },
            { label: 'Analyzer Prompt', link: '/system-prompts/analyzer-prompt/' },
            { label: 'Image Prompt', link: '/system-prompts/image-prompt/' },
            { label: 'Video Prompt', link: '/system-prompts/video-prompt/' },
            { label: 'Customization', link: '/system-prompts/customization/' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Overview', link: '/api/overview/' },
            { label: 'Authentication', link: '/api/authentication/' },
            { label: 'Projects', link: '/api/projects/' },
            { label: 'Works', link: '/api/works/' },
            { label: 'AI Endpoints', link: '/api/ai-endpoints/' },
            { label: 'Templates', link: '/api/templates/' },
            { label: 'Assets', link: '/api/assets/' },
            { label: 'Providers', link: '/api/providers/' },
          ],
        },
        {
          label: 'MCP Server',
          items: [
            { label: 'Overview', link: '/mcp/overview/' },
            { label: 'Setup', link: '/mcp/setup/' },
            { label: 'Claude Desktop', link: '/mcp/claude-desktop/' },
            { label: 'Cursor IDE', link: '/mcp/cursor/' },
            { label: 'Tools Reference', link: '/mcp/tools-reference/' },
            { label: 'Workflows', link: '/mcp/workflows/' },
          ],
        },
        {
          label: 'Integrations',
          items: [
            { label: 'n8n', link: '/integrations/n8n/' },
            { label: 'Make', link: '/integrations/make/' },
            { label: 'Zapier', link: '/integrations/zapier/' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'StyleGuide Schema', link: '/reference/style-guide-schema/' },
            { label: 'Scene Schema', link: '/reference/scene-schema/' },
            { label: 'EditorState Schema', link: '/reference/editor-state-schema/' },
            { label: 'Error Codes', link: '/reference/error-codes/' },
          ],
        },
      ],
    }),
  ],
});
```

---

## Phase 7: SEO & Discoverability

Docs sitesinin Google'da bulunabilir olması için SEO optimizasyonu kritik.

### 7.1 Target Keywords (Her sayfada kullanılmalı)

**Primary Keywords:**
- AI video generator
- text to video API
- automated video creation
- video generation pipeline
- AI video editing
- programmatic video creation

**Secondary Keywords:**
- LLM video generation
- Gemini video API
- OpenAI video generation
- Claude video
- image to video API
- video automation
- MCP server video
- n8n video automation

**Long-tail Keywords:**
- how to generate video from text with AI
- automated product demo video generator
- AI video creation for SaaS
- text to video API for developers
- Claude Desktop video generation
- Cursor IDE video automation
- programmatic video generation API

### 7.2 Page-Level SEO Requirements

Her sayfa için frontmatter'da:

```yaml
---
title: "AI Video Generation API - AutoVio" # 50-60 karakter
description: "Generate videos from text prompts using AI. REST API for automated video creation with Gemini, OpenAI, and Claude." # 150-160 karakter
---
```

**Title kuralları:**
- Primary keyword başta
- Brand sonda (- AutoVio)
- 50-60 karakter

**Description kuralları:**
- Action-oriented (Generate, Create, Build)
- Primary + secondary keyword
- 150-160 karakter
- Call-to-action veya value proposition

### 7.3 Heading Structure (H1-H6)

- Her sayfada tek H1 (title)
- H2'ler ana bölümler (keyword içermeli)
- H3'ler alt bölümler
- Heading'lerde keyword stuffing yapma, doğal ol

**İyi örnek:**
```markdown
# AI Video Generation API

## Getting Started with Video Generation
## Generate Videos from Text Prompts
## Image to Video Conversion
```

**Kötü örnek:**
```markdown
# API
## Endpoints
## Methods
```

### 7.4 Internal Linking

- Her sayfada en az 2-3 internal link
- Anchor text'te keyword kullan
- İlgili sayfalara cross-reference

**Örnek:**
```markdown
After creating a project, you'll need to [create a work (video pipeline)](/api/works/) 
to start generating videos. Learn more about [AI providers](/concepts/providers/) 
supported by AutoVio.
```

### 7.5 URL Structure

- Lowercase, hyphenated
- Keyword içermeli
- Kısa tut

**İyi:**
- `/api/video-generation/`
- `/mcp/claude-desktop-setup/`
- `/guides/text-to-video/`

**Kötü:**
- `/api/generate/`
- `/mcp/setup/`
- `/docs/page1/`

### 7.6 Image SEO

- Alt text'te keyword
- Descriptive filename
- WebP format (smaller size)

```markdown
![AI video generation pipeline showing 5 steps](/images/pipeline-overview.webp)
```

### 7.7 Structured Data (JSON-LD)

Starlight'a custom head ekle:

```javascript
// astro.config.mjs
head: [
  {
    tag: 'script',
    attrs: { type: 'application/ld+json' },
    content: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "AutoVio",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Cross-platform",
      "description": "AI-powered video generation pipeline"
    })
  }
]
```

### 7.8 Sitemap & Robots

Astro otomatik sitemap üretir. Ekle:

```bash
npm install @astrojs/sitemap
```

```javascript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://docs.autovio.com',
  integrations: [sitemap(), starlight({...})],
});
```

---

## Phase 8: Content Quality & UX Best Practices

### 8.1 Writing Style

- **Concise:** Gereksiz kelime kullanma
- **Active voice:** "The API returns..." değil "You receive..."
- **Second person:** "You can create..." kullan
- **Present tense:** "This endpoint creates..." 

### 8.2 Code Examples

Her API endpoint ve MCP tool için:
- Çalışan örnek kod
- Copy button (Starlight built-in)
- Syntax highlighting
- Beklenen response

```markdown
```bash
curl -X POST https://api.autovio.com/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Project"}'
```

**Response:**
```json
{
  "id": "proj_xxx",
  "name": "My Project",
  "createdAt": 1234567890
}
```
```

### 8.3 Callouts & Warnings

Starlight'ın built-in component'lerini kullan:

```markdown
:::note
This requires API authentication.
:::

:::tip
Use `works_generate_scenario` after creating a work for best results.
:::

:::caution
This operation cannot be undone.
:::

:::danger
Never commit your API keys to version control.
:::
```

### 8.4 Tables for Reference

API parametreleri, env vars, tool parametreleri için tablo kullan:

```markdown
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | Project ID |
| name | string | No | Work name |
```

### 8.5 Navigation & Discoverability

- **Breadcrumbs:** Starlight default sağlar
- **Previous/Next:** Sayfa sonunda navigation
- **Search:** Pagefind ile full-text search
- **Table of Contents:** Her sayfada sağ tarafta

### 8.6 Mobile Responsiveness

- Starlight default responsive
- Code block'lar horizontal scroll
- Tablo'lar responsive wrapper ile

### 8.7 Page Load Performance

- Astro static output = hızlı
- Image'ları optimize et (WebP, lazy load)
- Font'ları self-host veya system font kullan

---

## Phase 9: Analytics & Monitoring

### 9.1 Analytics Setup

```bash
npm install @astrojs/partytown
```

Google Analytics veya Plausible ekle:

```javascript
// For privacy-friendly analytics (recommended)
// Plausible.io - no cookie banner needed
head: [
  {
    tag: 'script',
    attrs: {
      defer: true,
      'data-domain': 'docs.autovio.com',
      src: 'https://plausible.io/js/script.js'
    }
  }
]
```

### 9.2 Search Console

- Google Search Console'a site ekle
- Sitemap submit et
- Index coverage takip et

### 9.3 404 Monitoring

- Kırık link'leri takip et
- Redirect'ler ekle gerektiğinde

---

## Phase 10: Maintenance

### 10.1 Content Sync

API veya MCP değiştiğinde docs güncellenmeli:
- OpenAPI document değişirse → API docs güncelle
- MCP tool eklenir/değişirse → tools-reference güncelle
- UI değişirse → screenshots güncelle

### 10.2 Version Control

- Docs'u ana repo ile birlikte veya ayrı repo'da tut
- PR review'da docs değişikliği kontrol et

### 10.3 Feedback Loop

- Her sayfada "Edit this page" linki (GitHub)
- Feedback widget (opsiyonel)

---

## Checklist

### Phase 1: Setup
- [ ] Create Astro project with Starlight
- [ ] Configure astro.config.mjs
- [ ] Add logo and favicon
- [ ] Test dev server

### Phase 2: Getting Started
- [ ] introduction.md
- [ ] installation.md
- [ ] quickstart.md
- [ ] configuration.md

### Phase 3: Concepts
- [ ] projects-and-works.md
- [ ] pipeline-overview.md
- [ ] modes.md
- [ ] providers.md

### Phase 4: UI Guide
- [ ] Take UI screenshots
- [ ] projects-panel.md
- [ ] works-panel.md
- [ ] step-1-init.md
- [ ] step-2-analyze.md
- [ ] step-3-scenario.md
- [ ] step-4-generate.md
- [ ] step-5-editor.md
- [ ] templates.md

### Phase 5: System Prompts
- [ ] overview.md
- [ ] scenario-prompt.md
- [ ] analyzer-prompt.md
- [ ] image-prompt.md
- [ ] video-prompt.md
- [ ] customization.md

### Phase 6: API Reference
- [ ] overview.md
- [ ] authentication.md
- [ ] projects.md
- [ ] works.md
- [ ] ai-endpoints.md
- [ ] templates.md
- [ ] assets.md
- [ ] providers.md

### Phase 7: MCP
- [ ] overview.md
- [ ] setup.md
- [ ] claude-desktop.md
- [ ] cursor.md
- [ ] tools-reference.md
- [ ] workflows.md

### Phase 8: Integrations
- [ ] n8n.md
- [ ] make.md
- [ ] zapier.md

### Phase 9: Reference
- [ ] style-guide-schema.md
- [ ] scene-schema.md
- [ ] editor-state-schema.md
- [ ] error-codes.md

### Phase 10: SEO Implementation
- [ ] Add target keywords to all page titles
- [ ] Write meta descriptions (150-160 chars)
- [ ] Add internal links between related pages
- [ ] Add structured data (JSON-LD)
- [ ] Install and configure sitemap
- [ ] Optimize images (WebP, alt text)
- [ ] Review heading structure (H1-H6)

### Phase 11: Content Quality
- [ ] Add code examples to all API endpoints
- [ ] Add code examples to all MCP tools
- [ ] Use callouts (note, tip, caution, danger)
- [ ] Format parameters as tables
- [ ] Review writing style (active voice, concise)

### Phase 12: Analytics & Deploy
- [ ] Set up analytics (Plausible or GA)
- [ ] Build production
- [ ] Deploy to Vercel/Netlify
- [ ] Submit sitemap to Google Search Console
- [ ] Test all links
- [ ] Add to main README
