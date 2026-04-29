// apiClient.ts
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = isFormData
    ? { ...options.headers }
    : { 'Content-Type': 'application/json', ...options.headers };

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || 'Có lỗi xảy ra');
  }

  return response.json();
}

// const baseUrl =
//   process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// export async function apiFetch<T>(
//   endpoint: string,
//   options: RequestInit = {},
// ): Promise<T> {
//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     ...options.headers,
//   };

//   const response = await fetch(`${baseUrl}${endpoint}`, {
//     ...options,
//     headers,
//     credentials: 'include',
//   });

//   if (!response.ok) {
//     const errorBody = await response.json().catch(() => ({}));
//     throw new Error(errorBody.message || 'Có lỗi xảy ra');
//   }

//   return response.json();
// }
