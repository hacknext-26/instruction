import React, { useState } from 'react';
import { LiveClock } from './LiveClock';
import { FloorNumber } from '../types/event';

interface HeaderProps {
  floorNumber: FloorNumber;
}

export const Header: React.FC<HeaderProps> = ({ floorNumber }) => {
  const [leftLogoErr, setLeftLogoErr] = useState(false);
  const [rightLogoErr, setRightLogoErr] = useState(false);

  return (
    <header className="w-full relative z-10 px-8 pt-3 pb-2 border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
      {/* Top Banner Row: [LOGO 1] — SNS COLLEGE OF TECHNOLOGY COIMBATORE — [LOGO 2]
          No borders on logos, big size, same height aligned */}
      <div className="flex items-center justify-between gap-6 max-w-[1840px] mx-auto">
        {/* Left Logo (No border, big height) */}
        <div className="w-48 xl:w-56 flex items-center justify-start shrink-0">
          {!leftLogoErr ? (
            <img
              src="/assets/logo-left.png"
              alt="SNS College Logo 1"
              className="h-20 xl:h-24 w-auto max-w-[200px] object-contain drop-shadow-xs"
              onError={() => setLeftLogoErr(true)}
            />
          ) : (
            <div className="font-bold text-slate-800 text-lg">SNS LOGO</div>
          )}
        </div>

        {/* Center: SNS COLLEGE OF TECHNOLOGY \n COIMBATORE (No AUTONOMOUS line) */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-wide text-slate-900 uppercase font-display leading-tight">
            SNS COLLEGE OF TECHNOLOGY
          </h1>
          <h2 className="text-sm md:text-base lg:text-lg font-extrabold tracking-[0.3em] text-slate-600 uppercase mt-0.5">
            COIMBATORE
          </h2>
        </div>

        {/* Right Logo (No border, big height, matching left logo) */}
        <div className="w-48 xl:w-56 flex items-center justify-end shrink-0">
          {!rightLogoErr ? (
            <img
              src="/assets/logo-right.png"
              alt="SNS College Logo 2"
              className="h-20 xl:h-24 w-auto max-w-[200px] object-contain drop-shadow-xs"
              onError={() => setRightLogoErr(true)}
            />
          ) : (
            <div className="font-bold text-slate-800 text-lg">TECH LOGO</div>
          )}
        </div>
      </div>

      {/* Center Section: HACKNEXT'26 Neon Glitch Logo Image & Date/Time */}
      <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col items-center justify-center text-center max-w-[1840px] mx-auto">
        {/* Neon Glitch Logo Image instead of text word */}
        <div className="flex items-center justify-center gap-3">
          <img
            src="/assets/hacknext-logo.png"
            alt="HACKNEXT'26 SERIES 2.0"
            className="h-14 md:h-16 xl:h-20 w-auto object-contain drop-shadow-sm select-none"
          />
          <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-bold text-[11px] lg:text-xs tracking-wider uppercase">
            FLOOR {floorNumber}
          </span>
        </div>

        {/* Centered Date & Live Clock */}
        <div className="mt-1">
          <LiveClock />
        </div>
      </div>
    </header>
  );
};
