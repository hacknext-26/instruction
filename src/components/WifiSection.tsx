import React from 'react';
import { Wifi, KeyRound } from 'lucide-react';

export const WifiSection: React.FC = () => {
  return (
    <footer className="w-full relative z-10 px-8 py-3 bg-white/80 backdrop-blur-md border-t border-slate-200/80 shadow-xs flex items-center justify-between text-slate-700">
      {/* Venue Wi-Fi Badge */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
          <Wifi className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            VENUE WI-FI
          </span>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5 font-mono text-xs md:text-sm font-semibold text-slate-800 bg-slate-100/90 px-2.5 py-1 rounded-md border border-slate-200/70">
            <span className="text-slate-500 font-normal">SSID:</span>
            <span className="font-bold text-slate-900">DT-PLAY HOUSE</span>
          </div>
        </div>
      </div>

      {/* Password Badge */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 font-mono text-xs md:text-sm font-semibold text-slate-800 bg-blue-50/80 px-3 py-1 rounded-md border border-blue-200/80 shadow-2xs">
          <KeyRound className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-slate-500 font-normal">PASSWORD:</span>
          <span className="font-bold text-blue-900 tracking-wider">snsdt@2025</span>
        </div>
      </div>

      {/* Network Note */}
      <div className="hidden lg:flex items-center gap-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <span>HIGH-SPEED 5G VENUE NETWORK</span>
      </div>
    </footer>
  );
};
