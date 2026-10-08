import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export const MascotSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-[340px] xl:max-w-[380px] select-none">
      <div className="w-full relative rounded-2xl luminous-card p-6 flex flex-col items-center text-center">
        
        {/* Glow ambient ring */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400/20 via-cyan-400/20 to-blue-400/20 rounded-2xl blur-lg opacity-75 pointer-events-none" />

        {/* Top Tag */}
        <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-200/60 text-slate-700 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-slate-800">CUTE CODER MASCOT</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
        </div>

        {/* Mascot Animation Canvas */}
        <div className="relative z-10 w-52 h-52 xl:w-60 xl:h-60 flex items-center justify-center">
          
          {/* Floating Cute Emotes & Code Particles */}
          <motion.div
            className="absolute -top-1 left-4 font-mono font-bold text-xs text-pink-600 bg-pink-50/90 px-2 py-0.5 rounded-full border border-pink-200 shadow-xs flex items-center gap-1"
            animate={{ y: [-4, 6, -4], opacity: [0.7, 1, 0.7], rotate: [-2, 3, -2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>♥</span>
            <span>{'<code />'}</span>
          </motion.div>

          <motion.div
            className="absolute top-4 right-2 font-mono font-bold text-xs text-cyan-600 bg-cyan-50/90 px-2 py-0.5 rounded-full border border-cyan-200 shadow-xs flex items-center gap-1"
            animate={{ y: [4, -6, 4], opacity: [0.7, 1, 0.7], rotate: [2, -3, 2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <span>✦</span>
            <span>{'{ hack }'}</span>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-0 font-mono font-bold text-[10px] text-indigo-600 bg-indigo-50/90 px-1.5 py-0.5 rounded-md border border-indigo-200 shadow-xs"
            animate={{ y: [-3, 5, -3], opacity: [0.6, 0.95, 0.6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            {'0101 ✨'}
          </motion.div>

          {/* Steaming Coffee Cup */}
          <motion.div
            className="absolute bottom-4 right-4 z-20"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative flex flex-col items-center">
              {/* Animated steam curls */}
              <motion.div
                className="text-[10px] text-pink-400 font-bold -mb-1 opacity-80"
                animate={{ y: [0, -6], opacity: [0.8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              >
                ~
              </motion.div>
              <div className="w-6 h-6 rounded-md bg-pink-100 border border-pink-300 flex items-center justify-center text-[10px] shadow-xs">
                ☕
              </div>
            </div>
          </motion.div>

          {/* Animated SVG Cute Chibi Developer Mascot */}
          <motion.div
            className="w-44 h-44 xl:w-52 xl:h-52 relative"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 220 220"
              className="w-full h-full drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="cuteGlow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="#f472b6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f1f5f9" />
                </linearGradient>
                <linearGradient id="laptopGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>

              {/* Soft shadow floor */}
              <ellipse cx="110" cy="195" rx="55" ry="12" fill="url(#cuteGlow)" />

              {/* Twitching Left Cat Ear */}
              <motion.g
                animate={{ rotate: [-2, 5, -2] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: '70px 65px' }}
              >
                <path d="M52 65 C48 30, 72 20, 84 48 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
                <path d="M58 60 C56 38, 70 32, 78 50 Z" fill="#fda4af" />
              </motion.g>

              {/* Twitching Right Cat Ear */}
              <motion.g
                animate={{ rotate: [2, -5, 2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                style={{ transformOrigin: '150px 65px' }}
              >
                <path d="M168 65 C172 30, 148 20, 136 48 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
                <path d="M162 60 C164 38, 150 32, 142 50 Z" fill="#fda4af" />
              </motion.g>

              {/* Cute Chibi Head */}
              <rect x="54" y="44" width="112" height="92" rx="46" fill="url(#bodyGrad)" stroke="#cbd5e1" strokeWidth="3.5" />

              {/* Programmer Headset Band */}
              <path d="M54 75 C54 36, 166 36, 166 75" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              {/* Headset Earcups with glowing cyan lights */}
              <rect x="44" y="70" width="12" height="24" rx="6" fill="#3b82f6" />
              <circle cx="50" cy="82" r="2.5" fill="#38bdf8" />
              <rect x="164" y="70" width="12" height="24" rx="6" fill="#3b82f6" />
              <circle cx="170" cy="82" r="2.5" fill="#38bdf8" />

              {/* Cute Sparkly Blinking Eyes */}
              <motion.g
                animate={{ scaleY: [1, 0.1, 1, 1, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.05, 0.1, 0.85, 1] }}
                style={{ transformOrigin: '110px 86px' }}
              >
                {/* Left Big Sparkly Eye */}
                <ellipse cx="84" cy="86" rx="10" ry="13" fill="#1e293b" />
                <circle cx="81" cy="82" r="4.5" fill="#ffffff" />
                <circle cx="87" cy="92" r="2" fill="#ffffff" />
                <circle cx="88" cy="84" r="1.5" fill="#38bdf8" />

                {/* Right Big Sparkly Eye */}
                <ellipse cx="136" cy="86" rx="10" ry="13" fill="#1e293b" />
                <circle cx="133" cy="82" r="4.5" fill="#ffffff" />
                <circle cx="139" cy="92" r="2" fill="#ffffff" />
                <circle cx="140" cy="84" r="1.5" fill="#38bdf8" />
              </motion.g>

              {/* Rosy Glowing Cheeks */}
              <circle cx="68" cy="98" r="9" fill="#fda4af" opacity="0.8" />
              <circle cx="152" cy="98" r="9" fill="#fda4af" opacity="0.8" />

              {/* Tiny Cute Nose & Cat Mouth 'w' */}
              <ellipse cx="110" cy="92" rx="2.5" ry="2" fill="#f472b6" />
              <path d="M104 97 Q107 101 110 97 Q113 101 116 97" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Cute Body / Hoodie */}
              <path d="M72 134 C72 134, 84 126, 110 126 C136 126, 148 134, 148 134 L154 168 C154 168, 140 178, 110 178 C80 178, 66 168, 66 168 Z" fill="#e0f2fe" stroke="#93c5fd" strokeWidth="3" />
              
              {/* Hoodie Pocket / HackNext Mini Crest */}
              <rect x="96" y="146" width="28" height="15" rx="5" fill="#3b82f6" />
              <text x="110" y="157" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                HN'26
              </text>

              {/* Laptop Base on Desk */}
              <rect x="52" y="174" width="116" height="10" rx="4" fill="url(#laptopGrad)" stroke="#475569" strokeWidth="1.5" />
              
              {/* Glowing Laptop Screen (facing the cute mascot) */}
              <path d="M68 174 L80 128 L140 128 L152 174 Z" fill="url(#laptopGrad)" stroke="#334155" strokeWidth="2" />
              <path d="M73 171 L83 133 L137 133 L147 171 Z" fill="url(#screenGrad)" opacity="0.9" />

              {/* Illuminated Code lines on screen */}
              <motion.g
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <line x1="88" y1="142" x2="128" y2="142" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <line x1="85" y1="149" x2="118" y2="149" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
                <line x1="88" y1="156" x2="134" y2="156" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
                <line x1="86" y1="163" x2="122" y2="163" stroke="#fbcfe8" strokeWidth="2" strokeLinecap="round" />
              </motion.g>

              {/* Animated Rapid Typing Paws (Tap-Tap-Tap) */}
              {/* Left Paw */}
              <motion.g
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.22, repeat: Infinity, ease: "easeInOut" }}
              >
                <circle cx="86" cy="173" r="8.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                {/* Tiny pink toe beans */}
                <circle cx="86" cy="172" r="3" fill="#fda4af" />
                <circle cx="82" cy="169" r="1.5" fill="#fda4af" />
                <circle cx="86" cy="167" r="1.5" fill="#fda4af" />
                <circle cx="90" cy="169" r="1.5" fill="#fda4af" />
              </motion.g>

              {/* Right Paw */}
              <motion.g
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.24, repeat: Infinity, ease: "easeInOut", delay: 0.11 }}
              >
                <circle cx="134" cy="173" r="8.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                {/* Tiny pink toe beans */}
                <circle cx="134" cy="172" r="3" fill="#fda4af" />
                <circle cx="130" cy="169" r="1.5" fill="#fda4af" />
                <circle cx="134" cy="167" r="1.5" fill="#fda4af" />
                <circle cx="138" cy="169" r="1.5" fill="#fda4af" />
              </motion.g>
            </svg>
          </motion.div>
        </div>

        {/* Mascot Caption */}
        <div className="relative z-10 mt-1">
          <div className="flex items-center justify-center gap-1.5 text-xs xl:text-sm font-extrabold text-slate-800">
            <span className="text-pink-500">✨</span>
            <span>CHIBI CODER ACTIVE</span>
            <span className="text-blue-500">✨</span>
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
            Furiously typing code for HackNext'26
          </p>
        </div>

        {/* Live Build indicator */}
        <div className="relative z-10 mt-2.5 flex items-center justify-center gap-2 text-[10px] font-mono text-pink-700 bg-pink-50/80 px-3 py-1 rounded-full border border-pink-200/80 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
          <span>TAP-TAP · FAST CODING LOOP</span>
        </div>
      </div>
    </div>
  );
};
