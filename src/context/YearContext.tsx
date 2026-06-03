import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { YearData } from '@/types/memory';
import { createBlankYear, STORAGE_KEY } from '@/types/memory';

interface YearContextType {
  currentYear: number;
  yearsData: Record<number, YearData>;
  setCurrentYear: (year: number) => void;
  updateBlock: (year: number, column: 'monthly' | 'quarterly' | 'annual', blockId: string, field: 'image' | 'note' | 'completed', value: string | boolean | null) => void;
  updateFamily: (year: number, field: 'daughter' | 'wife' | 'grandparents' | 'extraNote', value: boolean | string) => void;
  addNewYear: () => void;
  getAvailableYears: () => number[];
}

const YearContext = createContext<YearContextType | null>(null);

export function useYearContext() {
  const ctx = useContext(YearContext);
  if (!ctx) throw new Error('useYearContext must be used within YearContextProvider');
  return ctx;
}

function loadFromStorage(): Record<number, YearData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  const currentYear = new Date().getFullYear();
  return { [currentYear]: createBlankYear(currentYear) };
}

export function YearContextProvider({ children }: { children: React.ReactNode }) {
  const [yearsData, setYearsData] = useState<Record<number, YearData>>(loadFromStorage);
  const [currentYear, setCurrentYear] = useState<number>(() => {
    const stored = loadFromStorage();
    const years = Object.keys(stored).map(Number);
    return years.length > 0 ? Math.max(...years) : new Date().getFullYear();
  });

  // Persist to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(yearsData));
    } catch (error) {
      console.warn('Failed to save to localStorage', error);
    }
  }, [yearsData]);

  const updateBlock = useCallback((
    year: number,
    column: 'monthly' | 'quarterly' | 'annual',
    blockId: string,
    field: 'image' | 'note' | 'completed',
    value: string | boolean | null
  ) => {
    setYearsData(prev => {
      const yearData = prev[year];
      if (!yearData) return prev;

      const updated = { ...yearData };

      if (column === 'annual') {
        updated.annual = { ...updated.annual, [field]: value };
      } else {
        updated[column] = updated[column].map(block =>
          block.id === blockId ? { ...block, [field]: value } : block
        );
      }

      return { ...prev, [year]: updated };
    });
  }, []);

  const updateFamily = useCallback((
    year: number,
    field: 'daughter' | 'wife' | 'grandparents' | 'extraNote',
    value: boolean | string
  ) => {
    setYearsData(prev => {
      const yearData = prev[year];
      if (!yearData) return prev;

      return {
        ...prev,
        [year]: {
          ...yearData,
          family: { ...yearData.family, [field]: value },
        },
      };
    });
  }, []);

  const addNewYear = useCallback(() => {
    const years = Object.keys(yearsData).map(Number);
    const nextYear = years.length > 0 ? Math.max(...years) + 1 : new Date().getFullYear() + 1;
    const blankYear = createBlankYear(nextYear);
    blankYear.annual.title = `${nextYear} ANNUAL TRIP`;

    setYearsData(prev => ({ ...prev, [nextYear]: blankYear }));
    setCurrentYear(nextYear);
  }, [yearsData]);

  const getAvailableYears = useCallback(() => {
    return Object.keys(yearsData).map(Number).sort((a, b) => b - a);
  }, [yearsData]);

  return (
    <YearContext.Provider value={{
      currentYear,
      yearsData,
      setCurrentYear,
      updateBlock,
      updateFamily,
      addNewYear,
      getAvailableYears,
    }}>
      {children}
    </YearContext.Provider>
  );
}
