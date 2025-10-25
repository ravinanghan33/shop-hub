/**
 * useLocalStorage - Custom hook for managing localStorage with React state
 *
 * Provides a way to persist state in localStorage while keeping it synchronized
 * with React component state. Handles JSON serialization/deserialization and
 * provides error handling for localStorage operations.
 *
 * @template T - The type of the stored value
 * @param key - The localStorage key to store the value under
 * @param initialValue - The initial value to use if no stored value exists
 * @returns A tuple containing [currentValue, setValueFunction]
 *
 * @example
 * ```tsx
 * const [user, setUser] = useLocalStorage('user', { name: '', email: '' });
 *
 * // Update user
 * setUser({ name: 'John', email: 'john@example.com' });
 *
 * // Update with function
 * setUser(prev => ({ ...prev, name: 'Jane' }));
 * ```
 */
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}