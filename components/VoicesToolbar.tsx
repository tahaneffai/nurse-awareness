'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, MessageSquarePlus, Filter } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { useRouter } from 'next/navigation';

interface VoicesToolbarProps {
  onSearchChange: (query: string) => void;
  onSortChange: (sort: 'newest' | 'oldest') => void;
  totalVoices: number;
  currentSort: 'newest' | 'oldest';
}

export default function VoicesToolbar({
  onSearchChange,
  onSortChange,
  totalVoices,
  currentSort,
}: VoicesToolbarProps) {
  const { lang } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-strong p-4 sm:p-6 rounded-2xl border border-gold/10 mb-8"
    >
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Left: Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-initial sm:min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={lang === 'de' ? 'Suche in Stimmen...' : 'Search voices...'}
              className="w-full bg-dark-green-3/50 border border-dark-green-mid rounded-lg pl-10 pr-4 py-2.5 text-off-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200 text-sm"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold/60 pointer-events-none" />
            <select
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest')}
              className="appearance-none bg-dark-green-3/50 border border-dark-green-mid rounded-lg pl-10 pr-8 py-2.5 text-off-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200 text-sm cursor-pointer"
            >
              <option value="newest">
                {lang === 'de' ? 'Neueste zuerst' : 'Newest first'}
              </option>
              <option value="oldest">
                {lang === 'de' ? 'Älteste zuerst' : 'Oldest first'}
              </option>
            </select>
          </div>
        </div>

        {/* Right: Stats and CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
          {/* Stats */}
          {totalVoices > 0 && (
            <div className="text-soft-gray/70 text-sm">
              {lang === 'de' ? (
                <>
                  Zeige <span className="text-gold font-semibold">{totalVoices}</span> Stimmen
                </>
              ) : (
                <>
                  Showing <span className="text-gold font-semibold">{totalVoices}</span> voices
                </>
              )}
            </div>
          )}

          {/* CTA Button */}
          <motion.button
            onClick={() => router.push('/voices')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold text-dark-green-primary px-6 py-2.5 rounded-lg font-semibold hover:bg-gold/90 transition-all duration-200 shadow-lg hover:shadow-gold/20 flex items-center gap-2 whitespace-nowrap"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{lang === 'de' ? 'Anonym teilen' : 'Share Anonymously'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
