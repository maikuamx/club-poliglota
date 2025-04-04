"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="relative h-28 w-28"
      >
        <Image 
          src="/club_poliglota_logo_dark.png" 
          alt="Club Políglota" 
          width={112}
          height={112}
          className="h-full w-full"
        />
      </motion.div>
      {showText && (
        <span className="ml-2 text-xl font-bold">Club Políglota</span>
      )}
    </div>
  );
}