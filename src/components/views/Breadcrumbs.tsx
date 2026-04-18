'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getCategoryBySlug } from '@/services/categoryApi';
import { getProductDetail } from '@/services/productsApi';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

const SPECIAL_LABELS: Record<string, string> = {
  'hoi-dap-faq': 'Hỏi đáp FAQ',
  'chinh-sach-giao-hang': 'Chính sách giao hàng',
  'lien-he': 'Liên hệ',
  blog: 'Bài viết',
  'cham-soc-khach-hang': 'Chăm sóc khách hàng',
  'chinh-sach-bao-mat-thong-tin-ca-nhan':
    'Chính sách bảo mật thông tin cá nhân',
  'chuong-trinh-va-chinh-sach-khuyen-mai':
    'Chương trình và chính sách khuyến mãi',
  'dich-vu-60-ngay-doi-tra': 'Dịch vụ đổi trả',
  'order-tracking': 'Theo dõi đơn hàng',
  profile: 'Thông tin cá nhân',
  admin: 'Trang quản lý',
  'tao-san-pham': 'Tạo sản phẩm',
  'create-banner': 'Tạo banner',
  'update-banner': 'Cập nhật banner',
  'create-discount': 'Tạo giảm giá',
  policy: 'Chính sách',
  category: 'Danh mục',
  lever: 'Level',
  'create-category' : 'Tạo danh mục'
};

function formatSlug(slug: string) {
  if (SPECIAL_LABELS[slug]) return SPECIAL_LABELS[slug];
  return (
    slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
  );
}
export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter((part) => part !== '');
  const [labels, setLabels] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    async function loadLabels() {
      setLoading(true);
      let newLabels: string[] = [];
      if (pathParts.length === 0) {
        setLabels(newLabels);
        setLoading(false);
        return;
      }
      const categorySlug = pathParts[0];
      const category = await getCategoryBySlug(categorySlug);
      if (category?.name) {
        newLabels.push(category.name);
      } else {
        newLabels.push(formatSlug(categorySlug));
      }
      if (pathParts.length > 1) {
        const subcategorySlug = pathParts[1];
        let subcategoryName = '';
        if (category?.subcategories) {
          const sub = category.subcategories.find(
            (sc) => sc.slug === subcategorySlug,
          );
          if (sub) {
            subcategoryName = sub.name;
          }
        }
        if (!subcategoryName) {
          subcategoryName = formatSlug(subcategorySlug);
        }
        newLabels.push(subcategoryName);
      }
      if (pathParts.length > 2) {
        try {
          const productId = pathParts[2];
          const product = await getProductDetail(productId);
          newLabels.push(product.name);
        } catch (error) {
          newLabels.push(formatSlug(pathParts[2]));
        }
      }
      setLabels(newLabels);
      setLoading(false);
    }
    loadLabels();
  }, [pathname]);

  if (loading) {
    return (
      <div className="w-full pb-6">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-20 bg-muted animate-pulse rounded-md"></div>
          <div className="h-4 w-4 bg-muted animate-pulse rounded-sm"></div>
          <div className="h-4 w-24 bg-muted animate-pulse rounded-md"></div>
        </div>
      </div>
    );
  }

  if (labels.length !== pathParts.length && pathParts.length > 0) {
    return null;
  }
  return (
    <Breadcrumb className="w-full">
      <BreadcrumbList className="flex items-center space-x-1 text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <Home className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Trang chủ</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {labels.map((label, index) => {
          const href = '/' + pathParts.slice(0, index + 1).join('/');
          const isLast = index === labels.length - 1;
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator className="text-muted-foreground/60">
                <ChevronRight className="h-3.5 w-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage
                    aria-current="page"
                    // max-w-[200px]
                    className="px-2 py-1.5 rounded-md bg-primary/10 text-primary font-semibold truncate border border-primary/20"
                    title={label}
                  >
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={href}
                      // max-w-[180px]
                      className="px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 font-medium truncate focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      title={label}
                    >
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
