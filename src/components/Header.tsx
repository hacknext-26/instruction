import React, { useState } from 'react';
import { FloorNumber } from '../types/event';

interface HeaderProps {
  floorNumber?: FloorNumber;
}

export const Header: React.FC<HeaderProps> = () => {
  const [leftLogoErr, setLeftLogoErr] = useState(false);
  const [rightLogoErr, setRightLogoErr] = useState(false);

  return (
    <header className="w-full relative z-10 px-8 pt-4 pb-2 bg-transparent select-none">
      {/* Top Banner Row: [LOGO 1] — SNS COLLEGE OF TECHNOLOGY COIMBATORE — [LOGO 2]
          No borders, big size, both same height aligned */}
      <div className="flex items-center justify-between gap-6 max-w-[1840px] mx-auto">
        {/* Left Logo (No border, big height) */}
        <div className="w-48 xl:w-60 flex items-center justify-start shrink-0">
          {!leftLogoErr ? (
            <img
              src="/assets/logo-left.png"
              alt="SNS College Logo 1"
              className="h-20 md:h-24 xl:h-28 w-auto max-w-[220px] object-contain drop-shadow-xs"
              onError={() => setLeftLogoErr(true)}
            />
          ) : (
            <div className="font-bold text-slate-800 text-lg">SNS LOGO</div>
          )}
        </div>

        {/* Center: SNS COLLEGE OF TECHNOLOGY \n COIMBATORE */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-wide text-slate-900 uppercase font-display leading-tight">
            SNS COLLEGE OF TECHNOLOGY
          </h1>
          <h2 className="text-base md:text-lg lg:text-xl font-extrabold tracking-[0.35em] text-slate-600 uppercase mt-1">
            COIMBATORE
          </h2>

          {/* HackNext Neon Glitch Logo Image - Increased Size in Center, NO Floor badge */}
          <div className="mt-3 flex items-center justify-center">
            <img
              src="/assets/hacknext-logo.png"
              alt="HACKNEXT'26 SERIES 2.0"
              className="h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain drop-shadow-sm select-none"
            />
          </div>
        </div>

        {/* Right Logo (No border, big height, matching left logo) */}
        <div className="w-48 xl:w-60 flex items-center justify-end shrink-0">
          {!rightLogoErr ? (
            <img
              src="/assets/logo-right.png"
              alt="SNS College Logo 2"
              className="h-20 md:h-24 xl:h-28 w-auto max-w-[220px] object-contain drop-shadow-xs"
              onError={() => setRightLogoErr(true)}
            />
          ) : (
            <div className="font-bold text-slate-800 text-lg">TECH LOGO</div>
          )}
        </div>
      </div>
    </header>
  );
};
