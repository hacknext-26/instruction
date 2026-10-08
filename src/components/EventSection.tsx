import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveClock } from './LiveClock';

interface EventSectionProps {
  title: string;
  description: string;
  lastUpdated?: Date;
}

// Dynamically decreases font size as title characters increase
function getDynamicTitleSizeClasses(charCount: number): string {
  if (charCount <= 20) {
    // Short title: Huge & commanding
    return "text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05]";
  } else if (charCount <= 38) {
    // Medium title: Large & balanced
    return "text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.08]";
  } else if (charCount <= 58) {
    // Longer title: Scaled down to fit two lines comfortably
    return "text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.12]";
  } else {
    // Very long title (60+ chars): Compact and clean to prevent overflow
    return "text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.16]";
  }
}

export const EventSection: React.FC<EventSectionProps> = ({
  title,
  description,
}) => {
  // Combine title and description as key for AnimatePresence so changes trigger transition
  const contentKey = `${title}_${description}`;
  const titleCharCount = (title || '').trim().length;
  const dynamicSizeClass = getDynamicTitleSizeClasses(titleCharCount);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-[1100px] mx-auto select-none">
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
            {/* Event Title - Dynamically Decreases Font Size as Characters Increase */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className={`${dynamicSizeClass} font-black tracking-tight font-display max-w-full break-words uppercase layered-shadow-title whitespace-pre-line transition-all duration-300 ease-out`}
            >
              {title || 'Loading Event...'}
            </motion.h2>

            {/* Event Description - Normal Bold */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-3.5 xl:mt-5 text-xl md:text-2xl lg:text-3xl font-bold text-slate-700 max-w-[900px] leading-relaxed break-words whitespace-pre-line"
            >
              {description || 'Please wait for announcements.'}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Time and Date in an Elegant Luminous Glass Box */}
      <div className="mt-6 xl:mt-8 inline-flex items-center justify-center">
        <div className="px-9 py-3.5 bg-white/95 border border-slate-200/90 rounded-2xl shadow-card-elevated backdrop-blur-md flex items-center justify-center ring-1 ring-slate-900/5">
          <LiveClock />
        </div>
      </div>
    </div>
  );
};
