import sharp from 'sharp';
import { resolve } from 'node:path';

const source = resolve('public/assets/db-inc-logo.png');
await sharp(source)
  .trim({ background: '#00000000', threshold: 6 })
  .png()
  .toFile(resolve('public/assets/db-inc-lockup.png'));

console.log('Created transparent DB Inc. logo lockup.');
