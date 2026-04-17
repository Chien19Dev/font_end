const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  product_count?: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug_category: string;
  description?: string;
  category_type: string;
  subcategories?: Subcategory[];
  created_at?: string;
  updated_at?: string;
}

function normalizeCategoriesResponse(payload: unknown): Category[] {
  if (Array.isArray(payload)) {
    return payload as Category[];
  }

  if (
    payload &&
    typeof payload === 'object' &&
    'data' in payload &&
    Array.isArray((payload as { data?: unknown }).data)
  ) {
    return (payload as { data: Category[] }).data;
  }

  return [];
}

export async function getAllCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Không thể lấy danh sách danh mục');
  const payload: unknown = await res.json();
  return normalizeCategoriesResponse(payload);
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const res = await fetch(
    `${BASE_URL}/categories?slug_category=${slug}`,
    {
      cache: 'no-store',
    },
  );
  if (!res.ok) return null;
  const payload: unknown = await res.json();
  const data = normalizeCategoriesResponse(payload);
  return data.length > 0 ? data[0] : null;
}

export async function updateCategory(
  id: string,
  data: Partial<Category>,
): Promise<Category> {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Cập nhật danh mục thất bại');
  return res.json();
}

export async function createCategory(
  data: Pick<
    Category,
    'name' | 'slug_category' | 'category_type' | 'image' | 'description'
  >,
): Promise<Category> {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Tạo danh mục thất bại');
  return res.json();
}

export async function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string,
): Promise<Subcategory | null> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category?.subcategories) return null;

  const found = category.subcategories.find(
    (sub) => sub.slug === subcategorySlug,
  );
  return found || null;
}
