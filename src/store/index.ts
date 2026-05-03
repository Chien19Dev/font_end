import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/store/slices/cartSlice';
import userReducer from '@/store/slices/userSlice';
import companyInfoReducer from '@/store/slices/companyInfoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    companyInfo: companyInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
