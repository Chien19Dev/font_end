'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CartItem, fetchCart, setCartItems as setCartItemsAction } from '@/store/slices/cartSlice';
import React from 'react';

// interface CartContextType {
//   cartItems: CartItem[];
//   refreshCart: () => Promise<void>;
//   setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
//   isLoading: boolean;
// }

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { cartItems, isLoading } = useAppSelector((state) => state.cart);

  const refreshCart = React.useCallback(async () => {
    try {
      await dispatch(fetchCart()).unwrap();
    } catch (error) {
      console.error('Lỗi lấy giỏ hàng:', error);
    }
  }, [dispatch]);

  const setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>> = React.useCallback(
    (valueOrUpdater) => {
      if (typeof valueOrUpdater === 'function') {
        dispatch(setCartItemsAction(valueOrUpdater(cartItems)));
        return;
      }
      dispatch(setCartItemsAction(valueOrUpdater));
    },
    [dispatch, cartItems],
  );

  return { cartItems, refreshCart, setCartItems, isLoading };
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const hasFetched = useAppSelector((state) => state.cart.hasFetched);

  React.useEffect(() => {
    if (!hasFetched) {
      void dispatch(fetchCart());
    }
  }, [dispatch, hasFetched]);

  return <>{children}</>;
};
