import { motion } from 'framer-motion';
import type { MemoryBlock as MemoryBlockType } from '@/types/memory';
import MemoryBlockCard from './MemoryBlock';
import { Plane } from 'lucide-react';

interface MacroColumnProps {
  annual: MemoryBlockType;
  year: number;
  onUpdate: (year: number, column: 'monthly' | 'quarterly' | 'annual', blockId: string, field: 'image' | 'note' | 'completed', value: string | boolean | null) => void;
}

export default function MacroColumn({ annual, year, onUpdate }: MacroColumnProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <motion.div
        animate={annual.completed ? {
          boxShadow: ['0 0 0 0 rgba(56, 189, 248, 0.4)', '0 0 0 10px rgba(56, 189, 248, 0)'],
        } : {}}
        transition={annual.completed ? { repeat: Infinity, duration: 2 } : {}}
        className="bg-sky-400 rounded-xl p-3 mb-3 border-2 border-dashed border-sky-500"
      >
        <div className="flex items-center justify-center gap-2">
          <Plane className="w-5 h-5 text-sky-900" />
          <h2 className="text-sky-900 font-extrabold text-lg text-center" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            MACRO ANNUAL TRIP
          </h2>
          <Plane className="w-5 h-5 text-sky-900 transform scale-x-[-1]" />
        </div>
        <p className="text-sky-800 text-[10px] text-center font-semibold mt-0.5">
          {annual.completed ? 'Trip Archived' : 'Plan Your Big Adventure'}
        </p>
      </motion.div>

      {/* Annual Block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        <MemoryBlockCard
          block={annual}
          year={year}
          column="annual"
          size="large"
          onUpdate={onUpdate}
          colorTheme="blue"
        />
      </motion.div>
    </div>
  );
}
