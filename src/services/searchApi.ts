import { Product } from './productsApi';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    const normalized: Product[] = (data.hits || []).map((item: any) => ({
      ...item,
      id: item.id ?? item.objectID,
    }));

    return normalized;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}
