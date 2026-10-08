import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveClock } from './LiveClock';

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
    <div className="flex-1 flex flex-col items-center justify-center text-center px-2 max-w-[1050px] mx-auto select-none">
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
            {/* Event Title - Solid color with Layered Shadow */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight font-display leading-[1.08] max-w-full break-words uppercase layered-shadow-title"
            >
              {title || 'Loading Event...'}
            </motion.h2>

            {/* Event Description - Normal Bold */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-3 xl:mt-5 text-xl md:text-2xl lg:text-3xl font-bold text-slate-700 max-w-[850px] leading-relaxed break-words"
            >
              {description || 'Please wait for announcements.'}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Time and Date in a Box matching user requirement */}
      <div className="mt-6 xl:mt-8 inline-flex items-center justify-center">
        <div className="px-8 py-3 bg-white/95 border border-slate-300/80 rounded-2xl shadow-card-subtle backdrop-blur-md flex items-center justify-center">
          <LiveClock />
        </div>
      </div>
    </div>
  );
};
