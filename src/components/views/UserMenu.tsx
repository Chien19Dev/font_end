'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/contexts/UserContext';
import { logoutApi } from '@/services/authApi';
import {
  CircleUserRoundIcon,
  LayoutDashboardIcon,
  ListTodo,
  LogOutIcon,
  Package,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const getAvatarSrc = (avatar?: string | null) => {
    if (!avatar || !avatar.trim()) return '/image.webp';
    const normalized = avatar.trim();
    if (normalized.startsWith('http://')) {
      return normalized.replace('http://', 'https://');
    }
    return normalized;
  };
  const getInitials = (name?: string) => {
    if (!name) return 'EW';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'EW';
    const first = parts[0][0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return `${first}${last}`.toUpperCase();
  };
  const handleLogout = async () => {
    try {
      await logoutApi();
      await signOut({ redirect: false });
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };
  if (!user) {
    return (
      <div className="ml-3 flex space-x-2">
        <Button variant="outline" className="text-sm" onClick={() => router.push('/auth/login')}>
          Đăng nhập
        </Button>
        <Button variant="outline" className="text-sm" onClick={() => router.push('/auth/register')}>
          Đăng ký
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-9 h-9">
          <AvatarImage
            src={getAvatarSrc(user.avatar)}
            alt="User Avatar"
            className="cursor-pointer object-cover"
          />
          <AvatarFallback className="text-xs font-semibold">
            {getInitials(user.full_name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="max-w-60 bg-background dark:bg-gray">
        <DropdownMenuLabel className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={getAvatarSrc(user.avatar)}
              alt="User Avatar"
              className="object-cover"
            />
            <AvatarFallback className="text-xs font-semibold">
              {getInitials(user.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">{user.full_name}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile?tab=personal" className="flex items-center gap-2">
              <CircleUserRoundIcon size={16} className="opacity-60" />
              <span>Thông tin cá nhân</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile?tab=orders" className="flex items-center gap-2">
              <ListTodo size={16} className="opacity-60" />
              <span>Danh sách đơn hàng</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/order-tracking" className="flex items-center gap-2">
              <Package size={16} className="opacity-60" />
              <span>Theo dõi đơn hàng</span>
            </Link>
          </DropdownMenuItem>
          {user.email === 'nguyendinhchien19042003@gmail.com' && (
            <DropdownMenuItem asChild>
              <Link href="/admin" className="flex items-center gap-2">
                <LayoutDashboardIcon size={16} className="opacity-60" />
                <span>Trang quản lý</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOutIcon size={16} className="opacity-60" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
