import { useQuery as useTanstackQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

interface UseQueryWrapperResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  isLoading: boolean;
}

export function useQuery<T>(
  queryKey: unknown[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>,
  errorMessage = 'Failed to fetch data. Please try again later.'
): UseQueryWrapperResult<T> {
  const query: UseQueryResult<T, Error> = useTanstackQuery<T, Error>({
    queryKey,
    queryFn,
    ...options,
  });

  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error ? errorMessage : null,
    refetch: () => {
      query.refetch();
    },
    isLoading: query.isLoading,
  };
}
