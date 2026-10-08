import React, { useState } from 'react';
import { FloorNumber } from '../types/event';

interface HeaderProps {
  floorNumber?: FloorNumber;
}

export const Header: React.FC<HeaderProps> = () => {
  const [leftLogoErr, setLeftLogoErr] = useState(false);
  const [rightLogoErr, setRightLogoErr] = useState(false);

  return (
    <header className="w-full relative z-10 px-6 pt-2 pb-0 bg-transparent select-none shrink-0">
      {/* Both Logos at top in center with 'SNS COLLEGE OF TECHNOLOGY' in one line */}
      <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-10 max-w-[1840px] mx-auto">
        {/* Left Logo */}
        {!leftLogoErr && (
          <img
            src="/assets/logo-left.png"
            alt="SNS College Logo 1"
            className="h-12 md:h-14 lg:h-16 xl:h-20 w-auto max-w-[160px] lg:max-w-[200px] object-contain drop-shadow-xs shrink-0"
            onError={() => setLeftLogoErr(true)}
          />
        )}

        {/* Center: SNS COLLEGE OF TECHNOLOGY in one line */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black tracking-wider text-slate-900 uppercase font-display leading-tight whitespace-nowrap">
            SNS COLLEGE OF TECHNOLOGY
          </h1>
          <h2 className="text-xs md:text-xs lg:text-sm font-extrabold tracking-[0.35em] text-slate-500 uppercase mt-0.5">
            COIMBATORE
          </h2>
        </div>

        {/* Right Logo */}
        {!rightLogoErr && (
          <img
            src="/assets/logo-right.png"
            alt="SNS College Logo 2"
            className="h-12 md:h-14 lg:h-16 xl:h-20 w-auto max-w-[160px] lg:max-w-[200px] object-contain drop-shadow-xs shrink-0"
            onError={() => setRightLogoErr(true)}
          />
        )}
      </div>

      {/* Center: HackNext'26 Neon Glitch Logo - ENLARGED PROMINENT CENTERPIECE (Clear of title) */}
      <div className="mt-1 md:mt-2 flex items-center justify-center">
        <img
          src="/assets/hacknext-logo.png"
          alt="HACKNEXT'26 SERIES 2.0"
          className="h-20 md:h-24 lg:h-32 xl:h-36 2xl:h-40 w-auto max-w-[82vw] object-contain drop-shadow-[0_6px_28px_rgba(6,182,212,0.22)] select-none transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
    </header>
  );
};
