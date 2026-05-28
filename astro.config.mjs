import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// TODO: replace with your actual domain once you have one
const SITE_URL = 'https://your-domain.com';

export default defineConfig({
  site: SITE_URL,
  integrations: [react(), sitemap()],
  output: 'server',
  adapter: cloudflare(),
});