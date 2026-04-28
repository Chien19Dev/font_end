'use client';
import { Fragment } from 'react';
import { Button } from '@/components/ui/button';

export default function SectionStatiscal() {
  return (
    <Fragment>
      <section className="py-12 bg-gray-50 dark:bg-gray/50 rounded-2xl border border-gray-200 dark:border-gray/70 mb-0">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray dark:text-white">
            Thống kê Fashion Blog
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Bài viết', value: '200+', icon: '👗' },
              { label: 'Lượt đọc', value: '120K+', icon: '👀' },
              { label: 'Fashionista', value: '2.5K+', icon: '💃' },
              { label: 'Thương hiệu', value: '50+', icon: '✨' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center hover:scale-110 transition-transform duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray dark:text-white">Đăng ký nhận tin</h2>
          <p className="text-gray/60 dark:text-gray/30 mb-8">
            Nhận thông báo về những bài viết mới nhất và xu hướng công nghệ hot nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="flex-1 px-4 py-3 rounded-full border border-border bg-white dark:bg-gray/80 text-gray dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
            />
            <Button
              size="xxl"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
