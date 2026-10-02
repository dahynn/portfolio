import sharp from 'sharp';
import { resolve } from 'node:path';

const logo = await sharp(resolve('public/assets/db-inc-logo.png'))
  .trim({ background: '#00000000', threshold: 6 })
  .resize({ width: 340 })
  .png()
  .toBuffer();

const artwork = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <path d="M0 0h18v210H0z" fill="#f47721"/>
  <path d="M0 210h18v210H0z" fill="#10a2d5"/>
  <path d="M0 420h18v210H0z" fill="#78c449"/>
  <path d="M76 178h1048" stroke="#dcebe1" stroke-width="2"/>
  <text x="76" y="284" fill="#153b29" font-family="Apple SD Gothic Neo, sans-serif" font-size="52" font-weight="800" letter-spacing="-2">고객의 보험 가입부터,</text>
  <text x="76" y="358" fill="#153b29" font-family="Apple SD Gothic Neo, sans-serif" font-size="52" font-weight="800" letter-spacing="-2">데이터의 마지막 줄까지,</text>
  <path d="M77 447C126 443 177 447 226 444" fill="none" stroke="#00854a" stroke-width="9" stroke-linecap="round" opacity=".78"/>
  <text x="76" y="433" fill="#153b29" font-family="Apple SD Gothic Neo, sans-serif" font-size="52" font-weight="800" letter-spacing="-2">끝까지 따라가는 S/W 엔지니어</text>
  <text x="78" y="548" fill="#426454" font-family="Apple SD Gothic Neo, sans-serif" font-size="27" font-weight="700">유다현  ·  S/W 엔지니어</text>
  <path d="M76 573h95" stroke="#f47721" stroke-width="6" stroke-linecap="round"/>
  <path d="M171 573h95" stroke="#10a2d5" stroke-width="6"/>
  <path d="M266 573h95" stroke="#78c449" stroke-width="6" stroke-linecap="round"/>
</svg>`);

await sharp(artwork)
  .composite([{ input: logo, left: 75, top: 47 }])
  .png()
  .toFile(resolve('public/assets/db-social-share.png'));

console.log('Created public/assets/db-social-share.png (1200 × 630).');
