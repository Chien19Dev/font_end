'use client';

import { Minus, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { SearchForm } from './search-form';

const data = {
  navMain: [
    {
      title: 'Sản Phẩm',
      url: '#',
      items: [
        {
          title: 'Tạo sản phẩm',
          url: '/admin/tao-san-pham',
        },
      ],
    },
    {
      title: 'Bài Viết',
      url: '#',
      items: [
        {
          title: 'Tạo bài viết',
          url: '/admin/blog',
        },
        {
          title: 'Danh sách bài viết',
          url: '/admin/blog/list',
        },
      ],
    },
    {
      title: 'Danh mục',
      url: '#',
      items: [
        {
          title: 'Cập nhật danh mục',
          url: '/admin/category',
        },
        {
          title: 'Tạo danh mục',
          url: '/admin/category/create-category',
        },
      ],
    },
    {
      title: 'Banner',
      url: '#',
      items: [
        {
          title: 'Tạo banner',
          url: '/admin/create-banner',
        },
        {
          title: 'Cập nhật banner',
          url: '/admin/update-banner',
        },
      ],
    },
    {
      title: 'Mã giảm giá',
      url: '#',
      items: [
        {
          title: 'Tạo mã giảm giá',
          url: '/admin/create-discount',
        },
      ],
    },
    {
      title: 'Chinh sách bảo mật',
      url: '#',
      items: [
        {
          title: 'Thông tin cá nhân',
          url: '/admin/policy',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props} className="fixed">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex w-full">
                <div className="flex flex-row items-center gap-5 leading-none">
                  <Image src="/logo.svg" alt="Elysia Wear" width={35} height={35} />
                  <div className="text-gray dark:text-white font-semibold text-lg">Elysia Wear</div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="mb-4">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={item.items.some((sub) => pathname.startsWith(sub.url))}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname.startsWith(subItem.url)}
                            >
                              <Link href={subItem.url}>{subItem.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
