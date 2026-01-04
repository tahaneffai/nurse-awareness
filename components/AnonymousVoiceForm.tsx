'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, Shield } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import ToastMessage from './ToastMessage';

interface AnonymousVoiceFormProps {
  onSuccess?: () => void;
}

const CATEGORIES = {
  de: ['Arbeitsbelastung', 'Respekt', 'Anleitung', 'Stress', 'Sonstiges'],
  en: ['Workload', 'Respect', 'Guidance', 'Stress', 'Other'],
};

export default function AnonymousVoiceForm({ onSuccess }: AnonymousVoiceFormProps) {
  const { lang } = useLanguage();
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const maxLength = 2000;
  const minLength = 20;
  const remainingChars = maxLength - message.length;
  const categories = CATEGORIES[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (message.trim().length < minLength) {
      setError(
        lang === 'de'
          ? `Nachricht muss mindestens ${minLength} Zeichen lang sein.`
          : `Message must be at least ${minLength} characters long.`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          topicTags: category || null,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Invalid response from server');
      }

      if (!data.ok) {
        let errorMsg = 'Failed to submit';
        if (data.error) {
          if (typeof data.error === 'string') {
            errorMsg = data.error;
          } else if (data.error.message) {
            errorMsg = data.error.message;
          }
        } else if (data.message) {
          errorMsg = data.message;
        }
        throw new Error(errorMsg);
      }

      // Success
      setMessage('');
      setCategory('');
      setSuccess(true);
      setError('');

      if (onSuccess) {
        onSuccess();
      }

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      let errorMsg = lang === 'de' ? 'Ein Fehler ist aufgetreten' : 'An error occurred';
      if (err instanceof Error) {
        errorMsg = err.message;
      } else if (typeof err === 'string') {
        errorMsg = err;
      }
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Messages */}
      <AnimatePresence>
        {success && (
          <ToastMessage
            type="success"
            message={
              lang === 'de'
                ? 'Danke! Deine Nachricht wurde erhalten und erscheint nach Prüfung.'
                : 'Thank you! Your message was received and will appear after review.'
            }
            onClose={() => setSuccess(false)}
          />
        )}
        {error && (
          <ToastMessage
            type="error"
            message={error}
            onClose={() => setError('')}
          />
        )}
      </AnimatePresence>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ y: -2 }}
        className="glass-strong p-8 sm:p-10 lg:p-12 xl:p-14 rounded-3xl border-2 border-gold/10 hover:border-gold/30 transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Message Textarea */}
          <div>
            <label
              htmlFor="message"
              className="block text-soft-gray/90 text-base sm:text-lg font-bold mb-4 sm:mb-5"
            >
              {lang === 'de' ? 'Deine Nachricht' : 'Your Message'}{' '}
              <span className="text-gold">*</span>
            </label>
            <textarea
              id="message"
              required
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError('');
              }}
              rows={12}
              maxLength={maxLength}
              className="w-full bg-dark-green-3/50 border-2 border-dark-green-mid rounded-xl px-6 py-6 text-off-white focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all duration-200 resize-none text-lg sm:text-xl leading-relaxed placeholder:text-soft-gray/40"
              placeholder={
                lang === 'de'
                  ? 'Teile deine Erfahrung hier... (mindestens 20 Zeichen)'
                  : 'Share your experience here... (minimum 20 characters)'
              }
            />
            <div className="flex justify-between items-center mt-3 sm:mt-4">
              <span
                className={`text-sm sm:text-base font-semibold ${
                  remainingChars < 50 ? 'text-gold' : 'text-soft-gray/60'
                }`}
              >
                {message.length}/{maxLength}{' '}
                {lang === 'de' ? 'Zeichen' : 'characters'}
              </span>
              {message.length > 0 && message.length < minLength && (
                <span className="text-sm sm:text-base text-gold font-semibold">
                  {minLength - message.length}{' '}
                  {lang === 'de' ? 'mehr benötigt' : 'more needed'}
                </span>
              )}
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label
              htmlFor="category"
              className="block text-soft-gray/90 text-base sm:text-lg font-bold mb-4 sm:mb-5"
            >
              {lang === 'de' ? 'Kategorie (optional)' : 'Category (optional)'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(category === cat ? '' : cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 ${
                    category === cat
                      ? 'bg-gold text-dark-green-primary border-2 border-gold shadow-lg'
                      : 'bg-dark-green-3/50 text-soft-gray/90 border-2 border-dark-green-mid hover:border-gold/50'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="bg-gold/5 border-2 border-gold/20 rounded-xl p-5 sm:p-6">
            <p className="text-soft-gray/80 text-sm sm:text-base leading-relaxed flex items-start gap-3">
              <Shield className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
              <span>
                {lang === 'de'
                  ? 'Dein Beitrag ist anonym. Bitte keine Namen oder persönlichen Daten teilen.'
                  : 'Your contribution is anonymous. Please do not share names or personal data.'}
              </span>
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <motion.button
              type="submit"
              disabled={isSubmitting || message.trim().length < minLength}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full bg-gold text-dark-green-primary px-10 py-5 rounded-xl font-bold text-lg sm:text-xl hover:bg-gold/90 transition-all duration-200 shadow-xl hover:shadow-2xl hover:shadow-gold/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>
                    {lang === 'de' ? 'Wird übermittelt...' : 'Submitting...'}
                  </span>
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  <span>
                    {lang === 'de'
                      ? 'Kommentar anonym senden'
                      : 'Send Comment Anonymously'}
                  </span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
