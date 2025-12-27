'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar } from 'lucide-react';

interface VoiceCardProps {
  message: string;
  createdAt: string;
  topicTags?: string | null;
  index: number;
}

export default function VoiceCard({ message, createdAt, topicTags, index }: VoiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = message.length > 200;
  const displayMessage = isExpanded || !shouldTruncate ? message : `${message.substring(0, 200)}...`;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const tags = topicTags ? topicTags.split(',').filter(tag => tag.trim()) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -1 : 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="glass-strong p-6 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-300"
      style={{
        transform: `rotate(${index % 2 === 0 ? '-0.5deg' : '0.5deg'})`,
      }}
    >
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="bg-gold/20 text-gold px-2 py-1 rounded-full text-xs font-semibold"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}
      
      <p className="text-soft-gray/90 text-sm sm:text-base leading-relaxed mb-4">
        {displayMessage}
      </p>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gold hover:text-gold/80 text-sm font-semibold transition-colors"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-dark-green-3/50">
        <Calendar className="w-3.5 h-3.5 text-gold/60" />
        <span className="text-soft-gray/60 text-xs">{formatDate(createdAt)}</span>
      </div>
    </motion.div>
  );
}

