import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tất cả sản phẩm',
  description:
    'Khám phá toàn bộ bộ sưu tập thời trang của Elysia Wear - từ trang phục nam, nữ đến phụ kiện. Hàng ngàn sản phẩm chất lượng cao với giá cả hợp lý.',
  keywords: [
    'thời trang',
    'quần áo nam',
    'quần áo nữ',
    'phụ kiện',
    'fashion',
    'trang phục',
    'quần áo',
    'giày dép',
    'túi xách',
  ],
  openGraph: {
    title: 'Tất cả sản phẩm',
    description:
      'Khám phá toàn bộ bộ sưu tập thời trang của Elysia Wear - từ trang phục nam, nữ đến phụ kiện.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Elysia Wear Fashion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tất cả sản phẩm',
    description:
      'Khám phá toàn bộ bộ sưu tập thời trang của Elysia Wear - từ trang phục nam, nữ đến phụ kiện.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/all-products',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
