import React from 'react';
import { motion } from 'framer-motion';

// Delicate cyber energy particles that drift gracefully
const PARTICLES = [
  { id: 1, x: '12%', y: '18%', size: 4, duration: 9, delay: 0 },
  { id: 2, x: '88%', y: '22%', size: 5, duration: 11, delay: 1.5 },
  { id: 3, x: '24%', y: '78%', size: 3, duration: 8, delay: 0.8 },
  { id: 4, x: '76%', y: '72%', size: 4.5, duration: 10, delay: 2.2 },
  { id: 5, x: '48%', y: '14%', size: 3.5, duration: 12, delay: 3 },
  { id: 6, x: '8%', y: '52%', size: 4, duration: 9.5, delay: 1 },
  { id: 7, x: '92%', y: '48%', size: 3, duration: 10.5, delay: 2.5 },
  { id: 8, x: '52%', y: '88%', size: 4, duration: 8.5, delay: 0.5 },
];

export const AmbientBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Base Pure Light Background */}
      <div className="absolute inset-0 bg-[#fafbfe]" />

      {/* Subtle Futuristic Dot Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Luminous Cyber Glow: Top Center Glow under HackNext Logo */}
      <motion.div
        className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[65vw] h-[35vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(59, 130, 246, 0.12) 40%, transparent 70%)',
          filter: 'blur(75px)',
          willChange: 'transform'
        }}
        animate={{
          scale: [0.98, 1.05, 0.98],
          opacity: [0.75, 0.95, 0.75],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Left Ambient Cyan Orb */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(207, 250, 254, 0.6) 0%, rgba(224, 242, 254, 0.2) 50%, transparent 70%)',
          filter: 'blur(70px)',
          willChange: 'transform'
        }}
        animate={{
          x: [0, 35, 0],
          y: [0, 25, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Right Ambient Electric Blue Orb */}
      <motion.div
        className="absolute -bottom-[15%] -right-[10%] w-[55vw] h-[55vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(219, 234, 254, 0.55) 0%, rgba(238, 242, 255, 0.2) 50%, transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform'
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1, 1.07, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Center Subtle Cyber Violet Ambient Light */}
      <motion.div
        className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[48vw] h-[48vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(243, 232, 255, 0.35) 0%, rgba(255, 255, 255, 0) 65%)',
          filter: 'blur(85px)',
          willChange: 'transform'
        }}
        animate={{
          scale: [0.96, 1.04, 0.96],
          opacity: [0.6, 0.85, 0.6],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Cyber Energy Particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
            willChange: 'transform, opacity'
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, 8, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Focus Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 65%, rgba(241, 245, 249, 0.4) 100%)'
        }}
      />
    </div>
  );
};
