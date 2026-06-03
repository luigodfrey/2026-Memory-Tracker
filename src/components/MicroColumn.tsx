import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { MemoryBlock as MemoryBlockType } from '@/types/memory';
import MemoryBlockCard from './MemoryBlock';

interface MicroColumnProps {
  monthly: MemoryBlockType[];
  year: number;
  onUpdate: (year: number, column: 'monthly' | 'quarterly' | 'annual', blockId: string, field: 'image' | 'note' | 'completed', value: string | boolean | null) => void;
}

export default function MicroColumn({ monthly, year, onUpdate }: MicroColumnProps) {
  const completedCount = useMemo(() => monthly.filter(m => m.completed).length, [monthly]);
  const allComplete = completedCount === 12;

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <motion.div
        animate={allComplete ? {
          boxShadow: ['0 0 0 0 rgba(251, 191, 36, 0.4)', '0 0 0 10px rgba(251, 191, 36, 0)'],
        } : {}}
        transition={allComplete ? { repeat: Infinity, duration: 2 } : {}}
        className="bg-amber-400 rounded-xl p-3 mb-3 border-2 border-dashed border-amber-500"
      >
        <h2 className="text-amber-900 font-extrabold text-lg text-center" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          MICRO MONTHLY
        </h2>
        <p className="text-amber-800 text-[10px] text-center font-semibold mt-0.5">
          {completedCount}/12 Completed
        </p>
        {/* Progress Bar */}
        <div className="mt-2 bg-amber-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-amber-600 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / 12) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Month Blocks - Scrollable */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2" style={{ maxHeight: 'calc(100vh - 340px)' }}>
        {monthly.map((block, index) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <MemoryBlockCard
              block={block}
              year={year}
              column="monthly"
              size="small"
              onUpdate={onUpdate}
              colorTheme="yellow"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
