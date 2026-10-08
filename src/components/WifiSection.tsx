import React from 'react';

export const WifiSection: React.FC = () => {
  return (
    <footer className="w-full relative z-10 py-3 px-8 bg-transparent flex items-center justify-center select-none">
      {/* Simple Font Wifi line matching requirement */}
      <div className="text-slate-700 text-sm md:text-base lg:text-lg font-sans font-semibold tracking-wide">
        <span>Wi-Fi: </span>
        <span className="font-bold text-slate-900">DT-PLAY HOUSE</span>
        <span className="text-slate-400 mx-1.5">:</span>
        <span className="font-bold text-blue-700">snsdt@2025</span>
      </div>
    </footer>
  );
};
