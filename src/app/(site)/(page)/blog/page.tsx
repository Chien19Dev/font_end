'use client';
import { useState } from 'react';
import SectionTop from './components/SectionTop';
import SectionCategories, { categories } from './components/SectionCategories';
import SectionContent from './components/SectionContent';
import SectionStatiscal from './components/SectionStatistical';
import { useBlogs, useLikeBlog } from '@/services/Useblog';

export default function BlogContent() {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [gridVisible, setGridVisible] = useState(true);
  const [page, setPage] = useState(1);

  const selectedCategory = categories[activeIndex];

  const { data, loading, error, refetch } = useBlogs({
    page,
    limit: 9,
    category: selectedCategory !== 'Tất cả' ? selectedCategory : undefined,
  });

  const { likedPosts, toggleLike, getLikeCount } = useLikeBlog();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === tabIndex) return;
    setGridVisible(false);
    setTimeout(() => {
      setActiveIndex(newValue);
      setTabIndex(newValue);
      setPage(1);
      setGridVisible(true);
    }, 200);
  };

  const handleLike = (postId: number, currentLikes: number) => {
    toggleLike(postId, currentLikes);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <SectionTop />
      <SectionCategories tabIndex={tabIndex} onChange={handleTabChange} />
      <SectionContent
        posts={data?.data ?? []}
        pagination={data?.pagination}
        gridVisible={gridVisible}
        likedPosts={likedPosts}
        getLikeCount={getLikeCount}
        onLike={handleLike}
        loading={loading}
        error={error}
        onPageChange={setPage}
        onRetry={refetch}
      />
      <SectionStatiscal />
    </div>
  );
}
