import React, { useState } from 'react';
import { FloorNumber } from '../types/event';

interface HeaderProps {
  floorNumber?: FloorNumber;
}

export const Header: React.FC<HeaderProps> = () => {
  const [leftLogoErr, setLeftLogoErr] = useState(false);
  const [rightLogoErr, setRightLogoErr] = useState(false);

  return (
    <header className="w-full relative z-10 px-6 pt-3 pb-1 bg-transparent select-none">
      {/* Both Logos at top in center with 'SNS COLLEGE OF TECHNOLOGY' in one line */}
      <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-10 max-w-[1840px] mx-auto">
        {/* Left Logo */}
        {!leftLogoErr && (
          <img
            src="/assets/logo-left.png"
            alt="SNS College Logo 1"
            className="h-16 md:h-20 lg:h-24 xl:h-28 w-auto max-w-[180px] lg:max-w-[220px] object-contain drop-shadow-xs shrink-0"
            onError={() => setLeftLogoErr(true)}
          />
        )}

        {/* Center: SNS COLLEGE OF TECHNOLOGY in one line */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-wider text-slate-900 uppercase font-display leading-tight whitespace-nowrap">
            SNS COLLEGE OF TECHNOLOGY
          </h1>
          <h2 className="text-xs md:text-sm lg:text-base font-extrabold tracking-[0.4em] text-slate-500 uppercase mt-0.5">
            COIMBATORE
          </h2>
        </div>

        {/* Right Logo */}
        {!rightLogoErr && (
          <img
            src="/assets/logo-right.png"
            alt="SNS College Logo 2"
            className="h-16 md:h-20 lg:h-24 xl:h-28 w-auto max-w-[180px] lg:max-w-[220px] object-contain drop-shadow-xs shrink-0"
            onError={() => setRightLogoErr(true)}
          />
        )}
      </div>

      {/* Center: HackNext'26 Neon Glitch Logo - ENLARGED PROMINENT CENTERPIECE */}
      <div className="mt-2 md:mt-3 flex items-center justify-center">
        <img
          src="/assets/hacknext-logo.png"
          alt="HACKNEXT'26 SERIES 2.0"
          className="h-28 md:h-36 lg:h-44 xl:h-52 2xl:h-56 w-auto max-w-[88vw] object-contain drop-shadow-[0_6px_28px_rgba(6,182,212,0.22)] select-none transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
    </header>
  );
};
