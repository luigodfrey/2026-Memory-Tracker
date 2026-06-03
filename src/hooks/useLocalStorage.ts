import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn('Error writing localStorage', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export function useDebouncedSave<T>(key: string, value: T, delay: number = 500) {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn('Error saving to localStorage', error);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [key, value, delay]);
}
