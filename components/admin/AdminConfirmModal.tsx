'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

interface AdminConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  confirmColor?: 'red' | 'green' | 'gold';
}

export default function AdminConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmColor = 'red',
}: AdminConfirmModalProps) {
  const colorClasses = {
    red: 'border-red-500/30 text-red-400 hover:border-red-500/50 bg-red-500/10',
    green: 'border-green-500/30 text-green-400 hover:border-green-500/50 bg-green-500/10',
    gold: 'border-gold/30 text-gold hover:border-gold/50 bg-gold/10',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-strong rounded-2xl border border-gold/20 p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${colorClasses[confirmColor]}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gold">{title}</h2>
                <button
                  onClick={onClose}
                  className="ml-auto text-soft-gray hover:text-gold transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-soft-gray/90 mb-6">{message}</p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 glass border-gold/30 text-off-white rounded-lg font-semibold hover:border-gold/50 transition-all"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onConfirm}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${colorClasses[confirmColor]}`}
                >
                  {confirmText}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

