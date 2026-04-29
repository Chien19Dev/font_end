'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Editor from '@/components/editor/Editor';
import { blogApi, Blog } from '@/services/blogApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Link from 'next/link';

const CATEGORIES = ['Công nghệ', 'Thời trang', 'Ẩm thực', 'Du lịch', 'Sức khỏe', 'Khác'];

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [readTime, setReadTime] = useState('5 phút đọc');
  const [image, setImage] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getById(id);
        setBlog(data);
        setTitle(data.title);
        setContent(data.content || '');
        setExcerpt(data.excerpt);
        setAuthor(data.author);
        setCategory(data.category);
        setReadTime(data.readTime);
        setFeatured(data.featured || false);
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

  const handleSubmit = async () => {
    if (!title || !content || !author || !excerpt) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('excerpt', excerpt);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('readTime', readTime);
    formData.append('featured', String(featured));
    if (image) formData.append('image', image);

    try {
      setSubmitting(true);
      await blogApi.update(id, formData);
      toast.success('Cập nhật bài viết thành công!');
      router.push(`/admin/blog/${id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-4 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-96 bg-gray-200 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-4 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Chỉnh sửa bài viết</h1>
        <Link href={`/admin/blog/${id}`}>
          <Button variant="outline">Xem chi tiết</Button>
        </Link>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="title">Tiêu đề *</Label>
          <Input
            id="title"
            placeholder="Nhập tiêu đề bài viết..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="author">Tác giả *</Label>
          <Input
            id="author"
            placeholder="Tên tác giả..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="excerpt">Mô tả ngắn *</Label>
          <Input
            id="excerpt"
            placeholder="Tóm tắt bài viết..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col space-y-2 flex-1">
            <Label htmlFor="category">Danh mục</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-background"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-2 flex-1">
            <Label htmlFor="readTime">Thời gian đọc</Label>
            <Input
              id="readTime"
              placeholder="VD: 5 phút đọc"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4"
          />
          <Label htmlFor="featured" className="!m-0">
            Đánh dấu bài viết nổi bật
          </Label>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="image">Ảnh bài viết</Label>
          <div className="flex items-center gap-4">
            {blog?.image && !image && (
              <img
                src={blog.image}
                alt="Current blog image"
                className="w-32 h-32 object-cover rounded"
              />
            )}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="New blog image"
                className="w-32 h-32 object-cover rounded"
              />
            )}
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Nội dung bài viết *</Label>
          <Editor content={content} setContent={setContent} />
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSubmit} disabled={submitting} className="flex-1">
            {submitting ? 'Đang cập nhật...' : 'Cập nhật bài viết'}
          </Button>
          <Link href={`/admin/blog/${id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              Hủy
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
