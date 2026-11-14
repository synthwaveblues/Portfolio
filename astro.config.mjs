import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import csp from './scripts/csp.mjs';

const SITE_URL = 'https://synthwaveblues.com';

export default defineConfig({
  site: SITE_URL,
  integrations: [react(), sitemap(), csp()],
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
});
