export interface BannerFormData {
  title: string;
  image_url: string[];
  link?: string;
  description?: string;
  is_active: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function createBanner(data: BannerFormData) {
  const res = await fetch(`${BASE_URL}/banners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Tạo banner thất bại');
  }

  return res.json();
}
export async function getBanners(): Promise<BannerFormData[]> {
  const res = await fetch(`${BASE_URL}/banners`);
  if (!res.ok) {
    throw new Error('Lấy danh sách banner thất bại');
  }
  return res.json();
}
