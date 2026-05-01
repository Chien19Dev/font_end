'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PolicyContent from './policyContent';

interface ProductTabsProps {
  description: string;
}

export default function ProductTabs({ description }: ProductTabsProps) {
  return (
    <div className="mt-10 w-full lg:max-w-6xl mx-auto">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full justify-center items-center mx-auto max-w-4xl grid-cols-2 bg-muted/50 rounded-lg p-1 h-auto">
          <TabsTrigger
            value="description"
            className="relative rounded-md px-6 py-3 font-medium text-sm transition-all duration-200 text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            MÔ TẢ SẢN PHẨM
          </TabsTrigger>
          <TabsTrigger
            value="policy"
            className="relative rounded-md px-6 py-3 font-medium text-sm transition-all duration-200 text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            CHÍNH SÁCH ĐỔI HÀNG
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 min-h-[200px]">
          <TabsContent
            value="description"
            className="mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="bg-card border border-border rounded-lg p-6 shadow-none mb-3">
              <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Thông tin sản phẩm
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground whitespace-pre-line text-sm leading-7 text-justify">
                  {description}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="policy"
            className="mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="bg-card border border-border rounded-lg p-6 shadow-none mb-3">
              <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Chính sách đổi trả
              </h3>
              <div className="text-foreground text-sm leading-7 space-y-4">
                <PolicyContent />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
