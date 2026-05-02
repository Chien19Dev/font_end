'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Discounts from '@/components/views/Discounts';
import { EmptyPlaceholder } from '@/components/views/EmptyPlaceholder';
import HomeBanner from '@/components/views/HomeBanner';
import ProductCard from '@/components/views/ItemCard';
import SectionCategories from '@/components/views/SectionCategories';
import ModalFitterProduct from '@/model/modalFitterProduct';
import { getProducts } from '@/services/productsApi';
import { SortType } from '@/types/sort';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [sortByCategory, setSortByCategory] = useState<Record<string, SortType>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts({ page: 1, limit: 100 })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const maleProducts = products.filter((p) => p.category?.category_type === 'nam');
  const femaleProducts = products.filter((p) => p.category?.category_type === 'nu');
  const accessories = products.filter((p) => p.category?.category_type === 'khac');
  if (loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-gray">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-200 border-t-blue rounded-full animate-spin"></div>
            <p className="text-slate-600 font-medium">Đang tải sản phẩm...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="min-h-screen bg-background dark:bg-gray">
        <div className="relative overflow-hidden mb-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
          <HomeBanner />
        </div>
        {/* <Discounts /> */}
        <div className="mx-auto max-w-full px-1 sm:px-2 md:px-14 lg:px-10 xl:px-15 2xl:px-16 w-full h-full py-4">
          <SectionCategories />
        </div>
        <div className="py-5 lg:space-y-10">
          {maleProducts.length > 0 && (
            <Section
              description={maleProducts[0]?.category?.description}
              title={maleProducts[0]?.category?.name}
              categorySlug={maleProducts[0]?.category?.slug_category}
              products={maleProducts}
              sortByCategory={sortByCategory}
              setSortByCategory={setSortByCategory}
              gradient="from-blue-500 to-cyan-500"
              icon={<TrendingUp className="w-6 h-6" />}
            />
          )}

          {femaleProducts.length > 0 && (
            <Section
              description={maleProducts[0]?.category?.description}
              title={femaleProducts[0]?.category?.name}
              categorySlug={femaleProducts[0]?.category?.slug_category}
              products={femaleProducts}
              sortByCategory={sortByCategory}
              setSortByCategory={setSortByCategory}
              gradient="from-pink-500 to-rose-500"
              icon={<Sparkles className="w-6 h-6" />}
            />
          )}

          {accessories.length > 0 && (
            <Section
              description={maleProducts[0]?.category?.description}
              title={accessories[0]?.category?.name}
              categorySlug={accessories[0]?.category?.slug_category}
              products={accessories}
              sortByCategory={sortByCategory}
              setSortByCategory={setSortByCategory}
              gradient="from-emerald-500 to-teal-500"
              icon={<ArrowRight className="w-6 h-6" />}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
}

function Section({
  title,
  description,
  categorySlug,
  products,
  sortByCategory,
  setSortByCategory,
  gradient,
  icon,
}: {
  description: string;
  title: string;
  categorySlug: string;
  products: any[];
  sortByCategory: Record<string, SortType>;
  setSortByCategory: React.Dispatch<React.SetStateAction<Record<string, SortType>>>;
  gradient: string;
  icon: React.ReactNode;
}) {
  const categoryImage = products[0]?.category?.image;
  const sort = sortByCategory[categorySlug] ?? 'newest';
  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'price_asc':
        return (a.discounted_price ?? a.price) - (b.discounted_price ?? b.price);
      case 'price_desc':
        return (b.discounted_price ?? b.price) - (a.discounted_price ?? a.price);
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="mx-auto max-w-full px-4 sm:px-6 md:px-14 lg:px-15 xl:px-15 2xl:px-16 w-full h-full py-8">
      <div className="relative mb-12">
        {categoryImage && (
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
            <Image
              src={categoryImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {title}
                </h2>
                <p className="text-white/90 text-lg md:text-xl mb-6 leading-relaxed">
                  {description}
                </p>
                <Link
                  href={`/${categorySlug}`}
                  className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${gradient} text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group/btn`}
                >
                  <span>Khám phá ngay</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className={`p-3 bg-gradient-to-r ${gradient} text-white rounded-xl shadow-lg`}>
            {icon}
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-foreground">
              {title}
            </h3>
            <p className="text-slate-600 dark:text-foreground/90 mt-1">
              {sortedProducts.length} sản phẩm có sẵn
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <ModalFitterProduct
              sort={sort}
              onSortChange={(val) =>
                setSortByCategory((prev) => ({
                  ...prev,
                  [categorySlug]: val,
                }))
              }
            />
          </div>
        </div>
      </div>
      {sortedProducts.length === 0 ? (
        <div className="py-20">
          <EmptyPlaceholder description="Không có sản phẩm nào." />
        </div>
      ) : (
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {sortedProducts.map((product, index) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                  <div className="group relative">
                    <div className="relative shadow-none group-hover:shadow transition-all duration-300 overflow-hidden border-none">
                      <ProductCard
                        id={product.id}
                        categorySlug={product.category.slug_category}
                        subcategorySlug={product.subcategory?.slug ?? ''}
                        name={product.name}
                        description={product.description}
                        price={product.discounted_price ?? product.price}
                        oldPrice={product.discounted_price ? product.price : undefined}
                        discountPercent={product.discount_percentage}
                        image_url={product.image_url}
                        image_hover_url={product.image_hover_url}
                        variants={product.variants ?? []}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex w-10 h-10" />
            <CarouselNext className="hidden lg:flex w-10 h-10" />
          </Carousel>
        </div>
      )}
    </div>
  );
}
