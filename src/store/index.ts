import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/store/slices/cartSlice';
import userReducer from '@/store/slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
