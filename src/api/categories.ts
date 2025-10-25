import { apiClient } from './client';

export const categoriesApi = {
  getAll: async (): Promise<string[]> => {
    const response = await apiClient.get('/products/categories');
    return response.data;
  },
};
