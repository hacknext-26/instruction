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
    <header className="w-full relative z-10 px-8 pt-4 pb-2 border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
      {/* Top Banner Row: [LOGO] — SNS COLLEGE OF TECHNOLOGY — [LOGO] */}
      <div className="flex items-center justify-between gap-4 max-w-[1840px] mx-auto">
        {/* Left Logo */}
        <div className="flex items-center gap-3 w-48 xl:w-56 shrink-0">
          <div className="w-16 h-16 xl:w-18 xl:h-18 rounded-2xl bg-white p-1.5 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
            {!leftLogoErr ? (
              <img
                src="/assets/logo-left.png"
                alt="SNS College Logo 1"
                className="w-full h-full object-contain"
                onError={() => setLeftLogoErr(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 text-blue-700 font-bold text-xs rounded-xl">
                <span>SNS</span>
                <span className="text-[9px] text-blue-500">LOGO 1</span>
              </div>
            )}
          </div>
        </div>

        {/* Center: SNS COLLEGE OF TECHNOLOGY */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-slate-100/90 border border-slate-200/70 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Autonomous Institution · Approved by AICTE · NAAC Accredited
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-wider text-slate-900 uppercase font-display">
            SNS COLLEGE OF TECHNOLOGY
          </h1>
        </div>

        {/* Right Logo */}
        <div className="flex items-center justify-end gap-3 w-48 xl:w-56 shrink-0">
          <div className="w-16 h-16 xl:w-18 xl:h-18 rounded-2xl bg-white p-1.5 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
            {!rightLogoErr ? (
              <img
                src="/assets/logo-right.png"
                alt="SNS College Logo 2"
                className="w-full h-full object-contain"
                onError={() => setRightLogoErr(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl">
                <span>TECH</span>
                <span className="text-[9px] text-indigo-500">LOGO 2</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Center Stack: HACKNEXT'26 SERIES 2.0 & DATE + TIME */}
      <div className="mt-3 pt-3 border-t border-slate-100/90 flex flex-col items-center justify-center text-center max-w-[1840px] mx-auto">
        {/* Title & Badge */}
        <div className="flex items-center justify-center gap-3 mb-1">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-slate-900 font-display">
            HACKNEXT'26
          </h2>
          <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold text-xs lg:text-sm tracking-wider uppercase shadow-sm">
            SERIES 2.0
          </span>
          <span className="ml-2 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-bold text-[11px] lg:text-xs tracking-wider uppercase">
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
