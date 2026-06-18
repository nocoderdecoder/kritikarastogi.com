import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kritikarastogi.com',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' }
  }
});
