import { apiClient } from './client';
import { Product, CreateProductDto, UpdateProductDto } from '../types';

export const productsApi = {
  getAll: async (limit?: number, sort?: 'asc' | 'desc'): Promise<Product[]> => {
    let url = '/products';
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (sort) params.append('sort', sort);
    if (params.toString()) url += `?${params.toString()}`;
    const response = await apiClient.get(url);
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  },

  create: async (product: CreateProductDto): Promise<Product> => {
    const response = await apiClient.post('/products', product);
    return response.data;
  },

  update: async (id: number, product: UpdateProductDto): Promise<Product> => {
    const response = await apiClient.put(`/products/${id}`, product);
    return response.data;
  },

  partialUpdate: async (id: number, product: Partial<UpdateProductDto>): Promise<Product> => {
    const response = await apiClient.patch(`/products/${id}`, product);
    return response.data;
  },

  delete: async (id: number): Promise<Product> => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};
