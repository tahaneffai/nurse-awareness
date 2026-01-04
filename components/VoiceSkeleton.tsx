'use client';

import { motion } from 'framer-motion';

interface VoiceSkeletonProps {
  index?: number;
}

export default function VoiceSkeleton({ index = 0 }: VoiceSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-strong p-6 rounded-2xl border border-gold/10 h-full flex flex-col"
    >
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-24 bg-dark-green-3/50 rounded-full animate-pulse" />
        <div className="h-4 w-20 bg-dark-green-3/50 rounded animate-pulse" />
      </div>

      {/* Text lines skeleton */}
      <div className="space-y-3 mb-4 flex-1">
        <div className="h-5 bg-dark-green-3/50 rounded animate-pulse" />
        <div className="h-5 bg-dark-green-3/50 rounded animate-pulse w-5/6" />
        <div className="h-5 bg-dark-green-3/50 rounded animate-pulse w-4/6" />
        <div className="h-5 bg-dark-green-3/50 rounded animate-pulse w-5/6" />
        <div className="h-5 bg-dark-green-3/50 rounded animate-pulse w-3/4" />
      </div>

      {/* Icons footer skeleton */}
      <div className="flex items-center justify-center gap-4 mt-auto pt-4 border-t border-dark-green-3/50">
        <div className="h-4 w-4 bg-dark-green-3/50 rounded-full animate-pulse" />
        <div className="h-4 w-4 bg-dark-green-3/50 rounded-full animate-pulse" />
        <div className="h-4 w-4 bg-dark-green-3/50 rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
}
