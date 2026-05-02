'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useRouter, useSearchParams } from 'next/navigation';

import { Tabs } from '@/components/ui/tabs';
import { ProfilePageSkeleton } from '@/components/skeleton/ProfileSkeleton';
import Breadcrumbs from '@/components/views/Breadcrumbs';
import { useUser } from '@/contexts/UserContext';
import { showError, showSuccess } from '@/lib/swal';
import { UpdateProfileResponse } from '@/services/profileApi';

import { AddressesPageRef } from './AddressesPage';
import { PersonalInfoPageRef } from './PersonalInfoPage';
import { TabValue } from '../config/Profile.config';
import { ProfileErrorState, ProfileUnauthState } from '../config/Profile.States';
import { ProfileSidebar } from '../config/Profile.Sidebar';
import { ProfileContent } from '../config/Profile.Content';

const DEFAULT_TAB: TabValue = 'personal';

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = (searchParams.get('tab') as TabValue) || DEFAULT_TAB;
  const [tab, setTab] = React.useState<TabValue>(tabFromUrl);
  const [loadingBtn, setLoadingBtn] = React.useState(false);
  const { user, fetchUser, loading, error } = useUser();
  const personalInfoRef = useRef<PersonalInfoPageRef>(null);
  const addressRef = useRef<AddressesPageRef>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!searchParams.get('tab')) {
      router.replace(`?tab=${DEFAULT_TAB}`, { scroll: false });
    }
  }, []);
  useEffect(() => {
    const urlTab = (searchParams.get('tab') as TabValue) || DEFAULT_TAB;
    setTab(urlTab);
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    const newTab = value as TabValue;
    setTab(newTab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', newTab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (loading) return <ProfilePageSkeleton />;
  if (error) return <ProfileErrorState error={error} />;
  if (!user) return <ProfileUnauthState />;

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
      setTimeout(() => window.location.reload(), 2000);
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
          onValueChange={handleTabChange}
          orientation="vertical"
          className="flex flex-col lg:flex-row gap-8"
        >
          <div className="lg:w-80 w-full">
            <ProfileSidebar fullName={user.full_name} email={user.email} activeTab={tab} />
          </div>
          <div className="flex-1">
            <ProfileContent
              tab={tab}
              loadingBtn={loadingBtn}
              btnRef={btnRef}
              personalInfoRef={personalInfoRef}
              addressRef={addressRef}
              onSave={handleUpdate}
            />
          </div>
        </Tabs>
      </div>
    </div>
  );
}
