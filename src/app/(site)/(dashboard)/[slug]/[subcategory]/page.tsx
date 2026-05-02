export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SidebarProvider } from '@/components/ui/sidebar';
import Breadcrumbs from '@/components/views/Breadcrumbs';
import FilterPriceSidebar from '@/components/views/FitterPriceSidebar';
import ProductCard from '@/components/views/ItemCard';
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
} from '@/services/categoryApi';
import { getProducts } from '@/services/productsApi';
import { Grid3X3, LayoutGrid, PackageSearch, X } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subcategory: string }>;
}): Promise<Metadata> {
  const { slug, subcategory } = await params;
  const subCategoryData = await getSubcategoryBySlug(slug, subcategory);
  if (!subCategoryData) return {};
  const title = subCategoryData.name;
  const description = `Khám phá các sản phẩm thuộc danh mục ${subCategoryData.name}`;
  const ogImageUrl =
    'https://n7media.coolmate.me/uploads/July2025/EXCOOL_-_Desktop-1.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/${slug}/${subcategory}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: subCategoryData.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

const PAGE_SIZE = 3;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; subcategory: string }>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const { slug, subcategory } = await params;
  const search = await searchParams;
  const page = Number(search?.page ?? 1);

  const category = await getCategoryBySlug(slug);
  if (!category) return notFound();

  const productsResponse = await getProducts({
    category_id: category.id,
    subcategory_slug: subcategory,
    page,
    limit: PAGE_SIZE,
  });

  const products = productsResponse.data || [];
  const totalItems = productsResponse.pagination?.total || 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const createHref = (pageNum: number) => {
    if (pageNum < 1) pageNum = 1;
    const p = new URLSearchParams();
    p.set('page', String(pageNum));
    return `?${p.toString()}`;
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
        <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-2 sm:px-2 lg:px-8 w-full py-8">
          <SidebarProvider
            className="mt-3"
            style={{ '--sidebar-width': '20rem' } as React.CSSProperties}
          >
            <FilterPriceSidebar />
            <main className="ml-2 lg:ml-4 space-y-8">
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-none">
                <div className="mb-6">
                  <Breadcrumbs />
                </div>
                <div className="mt-3 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Hiển thị{' '}
                      <span className="font-semibold text-primary">
                        {products.length}
                      </span>{' '}
                      trong tổng số{' '}
                      <span className="font-semibold text-primary">
                        {totalItems}
                      </span>{' '}
                      sản phẩm
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 p-1 bg-accent/30 rounded-lg border border-border/50">
                      <button className="p-2 bg-primary text-primary-foreground rounded-md transition-colors">
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors">
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                    </div>
                    <Select>
                      <SelectTrigger className="px-4 py-2 min-w-45 bg-background border border-border/50 text-sm font-medium focus:border-primary/50 focus:outline-none hover:border-primary/30 transition-colors">
                        <SelectValue placeholder="Sắp xếp theo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="newest">Mới nhất</SelectItem>
                          <SelectItem value="price-low">Giá thấp → cao</SelectItem>
                          <SelectItem value="price-high">Giá cao → thấp</SelectItem>
                          <SelectItem value="popular">Phổ biến</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">
                    Bộ lọc đang áp dụng:
                  </span>
                  <span className="px-3 py-1 flex items-center justify-center gap-2 bg-primary/10 text-primary text-sm rounded-full border border-primary/20">
                    Tất cả sản phẩm
                    <button className="rounded-full p-0.5 transition-colors cursor-pointer">
                      <X size={19} />
                    </button>
                  </span>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-24 bg-card rounded-2xl border border-border/50">
                  <PackageSearch className="w-16 h-16 text-muted-foreground/40" strokeWidth={1.2} />
                  <div className="space-y-1 text-center">
                    <p className="text-lg font-semibold text-foreground">Không có sản phẩm nào</p>
                    <p className="text-sm text-muted-foreground">
                      Danh mục này chưa có sản phẩm. Vui lòng quay lại sau.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                      <div
                        key={product.id}
                        className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
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
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-none">
                      <Pagination>
                        <PaginationContent className="gap-2">
                          <PaginationItem>
                            <PaginationPrevious
                              href={createHref(page - 1)}
                              className={`
                                h-10 px-4 rounded-lg border border-border/50 hover:bg-accent/50 hover:border-primary/30 transition-all duration-200
                                ${page <= 1 ? 'pointer-events-none opacity-50' : 'hover:shadow-sm'}
                              `}
                            />
                          </PaginationItem>
                          {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                            let pageNum = i + 1;
                            if (totalPages > 5) {
                              if (page <= 3) {
                                pageNum = i + 1;
                              } else if (page >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                              } else {
                                pageNum = page - 2 + i;
                              }
                            }
                            const isActive = page === pageNum;
                            return (
                              <PaginationItem key={i}>
                                <PaginationLink
                                  href={createHref(pageNum)}
                                  className={`
                                    h-10 w-10 rounded-lg border transition-all duration-200
                                    ${
                                      isActive
                                        ? 'bg-primary text-primary-foreground border-primary shadow shadow-primary/25'
                                        : 'border-border/50 hover:bg-accent/50 hover:border-primary/30 hover:shadow-sm'
                                    }
                                  `}
                                >
                                  {pageNum}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}
                          <PaginationItem>
                            <PaginationNext
                              href={createHref(page + 1)}
                              className={`
                                h-10 px-4 rounded-lg border border-border/50 hover:bg-accent/50 hover:border-primary/30 transition-all duration-200
                                ${page >= totalPages ? 'pointer-events-none opacity-50' : 'hover:shadow'}
                              `}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        Trang{' '}
                        <span className="font-semibold text-primary">{page}</span>{' '}
                        trong tổng số{' '}
                        <span className="font-semibold text-primary">{totalPages}</span>{' '}
                        trang
                      </div>
                    </div>
                  )}
                </>
              )}
            </main>
          </SidebarProvider>
        </div>
      </div>
    </Fragment>
  );
}
