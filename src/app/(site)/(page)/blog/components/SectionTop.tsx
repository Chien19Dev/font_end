'use client';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Zap } from 'lucide-react';
import { TrendingUp } from 'lucide-react';
import Breadcrumbs from '@/components/views/Breadcrumbs';

export default function SectionTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <Fragment>
      <section className="relative overflow-hidden mb-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, hsl(221, 83%, 53%) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, hsl(280, 100%, 70%) 0%, transparent 50%)
            `,
          }}
        />
        <div className="relative text-center flex flex-col items-center pt-3">
          <div className="mb-3 flex justify-center items-center mx-auto">
            <Breadcrumbs />
          </div>
          <div
            className={`transform py-12 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, hsl(221, 83%, 53%), hsl(280, 100%, 70%), hsl(330, 100%, 70%))',
                }}
              >
                Khám phá thế giới
                <br />
                <span className="relative inline-block">
                  thời trang
                  <div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse opacity-60"
                    style={{ animationDelay: '1s' }}
                  />
                </span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Chia sẻ xu hướng, bí quyết phối đồ và những cảm hứng thời trang mới nhất từ cộng đồng
              fashionista Việt Nam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-pink-600 text-white rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 hover:bg-pink-700 cursor-pointer">
                <Zap className="w-5 h-5" /> Khám phá ngay
              </button>
              <button className="px-8 py-4 border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white dark:text-pink-400 dark:border-pink-400 dark:hover:bg-pink-400 dark:hover:text-white rounded-full font-semibold transform hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer">
                <TrendingUp className="w-5 h-5" /> Xu hướng hot
              </button>
            </div>
          </div>
        </div>
        <div
          className="absolute top-20 left-10 w-16 h-16 bg-pink-500/20 rounded-full animate-bounce"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-20 right-10 w-12 h-12 bg-purple-500/20 rounded-full animate-bounce"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-32 right-20 w-8 h-8 bg-rose-500/20 rounded-full animate-bounce"
          style={{ animationDelay: '0.5s' }}
        />
      </section>
    </Fragment>
  );
}
