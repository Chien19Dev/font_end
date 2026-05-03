'use client';

import { useEffect, useState } from 'react';
import {
  getCompanyInfo,
  upsertCompanyInfo,
  deleteCompanyInfo,
  CompanyInfo,
  CompanyInfoPayload,
} from '@/services/CompanyInfoApi';
import { showSuccess, showError } from '@/lib/swal';
import { EMPTY_FORM } from './company.info.config';

export function useCompanyInfo() {
  const [info, setInfo] = useState<CompanyInfo | null>(null);
  const [form, setForm] = useState<CompanyInfoPayload>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getCompanyInfo()
      .then((data) => {
        setInfo(data);
        setForm({
          name: data.name,
          email: data.email,
          hotline: data.hotline,
          facebook: data.facebook ?? '',
          tiktok: data.tiktok ?? '',
          zalo: data.zalo ?? '',
          youtube: data.youtube ?? '',
          instagram: data.instagram ?? '',
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: keyof CompanyInfoPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.hotline) {
      showError('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }
    setSaving(true);
    try {
      const result = await upsertCompanyInfo(form);
      setInfo(result);
      showSuccess(info ? 'Cập nhật thành công!' : 'Tạo thông tin công ty thành công!');
    } catch (err: any) {
      showError(err?.message || 'Có lỗi xảy ra.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!info) return;
    if (!confirm('Bạn có chắc muốn xóa thông tin công ty?')) return;
    setDeleting(true);
    try {
      await deleteCompanyInfo();
      setInfo(null);
      setForm(EMPTY_FORM);
      showSuccess('Đã xóa thông tin công ty.');
    } catch (err: any) {
      showError(err?.message || 'Có lỗi xảy ra.');
    } finally {
      setDeleting(false);
    }
  };

  return {
    info,
    form,
    loading,
    saving,
    deleting,
    handleChange,
    handleSave,
    handleDelete,
  };
}
