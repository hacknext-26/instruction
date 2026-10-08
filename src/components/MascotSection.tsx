import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const MascotSection: React.FC = () => {
  const [cleanErr, setCleanErr] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      {/* Bigger Mascot Image - No Border, No Extra Wordings */}
      <motion.div
        className="w-full flex items-center justify-center relative"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={!cleanErr ? "/assets/mascot-clean.png" : "/assets/mascot.png"}
          alt="Hackathon Coding Team Mascot"
          className="w-full max-w-[340px] md:max-w-[380px] xl:max-w-[440px] 2xl:max-w-[480px] h-auto object-contain drop-shadow-md select-none mix-blend-multiply"
          onError={() => setCleanErr(true)}
        />
      </motion.div>
    </div>
  );
};
