import { apiFetch } from './apiClient';
import { Product } from './productsApi';
import { PaginatedResponse } from '@/types/products';

export async function trackProductView(productId: string): Promise<void> {
  await apiFetch(`/recently-viewed/${productId}`, {
    method: 'POST',
  });
}

export async function getRecentlyViewed(params?: {
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<Product>> {
  const query = new URLSearchParams();

  if (params?.page) query.set('page', params.page.toString());
  if (params?.limit) query.set('limit', params.limit.toString());

  const queryString = query.toString();
  return apiFetch(`/recently-viewed${queryString ? `?${queryString}` : ''}`);
}

export async function removeRecentlyViewed(productId: string): Promise<void> {
  await apiFetch(`/recently-viewed/${productId}`, {
    method: 'DELETE',
  });
}

export async function clearRecentlyViewed(): Promise<void> {
  await apiFetch('/recently-viewed', {
    method: 'DELETE',
  });
}
