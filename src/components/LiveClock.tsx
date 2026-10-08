import React from 'react';
import { useLiveClock } from '../hooks/useLiveClock';

export const LiveClock: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { dateString, hours, minutes, seconds, ampm } = useLiveClock();

  return (
    <div className={`flex flex-col items-center justify-center text-center tracking-tight ${compact ? 'scale-90' : ''}`}>
      {/* Date Line - Centered */}
      <div className="flex items-center justify-center gap-2 text-xs md:text-sm lg:text-base font-bold tracking-widest text-slate-500 uppercase font-sans">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
        <span>{dateString}</span>
      </div>

      {/* Time Line - Centered */}
      <div className="font-mono text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight tabular-nums mt-1 flex items-baseline justify-center">
        <span className="text-slate-900">{hours}</span>
        <span className="mx-1.5 text-blue-500 font-normal opacity-80">:</span>
        <span className="text-slate-900">{minutes}</span>
        <span className="mx-1.5 text-blue-500 font-normal opacity-80">:</span>
        <span className="text-slate-900">{seconds}</span>
        <span className="ml-2.5 text-sm md:text-lg lg:text-xl font-bold text-blue-600 uppercase font-sans">
          {ampm}
        </span>
      </div>
    </div>
  );
};
