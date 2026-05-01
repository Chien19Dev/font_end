const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function uploadImage(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${BASE_URL}/upload/image`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'Upload ảnh thất bại');
    }

    const data = await res.json();
    return data.url as string;
  } catch (error) {
    console.error('Lỗi upload ảnh:', error);
    return null;
  }
}
