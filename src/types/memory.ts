export interface MemoryBlock {
  id: string;
  title: string;
  image: string | null;
  note: string;
  completed: boolean;
}

export interface FamilyParticipation {
  daughter: boolean;
  wife: boolean;
  grandparents: boolean;
  extraNote: string;
}

export interface YearData {
  year: number;
  monthly: MemoryBlock[];
  quarterly: MemoryBlock[];
  annual: MemoryBlock;
  family: FamilyParticipation;
}

export const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const QUARTER_LABELS = [
  'Q1: Jan~Mar',
  'Q2: Apr~Jun',
  'Q3: Jul~Sep',
  'Q4: Oct~Dec'
];

export const MONTH_IDS = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
];

export const QUARTER_IDS = ['q1', 'q2', 'q3', 'q4'];

export const ANNUAL_ID = 'annual';

export function createBlankYear(year: number): YearData {
  return {
    year,
    monthly: MONTH_NAMES.map((name, i) => ({
      id: MONTH_IDS[i],
      title: name,
      image: null,
      note: '',
      completed: false,
    })),
    quarterly: QUARTER_LABELS.map((label, i) => ({
      id: QUARTER_IDS[i],
      title: label,
      image: null,
      note: '',
      completed: false,
    })),
    annual: {
      id: ANNUAL_ID,
      title: `${year} ANNUAL TRIP`,
      image: null,
      note: '',
      completed: false,
    },
    family: {
      daughter: false,
      wife: false,
      grandparents: false,
      extraNote: '',
    },
  };
}

export const STORAGE_KEY = 'family_memory_tracker_db';
