'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { blogApi, Blog } from '@/services/blogApi';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getById(id);
        setBlog(data);
        setLikeCount(data.likes || 0);
        await blogApi.incrementViews(id);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Không thể tải bài viết');
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id, router]);

  const handleLike = async () => {
    if (liked) return;

    try {
      const result = await blogApi.like(id);
      setLiked(true);
      setLikeCount(result.likes);
      toast.success('Bạn đã thích bài viết này!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Không thể thích bài viết');
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
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <p className="text-gray-500 mb-4">Không tìm thấy bài viết</p>
        <Link href="/blog">
          <Button>Quay lại</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Link href="/blog" className="mb-6 inline-block">
        <Button variant="outline">← Quay lại</Button>
      </Link>

      <article className="rounded-lg shadow-sm overflow-hidden">
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
          <div className="mt-8 pt-6 border-t flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Cập nhật lần cuối:{' '}
              {new Date(blog.updated_at || blog.created_at || '').toLocaleDateString('vi-VN')}
            </p>
            <button
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ❤️ Thích ({likeCount})
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
