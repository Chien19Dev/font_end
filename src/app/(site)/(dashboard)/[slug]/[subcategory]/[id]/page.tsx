import Breadcrumbs from '@/components/views/Breadcrumbs';
import { getProductDetail } from '@/services/productsApi';
import { RotateCcw, Shield, Star, Truck } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductImageCarousel from './components/ProductImageCarousel';
import ProductTabs from './components/ProductTabs';
import ProductVariantSelector from './components/ProductVariantSelector';
import ProductShare from './components/ProducShare';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const product = await getProductDetail(resolvedParams.id);
    const firstImage =
      Array.isArray(product.image_url) && product.image_url.length > 0 ? product.image_url[0] : '';
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [
          {
            url: firstImage,
            width: 800,
            height: 600,
            alt: product.name,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description,
        images: [firstImage],
      },
    };
  } catch (error) {
    return {
      title: 'Sản phẩm không tồn tại',
      description: 'Sản phẩm bạn đang tìm không tồn tại.',
    };
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const resolvedParams = await params;

  try {
    const product = await getProductDetail(resolvedParams.id);

    if (!product) {
      return notFound();
    }

    return (
      <div className="min-h-screen bg-background dark:bg-gray">
        <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-2 sm:px-2 lg:px-8 w-full py-6">
          <div className="mb-6">
            <Breadcrumbs />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <div className="sticky top-4">
                <ProductImageCarousel
                  images={
                    Array.isArray(product.image_url) ? product.image_url : [product.image_url]
                  }
                  alt={product.name}
                  productId={product.id}
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 p-6 lg:p-2">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-3">
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                      {product.name}
                    </h1>
                  </div>
                  <div className="flex gap-4 border-b border-neutral-200 py-2 lg:mt-3 lg:pb-3 lg:pt-0">
                    <ProductShare />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">4.0 (128 đánh giá)</span>
                  </div>
                </div>
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      {product.discounted_price && (
                        <span className="text-lg text-muted-foreground line-through">
                          {product.price}
                        </span>
                      )}
                      <span className="text-3xl lg:text-4xl font-bold text-foreground">
                        {product.discounted_price ?? product.price}
                      </span>
                      {product.discount_percentage !== undefined &&
                        product.discount_percentage > 0 && (
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                            -{product.discount_percentage}%
                          </span>
                        )}
                    </div>
                    {product.discounted_price && (
                      <p className="text-sm text-muted-foreground">
                        Tiết kiệm được{' '}
                        <span className="font-semibold text-primary">
                          {(
                            parseFloat(String(product.price).replace(/[^\d]/g, '')) -
                            parseFloat(String(product.discounted_price).replace(/[^\d]/g, ''))
                          ).toLocaleString()}
                          đ
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-8">
                  <ProductVariantSelector
                    productId={product.id}
                    variants={(product.variants ?? []).map((v) => ({
                      id: v.id,
                      product_id: product.id,
                      product_name: product.name,
                      color: v.color,
                      size: v.size,
                      quantity: v.quantity,
                      price: String(product.discounted_price ?? product.price),
                      image:
                        Array.isArray(product.image_url) && product.image_url.length > 0
                          ? product.image_url[0]
                          : '',
                    }))}
                  />
                </div>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Ưu đãi đặc biệt</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <Truck className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Miễn phí vận chuyển</p>
                        <p className="text-xs text-muted-foreground">Đơn hàng từ 500.000đ</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <RotateCcw className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Đổi trả dễ dàng</p>
                        <p className="text-xs text-muted-foreground">Trong vòng 30 ngày</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Bảo hành chính hãng</p>
                        <p className="text-xs text-muted-foreground">12 tháng từ nhà sản xuất</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      Còn hàng - Sẵn sàng giao
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden">
              <ProductTabs description={product.description} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error('Chi tiết sản phẩm lỗi:', err);
    return notFound();
  }
}
