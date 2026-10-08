import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventSectionProps {
  title: string;
  description: string;
  lastUpdated?: Date;
}

export const EventSection: React.FC<EventSectionProps> = ({
  title,
  description,
}) => {
  // Combine title and description as key for AnimatePresence so changes trigger transition
  const contentKey = `${title}_${description}`;

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-[960px] mx-auto select-none">
      
      {/* "CURRENT EVENT" Tag matching diagram */}
      <div className="mb-3 xl:mb-5">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-50 border border-blue-200/90 text-blue-700 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse inline-block" />
          <span className="text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase font-mono">
            CURRENT EVENT
          </span>
        </div>
      </div>

      {/* Main Event Content */}
      <div className="w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={contentKey}
            initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="flex flex-col items-center justify-center"
          >
            {/* Event Title - Very Large, Bold, Luminous Accent */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-slate-900 font-display leading-[1.1] max-w-full break-words uppercase"
            >
              <span className="text-gradient-hack">
                {title || 'Loading Event...'}
              </span>
            </motion.h2>

            {/* Accent Line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '90px', opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full my-4 xl:my-5"
            />

            {/* Event Description - Medium/Large, Controlled Wrapping */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl font-medium text-slate-600 max-w-[760px] leading-relaxed break-words"
            >
              {description || 'Please wait for announcements.'}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
