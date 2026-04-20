export type Voucher = {
  id: number;
  title: string;
  code: string;
  description: string;
  discount: string;
  type: string;
  background?: string;
  category?: string;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
};
export const featuredVouchers: Voucher[] = [
  {
    id: 1,
    title: 'Giảm 20% Toàn Bộ Sản Phẩm',
    code: 'SALE20',
    description: 'Cho đơn hàng từ 500k',
    discount: '20%',
    type: 'percentage',
    background:
      'bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600',
    timeLeft: { days: 2, hours: 10, minutes: 30, seconds: 15 },
  },
  {
    id: 2,
    title: 'Miễn Phí Vận Chuyển',
    code: 'FREESHIP',
    description: 'Áp dụng toàn quốc',
    discount: 'FREE',
    type: 'shipping',
    background:
      'bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600',
    timeLeft: { days: 5, hours: 8, minutes: 45, seconds: 30 },
  },
  {
    id: 3,
    title: 'Ưu Đãi Đặc Biệt Tháng 9',
    code: 'SEPT2024',
    description: 'Giảm tối đa 300k',
    discount: '300K',
    type: 'fixed',
    background:
      'bg-gradient-to-r from-orange-500 via-red-500 to-pink-600',
    timeLeft: { days: 12, hours: 6, minutes: 20, seconds: 45 },
  },
  {
    id: 4,
    title: 'Combo Siêu Tiết Kiệm',
    code: 'COMBO50',
    description: 'Mua 2 tặng 1',
    discount: '2+1',
    type: 'combo',
    background:
      'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600',
    timeLeft: { days: 7, hours: 14, minutes: 55, seconds: 10 },
  },
];
export const allVouchers: Voucher[] = [
  ...featuredVouchers,
  {
    id: 5,
    title: 'Giảm 15% Thời Trang',
    code: 'FASHION15',
    description: 'Áp dụng cho danh mục thời trang',
    discount: '15%',
    type: 'percentage',
    category: 'fashion',
    timeLeft: { days: 3, hours: 12, minutes: 0, seconds: 0 },
  },
  {
    id: 6,
    title: 'Giảm 100k Điện Tử',
    code: 'TECH100',
    description: 'Cho đơn hàng từ 2 triệu',
    discount: '100K',
    type: 'fixed',
    category: 'electronics',
    timeLeft: { days: 6, hours: 8, minutes: 30, seconds: 15 },
  },
  {
    id: 7,
    title: 'Cashback 10%',
    code: 'CASH10',
    description: 'Hoàn tiền tối đa 200k',
    discount: '10%',
    type: 'cashback',
    category: 'all',
    timeLeft: { days: 15, hours: 4, minutes: 45, seconds: 30 },
  },
  {
    id: 8,
    title: 'Student Deal',
    code: 'STUDENT',
    description: 'Ưu đãi sinh viên',
    discount: '25%',
    type: 'percentage',
    category: 'education',
    timeLeft: { days: 30, hours: 0, minutes: 0, seconds: 0 },
  },
];
