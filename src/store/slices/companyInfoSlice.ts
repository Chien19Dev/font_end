import { getCompanyInfo } from '@/services/CompanyInfoApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

interface CompanyInfoState {
  data: CompanyInfo | null;
  isLoading: boolean;
  hasFetched: boolean;
}

const initialState: CompanyInfoState = {
  data: null,
  isLoading: false,
  hasFetched: false,
};

export const fetchCompanyInfo = createAsyncThunk<CompanyInfo>(
  'companyInfo/fetch',
  async () => {
    return await getCompanyInfo();
  },
);

const companyInfoSlice = createSlice({
  name: 'companyInfo',
  initialState,
  reducers: {
    setCompanyInfo(state, action) {
      state.data = action.payload;
      state.hasFetched = true;
      state.isLoading = false;
    },
    resetCompanyInfoFetchStatus(state) {
      state.hasFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.hasFetched = true;
      })
      .addCase(fetchCompanyInfo.rejected, (state) => {
        state.isLoading = false;
        state.hasFetched = true;
      });
  },
});

export const { setCompanyInfo, resetCompanyInfoFetchStatus } = companyInfoSlice.actions;
export default companyInfoSlice.reducer;
