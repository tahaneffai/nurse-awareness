'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AdminEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onSave: (newMessage: string) => Promise<void>;
}

export default function AdminEditModal({ isOpen, onClose, message, onSave }: AdminEditModalProps) {
  const [editedMessage, setEditedMessage] = useState(message);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (editedMessage.trim().length < 20) {
      setError('Message must be at least 20 characters');
      return;
    }

    if (editedMessage.trim().length > 2000) {
      setError('Message must be less than 2000 characters');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      await onSave(editedMessage.trim());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
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
              className="glass-strong rounded-2xl border border-gold/20 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gold">Edit Message</h2>
                <button
                  onClick={onClose}
                  className="text-soft-gray hover:text-gold transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-soft-gray/80 text-sm mb-2">
                    Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    value={editedMessage}
                    onChange={(e) => {
                      setEditedMessage(e.target.value);
                      setError('');
                    }}
                    rows={8}
                    className="w-full bg-dark-green-3/50 border border-dark-green-mid rounded-lg px-4 py-3 text-off-white focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs ${editedMessage.length > 2000 ? 'text-gold' : 'text-soft-gray/60'}`}>
                      {editedMessage.length} / 2000 characters
                    </span>
                    {editedMessage.length < 20 && (
                      <span className="text-xs text-gold">
                        {20 - editedMessage.length} more characters needed
                      </span>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="bg-gold/10 border border-gold/20 rounded-lg p-3 text-gold text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 glass border-gold/30 text-off-white rounded-lg font-semibold hover:border-gold/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving || editedMessage.trim().length < 20}
                    className="px-6 py-2.5 bg-gold text-dark-green-primary rounded-lg font-semibold hover:bg-gold/90 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

