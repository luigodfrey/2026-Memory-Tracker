import { motion } from 'framer-motion';
import { Plus, CalendarDays, Archive } from 'lucide-react';

interface YearTimelineProps {
  years: number[];
  currentYear: number;
  onSelectYear: (year: number) => void;
  onAddYear: () => void;
}

export default function YearTimeline({ years, currentYear, onSelectYear, onAddYear }: YearTimelineProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-amber-200 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <CalendarDays className="w-5 h-5 text-amber-600" />
        <h3 className="text-amber-900 font-bold text-sm" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          Year Archive
        </h3>
        <Archive className="w-4 h-4 text-amber-500" />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory">
        {/* Add New Year Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAddYear}
          className="snap-start flex-shrink-0 bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-xl px-5 py-4 flex flex-col items-center justify-center gap-1 shadow-md hover:shadow-lg transition-shadow min-w-[120px]"
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs font-bold">ADD NEW YEAR</span>
        </motion.button>

        {/* Year Cards */}
        {years.map((year) => (
          <motion.button
            key={year}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectYear(year)}
            className={`snap-start flex-shrink-0 rounded-xl px-5 py-4 flex flex-col items-center justify-center gap-1 min-w-[100px] transition-all duration-200 shadow-sm ${
              year === currentYear
                ? 'bg-amber-100 border-2 border-amber-400 ring-2 ring-amber-200'
                : 'bg-gray-50 border-2 border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
            }`}
          >
            <span className={`text-lg font-extrabold ${
              year === currentYear ? 'text-amber-800' : 'text-gray-600'
            }`} style={{ fontFamily: 'Quicksand, sans-serif' }}>
              {year}
            </span>
            <span className={`text-[10px] font-semibold ${
              year === currentYear ? 'text-amber-600' : 'text-gray-400'
            }`}>
              {year === currentYear ? 'Current' : 'View'}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
