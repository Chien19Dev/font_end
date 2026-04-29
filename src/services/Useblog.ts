'use client';
import { useState, useEffect, useCallback } from 'react';
import { blogApi, BlogListResponse, GetBlogsParams } from '../services/blogApi';

export function useBlogs(params: GetBlogsParams = {}) {
  const [data, setData] = useState<BlogListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await blogApi.getAll(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { data, loading, error, refetch: fetchBlogs };
}

export function useLikeBlog() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  const toggleLike = useCallback(
    async (postId: number, currentLikes: number) => {
      const isLiked = likedPosts.has(postId);

      setLikedPosts((prev) => {
        const next = new Set(prev);
        if (isLiked) next.delete(postId);
        else next.add(postId);
        return next;
      });
      setLikeCounts((prev) => ({
        ...prev,
        [postId]: (prev[postId] ?? currentLikes) + (isLiked ? -1 : 1),
      }));

      try {
        if (!isLiked) {
          const result = await blogApi.like(postId);
          setLikeCounts((prev) => ({ ...prev, [postId]: result.likes }));
        }
      } catch {
        setLikedPosts((prev) => {
          const next = new Set(prev);
          if (isLiked) next.add(postId);
          else next.delete(postId);
          return next;
        });
        setLikeCounts((prev) => ({ ...prev, [postId]: currentLikes }));
      }
    },
    [likedPosts],
  );

  const getLikeCount = (postId: number, fallback: number) => likeCounts[postId] ?? fallback;

  return { likedPosts, toggleLike, getLikeCount };
}
export function useIncrementViews() {
  const [viewedPosts] = useState<Set<number>>(new Set());

  const trackView = useCallback(
    async (postId: number) => {
      if (viewedPosts.has(postId)) return;
      viewedPosts.add(postId);
      try {
        await blogApi.incrementViews(postId);
      } catch {
        viewedPosts.delete(postId);
      }
    },
    [viewedPosts],
  );

  return { trackView };
}
