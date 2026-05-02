'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getAllCategories, type Category, type Subcategory } from '@/services/categoryApi';

type CategoryCardItem = {
  id: string;
  label: string;
  image: string;
  href: string;
};

type GenderTab = {
  slug: string;
  label: string;
  items: CategoryCardItem[];
};

export default function SectionCategories() {
  const [tabs, setTabs] = useState<GenderTab[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories()
      .then((data: Category[]) => {
        const genderTabs: GenderTab[] = data
          .filter((cat) => cat.subcategories && cat.subcategories.length > 0)
          .map((cat) => ({
            slug: cat.slug_category,
            label: cat.name.toUpperCase(),
            items: cat.subcategories!.map((sub: Subcategory) => ({
              id: sub.id,
              label: sub.name.toUpperCase(),
              image: sub.image ?? cat.image,
              href: `/${cat.slug_category}/${sub.slug}`,
            })),
          }));

        setTabs(genderTabs);
        if (genderTabs.length > 0) setActiveSlug(genderTabs[0].slug);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const activeTab = tabs.find((t) => t.slug === activeSlug);

  return (
    <div className="flex flex-col gap-4 py-6 px-2 select-none">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.slug}
            onClick={() => setActiveSlug(tab.slug)}
            className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest transition-all duration-200 cursor-pointer ${
              activeSlug === tab.slug
                ? 'bg-gray text-white shadow-md'
                : 'bg-background text-gray hover:bg-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[250px] h-[330px] rounded-lg bg-gray/20 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <Carousel opts={{ align: 'start', dragFree: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {activeTab?.items.map((cat) => (
              <CarouselItem key={cat.id} className="pl-4 basis-auto">
                <CategoryCard category={cat} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 lg:-left-12" />
          <CarouselNext className="right-1 lg:-right-12" />
        </Carousel>
      )}
    </div>
  );
}

function CategoryCard({ category }: { category: CategoryCardItem }) {
  return (
    <Link
      href={category.href}
      className="flex flex-col items-center gap-3 cursor-pointer group/card"
    >
      <div className="relative w-[250px] h-[330px] rounded-lg overflow-hidden bg-gray shadow-sm transition-shadow duration-300 group-hover/card:shadow-xl">
        <img
          src={category.image}
          alt={category.label}
          loading="lazy"
          width="280"
          height="380"
          className="2xl:h-full 2xl:w-full object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/0 group-hover/card:bg-gray/10 transition-colors duration-300 rounded-2xl" />
      </div>
      <span className="text-body-2 font-semibold text-clip whitespace-nowrap font-criteria uppercase transition-colors duration-300 tracking-[0.15em] text-gray group-hover/card:text-primary">
        {category.label}
      </span>
    </Link>
  );
}
