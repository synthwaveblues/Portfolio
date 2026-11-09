// Astro integration: after the build, hashes every inline <script> in the built pages and adds a
// Content-Security-Policy header with those hashes to dist/_headers (Cloudflare Pages reads it).
//
// Scripts are locked to this site plus those exact inline scripts, so injected markup can't run code.
// Styles keep 'unsafe-inline': React renders style="" attributes on the server, and a hash-based
// style policy would block them. Astro's own CSP option can't allow those, which is why this exists.

import {createHash} from 'node:crypto';
import {appendFileSync, readdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const POLICY = [
  "default-src 'self'",
  "script-src 'self' {hashes}",
  "style-src 'self' 'unsafe-inline'",
  // data: for the CSS pixel-edge and grain masks; scdn.co serves Spotify album art
  "img-src 'self' data: https://*.scdn.co",
  // data: because Vite inlines the smallest font subsets
  "font-src 'self' data:",
  "connect-src 'self'",
  // project demo videos
  "frame-src https://www.youtube.com https://youtube.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
];

function htmlFiles(dir) {
  return readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

export default function csp() {
  return {
    name: 'csp-headers',
    hooks: {
      'astro:build:done': ({dir, logger}) => {
        const out = fileURLToPath(dir);
        const hashes = new Set();
        for (const file of htmlFiles(out)) {
          const html = readFileSync(file, 'utf8');
          // inline scripts only: <script> tags with a body and no src
          for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
            if (/\bsrc=/.test(attrs) || !body) continue;
            hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
          }
        }
        const policy = POLICY.join('; ').replace('{hashes}', [...hashes].join(' '));
        appendFileSync(join(out, '_headers'), `\n# added at build time by scripts/csp.mjs\n/*\n  Content-Security-Policy: ${policy}\n`);
        logger.info(`CSP header written with ${hashes.size} inline script hashes`);
      },
    },
  };
}
