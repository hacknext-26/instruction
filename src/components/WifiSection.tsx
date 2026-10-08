import React from 'react';
import { Wifi } from 'lucide-react';

export const WifiSection: React.FC = () => {
  return (
    <footer className="w-full relative z-10 py-3 px-8 bg-white/80 backdrop-blur-md border-t border-slate-200/80 shadow-2xs flex items-center justify-center">
      <div className="flex items-center justify-center gap-2 text-slate-800 font-mono text-xs md:text-sm lg:text-base font-bold bg-slate-100/90 px-5 py-1.5 rounded-full border border-slate-200/90 shadow-2xs tracking-wide">
        <Wifi className="w-4 h-4 text-blue-600 shrink-0" />
        <span className="text-slate-500 font-sans font-semibold">Wi-Fi:</span>
        <span className="text-slate-900 font-extrabold">DT-PLAY HOUSE</span>
        <span className="text-slate-400 mx-1">:</span>
        <span className="text-blue-700 font-black tracking-wider">snsdt@2025</span>
      </div>
    </footer>
  );
};
