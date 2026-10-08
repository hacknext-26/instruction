import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ExternalLink, Sparkles } from 'lucide-react';

export const PortalSection: React.FC = () => {
  const PORTAL_URL = 'https://hacknext-portal.vercel.app/';
  const DISPLAY_URL = 'hacknext-portal.vercel.app';

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-[340px] xl:max-w-[380px] select-none">
      {/* Outer Luminous Card with subtle glow */}
      <div className="w-full relative group rounded-2xl luminous-card p-6 flex flex-col items-center text-center transition-all duration-300">
        
        {/* Glow ambient ring */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none" />

        {/* Header Tag */}
        <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>OFFICIAL ACCESS</span>
        </div>

        {/* Section Heading */}
        <h2 className="relative z-10 text-base xl:text-lg font-black tracking-tight text-slate-900 font-display uppercase mb-1">
          PROBLEM STATEMENT PORTAL
        </h2>
        <p className="relative z-10 text-xs text-slate-500 font-medium mb-4 max-w-[240px]">
          Scan with any mobile camera to view problem statements & guidelines
        </p>

        {/* High-Contrast Scannable QR Container */}
        {/* No animation on the QR itself for 100% scan fidelity */}
        <div className="relative z-10 p-3 bg-white rounded-xl border-2 border-slate-200/90 shadow-md">
          <QRCodeSVG
            value={PORTAL_URL}
            size={200}
            level="M"
            bgColor="#ffffff"
            fgColor="#0f172a"
            includeMargin={true}
            className="w-44 h-44 xl:w-52 xl:h-52"
          />
        </div>

        {/* Direct URL text display */}
        <div className="relative z-10 mt-4 w-full">
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 w-full rounded-xl bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-slate-800 font-mono text-xs xl:text-sm font-bold tracking-tight transition-colors shadow-inner"
          >
            <span>{DISPLAY_URL}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        <div className="relative z-10 mt-3 text-[11px] font-semibold text-emerald-600 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Portal is Live & Accessible</span>
        </div>
      </div>
    </div>
  );
};
