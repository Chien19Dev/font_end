import Footer from '@/components/views/Footer';
import Navbar from '@/components/views/Header';
import { APP_DESCRIPTION, APP_TITLE } from '@/constants/metadata';
import { Metadata } from 'next';
import { Fragment } from 'react';
export const metadata: Metadata = {
  title: {
    default: `Elysia Wear - ${APP_TITLE}`,
    template: '%s - Elysia Wear',
  },
  description: APP_DESCRIPTION,
  keywords: ['elysia', 'thời trang nam nữ', 'áo quần hiện đại', 'elysia wear', 'quần áo đẹp'],
  authors: [{ name: 'Elysia Team', url: 'https://elysiawear.vn' }],
  openGraph: {
    title: `Elysia Wear - ${APP_TITLE}`,
    description: APP_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Elysia Wear',
    images: [
      {
        url:
          process.env.NEXT_PUBLIC_SITE_URL + '/og-default.jpg' ||
          'https://n7media.coolmate.me/uploads/July2025/EXCOOL_-_Desktop-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Elysia Wear',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Elysia Wear - ${APP_TITLE}`,
    description: APP_DESCRIPTION,
    images: [
      process.env.NEXT_PUBLIC_SITE_URL + '/og-default.jpg' ||
        'https://n7media.coolmate.me/uploads/July2025/EXCOOL_-_Desktop-1.jpg',
    ],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Navbar />
      <main className="w-full min-h-screen mx-auto">{children}</main>
      <Footer />
    </Fragment>
  );
}
