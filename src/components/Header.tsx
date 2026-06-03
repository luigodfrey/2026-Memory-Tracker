import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  currentYear: number;
}

export default function Header({ currentYear }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-md border-b-2 border-amber-200 shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <motion.img
            src="/assets/duck_logo.png"
            alt="Psyduck Logo"
            className="w-10 h-10 object-contain"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div>
            <h1
              className="text-xl font-extrabold text-amber-900 leading-tight"
              style={{ fontFamily: 'Quicksand, sans-serif' }}
            >
              Family Memory Tracker
            </h1>
            <p className="text-[10px] text-amber-600 font-semibold">
              Die with Zero Philosophy
            </p>
          </div>
        </div>

        {/* Year Badge */}
        <motion.div
          key={currentYear}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2 bg-amber-100 rounded-xl px-4 py-2 border border-amber-300"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span
            className="text-xl font-extrabold text-amber-800"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            {currentYear}
          </span>
        </motion.div>

        {/* Mascot */}
        <motion.img
          src="/assets/mascot_duck.png"
          alt="Psyduck Mascot"
          className="w-12 h-12 object-contain hidden md:block"
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        />
      </div>
    </motion.header>
  );
}
