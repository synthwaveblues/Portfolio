// build hook: CSP header with script hashes

import {createHash} from 'node:crypto';
import {readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const POLICY = [
  "default-src 'self'",
  "script-src 'self' {hashes}",
  "style-src 'self' 'unsafe-inline'",
  // masks, Spotify art
  "img-src 'self' data: https://*.scdn.co",
  "font-src 'self' data:",
  "connect-src 'self'",
  // demo videos
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
          for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
            if (/\bsrc=/.test(attrs) || !body) continue;
            hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
          }
        }
        const policy = POLICY.join('; ').replace('{hashes}', [...hashes].join(' '));
        // into the single /* rule
        const file = join(out, '_headers');
        const lines = readFileSync(file, 'utf8').split('\n');
        const rule = lines.findIndex(line => line.trim() === '/*');
        const header = `  Content-Security-Policy: ${policy}`;
        if (rule === -1) lines.push('/*', header);
        else lines.splice(rule + 1, 0, header);
        writeFileSync(file, lines.join('\n'));
        logger.info(`CSP header written with ${hashes.size} inline script hashes`);
      },
    },
  };
}
