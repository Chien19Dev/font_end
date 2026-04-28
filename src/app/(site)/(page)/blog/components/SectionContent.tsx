'use client';
import { ChevronRight, Clock, Eye, Heart, Share2, Star, User } from 'lucide-react';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';

const blogPosts = [
  {
    id: 1,
    title: 'Xu hướng thời trang Thu Đông 2024',
    excerpt:
      'Khám phá những xu hướng thời trang hot nhất mùa Thu Đông với tông màu earth tone và chất liệu len mềm mại...',
    author: 'Minh Anh',
    date: '2 giờ trước',
    readTime: '5 phút',
    category: 'Xu hướng',
    image:
      'https://images.unsplash.com/photo-1601260320216-08a6c5379426?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 245,
    views: 3200,
    featured: true,
  },
  {
    id: 2,
    title: 'Cách phối đồ công sở thanh lịch và chuyên nghiệp',
    excerpt:
      'Hướng dẫn chi tiết cách mix-match trang phục công sở để luôn tự tin và nổi bật tại nơi làm việc...',
    author: 'Thu Hà',
    date: '1 ngày trước',
    readTime: '8 phút',
    category: 'Công sở',
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=250&fit=crop',
    likes: 167,
    views: 2890,
  },
  {
    id: 3,
    title: 'Street Style: Thời trang đường phố cá tính',
    excerpt:
      'Tạo nên phong cách riêng với những outfit street style độc đáo và trendy nhất hiện nay...',
    author: 'Khánh Ly',
    date: '3 ngày trước',
    readTime: '6 phút',
    category: 'Street Style',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=250&fit=crop',
    likes: 189,
    views: 1567,
  },
  {
    id: 4,
    title: 'Chọn váy cưới phù hợp với từng dáng người',
    excerpt:
      'Bí quyết chọn váy cưới hoàn hảo để tôn lên vẻ đẹp tự nhiên và phong cách của cô dâu...',
    author: 'Hương Giang',
    date: '5 ngày trước',
    readTime: '12 phút',
    category: 'Cưới hỏi',
    image:
      'https://images.unsplash.com/photo-1651935655362-05627ba0116f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 323,
    views: 4340,
  },
  {
    id: 5,
    title: 'Phụ kiện thời trang: Điểm nhấn hoàn hảo',
    excerpt:
      'Cách sử dụng phụ kiện một cách khéo léo để biến trang phục đơn giản thành outfit ấn tượng...',
    author: 'Lan Phương',
    date: '1 tuần trước',
    readTime: '7 phút',
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=250&fit=crop',
    likes: 78,
    views: 1456,
  },
  {
    id: 6,
    title: 'Thời trang bền vững: Xu hướng tương lai',
    excerpt:
      'Tìm hiểu về phong trào sustainable fashion và cách xây dựng tủ đồ thân thiện với môi trường...',
    author: 'Mai Anh',
    date: '2 tuần trước',
    readTime: '10 phút',
    category: 'Bền vững',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
    likes: 92,
    views: 1890,
  },
];

interface SectionContentProps {
  filteredPosts: typeof blogPosts;
  gridVisible: boolean;
  likedPosts: Set<unknown>;
  onLike: (postId: number) => void;
}

export default function SectionContent({
  filteredPosts,
  gridVisible,
  likedPosts,
  onLike,
}: SectionContentProps) {
  return (
    <section className="py-4">
      <Fade in={gridVisible} timeout={{ enter: 350, exit: 200 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Zoom
              key={post.id}
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
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray/70 text-gray dark:text-white backdrop-blur-sm rounded-full text-xs font-semibold border border-white/20">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-3 h-3" /> {post.views}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-bold line-clamp-2 text-gray dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
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
                        onClick={() => onLike(post.id)}
                        className={`flex items-center gap-1 text-sm transition-all duration-300 hover:scale-110 ${likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-red-500'}`}
                      >
                        <Heart
                          className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`}
                        />
                        <span className="font-medium">
                          {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                        </span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:scale-110">
                        <Share2 className="w-4 h-4" />
                        <span>Chia sẻ</span>
                      </button>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{post.date}</span>
                  </div>
                  <button className="w-full mt-4 bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 cursor-pointer text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-between gap-2 shadow-md hover:shadow-lg px-6">
                    Đọc tiếp{' '}
                    <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </article>
            </Zoom>
          ))}
        </div>
      </Fade>
      {filteredPosts.length === 0 && (
        <Fade in timeout={400}>
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2 text-gray dark:text-white">
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

export { blogPosts };
