import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { MemoryBlock as MemoryBlockType } from '@/types/memory';
import ImageUploader from './ImageUploader';

interface MemoryBlockProps {
  block: MemoryBlockType;
  year: number;
  column: 'monthly' | 'quarterly' | 'annual';
  size?: 'small' | 'medium' | 'large';
  onUpdate: (year: number, column: 'monthly' | 'quarterly' | 'annual', blockId: string, field: 'image' | 'note' | 'completed', value: string | boolean | null) => void;
  colorTheme: 'yellow' | 'green' | 'blue';
}

const colorMap = {
  yellow: {
    header: 'bg-amber-400',
    text: 'text-amber-900',
    accent: 'text-amber-600',
    border: 'border-amber-300',
    checkbox: 'checked:bg-amber-500',
    ring: 'focus:ring-amber-400',
  },
  green: {
    header: 'bg-emerald-400',
    text: 'text-emerald-900',
    accent: 'text-emerald-600',
    border: 'border-emerald-300',
    checkbox: 'checked:bg-emerald-500',
    ring: 'focus:ring-emerald-400',
  },
  blue: {
    header: 'bg-sky-400',
    text: 'text-sky-900',
    accent: 'text-sky-600',
    border: 'border-sky-300',
    checkbox: 'checked:bg-sky-500',
    ring: 'focus:ring-sky-400',
  },
};

export default function MemoryBlockCard({ block, year, column, size = 'medium', onUpdate, colorTheme }: MemoryBlockProps) {
  const colors = colorMap[colorTheme];

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onUpdate(year, column, block.id, 'image', e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [year, column, block.id, onUpdate]);

  const handleImageRemove = useCallback(() => {
    onUpdate(year, column, block.id, 'image', null);
  }, [year, column, block.id, onUpdate]);

  const handleNoteChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(year, column, block.id, 'note', e.target.value);
  }, [year, column, block.id, onUpdate]);

  const handleCheckboxToggle = useCallback(() => {
    onUpdate(year, column, block.id, 'completed', !block.completed);
  }, [year, column, block.id, block.completed, onUpdate]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-white/50 hover:shadow-md transition-shadow duration-200"
    >
      {/* Header */}
      <div className={`${colors.header} px-3 py-1.5 flex items-center justify-between`}>
        <span className={`text-white font-bold text-sm ${colors.text} drop-shadow-sm`}>
          {block.title}
        </span>
        <button
          onClick={handleCheckboxToggle}
          className={`w-5 h-5 rounded border-2 border-white/70 flex items-center justify-center transition-all duration-200 ${
            block.completed ? 'bg-white' : 'bg-transparent hover:bg-white/20'
          }`}
          aria-label={`Mark ${block.title} as complete`}
        >
          {block.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <Check className={`w-3.5 h-3.5 ${colors.accent}`} strokeWidth={3} />
            </motion.div>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-2 space-y-2">
        <ImageUploader
          imageSrc={block.image}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          size={size}
        />
        <textarea
          value={block.note}
          onChange={handleNoteChange}
          placeholder="Write your memory here..."
          className={`w-full ${size === 'large' ? 'h-28' : size === 'small' ? 'h-14' : 'h-16'} text-xs text-gray-600 placeholder:text-gray-400 bg-gray-50/50 rounded-lg p-2 resize-none border-none outline-none ${colors.ring} focus:ring-2 transition-all duration-200`}
        />
        <button
          onClick={handleCheckboxToggle}
          className={`flex items-center gap-1.5 text-[10px] font-semibold ${colors.accent} hover:opacity-80 transition-opacity`}
        >
          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all duration-200 ${
            block.completed ? `${colors.checkbox} border-transparent` : 'border-gray-300 bg-white'
          }`}>
            {block.completed && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
          </span>
          {block.completed ? 'Completed' : 'Mark Complete'}
        </button>
      </div>
    </motion.div>
  );
}
