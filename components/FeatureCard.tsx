'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass-strong p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-2">
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/30 transition-colors"></div>
            <div className="relative text-gold mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-off-white">{title}</h3>
          <p className="text-soft-gray/80 text-sm sm:text-base leading-relaxed">{description}</p>
        </div>
        {/* Gradient edge effect */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold/0 via-gold/0 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </motion.div>
  );
}


