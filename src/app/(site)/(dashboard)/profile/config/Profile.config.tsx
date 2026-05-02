import {
  CreditCardIcon,
  HeartIcon,
  History,
  MapPinIcon,
  ShoppingBagIcon,
  Ticket,
  UserIcon,
} from 'lucide-react';

export type TabValue =
  | 'personal'
  | 'orders'
  | 'favorites'
  | 'product-view'
  | 'vouchers'
  | 'addresses'
  | 'payment';

export type TabConfig = {
  value: TabValue;
  label: string;
  icon: React.ElementType;
  description: string;
};

export const TAB_CONFIG: TabConfig[] = [
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
    value: 'product-view',
    label: 'Sản phẩm đã xem',
    icon: History,
    description: 'Xem lại các sản phẩm bạn đã xem',
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

export const TABS_WITH_SAVE: TabValue[] = ['personal', 'addresses'];
