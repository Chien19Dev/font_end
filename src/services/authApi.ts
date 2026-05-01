const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function logoutApi() {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Logout failed');
  }

  return res.json();
}
