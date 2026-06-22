import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Land3 Real Estate Office Dashboard', description: '대한민국 공인중개사 사무소 업무용 대시보드' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="ko"><body>{children}</body></html>; }
