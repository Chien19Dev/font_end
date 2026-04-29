'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useBlogs } from '@/services/Useblog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BlogListPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  const { data, loading, error } = useBlogs({
    page,
    limit: 10,
    category: category || undefined,
  });

  const filteredBlogs =
    data?.data.filter((blog) => blog.title.toLowerCase().includes(searchTitle.toLowerCase())) || [];

  const handleCategoryChange = (e: string) => {
    setCategory(e);
    setPage(1);
  };

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Lỗi: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Danh sách bài viết</h1>
        <Link href="/admin/blog">
          <Button>+ Tạo bài viết</Button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tìm kiếm tiêu đề</label>
            <Input
              placeholder="Nhập tiêu đề bài viết..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Danh mục</label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="">Tất cả danh mục</option>
              <option value="Công nghệ">Công nghệ</option>
              <option value="Thời trang">Thời trang</option>
              <option value="Ẩm thực">Ẩm thực</option>
              <option value="Du lịch">Du lịch</option>
              <option value="Sức khỏe">Sức khỏe</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-32 rounded" />
          ))}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Không tìm thấy bài viết</p>
          <Link href="/admin/blog">
            <Button>Tạo bài viết đầu tiên</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="flex gap-4 p-4">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                        {blog.title}
                      </h3>
                      <div className="flex gap-2 mt-2">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {blog.category}
                        </span>
                        {blog.featured && (
                          <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                            ⭐ Nổi bật
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{blog.excerpt}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mb-3">
                    <span>👤 {blog.author}</span>
                    <span>📅 {new Date(blog.created_at || '').toLocaleDateString('vi-VN')}</span>
                    <span>⏱️ {blog.readTime}</span>
                    {blog.views !== undefined && <span>👁️ {blog.views}</span>}
                    {blog.likes !== undefined && <span>❤️ {blog.likes}</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-start">
                  <Link href={`/admin/blog/${blog.id}`}>
                    <Button variant="outline" size="sm">
                      Xem
                    </Button>
                  </Link>
                  <Link href={`/admin/blog/${blog.id}/edit`}>
                    <Button variant="outline" size="sm">
                      Sửa
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {data && data.pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
            ← Trước
          </Button>
          <div className="text-sm text-gray-600">
            Trang {page} / {data.pagination.totalPages}
          </div>
          <Button
            variant="outline"
            disabled={page === data.pagination.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Sau →
          </Button>
        </div>
      )}
    </div>
  );
}
