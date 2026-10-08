import React from 'react';
import { motion } from 'framer-motion';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base Light Background */}
      <div className="absolute inset-0 bg-[#fafbfe]" />

      {/* Subtle Dot Matrix Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Futuristic Ambient Glowing Orbs - GPU accelerated */}
      <motion.div
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(219, 234, 254, 0.65) 0%, rgba(238, 242, 255, 0.25) 50%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform'
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(207, 250, 254, 0.55) 0%, rgba(224, 242, 254, 0.2) 50%, transparent 70%)',
          filter: 'blur(70px)',
          willChange: 'transform'
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -40, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-[35%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(243, 232, 255, 0.4) 0%, rgba(255, 255, 255, 0) 65%)',
          filter: 'blur(80px)',
          willChange: 'transform'
        }}
        animate={{
          scale: [0.95, 1.06, 0.95],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Minimalistic Ambient Energy Lines / Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(241, 245, 249, 0.45) 100%)'
        }}
      />
    </div>
  );
};
