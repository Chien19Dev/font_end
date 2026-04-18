import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Ve Chung Toi | Cau Chuyen Thuong Hieu Thoi Trang',
  description:
    'Tim hieu ve su menh, tam nhin va doi ngu dung sau thuong hieu thoi trang, noi tao nen phong cach va gia tri ben vung.',
  keywords: [
    've chung toi',
    'gioi thieu thuong hieu',
    'su menh thoi trang',
    'tam nhin thuong hieu',
    'doi ngu sang tao',
    'thoi trang ben vung',
  ],
  openGraph: {
    title: 'Ve Chung Toi | Cau Chuyen Thuong Hieu Thoi Trang',
    description:
      'Khám phá hành trình phát triển, sứ mệnh và giá trị cốt lõi của thương hiệu thời trang.',
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ve Chung Toi | Cau Chuyen Thuong Hieu Thoi Trang',
    description:
      'Khám phá hành trình phát triển, sứ mệnh và giá trị cốt lõi của thương hiệu thời trang.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

type AboutLayoutProps = {
  children: ReactNode;
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  return children;
}
