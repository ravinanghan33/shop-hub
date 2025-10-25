import { useQuery } from './useQueryWrapper';
import { User } from '../types';
import { usersApi } from '../api';

export const useUsers = (limit?: number, sort?: 'asc' | 'desc') => {
  const { data, loading, error, refetch, isLoading } = useQuery<User[]>(
    ['users', limit, sort],
    () => usersApi.getAll(limit, sort),
    {},
    'Failed to fetch users. Please try again later.'
  );

  return {
    users: data || [],
    loading,
    isLoading,
    error,
    refetch,
  };
};

export const useUserById = (id: number) => {
  const { data, loading, error, refetch, isLoading } = useQuery<User>(
    ['user', id],
    () => usersApi.getById(id),
    {
      enabled: !!id,
    },
    'Failed to fetch user. Please try again later.'
  );

  return {
    user: data,
    users: data ? [data] : [],
    loading,
    isLoading,
    error,
    refetch,
  };
};
