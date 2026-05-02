'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2Icon } from 'lucide-react';
import { Fragment, RefObject } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TABS_WITH_SAVE, TabValue } from './Profile.config';
import PersonalInfoPage, { PersonalInfoPageRef } from '../components/PersonalInfoPage';
import AddressesPage, { AddressesPageRef } from '../components/AddressesPage';
import VoucherPage from '../components/VoucherPage';
import OrdersPage from '../components/OrdersPage';
import FavoritesPage from '../components/FavoritesPage';
import ProductViewed from '../components/ProductViewed';
import Payment from '../components/Payment';

type Props = {
  tab: TabValue;
  loadingBtn: boolean;
  btnRef: RefObject<HTMLButtonElement | null>;
  personalInfoRef: RefObject<PersonalInfoPageRef | null>;
  addressRef: RefObject<AddressesPageRef | null>;
  onSave: () => void;
};

const TAB_CONTENT: Record<TabValue, React.ReactNode> = {
  personal: null,
  vouchers: <VoucherPage />,
  orders: <OrdersPage />,
  favorites: <FavoritesPage />,
  'product-view': <ProductViewed />,
  addresses: null,
  payment: <Payment />,
};

export function ProfileContent({
  tab,
  loadingBtn,
  btnRef,
  personalInfoRef,
  addressRef,
  onSave,
}: Props) {
  const showSaveFooter = TABS_WITH_SAVE.includes(tab);

  const contentMap: Record<TabValue, React.ReactNode> = {
    ...TAB_CONTENT,
    personal: <PersonalInfoPage ref={personalInfoRef} />,
    addresses: <AddressesPage ref={addressRef} />,
  };

  return (
    <Card className="bg-card border-border shadow-sm overflow-hidden py-0">
      <div className="p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {contentMap[tab]}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showSaveFooter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="bg-muted/30 border-t border-border px-8 py-6">
              <div className="flex justify-end px-6">
                <Button
                  ref={btnRef}
                  onClick={onSave}
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
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
