import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import csp from './scripts/csp.mjs';

const SITE_URL = 'https://synthwaveblues.com';

export default defineConfig({
  site: SITE_URL,
  integrations: [react(), sitemap(), csp()],
  output: 'static',
  // one page: put the CSS in the HTML so it doesn't block the first paint behind a second request
  build: {
    inlineStylesheets: 'always',
  },
});