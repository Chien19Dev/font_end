'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaCcMastercard,
  FaCcVisa,
  FaFacebook,
  FaHome,
  FaInstagram,
  FaMapMarkerAlt,
  FaPaypal,
  FaPhoneAlt,
  FaRegPaperPlane,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';

const STORE_LINKS = [
  { label: 'Tất cả sản phẩm', href: '/products' },
  { label: 'Hàng mới về', href: '#' },
  { label: 'Bán chạy', href: '#' },
  { label: 'Bộ sưu tập', href: '#' },
];

const POLICY_LINKS = [
  {
    label: 'Chính sách đổi trả 60 ngày',
    href: '/dich-vu-60-ngay-doi-tra',
  },
  {
    label: 'Chính sách khuyến mãi',
    href: '/chuong-trinh-va-chinh-sach-khuyen-mai',
  },
  {
    label: 'Chính sách bảo mật',
    href: '/chinh-sach-bao-mat-thong-tin-ca-nhan',
  },
  {
    label: 'Chính sách giao hàng',
    href: '/chinh-sach-giao-hang',
  },
];

const SUPPORT_LINKS = [
  { label: 'Liên hệ', href: '/lien-he' },
  { label: 'Hỏi đáp - FAQs', href: '/hoi-dap-faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Theo dõi Đơn hàng', href: '/order-tracking' },
];

const SOCIAL_ICONS = [
  {
    icon: <FaInstagram className="text-xl" />,
    href: '#',
    color: 'hover:text-pink-400',
    bgColor: 'hover:bg-pink-400/20',
  },
  {
    icon: <FaFacebook className="text-xl" />,
    href: '#',
    color: 'hover:text-blue-400',
    bgColor: 'hover:bg-blue-400/20',
  },
  {
    icon: <FaTiktok className="text-xl" />,
    href: '#',
    color: 'hover:text-gray',
    bgColor: 'hover:bg-white',
  },
  {
    icon: <FaYoutube className="text-xl" />,
    href: '#',
    color: 'hover:text-red-500',
    bgColor: 'hover:bg-red-500/20',
  },
];

const PAYMENT_ICONS = [FaCcVisa, FaCcMastercard, FaPaypal];
interface NewsletterFormProps {
  onSubmit?: (email: string) => void;
}
function NewsletterForm({ onSubmit }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [, setIsSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubmit?.(email);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmail('');
    }
  };
  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
      <h3 className="text-lg font-semibold text-white mb-2">Đăng ký nhận tin</h3>
      <p className="text-sm text-gray-300 mb-4">
        Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative z-0 my-5 w-full group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 pr-10 w-full text-sm text-background dark:text-foreground bg-transparent border-0 border-b-2 border-background appearance-none dark:border-border dark:focus:border-primary pl-2 focus:outline-none focus:ring-0 focus:border-primary peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-background dark:text-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Địa chỉ email
          </label>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-primary cursor-pointer">
            <FaRegPaperPlane />
          </div>
        </div>
      </form>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1)_0%,transparent_50%)] "></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.08)_0%,transparent_50%)]"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="relative z-10">
        <div className="max-w-full mx-auto px-2 sm:px-3 lg:px-15 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-12">
            <div className="lg:col-span-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 mb-6 transition-transform duration-300 hover:scale-105"
              >
                <div className="p-2 bg-gradient-to-br from-primary to-primary/70 rounded-xl shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                  <Image
                    src="/logo.svg"
                    alt="Elysia Wear"
                    width={32}
                    height={32}
                    className="filter brightness-0 invert"
                  />
                </div>
                <span className="text-2xl font-bold text-white">Elysia Wear</span>
              </Link>
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: <FaHome className="text-primary" />,
                    text: 'Công ty TNHH N.D.C',
                  },
                  {
                    icon: <FaMapMarkerAlt className="text-primary" />,
                    text: '172 Nguyễn Trãi, P.Bến Thành, Q1, HCM',
                  },
                  {
                    icon: <FaPhoneAlt className="text-primary" />,
                    text: '0834 265 606 - 0834 265 707',
                  },
                  {
                    icon: <MdMailOutline className="text-primary" />,
                    text: 'cskh@elysiawear.com',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-gray-300 group hover:text-white transition-colors duration-300"
                  >
                    <div className="mt-1">{item.icon}</div>
                    <span className="text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {SOCIAL_ICONS.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={`p-3 bg-white/5 text-background rounded-xl border border-white/10 ${social.color} ${social.bgColor} transition-all duration-300 hover:transform hover:scale-110 hover:shadow-lg`}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FooterColumn title="Cửa Hàng" links={STORE_LINKS} />
                <FooterColumn title="Chính sách" links={POLICY_LINKS} />
                <FooterColumn title="Hỗ Trợ" links={SUPPORT_LINKS} />
              </div>
            </div>
            <div className="lg:col-span-3">
              <NewsletterForm />
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>
                  &copy; 2025 Elysia Wear. Được thiết kế bởi team Elysia Wear tại Việt Nam
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400 hidden sm:block">Thanh toán an toàn:</span>
                <div className="flex items-center gap-3">
                  {PAYMENT_ICONS.map((Icon, index) => (
                    <div
                      key={index}
                      className="p-2 bg-white rounded-lg hover:scale-110 transition-transform duration-300"
                    >
                      <Icon className="text-2xl text-gray-700" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-semibold text-white mb-6 text-lg relative">
        {title}
        <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary rounded-full"></div>
      </h4>
      <ul className="space-y-3">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
