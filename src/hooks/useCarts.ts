import { useQuery } from './useQueryWrapper';
import { ApiCart } from '../types';
import { cartsApi } from '../api';

export const useCarts = (
  limit?: number,
  sort?: 'asc' | 'desc',
  startDate?: string,
  endDate?: string
) => {
  const { data, loading, error, refetch, isLoading } = useQuery<ApiCart[]>(
    ['carts', limit, sort, startDate, endDate],
    () => cartsApi.getAll(limit, sort, startDate, endDate),
    {},
    'Failed to fetch carts. Please try again later.'
  );

  return {
    carts: data || [],
    loading,
    isLoading,
    error,
    refetch,
  };
};

export const useCartById = (id: number) => {
  const { data, loading, error, refetch, isLoading } = useQuery<ApiCart>(
    ['cart', id],
    () => cartsApi.getById(id),
    {
      enabled: !!id,
    },
    'Failed to fetch cart. Please try again later.'
  );

  return {
    cart: data,
    carts: data ? [data] : [],
    loading,
    isLoading,
    error,
    refetch,
  };
};

export const useUserCarts = (userId: number) => {
  const { data, loading, error, refetch, isLoading } = useQuery<ApiCart[]>(
    ['carts', 'user', userId],
    () => cartsApi.getUserCarts(userId),
    {
      enabled: !!userId,
    },
    'Failed to fetch user carts. Please try again later.'
  );

  return {
    carts: data || [],
    loading,
    isLoading,
    error,
    refetch,
  };
};
