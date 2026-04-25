import { policyItems } from '@/data/policy';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

export default function PolicyContent() {
  return (
    <Fragment>
      <div className="mx-auto max-w-full px-2 lg:px-4 w-full h-full py-8">
        <Image
          src="/public/csdt.png"
          alt="chính sách đổi hàng online"
          width={890}
          height={1115}
          className="w-full h-full object-cover bg-transparent"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          {policyItems.map((item, idx) => (
            <div key={idx} className="flex justify-start items-center">
              <div className="m-[22px_10px] lg:m-[42px_20px] rounded">
                <Link href={item.href} className="text-foreground">
                  <div className="flex gap-1.5">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      width={66}
                      height={66}
                      unoptimized
                      className="rounded"
                    />
                    <div className="uppercase items-center">
                      <div className="font-bold text-base">{item.title}</div>
                      <div className="text-sm">{item.desc}</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link href="/dich-vu-60-ngay-doi-tra" className="block text-xl text-center text-foreground">
          Xem chi tiết dịch vụ đổi trả
        </Link>
      </div>
    </Fragment>
  );
}
