import { apiFetch } from './apiClient';

export interface CompanyInfo {
  id: string;
  name: string;
  email: string;
  hotline: string;
  facebook?: string;
  tiktok?: string;
  zalo?: string;
  youtube?: string;
  instagram?: string;
  created_at: string;
  updated_at: string;
}

export type CompanyInfoPayload = {
  name: string;
  email: string;
  hotline: string;
  facebook?: string;
  tiktok?: string;
  zalo?: string;
  youtube?: string;
  instagram?: string;
};

export async function getCompanyInfo(): Promise<CompanyInfo> {
  return apiFetch('/company-info');
}

export async function createCompanyInfo(data: CompanyInfoPayload): Promise<CompanyInfo> {
  return apiFetch('/company-info', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCompanyInfo(data: Partial<CompanyInfoPayload>): Promise<CompanyInfo> {
  return apiFetch('/company-info', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function upsertCompanyInfo(data: CompanyInfoPayload): Promise<CompanyInfo> {
  return apiFetch('/company-info', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteCompanyInfo(): Promise<void> {
  await apiFetch('/company-info', {
    method: 'DELETE',
  });
}
