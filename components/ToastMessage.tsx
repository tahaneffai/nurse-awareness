'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastMessageProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export default function ToastMessage({ type, message, onClose }: ToastMessageProps) {
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;
  const bgColor = type === 'success' ? 'bg-gold/10 border-gold/30' : 'bg-red-500/10 border-red-500/30';
  const iconColor = type === 'success' ? 'text-gold' : 'text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`${bgColor} border rounded-xl p-4 flex items-start gap-3 shadow-lg backdrop-blur-sm`}
    >
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      <p className="flex-1 text-soft-gray/90 text-sm leading-relaxed">{message}</p>
      <button
        onClick={onClose}
        className="text-soft-gray/60 hover:text-soft-gray/90 transition-colors flex-shrink-0"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
