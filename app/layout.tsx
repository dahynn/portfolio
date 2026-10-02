import type { Metadata } from 'next';
import './globals.css';
import './evidence-stories.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://db.dahyeon.kr'),
  title: '유다현 | DB Inc. S/W 엔지니어 포트폴리오',
  description: '고객의 보험 가입부터 데이터의 마지막 줄까지, 끝까지 따라가는 S/W 엔지니어 유다현의 포트폴리오',
  openGraph: {
    type: 'website',
    url: 'https://db.dahyeon.kr',
    title: '유다현 | DB Inc. S/W 엔지니어 포트폴리오',
    description: '고객의 보험 가입부터 데이터의 마지막 줄까지, 끝까지 따라가는 S/W 엔지니어',
    images: [{ url: '/assets/db-social-share.png', width: 1200, height: 630, alt: 'DB Inc. S/W 엔지니어 유다현 포트폴리오' }],
  },
  twitter: { card: 'summary_large_image', title: '유다현 | DB Inc. S/W 엔지니어', images: ['/assets/db-social-share.png'] },
  icons: {
    icon: '/assets/db-symbol.png',
    shortcut: '/assets/db-symbol.png',
    apple: '/assets/db-symbol.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
