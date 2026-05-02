import { getProfile } from '@/services/profileApi';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import ProfilePage from './components/profile';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';
    const user = await getProfile(
      token ? `token=${token}` : undefined,
    );
    return {
      title: user?.full_name,
      description: 'Thông tin tài khoản và hồ sơ người dùng',
      openGraph: {
        type: 'website',
        title: user?.full_name,
        description: 'Thông tin tài khoản và hồ sơ người dùng',
        url: 'https://example.com/profile',
        siteName: 'Elysia Wear',
        images: user?.avatar
          ? [
              {
                url: user.avatar,
                width: 800,
                height: 600,
                alt: user.full_name,
              },
            ]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: user?.full_name,
        description: 'Thông tin tài khoản và hồ sơ người dùng',
        images: user?.avatar ? [user.avatar] : [],
      },
    };
  } catch {
    return {
      title: 'Hồ sơ cá nhân',
      description: 'Thông tin tài khoản',
      openGraph: {
        type: 'website',
        title: 'Hồ sơ cá nhân',
        description: 'Thông tin tài khoản',
        url: 'https://example.com/profile',
        siteName: 'Elysia Wear',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Hồ sơ cá nhân',
        description: 'Thông tin tài khoản',
      },
    };
  }
}
export default function Page() {
  return <Suspense><ProfilePage /></Suspense>;
}
