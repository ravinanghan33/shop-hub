import { apiClient } from './client';
import { User, CreateUserDto, UpdateUserDto } from '../types';

export const usersApi = {
  getAll: async (limit?: number, sort?: 'asc' | 'desc'): Promise<User[]> => {
    let url = '/users';
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (sort) params.append('sort', sort);
    if (params.toString()) url += `?${params.toString()}`;
    const response = await apiClient.get(url);
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  create: async (user: CreateUserDto): Promise<User> => {
    const response = await apiClient.post('/users', user);
    return response.data;
  },

  update: async (id: number, user: UpdateUserDto): Promise<User> => {
    const response = await apiClient.put(`/users/${id}`, user);
    return response.data;
  },

  delete: async (id: number): Promise<User> => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};
