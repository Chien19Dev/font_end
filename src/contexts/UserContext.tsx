'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchUser as fetchUserAction,
  setUser as setUserAction,
  User,
} from '@/store/slices/userSlice';
import React from 'react';

interface UserContextType {
  user: User | null;
  fetchUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  error: string | null;
}

export const useUser = (): UserContextType => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.user);

  const fetchUser = React.useCallback(async () => {
    await dispatch(fetchUserAction()).unwrap();
  }, [dispatch]);

  const setUser: React.Dispatch<React.SetStateAction<User | null>> = React.useCallback(
    (valueOrUpdater) => {
      if (typeof valueOrUpdater === 'function') {
        const nextUser = valueOrUpdater(user);
        dispatch(setUserAction(nextUser));
        return;
      }
      dispatch(setUserAction(valueOrUpdater));
    },
    [dispatch, user],
  );

  return { user, fetchUser, setUser, loading, error };
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const dispatch = useAppDispatch();
  const hasFetched = useAppSelector((state) => state.user.hasFetched);

  React.useEffect(() => {
    if (!hasFetched) {
      void dispatch(fetchUserAction());
    }
  }, [dispatch, hasFetched]);

  return <>{children}</>;
};
