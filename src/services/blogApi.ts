import { apiFetch } from './apiClient';

export interface Blog {
  id?: number;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date?: string;
  readTime: string;
  category: string;
  image: string;
  likes?: number;
  views?: number;
  featured?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface BlogListResponse {
  data: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface GetBlogsParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
}

export const blogApi = {
  getAll: async (params: GetBlogsParams = {}): Promise<BlogListResponse> => {
    const query = new URLSearchParams();
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));
    if (params.category) query.set('category', params.category);
    if (typeof params.featured === 'boolean') query.set('featured', String(params.featured));

    const json = await apiFetch<ApiResponse<BlogListResponse>>(
      `/blog/api/get-blogs?${query.toString()}`,
    );
    if (!json.success || !json.data) throw new Error(json.message);
    return json.data;
  },

  getById: async (id: number): Promise<Blog> => {
    const json = await apiFetch<ApiResponse<Blog>>(`/blog/api/blog/${id}`);
    if (!json.success || !json.data) throw new Error(json.message);
    return json.data;
  },

  like: async (id: number): Promise<{ likes: number }> => {
    const json = await apiFetch<ApiResponse<{ likes: number }>>(`/blog/api/post-blog/${id}/like`, {
      method: 'POST',
    });
    if (!json.success || !json.data) throw new Error(json.message);
    return json.data;
  },

  incrementViews: async (id: number): Promise<{ views: number }> => {
    const json = await apiFetch<ApiResponse<{ views: number }>>(`/blog/api/blog/${id}/view`, {
      method: 'POST',
    });
    if (!json.success || !json.data) throw new Error(json.message);
    return json.data;
  },

  create: async (formData: FormData): Promise<Blog> => {
    const json = await apiFetch<ApiResponse<Blog>>('/blog/api/create-blog', {
      method: 'POST',
      headers: {},
      body: formData,
    });
    if (!json.success || !json.data) throw new Error(json.message);
    return json.data;
  },

  update: async (id: number, formData: FormData): Promise<Blog> => {
    const json = await apiFetch<ApiResponse<Blog>>(`/blog/api/put-blog/${id}`, {
      method: 'PUT',
      headers: {},
      body: formData,
    });
    if (!json.success || !json.data) throw new Error(json.message);
    return json.data;
  },

  delete: async (id: number): Promise<void> => {
    const json = await apiFetch<ApiResponse>(`/blog/api/delete-blog/${id}`, {
      method: 'DELETE',
    });
    if (!json.success) throw new Error(json.message);
  },
};
