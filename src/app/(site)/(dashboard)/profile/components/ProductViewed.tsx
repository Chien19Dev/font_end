'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, PackageSearch, Loader2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Product } from '@/services/productsApi';
import {
  getRecentlyViewed,
  removeRecentlyViewed,
  clearRecentlyViewed,
} from '@/services/productViewApi';

const LIMIT = 10;

export default function ProductViewed() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  const fetchData = async (p: number, append = false) => {
    try {
      const res = await getRecentlyViewed({ page: p, limit: LIMIT });
      setProducts((prev) => (append ? [...prev, ...res.data] : res.data));
      setTotalPages(res.pagination.totalPages);
      setTotal(res.pagination.total);
    } catch {}
  };

  useEffect(() => {
    setLoading(true);
    fetchData(1).finally(() => setLoading(false));
  }, []);

  const handleLoadMore = async () => {
    const next = page + 1;
    setLoadingMore(true);
    await fetchData(next, true);
    setPage(next);
    setLoadingMore(false);
  };

  const handleRemove = async (productId: string) => {
    setRemovingId(productId);
    try {
      await removeRecentlyViewed(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setTotal((prev) => prev - 1);
    } finally {
      setRemovingId(null);
    }
  };

  const handleClearAll = async () => {
    setClearing(true);
    try {
      await clearRecentlyViewed();
      setProducts([]);
      setTotal(0);
      setPage(1);
      setTotalPages(1);
    } finally {
      setClearing(false);
    }
  };
  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="h-7 w-48 rounded-md bg-muted animate-pulse" />
          <div className="h-9 w-28 rounded-md bg-muted animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="aspect-[3/4] rounded-xl bg-muted animate-pulse" />
              <div className="h-4 rounded bg-muted animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <PackageSearch className="w-16 h-16 text-muted-foreground/40" strokeWidth={1.2} />
        <div className="space-y-1">
          <p className="text-lg font-semibold">Chưa có sản phẩm nào</p>
          <p className="text-sm text-muted-foreground">Các sản phẩm bạn xem sẽ xuất hiện ở đây.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Sản phẩm đã xem</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{total} sản phẩm</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearAll}
          disabled={clearing}
          className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
        >
          {clearing ? (
            <Loader2 className="w-4 h-4 animate-spin mr-1" />
          ) : (
            <Trash2 className="w-4 h-4 mr-1" />
          )}
          Xóa tất cả
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            removing={removingId === product.id}
            onRemove={() => handleRemove(product.id)}
          />
        ))}
      </div>
      {page < totalPages && (
        <div className="flex justify-center pt-2">
          <Button variant="outline" onClick={handleLoadMore} disabled={loadingMore}>
            {loadingMore ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Xem thêm
          </Button>
        </div>
      )}
    </div>
  );
}
function ProductCard({
  product,
  removing,
  onRemove,
}: {
  product: Product;
  removing: boolean;
  onRemove: () => void;
}) {
  const href = `/${product.category?.slug_category}/${product.subcategory?.slug}/${product.id}`;
  const image = Array.isArray(product.image_url) ? product.image_url[0] : product.image_url;

  return (
    <div className="group relative flex flex-col gap-2">
      <button
        onClick={onRemove}
        disabled={removing}
        className="absolute top-2 right-2 z-10 p-1 rounded-full bg-background/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive"
        aria-label="Xóa khỏi lịch sử"
      >
        {removing ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <X className="w-3.5 h-3.5" />
        )}
      </button>
      <Link href={href} className="block">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PackageSearch className="w-8 h-8 text-muted-foreground/30" />
            </div>
          )}
          {product.discount_percentage && (
            <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-semibold px-1.5 py-0.5 rounded">
              -{product.discount_percentage}%
            </span>
          )}
        </div>
      </Link>
      <Link href={href} className="flex flex-col gap-0.5">
        <p className="text-sm font-medium line-clamp-2 leading-snug">{product.name}</p>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-semibold text-primary">
            {product.discounted_price ?? product.price}
          </span>
          {product.discounted_price && (
            <span className="text-xs text-muted-foreground line-through">{product.price}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
