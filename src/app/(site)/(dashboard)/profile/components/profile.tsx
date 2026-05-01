'use client';

import gsap from 'gsap';
import Link from 'next/link';
import React, { Fragment, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/contexts/UserContext';
import { showError, showSuccess } from '@/lib/swal';
import { UpdateProfileResponse } from '@/services/profileApi';

import { ProfilePageSkeleton } from '@/components/skeleton/ProfileSkeleton';
import { Typography } from '@/components/ui/typography';
import Breadcrumbs from '@/components/views/Breadcrumbs';
import {
  CreditCardIcon,
  HeartIcon,
  Loader2Icon,
  MapPinIcon,
  ShoppingBagIcon,
  UserIcon,
  Ticket,
} from 'lucide-react';
import AddressesPage, { AddressesPageRef } from './AddressesPage';
import FavoritesPage from './FavoritesPage';
import OrdersPage from './OrdersPage';
import Payment from './Payment';
import PersonalInfoPage, { PersonalInfoPageRef } from './PersonalInfoPage';
import VoucherPage from './VoucherPage';

export default function ProfilePage() {
  const [loadingBtn, setLoadingBtn] = React.useState(false);
  const { user, fetchUser, loading, error } = useUser();
  const personalInfoRef = useRef<PersonalInfoPageRef>(null);
  const addressRef = useRef<AddressesPageRef>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [tab, setTab] = React.useState('personal');

  const tabConfig = [
    {
      value: 'personal',
      label: 'Thông tin cá nhân',
      icon: UserIcon,
      description: 'Quản lý thông tin cơ bản',
    },
    {
      value: 'orders',
      label: 'Đơn hàng của bạn',
      icon: ShoppingBagIcon,
      description: 'Xem lịch sử đặt hàng',
    },
    {
      value: 'favorites',
      label: 'Sản phẩm yêu thích',
      icon: HeartIcon,
      description: 'Danh sách sản phẩm đã lưu',
    },
    {
      value: 'vouchers',
      label: 'Ví Voucher của bạn',
      icon: Ticket,
      description: 'Quản lý ví voucher của bạn',
    },
    {
      value: 'addresses',
      label: 'Địa chỉ nhận hàng',
      icon: MapPinIcon,
      description: 'Cập nhật địa chỉ giao hàng',
    },
    {
      value: 'payment',
      label: 'Hình thức thanh toán',
      icon: CreditCardIcon,
      description: 'Quản lý phương thức thanh toán',
    },
  ];

  if (loading) return <ProfilePageSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center bg-card border-border">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <Typography variant="h3" className="mb-2 text-destructive">
            Có lỗi xảy ra
          </Typography>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link href="/auth/login">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Đăng nhập lại
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center bg-card border-border">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-primary" />
          </div>
          <Typography variant="h3" className="mb-2">
            Chưa đăng nhập
          </Typography>
          <p className="text-muted-foreground mb-6">Vui lòng đăng nhập để xem hồ sơ của bạn.</p>
          <Link href="/auth/login">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Đăng nhập
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleUpdate = async () => {
    if (loadingBtn) return;
    setLoadingBtn(true);
    gsap.to(btnRef.current, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    });

    try {
      let response: UpdateProfileResponse | undefined;
      if (tab === 'personal' && personalInfoRef.current) {
        response = await personalInfoRef.current.handleUpdate();
      }
      if (tab === 'addresses' && addressRef.current) {
        response = await addressRef.current.handleUpdate();
      }
      await fetchUser();
      if (response?.message) showSuccess(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      if (err?.message) showError(err.message);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="my-6">
          <Breadcrumbs />
        </div>
        <Tabs
          value={tab}
          onValueChange={setTab}
          orientation="vertical"
          className="flex flex-col lg:flex-row gap-8"
        >
          <div className="lg:w-80 w-full">
            <Card className="p-6 bg-card border-border sticky top-8">
              <div className="text-center mb-4">
                <Typography variant="h3" className="mb-1 text-card-foreground">
                  {user.full_name || 'Chưa có tên'}
                </Typography>
                <p className="text-muted-foreground text-sm">{user.email || 'Chưa có email'}</p>
              </div>
              <TabsList className="flex-col h-auto bg-transparent p-0 w-full space-y-2">
                {tabConfig.map((item) => {
                  const Icon = item.icon;
                  const isActive = tab === item.value;
                  return (
                    <TabsTrigger
                      key={item.value}
                      value={item.value}
                      className={`
                        w-full justify-start p-4 h-auto rounded-lg border-0
                        transition-all duration-200 ease-in-out
                        ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-transparent hover:bg-accent hover:text-accent-foreground'
                        }
                        data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                        data-[state=active]:shadow-sm
                      `}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <div className="text-left flex-1">
                          <div className="font-medium text-sm">{item.label}</div>
                          <div
                            className={`text-xs mt-0.5 ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
                          >
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Card>
          </div>
          <div className="flex-1">
            <Card className="bg-card border-border shadow-sm overflow-hidden py-0">
              <div className="p-8">
                <TabsContent value="personal" className="mt-0">
                  <PersonalInfoPage ref={personalInfoRef} />
                </TabsContent>
                <TabsContent value="vouchers" className="mt-0">
                  <VoucherPage />
                </TabsContent>
                <TabsContent value="orders" className="mt-0">
                  <OrdersPage />
                </TabsContent>
                <TabsContent value="favorites" className="mt-0">
                  <FavoritesPage />
                </TabsContent>
                <TabsContent value="addresses" className="mt-0">
                  <AddressesPage ref={addressRef} />
                </TabsContent>
                <TabsContent value="payment" className="mt-0">
                  <Payment />
                </TabsContent>
              </div>
              {(tab === 'personal' || tab === 'addresses') && (
                <div className="bg-muted/30 border-t border-border px-8 py-6">
                  <div className="flex justify-end px-6">
                    <Button
                      ref={btnRef}
                      onClick={handleUpdate}
                      disabled={loadingBtn}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-medium transition-all duration-200 disabled:opacity-50"
                    >
                      {loadingBtn ? (
                        <Fragment>
                          <Loader2Icon className="animate-spin h-5 w-5 mr-2" />
                          Đang cập nhật...
                        </Fragment>
                      ) : (
                        <Fragment>
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Cập nhật thông tin
                        </Fragment>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
