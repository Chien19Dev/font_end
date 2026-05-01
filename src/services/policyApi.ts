const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const API_BASE = `${BASE_URL}/policy`;

export interface PrivacyPolicy {
  id?: string;
  title: string;
  content: string;
  type_policy: 'information' | 'faq';
  createdAt?: string;
  updatedAt?: string;
}

export async function getPrivacyPolicy(
  type: 'information' | 'faq' = 'information',
): Promise<PrivacyPolicy | null> {
  const res = await fetch(`${API_BASE}/get?type=${type}`, {
    next: { revalidate: 1800 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function createPrivacyPolicy(data: PrivacyPolicy): Promise<PrivacyPolicy> {
  const res = await fetch(`${API_BASE}/post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create policy');
  return res.json();
}

export async function updatePrivacyPolicy(data: PrivacyPolicy): Promise<PrivacyPolicy> {
  const res = await fetch(`${API_BASE}/put`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update policy');
  return res.json();
}
