import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Lien He | Ket Noi Va Ho Tro Tu Elysia Wear',
  description:
    'Lien he voi Elysia Wear de nhan tu van san pham, ho tro don hang va giai dap moi thac mac nhanh chong, chuyen nghiep.',
  keywords: [
    'lien he',
    'thong tin lien he',
    'ho tro don hang',
    'tu van san pham',
    'cham soc khach hang',
    'elysia wear',
  ],
  openGraph: {
    title: 'Lien He | Ket Noi Va Ho Tro Tu Elysia Wear',
    description:
      'Liên hệ với Elysia Wear để được tư vấn sản phẩm, hỗ trợ đơn hàng và giải đáp nhanh chóng.',
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lien He | Ket Noi Va Ho Tro Tu Elysia Wear',
    description:
      'Liên hệ với Elysia Wear để được tư vấn sản phẩm, hỗ trợ đơn hàng và giải đáp nhanh chóng.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

type ContactLayoutProps = {
  children: ReactNode;
};

export default function ContactLayout({ children }: ContactLayoutProps) {
  return children;
}
