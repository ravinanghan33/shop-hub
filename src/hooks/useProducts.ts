import { useQuery } from './useQueryWrapper';
import { Product } from '../types';
import { productsApi, categoriesApi } from '../api';

export const useProducts = (limit?: number, sort?: 'asc' | 'desc') => {
  const { data, loading, error, refetch, isLoading } = useQuery<Product[]>(
    ['products', limit, sort],
    () => productsApi.getAll(limit, sort),
    {},
    'Failed to fetch products. Please try again later.'
  );

  return {
    products: data || [],
    loading,
    isLoading,
    error,
    refetch,
  };
};

export const useProductById = (id: number) => {
  const { data, loading, error, refetch, isLoading } = useQuery<Product>(
    ['product', id],
    () => productsApi.getById(id),
    {
      enabled: !!id,
    },
    'Failed to fetch product. Please try again later.'
  );

  return {
    product: data,
    products: data ? [data] : [],
    loading,
    isLoading,
    error,
    refetch,
  };
};

export const useCategories = () => {
  const { data, loading, error, refetch, isLoading } = useQuery<string[]>(
    ['categories'],
    () => categoriesApi.getAll(),
    {},
    'Failed to fetch categories. Please try again later.'
  );

  return {
    categories: data || [],
    loading,
    isLoading,
    error,
    refetch,
  };
};

export const useProductsByCategory = (category: string | null) => {
  const { data, loading, error, refetch, isLoading } = useQuery<Product[]>(
    ['products', 'category', category],
    () =>
      category
        ? productsApi.getByCategory(category)
        : productsApi.getAll(),
    {},
    'Failed to fetch products. Please try again later.'
  );

  return {
    products: data || [],
    loading,
    isLoading,
    error,
    refetch,
  };
};
