import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface User {
  full_name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  order_address?: {
    detail: string;
    province: string;
    district: string;
    ward: string;
    full_address: string;
    codes: {
      province_code: string;
      district_code: string;
      ward_code: string;
    };
  };
  birth_date?: string;
  gender?: 0 | 1 | 2;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
}

const initialState: UserState = {
  user: null,
  loading: true,
  error: null,
  hasFetched: false,
};

export const fetchUser = createAsyncThunk<
  User,
  { force?: boolean } | undefined,
  { rejectValue: string; state: { user: UserState } }
>('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/profile/get-user`, {
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData = await res.json();
      return rejectWithValue(errorData.message || 'Không lấy được thông tin người dùng');
    }

    const json = await res.json();
    return json.data as User;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Lỗi khi lấy thông tin người dùng');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.error = null;
      state.hasFetched = action.payload !== null;
      state.loading = false;
    },
    resetUserFetchStatus(state) {
      state.hasFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.hasFetched = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload || action.error.message || 'Lỗi khi lấy thông tin';
        state.hasFetched = false;
      });
  },
});

export const { setUser, resetUserFetchStatus } = userSlice.actions;
export default userSlice.reducer;
