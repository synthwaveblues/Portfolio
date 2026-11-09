// Turns the full-size project screenshots in assets/projects/*.png into small WebP files in public/projects/,
// one per width, for the cards' srcset. The originals stay out of public/ so they're never deployed.
//
//   node scripts/project-images.mjs

import {mkdirSync, readdirSync} from 'node:fs';
import sharp from 'sharp';

// a card is at most ~420px wide; these cover 1x and 2x screens at every layout
export const WIDTHS = [480, 800, 1200];

const src = new URL('../assets/projects/', import.meta.url);
const out = new URL('../public/projects/', import.meta.url);
mkdirSync(out, {recursive: true});

for (const file of readdirSync(src).filter(f => f.endsWith('.png'))) {
  const name = file.replace(/\.png$/, '');
  for (const width of WIDTHS) {
    const target = new URL(`${name}-${width}.webp`, out);
    const info = await sharp(new URL(file, src).pathname).resize({width, withoutEnlargement: true}).webp({quality: 80}).toFile(target.pathname);
    console.log(`${name}-${width}.webp  ${(info.size / 1024).toFixed(0)} KB`);
  }
}
