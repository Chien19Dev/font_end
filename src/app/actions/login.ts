const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Lỗi đăng nhập');
  }

  return data;
}
