import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveClock } from './LiveClock';

interface EventSectionProps {
  title: string;
  description: string;
  lastUpdated?: Date;
}

// Dynamically decreases font size as title characters or line breaks increase
function getDynamicTitleSizeClasses(charCount: number, lineCount: number): string {
  if (lineCount >= 3) {
    // 3 or more lines: Keep tight and compact to leave generous safety margin above
    if (charCount <= 30) {
      return "text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-[1.08]";
    } else {
      return "text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] leading-[1.12]";
    }
  } else if (lineCount === 2) {
    // 2 lines: Beautifully balanced
    if (charCount <= 28) {
      return "text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.08]";
    } else if (charCount <= 50) {
      return "text-2.5xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.1]";
    } else {
      return "text-2xl md:text-3xl lg:text-3.5xl xl:text-4xl leading-[1.14]";
    }
  } else {
    // 1 line: Bold & punchy
    if (charCount <= 18) {
      return "text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05]";
    } else if (charCount <= 35) {
      return "text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.08]";
    } else if (charCount <= 55) {
      return "text-2.5xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.1]";
    } else {
      return "text-2xl md:text-2.5xl lg:text-3xl xl:text-4xl leading-[1.14]";
    }
  }
}

export const EventSection: React.FC<EventSectionProps> = ({
  title,
  description,
}) => {
  // Combine title and description as key for AnimatePresence so changes trigger transition
  const contentKey = `${title}_${description}`;
  const trimmedTitle = (title || '').trim();
  const titleCharCount = trimmedTitle.length;
  const lineCount = trimmedTitle ? trimmedTitle.split('\n').filter(l => l.trim().length > 0).length : 1;
  const dynamicSizeClass = getDynamicTitleSizeClasses(titleCharCount, lineCount);

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
            {/* Event Title - Dynamically Decreases Font Size as Characters or Lines Increase */}
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
              className="mt-2.5 xl:mt-3.5 text-lg md:text-xl lg:text-2xl xl:text-[1.75rem] font-bold text-slate-700 max-w-[880px] leading-relaxed break-words whitespace-pre-line"
            >
              {description || 'Please wait for announcements.'}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Time and Date in an Elegant Luminous Glass Box */}
      <div className="mt-4 xl:mt-5 inline-flex items-center justify-center">
        <div className="px-7 py-2.5 md:px-8 md:py-3 bg-white/95 border border-slate-200/90 rounded-2xl shadow-card-elevated backdrop-blur-md flex items-center justify-center ring-1 ring-slate-900/5">
          <LiveClock />
        </div>
      </div>
    </div>
  );
};
