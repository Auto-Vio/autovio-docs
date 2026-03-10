import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'AutoVio Docs',
      description: 'AI-powered video generation pipeline. Create videos from text with Gemini, OpenAI, Claude, and more.',
      defaultLocale: 'root',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/your-repo/autovio' },
      ],
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
            { label: 'OpenCode', link: '/integrations/opencode/' },
            { label: 'Claude Code', link: '/integrations/claude-code/' },
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
      customCss: ['./src/styles.css'],
    }),
  ],
});
