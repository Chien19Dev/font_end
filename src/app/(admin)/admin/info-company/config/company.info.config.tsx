import React from 'react';
import { Building2, Mail, Phone, Facebook, Youtube, Instagram } from 'lucide-react';
import { CompanyInfoPayload } from '@/services/CompanyInfoApi';

export const TiktokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
);

export const ZaloIcon = () => (
  <svg viewBox="0 0 50 50" className="w-4 h-4" fill="currentColor">
    <path d="M25 2C12.318 2 2 12.318 2 25c0 3.96 1.023 7.854 2.963 11.29L2.037 46.73a1 1 0 0 0 1.232 1.232l10.44-2.926A23 23 0 0 0 25 48c12.682 0 23-10.318 23-23S37.682 2 25 2zm-6 13h2a1 1 0 0 1 0 2h-2v6h2a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2h1v-6h-1a1 1 0 0 1 0-2h1zm5 0h6a1 1 0 0 1 .894 1.447l-4 8A1 1 0 0 1 26 25h-2a1 1 0 0 1 0-2h1.382l3-6H24a1 1 0 0 1 0-2zm-9 12h12a1 1 0 0 1 .6 1.8l-8.667 6.5H28a1 1 0 0 1 0 2H16a1 1 0 0 1-.6-1.8l8.667-6.5H15a1 1 0 0 1 0-2z" />
  </svg>
);

export type FieldConfig = {
  key: keyof CompanyInfoPayload;
  label: string;
  icon: React.ElementType;
  placeholder: string;
  type?: string;
  required?: boolean;
  section: 'basic' | 'social';
};

export const FIELD_CONFIG: FieldConfig[] = [
  {
    key: 'name',
    label: 'Tên công ty',
    icon: Building2,
    placeholder: 'Công ty TNHH...',
    required: true,
    section: 'basic',
  },
  {
    key: 'email',
    label: 'Gmail công ty',
    icon: Mail,
    placeholder: 'contact@company.com',
    type: 'email',
    required: true,
    section: 'basic',
  },
  {
    key: 'hotline',
    label: 'Hotline',
    icon: Phone,
    placeholder: '1800 xxxx',
    required: true,
    section: 'basic',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    icon: Facebook,
    placeholder: 'https://facebook.com/...',
    section: 'social',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    icon: TiktokIcon,
    placeholder: 'https://tiktok.com/@...',
    section: 'social',
  },
  {
    key: 'zalo',
    label: 'Zalo',
    icon: ZaloIcon,
    placeholder: 'https://zalo.me/...',
    section: 'social',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    icon: Youtube,
    placeholder: 'https://youtube.com/@...',
    section: 'social',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: Instagram,
    placeholder: 'https://instagram.com/...',
    section: 'social',
  },
];

export const EMPTY_FORM: CompanyInfoPayload = {
  name: '',
  email: '',
  hotline: '',
  facebook: '',
  tiktok: '',
  zalo: '',
  youtube: '',
  instagram: '',
};
