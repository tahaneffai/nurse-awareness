'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Particles() {
  const [particles, setParticles] = useState<Array<{
    left: number;
    top: number;
    xOffset: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate particles only on client to avoid hydration mismatch
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        xOffset: Math.random() * 200 - 100,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold/30 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -1000],
            x: [0, particle.xOffset],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}


