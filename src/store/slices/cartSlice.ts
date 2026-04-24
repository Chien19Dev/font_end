import { getUserCart } from '@/services/cartApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  variant_id: string;
  quantity: number;
  variant?: {
    id: string;
    color: string;
    size: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: string;
      image_url: string[];
    };
  };
}

interface CartState {
  cartItems: CartItem[];
  isLoading: boolean;
  hasFetched: boolean;
}

const initialState: CartState = {
  cartItems: [],
  isLoading: true,
  hasFetched: false,
};

export const fetchCart = createAsyncThunk<CartItem[]>('cart/fetchCart', async () => {
  return await getUserCart();
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
      state.hasFetched = true;
      state.isLoading = false;
    },
    resetCartFetchStatus(state) {
      state.hasFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isLoading = false;
        state.hasFetched = true;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setCartItems, resetCartFetchStatus } = cartSlice.actions;
export default cartSlice.reducer;
