import type { Metadata } from 'next';
import './globals.css';
import './evidence-stories.css';

export const metadata: Metadata = {
  title: '유다현 포트폴리오',
  description: '유다현 S/W엔지니어 포트폴리오',
  openGraph: { title: '유다현 | DB Inc. S/W엔지니어 포트폴리오', description: '고객의 요청 한 번부터 운영 결과의 마지막 숫자까지, 끝까지 따라가는 S/W 엔지니어', images: ['/assets/db-social-share.png'] },
  twitter: { card: 'summary_large_image', images: ['/assets/db-social-share.png'] },
  icons: {
    icon: '/assets/db-symbol.png',
    shortcut: '/assets/db-symbol.png',
    apple: '/assets/db-symbol.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
