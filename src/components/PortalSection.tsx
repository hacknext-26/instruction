import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const PortalSection: React.FC = () => {
  const PORTAL_URL = 'https://hacknext-portal.vercel.app/';
  const DISPLAY_URL = 'hacknext-portal.vercel.app';

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      {/* Bigger QR Code Size with NO Borders */}
      <div className="relative p-2 flex flex-col items-center justify-center">
        <QRCodeSVG
          value={PORTAL_URL}
          size={320}
          level="M"
          bgColor="#ffffff"
          fgColor="#0f172a"
          includeMargin={true}
          className="w-64 h-64 md:w-72 md:h-72 xl:w-80 xl:h-80 drop-shadow-sm rounded-2xl"
        />
      </div>

      {/* Bigger and Bold Link Text */}
      <div className="mt-4 text-center">
        <a
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-slate-900 hover:text-blue-600 font-mono text-base md:text-lg lg:text-xl xl:text-2xl font-black tracking-tight transition-colors drop-shadow-2xs"
        >
          {DISPLAY_URL}
        </a>
      </div>
    </div>
  );
};
