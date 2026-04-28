'use client';

import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
import { EmptyPlaceholder } from '@/components/views/EmptyPlaceholder';
import ProductCard from '@/components/views/ItemCard';
import ModalFitterProduct from '@/model/modalFitterProduct';
import {
  Category,
  getAllCategories,
  Subcategory,
} from '@/services/categoryApi';
import { getProducts } from '@/services/productsApi';
import { SortType } from '@/types/sort';
import { Fragment, useEffect, useMemo, useState } from 'react';

export default function AllProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<string>('all');
  const [selectedSubSlug, setSelectedSubSlug] =
    useState<string>('all');
  const [sort, setSort] = useState<SortType>('newest');

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === selectedCategoryId),
    [categories, selectedCategoryId],
  );

  const subcategories: Subcategory[] = useMemo(
    () => selectedCategory?.subcategories ?? [],
    [selectedCategory],
  );

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProducts({
      category_id:
        selectedCategoryId !== 'all' ? selectedCategoryId : undefined,
      subcategory_slug:
        selectedSubSlug !== 'all' ? selectedSubSlug : undefined,
      sort,
      page: currentPage,
      limit: 12,
    })
      .then((res) => {
        setProducts(res.data);
        setTotalPages(res.pagination.totalPages || 1);
        setTotalItems(res.pagination.total || 0);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setError('Không thể tải sản phẩm');
        setLoading(false);
      });
  }, [selectedCategoryId, selectedSubSlug, sort, currentPage]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryId(value);
    setSelectedSubSlug('all');
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (value: string) => {
    setSelectedSubSlug(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortType) => {
    setSort(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fragment>
      <div className="mx-auto max-w-full md:px-14 xl:px-15 2xl:px-16 px-4 sm:px-6 lg:px-15 w-full h-full py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
                Tất cả sản phẩm
              </h1>
              <p className="text-foreground/70 mt-1">
                {loading ? 'Đang tải...' : `${totalItems} sản phẩm`}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="flex items-center gap-1.5">
                <Label className="text-sm">Danh mục</Label>
                <Select
                  value={selectedCategoryId}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Tất cả</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-1.5">
                <Label className="text-sm">Phân loại</Label>
                <Select
                  value={selectedSubSlug}
                  onValueChange={handleSubcategoryChange}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Tất cả</SelectItem>
                      {subcategories.map((s) => (
                        <SelectItem key={s.id} value={s.slug}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <ModalFitterProduct
                  sort={sort}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-200 border-t-blue rounded-full animate-spin"></div>
                <p className="text-slate-600 font-medium">
                  Đang tải sản phẩm...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="py-20">
              <EmptyPlaceholder description={error} />
            </div>
          ) : products.length === 0 ? (
            <div className="py-20">
              <EmptyPlaceholder description="Không có sản phẩm nào." />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  categorySlug={product.category.slug_category}
                  subcategorySlug={product.subcategory?.slug ?? ''}
                  name={product.name}
                  description={product.description}
                  price={product.discounted_price ?? product.price}
                  oldPrice={
                    product.discounted_price
                      ? product.price
                      : undefined
                  }
                  discountPercent={product.discount_percentage}
                  image_url={product.image_url}
                  image_hover_url={product.image_hover_url}
                  variants={product.variants ?? []}
                  index={index}
                />
              ))}
            </div>
          )}
          {!loading && !error && totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          handlePageChange(currentPage - 1);
                        }
                      }}
                      className={
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                  {currentPage > 3 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            handlePageChange(1);
                          }}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      {currentPage > 4 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                    </>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page >= Math.max(1, currentPage - 1) &&
                        page <= Math.min(totalPages, currentPage + 1)
                      );
                    })
                    .map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                          isActive={page === currentPage}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                          }}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        if (currentPage < totalPages) {
                          handlePageChange(currentPage + 1);
                        }
                      }}
                      className={
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
