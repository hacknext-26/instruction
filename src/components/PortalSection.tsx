import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const PortalSection: React.FC = () => {
  const PORTAL_URL = 'https://hacknext-portal.vercel.app/';
  const DISPLAY_URL = 'hacknext-portal.vercel.app';

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      {/* Increased QR Code Size with NO Borders matching requirement */}
      <div className="relative p-2 flex flex-col items-center justify-center">
        <QRCodeSVG
          value={PORTAL_URL}
          size={250}
          level="M"
          bgColor="#ffffff"
          fgColor="#0f172a"
          includeMargin={true}
          className="w-56 h-56 xl:w-64 xl:h-64 drop-shadow-sm rounded-xl"
        />
      </div>

      {/* URL Text Directly Below QR Code */}
      <div className="mt-3 text-center">
        <a
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-slate-700 hover:text-blue-600 font-mono text-sm xl:text-base font-bold tracking-tight transition-colors"
        >
          {DISPLAY_URL}
        </a>
      </div>
    </div>
  );
};
