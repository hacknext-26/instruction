import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio } from 'lucide-react';

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
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-8 max-w-[900px] xl:max-w-[1050px] mx-auto select-none">
      
      {/* "CURRENT EVENT" Pill Badge */}
      <div className="mb-4 xl:mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-700 shadow-sm backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
          </span>
          <span className="text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase font-mono">
            CURRENT EVENT
          </span>
          <Radio className="w-3.5 h-3.5 text-blue-600 ml-0.5 animate-pulse" />
        </div>
      </div>

      {/* Animated Center Event Card */}
      <div className="w-full relative">
        {/* Subtle decorative glowing background flare */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-cyan-100/40 to-indigo-100/50 rounded-3xl blur-2xl -z-10 transform scale-95" />

        <div className="w-full bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-8 xl:p-12 shadow-card-elevated">
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
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-slate-900 font-display leading-[1.08] max-w-full break-words"
              >
                <span className="text-gradient-hack">
                  {title || 'Loading Event...'}
                </span>
              </motion.h2>

              {/* Decorative Accent Divider */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '80px', opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full my-5 xl:my-6"
              />

              {/* Event Description - Medium/Large, Controlled Wrapping */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-lg md:text-xl lg:text-2xl font-medium text-slate-600 max-w-[800px] leading-relaxed break-words"
              >
                {description || 'Please wait for announcements.'}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
