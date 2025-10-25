import { useState } from 'react';
import { authApi } from '../api';
import { LoginCredentials, LoginResponse } from '../types';

interface UseAuthResult {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const TOKEN_KEY = 'auth-token';

export const useAuth = (): UseAuthResult => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response: LoginResponse = await authApi.login(credentials);
      setToken(response.token);
      localStorage.setItem(TOKEN_KEY, response.token);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  return {
    login,
    logout,
    isAuthenticated: !!token,
    token,
    loading,
    error,
  };
};
