import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cham Soc Khach Hang | Ho Tro Nhanh Chong va Tan Tam',
  description:
    'Trung tam cham soc khach hang voi thong tin huong dan, cau hoi thuong gap va kenh ho tro nhanh chong, tan tam moi luc.',
  keywords: [
    'cham soc khach hang',
    'ho tro khach hang',
    'trung tam ho tro',
    'cau hoi thuong gap',
    'lien he ho tro',
    'dich vu hau mai',
  ],
  openGraph: {
    title: 'Cham Soc Khach Hang | Ho Tro Nhanh Chong va Tan Tam',
    description:
      'Kết nối với đội ngũ hỗ trợ để được tư vấn, giải đáp và xử lý yêu cầu nhanh chóng.',
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cham Soc Khach Hang | Ho Tro Nhanh Chong va Tan Tam',
    description:
      'Kết nối với đội ngũ hỗ trợ để được tư vấn, giải đáp và xử lý yêu cầu nhanh chóng.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

type CustomerCareLayoutProps = {
  children: ReactNode;
};

export default function CustomerCareLayout({
  children,
}: CustomerCareLayoutProps) {
  return children;
}
