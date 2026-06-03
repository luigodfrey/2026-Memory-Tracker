import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useYearContext } from '@/context/YearContext';
import Header from '@/components/Header';
import MicroColumn from '@/components/MicroColumn';
import MesoColumn from '@/components/MesoColumn';
import MacroColumn from '@/components/MacroColumn';
import FamilySection from '@/components/FamilySection';
import YearTimeline from '@/components/YearTimeline';

export default function Home() {
  const {
    currentYear,
    yearsData,
    setCurrentYear,
    updateBlock,
    updateFamily,
    addNewYear,
    getAvailableYears,
  } = useYearContext();

  const yearData = yearsData[currentYear];
  const availableYears = useMemo(() => getAvailableYears(), [getAvailableYears]);

  // Calculate overall stats
  const stats = useMemo(() => {
    if (!yearData) return { monthly: 0, quarterly: 0, annual: false, total: 0 };
    const monthlyDone = yearData.monthly.filter(m => m.completed).length;
    const quarterlyDone = yearData.quarterly.filter(q => q.completed).length;
    const annualDone = yearData.annual.completed ? 1 : 0;
    return {
      monthly: monthlyDone,
      quarterly: quarterlyDone,
      annual: annualDone > 0,
      total: monthlyDone + quarterlyDone + annualDone,
    };
  }, [yearData]);

  if (!yearData) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <img src="/assets/mascot_duck.png" alt="Psyduck" className="w-24 h-24 mx-auto mb-4" />
          <p className="text-amber-800 font-bold text-lg">No data found for {currentYear}</p>
          <button
            onClick={addNewYear}
            className="mt-4 bg-amber-400 text-amber-900 px-6 py-2 rounded-xl font-bold hover:bg-amber-500 transition-colors"
          >
            Create New Year
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <Header currentYear={currentYear} />

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-6"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-amber-200 flex items-center gap-2">
            <span className="text-amber-600 font-bold text-sm">{stats.monthly}/12</span>
            <span className="text-gray-500 text-xs">Months</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-emerald-200 flex items-center gap-2">
            <span className="text-emerald-600 font-bold text-sm">{stats.quarterly}/4</span>
            <span className="text-gray-500 text-xs">Quarters</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-sky-200 flex items-center gap-2">
            <span className="text-sky-600 font-bold text-sm">{stats.annual ? '1' : '0'}/1</span>
            <span className="text-gray-500 text-xs">Annual Trip</span>
          </div>
          <div className="bg-amber-100 rounded-xl px-4 py-2 border border-amber-300 flex items-center gap-2">
            <span className="text-amber-800 font-extrabold text-sm">{stats.total}/17</span>
            <span className="text-amber-600 text-xs font-semibold">Total</span>
          </div>
        </motion.div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left Column - Micro Monthly (5/12) */}
          <div className="lg:col-span-5">
            <MicroColumn
              monthly={yearData.monthly}
              year={currentYear}
              onUpdate={updateBlock}
            />
          </div>

          {/* Middle Column - Meso Quarterly (3/12) */}
          <div className="lg:col-span-3">
            <MesoColumn
              quarterly={yearData.quarterly}
              year={currentYear}
              onUpdate={updateBlock}
            />
          </div>

          {/* Right Column - Macro Annual Trip (4/12) */}
          <div className="lg:col-span-4">
            <MacroColumn
              annual={yearData.annual}
              year={currentYear}
              onUpdate={updateBlock}
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <FamilySection
            family={yearData.family}
            year={currentYear}
            onUpdateFamily={updateFamily}
          />
          <YearTimeline
            years={availableYears}
            currentYear={currentYear}
            onSelectYear={setCurrentYear}
            onAddYear={addNewYear}
          />
        </div>
      </main>

      {/* Floating Mascot */}
      <motion.img
        src="/assets/mascot_wave.png"
        alt="Waving Psyduck"
        className="fixed bottom-4 right-4 w-16 h-16 object-contain z-40 hidden lg:block pointer-events-none"
        animate={{
          y: [0, -6, 0],
          rotate: [0, 3, -3, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
