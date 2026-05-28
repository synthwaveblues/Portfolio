import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// TODO: replace with your actual domain once you have one
const SITE_URL = 'https://090877cb.portfolio-87a.pages.dev/';

export default defineConfig({
  site: SITE_URL,
  integrations: [react(), sitemap()],
  output: 'server',
  adapter: cloudflare(),
});