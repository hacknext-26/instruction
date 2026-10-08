import React from 'react';
import { useLiveClock } from '../hooks/useLiveClock';

export const LiveClock: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { dateString, hours, minutes, seconds, ampm } = useLiveClock();

  return (
    <div className={`flex flex-col items-end justify-center tracking-tight ${compact ? 'scale-90 origin-right' : ''}`}>
      {/* Date Line */}
      <div className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider text-slate-500 uppercase">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
        <span>{dateString}</span>
      </div>

      {/* Time Line */}
      <div className="font-mono text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight tabular-nums mt-0.5 flex items-baseline">
        <span className="text-slate-900">{hours}</span>
        <span className="mx-1 text-blue-500 opacity-80">:</span>
        <span className="text-slate-900">{minutes}</span>
        <span className="mx-1 text-blue-500 opacity-80">:</span>
        <span className="text-slate-900">{seconds}</span>
        <span className="ml-2 text-sm md:text-lg font-bold text-blue-600 uppercase font-sans">
          {ampm}
        </span>
      </div>
    </div>
  );
};
