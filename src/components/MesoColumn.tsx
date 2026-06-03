import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { MemoryBlock as MemoryBlockType } from '@/types/memory';
import MemoryBlockCard from './MemoryBlock';

interface MesoColumnProps {
  quarterly: MemoryBlockType[];
  year: number;
  onUpdate: (year: number, column: 'monthly' | 'quarterly' | 'annual', blockId: string, field: 'image' | 'note' | 'completed', value: string | boolean | null) => void;
}

export default function MesoColumn({ quarterly, year, onUpdate }: MesoColumnProps) {
  const completedCount = useMemo(() => quarterly.filter(q => q.completed).length, [quarterly]);
  const allComplete = completedCount === 4;

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <motion.div
        animate={allComplete ? {
          boxShadow: ['0 0 0 0 rgba(52, 211, 153, 0.4)', '0 0 0 10px rgba(52, 211, 153, 0)'],
        } : {}}
        transition={allComplete ? { repeat: Infinity, duration: 2 } : {}}
        className="bg-emerald-400 rounded-xl p-3 mb-3 border-2 border-dashed border-emerald-500"
      >
        <h2 className="text-emerald-900 font-extrabold text-lg text-center" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          MESO QUARTERLY
        </h2>
        <p className="text-emerald-800 text-[10px] text-center font-semibold mt-0.5">
          {completedCount}/4 Experienced
        </p>
        {/* Progress Bar */}
        <div className="mt-2 bg-emerald-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-emerald-600 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / 4) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Quarter Blocks */}
      <div className="flex-1 space-y-3">
        {quarterly.map((block, index) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <MemoryBlockCard
              block={block}
              year={year}
              column="quarterly"
              size="medium"
              onUpdate={onUpdate}
              colorTheme="green"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
