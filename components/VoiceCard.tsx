'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Calendar, User, Heart, Shield, MessageCircle } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface VoiceCardProps {
  message: string;
  createdAt: string;
  topicTags?: string | null;
  index: number;
}

export default function VoiceCard({ message, createdAt, topicTags, index }: VoiceCardProps) {
  const { lang } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Use line-clamp for truncation (4 lines)
  const shouldTruncate = message.length > 150; // Approximate 4 lines

  // Format date with i18n support
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMinutes < 1) {
      return lang === 'de' ? 'Gerade eben' : 'Just now';
    }
    if (diffMinutes < 60) {
      return lang === 'de' 
        ? `vor ${diffMinutes} ${diffMinutes === 1 ? 'Minute' : 'Minuten'}`
        : `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    if (diffHours < 24) {
      return lang === 'de'
        ? `vor ${diffHours} ${diffHours === 1 ? 'Stunde' : 'Stunden'}`
        : `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    }
    if (diffDays === 0) {
      return lang === 'de' ? 'Heute' : 'Today';
    }
    if (diffDays === 1) {
      return lang === 'de' ? 'Gestern' : '1 day ago';
    }
    if (diffDays < 7) {
      return lang === 'de'
        ? `vor ${diffDays} ${diffDays === 1 ? 'Tag' : 'Tagen'}`
        : `${diffDays} days ago`;
    }
    if (diffWeeks < 4) {
      return lang === 'de'
        ? `vor ${diffWeeks} ${diffWeeks === 1 ? 'Woche' : 'Wochen'}`
        : `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
    }
    if (diffMonths < 12) {
      return lang === 'de'
        ? `vor ${diffMonths} ${diffMonths === 1 ? 'Monat' : 'Monaten'}`
        : `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    }
    
    // Format as date if older than a year
    return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const tags = topicTags ? topicTags.split(',').filter(tag => tag.trim()) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-strong p-6 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold/15 h-full flex flex-col"
    >
      {/* Header: Anonymous badge and Date */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 bg-gold/10 px-3 py-1.5 rounded-full border border-gold/20">
          <User className="w-3.5 h-3.5 text-gold" />
          <span className="text-gold text-xs font-semibold">
            {lang === 'de' ? 'Anonym' : 'Anonymous'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-soft-gray/60">
          <Calendar className="w-3.5 h-3.5 text-gold/60" />
          <span className="text-xs font-medium">{formatDate(createdAt)}</span>
        </div>
      </div>

      {/* Message content with line-clamp */}
      <div className="flex-1 mb-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={isExpanded ? 'expanded' : 'collapsed'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-soft-gray/90 text-base sm:text-lg leading-relaxed ${
              !isExpanded && shouldTruncate ? 'line-clamp-6' : ''
            }`}
          >
            {message}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Read more/less button */}
      {shouldTruncate && (
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-gold hover:text-gold/80 text-sm font-semibold transition-colors mb-4 self-start"
        >
          {isExpanded 
            ? (lang === 'de' ? 'Weniger anzeigen' : 'Read less')
            : (lang === 'de' ? 'Mehr anzeigen' : 'Read more')
          }
        </motion.button>
      )}

      {/* Nursing icons footer */}
      <div className="flex items-center justify-center gap-4 mt-auto pt-4 border-t border-dark-green-3/50">
        <Heart className="w-4 h-4 text-gold/40" />
        <Shield className="w-4 h-4 text-gold/40" />
        <MessageCircle className="w-4 h-4 text-gold/40" />
      </div>
    </motion.div>
  );
}

