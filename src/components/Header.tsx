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
    <header className="w-full relative z-10 px-8 pt-4 pb-3 border-b border-slate-200/80 bg-white/75 backdrop-blur-md shadow-sm">
      {/* Top Banner Row: LOGO 1 — SNS COLLEGE OF TECHNOLOGY — LOGO 2 */}
      <div className="flex items-center justify-between gap-4 max-w-[1840px] mx-auto">
        {/* Left Logo */}
        <div className="flex items-center gap-3 w-52 shrink-0">
          <div className="w-14 h-14 rounded-xl bg-white p-1 border border-slate-200/90 shadow-sm flex items-center justify-center overflow-hidden">
            {!leftLogoErr ? (
              <img
                src="/assets/logo-left.png"
                alt="SNS College of Technology Logo"
                className="w-full h-full object-contain"
                onError={() => setLeftLogoErr(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 text-blue-700 font-bold text-xs rounded">
                <span>SNS</span>
                <span className="text-[9px] text-blue-500">LOGO 1</span>
              </div>
            )}
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Venue</span>
            <span className="text-xs font-semibold text-slate-700">Main Campus</span>
          </div>
        </div>

        {/* Center: SNS COLLEGE OF TECHNOLOGY */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-slate-100/90 border border-slate-200/70 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Autonomous Institution · Accredited by NAAC
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-wider text-slate-900 uppercase font-display">
            SNS COLLEGE OF TECHNOLOGY
          </h1>
        </div>

        {/* Right Logo */}
        <div className="flex items-center justify-end gap-3 w-52 shrink-0">
          <div className="hidden xl:flex flex-col items-end text-right">
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Location</span>
            <span className="text-xs font-semibold text-slate-700">Coimbatore, TN</span>
          </div>
          <div className="w-14 h-14 rounded-xl bg-white p-1 border border-slate-200/90 shadow-sm flex items-center justify-center overflow-hidden">
            {!rightLogoErr ? (
              <img
                src="/assets/logo-right.png"
                alt="Institutional Partner Logo"
                className="w-full h-full object-contain"
                onError={() => setRightLogoErr(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-50 text-indigo-700 font-bold text-xs rounded">
                <span>TECH</span>
                <span className="text-[9px] text-indigo-500">LOGO 2</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-Header Row: HACKNEXT'26 SERIES 2.0 & CURRENT DATE + LIVE TIME */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between max-w-[1840px] mx-auto">
        {/* Main Branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-7 rounded-sm bg-gradient-to-b from-blue-600 to-cyan-500 shadow-sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl lg:text-2xl font-black tracking-tight text-slate-900 font-display">
                  HACKNEXT'26
                </span>
                <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold text-xs tracking-wider uppercase shadow-sm">
                  SERIES 2.0
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 tracking-wide uppercase">
                48-Hour Live National Innovation Hackathon
              </p>
            </div>
          </div>

          {/* Floor Tag */}
          <div className="ml-4 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-700 font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            FLOOR {floorNumber} DISPLAY
          </div>
        </div>

        {/* Live Clock Section */}
        <LiveClock />
      </div>
    </header>
  );
};
