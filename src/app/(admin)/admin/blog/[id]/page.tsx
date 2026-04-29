'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { blogApi, Blog, ApiResponse } from '@/services/blogApi';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getById(id);
        setBlog(data);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Không thể tải bài viết');
        router.push('/admin/blog');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id, router]);

  const handleDelete = async () => {
    if (!window.confirm('Bạn chắc chắn muốn xóa bài viết này?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await blogApi.delete(id);
      toast.success('Xóa bài viết thành công!');
      router.push('/admin/blog');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Không thể xóa bài viết');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-96 bg-gray-200 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <p className="text-center text-gray-500">Không tìm thấy bài viết</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/blog">
          <Button variant="outline">← Quay lại</Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/admin/blog/${id}/edit`}>
            <Button variant="default">Chỉnh sửa</Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </div>
      </div>

      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {blog.image && (
          <div className="relative w-full h-96">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-8">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {blog.category}
            </span>
            {blog.featured && (
              <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                ⭐ Nổi bật
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 border-b pb-4">
            <div>
              <strong>Tác giả:</strong> {blog.author}
            </div>
            <div>
              <strong>Ngày đăng:</strong>{' '}
              {blog.date || new Date(blog.created_at || '').toLocaleDateString('vi-VN')}
            </div>
            <div>
              <strong>Thời gian đọc:</strong> {blog.readTime}
            </div>
            {blog.views !== undefined && (
              <div>
                <strong>Lượt xem:</strong> {blog.views}
              </div>
            )}
            {blog.likes !== undefined && (
              <div>
                <strong>Lượt thích:</strong> {blog.likes}
              </div>
            )}
          </div>

          {blog.excerpt && (
            <p className="text-lg text-gray-700 mb-6 italic border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
              {blog.excerpt}
            </p>
          )}

          <div className="prose prose-lg max-w-none">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{
                __html: blog.content || '',
              }}
            />
          </div>

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-500">
              Cập nhật lần cuối:{' '}
              {new Date(blog.updated_at || blog.created_at || '').toLocaleDateString('vi-VN')}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
