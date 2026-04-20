import Breadcrumbs from '@/components/views/Breadcrumbs';
import { EmptyPlaceholder } from '@/components/views/EmptyPlaceholder';
import { getPrivacyPolicy } from '@/services/policyApi';

import { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPrivacyPolicy('faq');
  const baseTitle = 'CÂU HỎI THƯỜNG GẶP KHI MUA SẮM TẠI Elysia Wear';
  return {
    title: data?.title ? `${data.title} - ${baseTitle}` : baseTitle,
    description:
      'Tổng hợp các câu hỏi thường gặp khi mua sắm tại Elysia Wear, các vấn đề liên quan tới đơn hàng: giao hàng, chính sách đổi/trả hàng, địa chỉ đến xem hàng trực tiếp...',
  };
}

export default async function Page() {
  const data = await getPrivacyPolicy('faq');
  if (!data) {
    return (
      <div className="w-full min-h-screen bg-white text-black">
        <div className="mx-auto md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full py-4">
          <EmptyPlaceholder description="Không có dữ liệu." />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <div className="mx-auto max-w-[900px] flex flex-col gap-3.5 md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full py-4">
        <div className="mb-3">
          <Breadcrumbs />
        </div>
        <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
        <div
          className="prose max-w-none prose-headings:text-black prose-p:text-black prose-li:text-black"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </div>
  );
}
