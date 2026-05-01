'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Voucher {
  code: string;
  remaining: number;
  description: string;
  expiry: string;
}

const vouchers: Voucher[] = [
  {
    code: 'HPBDCIV5O10',
    remaining: 1,
    description:
      'Giảm 100K + Tặng Túi Jeans Coolmate cho đơn từ 300K (trừ Outlet, Combo tiết kiệm)',
    expiry: '15/05/2026',
  },
  {
    code: 'REWELCOMED17FZA',
    remaining: 1,
    description: 'Giảm 15% tối đa 50K cho đơn bất kỳ (Không áp dụng cho danh mục SALE)',
    expiry: '10/05/2026',
  },
  {
    code: 'GIFTPROMAXS1',
    remaining: 12,
    description: 'Tặng Quần Short Promax-S1 cho sản phẩm Combo 3 Áo Polo thể thao nam Promax-S1',
    expiry: '31/05/2026',
  },
  {
    code: 'TOTECOOL',
    remaining: 96,
    description: 'Tặng Túi Tote Bag World Cup Checker Play trị giá 149K đơn từ 799K',
    expiry: '31/05/2026',
  },
  {
    code: 'SIPMAT',
    remaining: 96,
    description: 'Tặng Quần Lót Nam Trunk Bamboo Fortune trị giá 99K cho đơn từ 599K',
    expiry: '31/05/2026',
  },
  {
    code: 'CM10',
    remaining: 97,
    description: 'Giảm 10% tối đa 50K cho đơn từ 499K (không áp dụng Outlet)',
    expiry: '31/05/2026',
  },
  {
    code: 'COOLNEW50K',
    remaining: 53,
    description: 'Giảm 50K đơn từ 199K áp dụng cho Sản phẩm mới và BST FIFA',
    expiry: '31/05/2026',
  },
  {
    code: 'COOLNEW',
    remaining: 62,
    description: '[Khách hàng Mới] Nhập COOLNEW Giảm 50K đơn đầu tiên từ 299k',
    expiry: '31/05/2026',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const titleVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function VoucherCard({ voucher }: { voucher: Voucher }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="relative h-full min-h-[107px] cursor-pointer rounded-lg bg-neutral-200 pl-6 pr-4.5
        before:absolute before:left-0 before:top-1/2 before:h-6.5 before:w-6
        before:-translate-x-[53%] before:-translate-y-1/2 before:rounded-full before:bg-light"
    >
      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-card z-10" />

      <div className="flex h-full min-h-[117px] flex-1 justify-between gap-7 border-l border-dashed border-l-neutral-900/20 py-2 pl-3">
        <div className="flex flex-col justify-between lg:flex-1">
          <div>
            <p className="line-clamp-1 flex items-baseline gap-0.5 whitespace-nowrap font-sans text-lg font-medium uppercase leading-6 text-neutral-900">
              {voucher.code}
              <span className="block text-sm font-normal normal-case leading-4.5">
                (Còn {voucher.remaining})
              </span>
            </p>
            <p className="mt-1 line-clamp-3 font-sans text-sm leading-4 text-neutral-900">
              {voucher.description}
            </p>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between">
            <p className="font-sans text-sm leading-4.5 text-neutral-900">HSD: {voucher.expiry}</p>
            <div className="max-lg:hidden">
              <motion.button
                whileHover={{ opacity: 0.7 }}
                whileTap={{ scale: 0.95 }}
                className="whitespace-nowrap font-sans text-sm text-primary cursor-pointer"
              >
                Điều kiện
              </motion.button>
            </div>
          </div>
        </div>
        <div className="flex items-center lg:hidden">
          <motion.button
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.95 }}
            className="whitespace-nowrap font-sans text-sm text-primary cursor-pointer"
          >
            Điều kiện
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function VoucherPage() {
  return (
    <Fragment>
      <div className="max-w-6xl mx-auto min-h-screen flex-1 rounded-lg bg-light px-16 py-14">
        <div className="rounded-lg bg-light p-4 pt-0 max-lg:min-h-screen lg:px-0">
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl font-medium lg:text-4xl lg:leading-13 mb-4"
          >
            Ví Voucher
          </motion.h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0"
          >
            {vouchers.map((voucher) => (
              <VoucherCard key={voucher.code} voucher={voucher} />
            ))}
          </motion.div>
          <div className="relative">
            <img
              src="/mceclip0_96.avif"
              alt="Voucher"
              loading="lazy"
              width="343"
              height="350"
              className="mt-10 h-[350px] w-screen rounded-xl object-cover object-[70%]"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-5">
              <p className="font-criteria text-[28px] font-medium leading-8 text-background dark:text-white">
                Nhiều ưu đãi hấp dẫn đang chờ bạn
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-background rounded-full focus-visible:outline-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-criteria uppercase disabled:bg-neutral-300 disabled:!text-neutral-600 relative transition-all align-text-bottom bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700 h-12 px-12 py-4 text-base mt-3 dark:text-white"
              >
                Khám phá ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
