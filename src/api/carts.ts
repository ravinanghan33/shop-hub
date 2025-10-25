import { apiClient } from './client';
import { ApiCart, CreateCartDto, UpdateCartDto } from '../types';

export const cartsApi = {
  getAll: async (
    limit?: number,
    sort?: 'asc' | 'desc',
    startDate?: string,
    endDate?: string
  ): Promise<ApiCart[]> => {
    let url = '/carts';
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (sort) params.append('sort', sort);
    if (startDate) params.append('startdate', startDate);
    if (endDate) params.append('enddate', endDate);
    if (params.toString()) url += `?${params.toString()}`;
    const response = await apiClient.get(url);
    return response.data;
  },

  getById: async (id: number): Promise<ApiCart> => {
    const response = await apiClient.get(`/carts/${id}`);
    return response.data;
  },

  getUserCarts: async (userId: number): Promise<ApiCart[]> => {
    const response = await apiClient.get(`/carts/user/${userId}`);
    return response.data;
  },

  create: async (cart: CreateCartDto): Promise<ApiCart> => {
    const response = await apiClient.post('/carts', cart);
    return response.data;
  },

  update: async (id: number, cart: UpdateCartDto): Promise<ApiCart> => {
    const response = await apiClient.put(`/carts/${id}`, cart);
    return response.data;
  },

  delete: async (id: number): Promise<ApiCart> => {
    const response = await apiClient.delete(`/carts/${id}`);
    return response.data;
  },
};
