import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDirectory = resolve('dist/client');
const html = await readFile(resolve(outputDirectory, 'index.html'), 'utf8');

assert.match(html, /유다현 포트폴리오/, 'The exported page must have its portfolio title.');
for (const section of ['introduction', 'journey', 'projects', 'capsure', 'capsure-detail', 'roundy', 'roundy-detail', 'san', 'san-detail']) {
  assert.ok(html.includes(`id="${section}"`), `Missing exported section: ${section}`);
}

const assetPaths = new Set();
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const url = match[1];
  if (!url.startsWith('/') || url.startsWith('//')) continue;
  const path = decodeURIComponent(url.split(/[?#]/)[0]);
  if (path === '/') continue;
  assetPaths.add(path);
}

for (const path of assetPaths) {
  await access(resolve(outputDirectory, `.${path}`));
}

await access(resolve(outputDirectory, '404.html'));
console.log(`Static portfolio verified: 9 sections, ${assetPaths.size} local assets, 404 page.`);
