'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchCompanyInfo,
  setCompanyInfo as setCompanyInfoAction,
  CompanyInfo,
} from '@/store/slices/companyInfoSlice';
import React from 'react';

export const useCompanyInfo = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((state) => state.companyInfo);

  const refreshCompanyInfo = React.useCallback(async () => {
    try {
      await dispatch(fetchCompanyInfo()).unwrap();
    } catch (error) {
      console.error('Lỗi lấy thông tin công ty:', error);
    }
  }, [dispatch]);

  const setCompanyInfo = React.useCallback(
    (value: CompanyInfo | null) => {
      dispatch(setCompanyInfoAction(value));
    },
    [dispatch],
  );

  return { companyInfo: data, isLoading, refreshCompanyInfo, setCompanyInfo };
};

export const CompanyInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const hasFetched = useAppSelector((state) => state.companyInfo.hasFetched);

  React.useEffect(() => {
    if (!hasFetched) {
      void dispatch(fetchCompanyInfo());
    }
  }, [dispatch, hasFetched]);

  return <>{children}</>;
};
