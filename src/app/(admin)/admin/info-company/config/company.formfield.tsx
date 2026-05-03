'use client';

import { FieldConfig } from "./company.info.config";


type Props = {
  field: FieldConfig;
  value: string;
  onChange: (value: string) => void;
};

export function CompanyFormField({ field, value, onChange }: Props) {
  const Icon = field.icon;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        <span className="text-muted-foreground">
          <Icon className="w-4 h-4" />
        </span>
        {field.label}
        {field.required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={field.type ?? 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
      />
    </div>
  );
}
