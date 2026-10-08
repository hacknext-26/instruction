import React from 'react';
import { Maximize } from 'lucide-react';
import { useFullscreen } from '../hooks/useFullscreen';

interface FullscreenButtonProps {
  isPreview?: boolean;
}

export const FullscreenButton: React.FC<FullscreenButtonProps> = ({ isPreview = false }) => {
  const { isFullscreen, hasUserInteracted, enterFullscreen, toggleFullscreen, isSupported } = useFullscreen();

  if (!isSupported || isPreview) {
    return null;
  }

  // If already fullscreen, render nothing (completely hidden)
  if (isFullscreen) {
    return null;
  }

  // Initial prompt before entering fullscreen
  if (!hasUserInteracted) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 select-none">
        <div className="bg-white/95 rounded-2xl p-8 max-w-md w-full border border-slate-200 shadow-2xl flex flex-col items-center text-center animate-subtle-pulse">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg mb-5">
            <Maximize className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-black text-slate-900 font-display">
            Projector Display Ready
          </h3>
          <p className="text-sm text-slate-600 mt-2 mb-6">
            Click below to lock into 16:9 fullscreen projection mode and enable display wake lock.
          </p>

          <button
            onClick={enterFullscreen}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-extrabold text-base tracking-wider uppercase shadow-lg shadow-blue-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Maximize className="w-5 h-5" />
            <span>ENTER FULLSCREEN</span>
          </button>

          <span className="text-[11px] font-mono text-slate-400 mt-4">
            Press ESC anytime to exit
          </span>
        </div>
      </div>
    );
  }

  // If user previously interacted and exited fullscreen (ESC), show subtle unobtrusive corner button
  return (
    <button
      onClick={toggleFullscreen}
      title="Enter Fullscreen"
      className="fixed bottom-4 right-4 z-40 p-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-700 border border-slate-200/90 shadow-md backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 text-xs font-bold"
    >
      <Maximize className="w-4 h-4 text-blue-600" />
      <span className="hidden sm:inline">FULLSCREEN</span>
    </button>
  );
};
