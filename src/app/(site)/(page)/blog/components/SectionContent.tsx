'use client';
import {
  ChevronRight,
  Clock,
  Eye,
  Heart,
  Share2,
  Star,
  User,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import Fade from '@mui/material/Fade';
import Image from 'next/image';
import Zoom from '@mui/material/Zoom';
import Link from 'next/link';
import { Blog } from '@/services/blogApi';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface SectionContentProps {
  posts: Blog[];
  pagination?: Pagination;
  gridVisible: boolean;
  likedPosts: Set<number>;
  getLikeCount: (postId: number, fallback: number) => number;
  onLike: (postId: number, currentLikes: number) => void;
  loading?: boolean;
  error?: string | null;
  onPageChange?: (page: number) => void;
  onRetry?: () => void;
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg animate-pulse">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
        <div className="flex gap-3">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        </div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl mt-2" />
      </div>
    </div>
  );
}

export default function SectionContent({
  posts,
  pagination,
  gridVisible,
  likedPosts,
  getLikeCount,
  onLike,
  loading,
  error,
  onPageChange,
  onRetry,
}: SectionContentProps) {
  if (loading) {
    return (
      <section className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-4">
        <Fade in timeout={400}>
          <div className="text-center py-16">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Có lỗi xảy ra</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4" /> Thử lại
              </button>
            )}
          </div>
        </Fade>
      </section>
    );
  }

  return (
    <section className="py-4">
      <Fade in={gridVisible} timeout={{ enter: 350, exit: 200 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const postId = post.id!;
            const likeCount = getLikeCount(postId, post.likes ?? 0);

            return (
              <Zoom
                key={postId}
                in={gridVisible}
                timeout={{ enter: 350, exit: 150 }}
                style={{ transitionDelay: gridVisible ? `${index * 70}ms` : '0ms' }}
              >
                <article className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  {post.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
                        <Star className="w-3 h-3" /> Nổi bật
                      </div>
                    </div>
                  )}
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={80}
                      height={72}
                      className="object-cover rounded-none w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/70 text-gray-700 dark:text-white backdrop-blur-sm rounded-full text-xs font-semibold border border-white/20">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye className="w-3 h-3" /> {post.views ?? 0}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h2 className="text-xl font-bold line-clamp-2 text-gray-800 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span className="font-medium">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => onLike(postId, post.likes ?? 0)}
                          className={`flex items-center gap-1 text-sm transition-all duration-300 hover:scale-110 ${likedPosts.has(postId) ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-red-500'}`}
                        >
                          <Heart
                            className={`w-4 h-4 ${likedPosts.has(postId) ? 'fill-current' : ''}`}
                          />
                          <span className="font-medium">{likeCount}</span>
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:scale-110">
                          <Share2 className="w-4 h-4" />
                          <span>Chia sẻ</span>
                        </button>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{post.date}</span>
                    </div>
                    <Link href={`/blog/${postId}`} className="block">
                      <button className="w-full mt-4 bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 cursor-pointer text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-between gap-2 shadow-md hover:shadow-lg px-6">
                        Đọc tiếp{' '}
                        <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </Link>
                  </div>
                </article>
              </Zoom>
            );
          })}
        </div>
      </Fade>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => onPageChange?.(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-pink-400 hover:text-pink-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            ← Trước
          </button>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange?.(p)}
              className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
                p === pagination.page
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-200 dark:shadow-pink-900'
                  : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-pink-400 hover:text-pink-600'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => onPageChange?.(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-pink-400 hover:text-pink-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            Tiếp →
          </button>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <Fade in timeout={400}>
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              Không tìm thấy bài viết
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Thử chọn danh mục khác để xem thêm bài viết
            </p>
          </div>
        </Fade>
      )}
    </section>
  );
}
