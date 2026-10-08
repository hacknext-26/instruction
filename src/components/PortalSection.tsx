import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ExternalLink } from 'lucide-react';

export const PortalSection: React.FC = () => {
  const PORTAL_URL = 'https://hacknext-portal.vercel.app/';
  const DISPLAY_URL = 'hacknext-portal.vercel.app';

  return (
    <div className="flex flex-col items-center justify-center select-none">
      {/* Clean QR Code Container Box matching diagram */}
      <div className="relative group rounded-2xl bg-white p-4 border-2 border-slate-300 shadow-md flex flex-col items-center text-center">
        {/* Subtle glowing ambient ring */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-md opacity-60 pointer-events-none" />

        <div className="relative z-10 p-2 bg-white rounded-xl">
          <QRCodeSVG
            value={PORTAL_URL}
            size={190}
            level="M"
            bgColor="#ffffff"
            fgColor="#0f172a"
            includeMargin={true}
            className="w-40 h-40 xl:w-48 xl:h-48"
          />
        </div>
      </div>

      {/* URL Text Directly Below QR Code matching diagram */}
      <div className="mt-3">
        <a
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200/90 text-slate-800 font-mono text-xs xl:text-sm font-bold tracking-tight transition-colors shadow-2xs"
        >
          <span>{DISPLAY_URL}</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>
    </div>
  );
};
