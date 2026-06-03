import { motion } from 'framer-motion';
import { Heart, StickyNote, Users } from 'lucide-react';
import type { FamilyParticipation } from '@/types/memory';

interface FamilySectionProps {
  family: FamilyParticipation;
  year: number;
  onUpdateFamily: (year: number, field: 'daughter' | 'wife' | 'grandparents' | 'extraNote', value: boolean | string) => void;
}

const familyMembers = [
  { key: 'daughter' as const, label: 'Daughter', emoji: '' },
  { key: 'wife' as const, label: 'Wife', emoji: '' },
  { key: 'grandparents' as const, label: 'Grandparents', emoji: '' },
];

export default function FamilySection({ family, year, onUpdateFamily }: FamilySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-amber-200 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-5 h-5 text-amber-600" />
        <h3 className="text-amber-900 font-bold text-sm" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          Family Participation
        </h3>
        <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
      </div>

      {/* Family Checkboxes */}
      <div className="flex flex-wrap gap-4 mb-4">
        {familyMembers.map(({ key, label, emoji }) => (
          <button
            key={key}
            onClick={() => onUpdateFamily(year, key, !family[key])}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-200 ${
              family[key]
                ? 'bg-amber-100 border-amber-400 shadow-sm'
                : 'bg-white border-gray-200 hover:border-amber-300'
            }`}
          >
            <span className="text-lg">{emoji}</span>
            <span className={`text-sm font-semibold ${family[key] ? 'text-amber-800' : 'text-gray-500'}`}>
              {label}
            </span>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-1 transition-all duration-200 ${
              family[key] ? 'bg-amber-500 border-amber-500' : 'border-gray-300'
            }`}>
              {family[key] && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Extra Note */}
      <div className="relative">
        <StickyNote className="absolute top-2.5 left-2.5 w-4 h-4 text-amber-400" />
        <textarea
          value={family.extraNote}
          onChange={(e) => onUpdateFamily(year, 'extraNote', e.target.value)}
          placeholder="Write your annual summary, reflections, or any special notes here..."
          className="w-full h-20 text-xs text-gray-600 placeholder:text-gray-400 bg-amber-50/50 rounded-xl p-2.5 pl-8 resize-none border-none outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-200"
        />
      </div>
    </motion.div>
  );
}
