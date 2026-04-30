import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Chương trình giới thiệu bạn mới',
  description: 'Tìm hiểu chi tiết về Chương trình giới thiệu bạn mới từ Elysia Wear.',
  keywords: ['chương trình giới thiệu', 'bạn mới', 'khuyến mãi', 'ưu đãi'],
  openGraph: {
    title: 'Chương trình giới thiệu bạn mới | Elysia Wear',
    description: 'Tìm hiểu chi tiết về Chương trình giới thiệu bạn mới từ Elysia Wear.',
    url: 'https://www.tenwebsite.com/chinh-sach-giao-hang',
    type: 'website',
    images: [
      {
        url: 'https://www.tenwebsite.com/images/og-delivery.jpg',
        width: 1200,
        height: 630,
        alt: 'Chương trình giới thiệu bạn mới',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chương trình giới thiệu bạn mới | Elysia Wear',
    description: 'Tìm hiểu chi tiết về Chương trình giới thiệu bạn mới từ Elysia Wear.',
    images: ['https://www.tenwebsite.com/images/og-delivery.jpg'],
  },
  alternates: {
    canonical: 'http://localhost:3000/chinh-sach-giao-hang',
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
