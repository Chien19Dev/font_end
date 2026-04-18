import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Blog Thoi Trang | Xu Huong va Bi Quyet Phoi Do',
  description:
    'Cap nhat xu huong thoi trang moi nhat, bi quyet phoi do cong so, street style va cam hung mac dep moi ngay.',
  keywords: [
    'blog thoi trang',
    'xu huong thoi trang',
    'bi quyet phoi do',
    'street style',
    'thoi trang cong so',
    'fashion blog viet nam',
  ],
  openGraph: {
    title: 'Blog Thoi Trang | Xu Huong va Bi Quyet Phoi Do',
    description:
      'Khám phá xu hướng thời trang, tips phối đồ và cảm hứng phong cách mới nhất.',
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Thoi Trang | Xu Huong va Bi Quyet Phoi Do',
    description:
      'Khám phá xu hướng thời trang, tips phối đồ và cảm hứng phong cách mới nhất.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  return children;
}
