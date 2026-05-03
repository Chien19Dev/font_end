'use client';

import { Fragment } from 'react';
import { Globe, Loader2, Save, Trash2 } from 'lucide-react';
import { FIELD_CONFIG } from './config/company.info.config';
import { useCompanyInfo } from './config/use.info.company';
import { CompanyFormField } from './config/company.formfield';

export default function InfoCompany() {
  const { info, form, loading, saving, deleting, handleChange, handleSave, handleDelete } =
    useCompanyInfo();

  const basicFields = FIELD_CONFIG.filter((f) => f.section === 'basic');
  const socialFields = FIELD_CONFIG.filter((f) => f.section === 'social');

  return (
    <Fragment>
      <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full lg:w-[70%] h-full py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Thông tin công ty</h1>
              <p className="text-sm text-muted-foreground">
                {info
                  ? 'Chỉnh sửa thông tin hiển thị công khai'
                  : 'Chưa có thông tin — điền vào để tạo mới'}
              </p>
            </div>
          </div>

          {info && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 text-sm text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/10 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Xóa
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <section>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Thông tin cơ bản <span className="text-destructive">*</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {basicFields.map((field) => (
                  <CompanyFormField
                    key={field.key}
                    field={field}
                    value={form[field.key] ?? ''}
                    onChange={(v) => handleChange(field.key, v)}
                  />
                ))}
              </div>
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Mạng xã hội
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialFields.map((field) => (
                  <CompanyFormField
                    key={field.key}
                    field={field}
                    value={form[field.key] ?? ''}
                    onChange={(v) => handleChange(field.key, v)}
                  />
                ))}
              </div>
            </section>

            <div className="flex justify-end pt-2 border-t border-border">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? 'Đang lưu...' : info ? 'Lưu thay đổi' : 'Tạo mới'}
              </button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
