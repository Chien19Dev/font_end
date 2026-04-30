'use client';

import { useRef, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

type Gender = 'NAM' | 'NỮ';

type Category = {
  id: string;
  label: string;
  image: string;
};

const categoriesNam: Category[] = [
  {
    id: 'bongda',
    label: 'BÓNG ĐÁ',
    image:
      'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'polo',
    label: 'ÁO POLO',
    image:
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'thun',
    label: 'ÁO THUN',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'shorts',
    label: 'QUẦN SHORTS',
    image:
      'https://images.unsplash.com/photo-1562886877-f47f0b25a1c6?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'somi',
    label: 'SƠ MI',
    image:
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'quandai',
    label: 'QUẦN DÀI',
    image:
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'jacket',
    label: 'JACKET',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'hoodie',
    label: 'HOODIE',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&h=420&fit=crop&crop=top',
  },
];

const categoriesNu: Category[] = [
  {
    id: 'vay',
    label: 'VÁY',
    image:
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'aothun-nu',
    label: 'ÁO THUN',
    image:
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'legging',
    label: 'LEGGING',
    image:
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'sports-bra',
    label: 'SPORTS BRA',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'polo-nu',
    label: 'ÁO POLO',
    image:
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'shorts-nu',
    label: 'QUẦN SHORTS',
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=420&fit=crop&crop=top',
  },
  {
    id: 'jacket-nu',
    label: 'JACKET',
    image:
      'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=300&h=420&fit=crop&crop=top',
  },
];

export default function SectionCategories() {
  const [activeGender, setActiveGender] = useState<Gender>('NAM');
  const scrollRef = useRef<HTMLDivElement>(null);
  const categories = activeGender === 'NAM' ? categoriesNam : categoriesNu;
  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: dir === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col gap-4 py-6 px-2 select-none">
      <div className="flex gap-2">
        {(['NAM', 'NỮ'] as Gender[]).map((g) => (
          <button
            key={g}
            onClick={() => setActiveGender(g)}
            className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest transition-all duration-200 cursor-pointer ${
              activeGender === g
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group/card">
      <div className="relative w-[220px] h-[300px] rounded-2xl overflow-hidden bg-gray-100 shadow-sm transition-shadow duration-300 group-hover/card:shadow-xl">
        <img
          src={category.image}
          alt={category.label}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-300 rounded-2xl" />
      </div>
      <span className="text-xs font-bold tracking-[0.15em] text-gray-800 group-hover/card:text-black transition-colors duration-200">
        {category.label}
      </span>
    </div>
  );
}
