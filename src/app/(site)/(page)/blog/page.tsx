'use client';
import { useState } from 'react';
import SectionTop from './components/SectionTop';
import SectionCategories, { categories } from './components/SectionCategories';
import SectionContent, { blogPosts } from './components/SectionContent';
import SectionStatiscal from './components/SectionStatistical';

export default function BlogContent() {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [gridVisible, setGridVisible] = useState(true);
  const selectedCategory = categories[activeIndex];
  const filteredPosts = blogPosts.filter(
    (post) => selectedCategory === 'Tất cả' || post.category === selectedCategory,
  );

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === tabIndex) return;
    setGridVisible(false);
    setTimeout(() => {
      setActiveIndex(newValue);
      setTabIndex(newValue);
      setGridVisible(true);
    }, 200);
  };

  const handleLike = (postId: any) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <SectionTop />
      <SectionCategories tabIndex={tabIndex} onChange={handleTabChange} />
      <SectionContent
        filteredPosts={filteredPosts}
        gridVisible={gridVisible}
        likedPosts={likedPosts}
        onLike={handleLike}
      />
      <SectionStatiscal />
    </div>
  );
}
