'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceCard from './VoiceCard';
import VoiceSkeleton from './VoiceSkeleton';
import VoicesToolbar from './VoicesToolbar';
import { AlertCircle, RefreshCw, MessageSquarePlus } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface Voice {
  id: string;
  message: string;
  createdAt: string;
  topicTags: string | null;
}

interface VoicesListingClientProps {
  initialData: {
    voices: Voice[];
    pagination: {
      page: number;
      size: number;
      total: number;
      totalPages: number;
      hasMore: boolean;
    };
  };
}

export default function VoicesListingClient({ initialData }: VoicesListingClientProps) {
  const { lang } = useLanguage();
  const [allVoices, setAllVoices] = useState<Voice[]>(initialData.voices);
  const [pagination, setPagination] = useState(initialData.pagination);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [useInfiniteScroll] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Frontend filtering and sorting
  const filteredAndSortedVoices = useMemo(() => {
    let result = [...allVoices];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((voice) =>
        voice.message.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [allVoices, searchQuery, sortOrder]);

  const loadMore = useCallback(async () => {
    if (isLoading || !pagination.hasMore) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `/api/comments?page=${pagination.page + 1}&size=${pagination.size}`
      );

      let data: any;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('[VoicesListing] JSON parse error:', jsonError);
        setError(lang === 'de' ? 'Fehler beim Laden.' : 'Error loading.');
        setPagination((prev) => ({ ...prev, hasMore: false }));
        return;
      }

      if (!data.ok) {
        const errorMsg = data.error?.message || data.error || (lang === 'de' ? 'Fehler beim Laden.' : 'Error loading.');
        setError(errorMsg);
        setPagination((prev) => ({ ...prev, hasMore: false }));
        return;
      }

      const items = data.data?.items || data.items || [];
      const safeItems: Voice[] = Array.isArray(items)
        ? items.map((v: any) => ({
            id: String(v.id || ''),
            message: String(v.message || v.content || ''),
            createdAt: String(v.createdAt || new Date().toISOString()),
            topicTags: v.topicTags ? String(v.topicTags) : null,
          }))
        : [];

      if (response.ok && safeItems.length > 0) {
        setAllVoices((prev) => [...prev, ...safeItems]);
        const paginationData = data.data || data;
        setPagination({
          page: Number(paginationData.page) || pagination.page + 1,
          size: Number(paginationData.size) || pagination.size,
          total: Number(paginationData.total) || 0,
          totalPages: Number(paginationData.totalPages) || 0,
          hasMore: Boolean(paginationData.hasMore) !== false && safeItems.length >= pagination.size,
        });
      } else {
        setPagination((prev) => ({ ...prev, hasMore: false }));
      }
    } catch (err) {
      console.error('Error loading more voices:', err);
      setError(lang === 'de' ? 'Fehler beim Laden. Bitte später erneut versuchen.' : 'Error loading. Please try again later.');
      setPagination((prev) => ({ ...prev, hasMore: false }));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, pagination, lang]);

  // Infinite scroll observer
  useEffect(() => {
    if (!useInfiniteScroll || !observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pagination.hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [useInfiniteScroll, pagination.hasMore, isLoading, loadMore]);

  const refreshVoices = async () => {
    setIsInitialLoading(true);
    setError('');
    try {
      const response = await fetch('/api/comments?page=1&size=12');
      let data: any;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('[VoicesListing] JSON parse error on refresh:', jsonError);
        setError(lang === 'de' ? 'Fehler beim Aktualisieren.' : 'Error refreshing.');
        return;
      }

      if (!data.ok) {
        const errorMsg = data.error?.message || data.error || (lang === 'de' ? 'Fehler beim Aktualisieren.' : 'Error refreshing.');
        setError(errorMsg);
        return;
      }

      const items = data.data?.items || data.items || [];
      const safeItems: Voice[] = Array.isArray(items)
        ? items.map((v: any) => ({
            id: String(v.id || ''),
            message: String(v.message || v.content || ''),
            createdAt: String(v.createdAt || new Date().toISOString()),
            topicTags: v.topicTags ? String(v.topicTags) : null,
          }))
        : [];

      if (response.ok) {
        setAllVoices(safeItems);
        const paginationData = data.data || data;
        setPagination({
          page: Number(paginationData.page) || 1,
          size: Number(paginationData.size) || 12,
          total: Number(paginationData.total) || 0,
          totalPages: Number(paginationData.totalPages) || 0,
          hasMore: Boolean(paginationData.hasMore) !== false && safeItems.length >= (paginationData.size || 12),
        });
        setError('');
      }
    } catch (err) {
      console.error('Error refreshing voices:', err);
      setError(lang === 'de' ? 'Fehler beim Aktualisieren.' : 'Error refreshing.');
    } finally {
      setIsInitialLoading(false);
    }
  };

  // Empty state
  if (!isInitialLoading && filteredAndSortedVoices.length === 0 && !error && !searchQuery) {
    return (
      <div className="space-y-6">
        <VoicesToolbar
          onSearchChange={setSearchQuery}
          onSortChange={setSortOrder}
          totalVoices={0}
          currentSort={sortOrder}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong p-12 rounded-2xl border border-gold/10 text-center"
        >
          <MessageSquarePlus className="w-16 h-16 text-gold/60 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gold mb-3">
            {lang === 'de' ? 'Noch keine Stimmen' : 'No voices yet'}
          </h3>
          <p className="text-soft-gray/80 text-base mb-6">
            {lang === 'de'
              ? 'Sei die erste Person, die sicher ihre Erfahrungen teilt.'
              : 'Be the first person to safely share your experiences.'}
          </p>
          <motion.button
            onClick={() => window.location.href = '/voices'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gold text-dark-green-primary px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-all duration-200 shadow-lg"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{lang === 'de' ? 'Anonym teilen' : 'Share Anonymously'}</span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Error state (non-blocking)
  const showError = error && !isInitialLoading;

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <VoicesToolbar
        onSearchChange={setSearchQuery}
        onSortChange={setSortOrder}
        totalVoices={filteredAndSortedVoices.length}
        currentSort={sortOrder}
      />

      {/* Error alert */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong p-4 rounded-xl border border-gold/30 bg-gold/5 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-gold flex-shrink-0" />
            <p className="text-soft-gray/90 text-sm flex-1">{error}</p>
            <button
              onClick={refreshVoices}
              disabled={isInitialLoading}
              className="text-gold hover:text-gold/80 transition-colors disabled:opacity-50"
              title={lang === 'de' ? 'Aktualisieren' : 'Refresh'}
            >
              <RefreshCw className={`w-4 h-4 ${isInitialLoading ? 'animate-spin' : ''}`} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading skeletons for initial load */}
      {isInitialLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <VoiceSkeleton key={i} index={i} />
          ))}
        </div>
      ) : (
        <>
          {/* No results for search */}
          {searchQuery && filteredAndSortedVoices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-strong p-12 rounded-2xl border border-gold/10 text-center"
            >
              <p className="text-soft-gray/80 text-base">
                {lang === 'de'
                  ? 'Keine Stimmen gefunden, die deiner Suche entsprechen.'
                  : 'No voices found matching your search.'}
              </p>
            </motion.div>
          ) : (
            <>
              {/* Voices grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedVoices.map((voice, index) => (
                    <VoiceCard
                      key={voice.id}
                      message={voice.message}
                      createdAt={voice.createdAt}
                      topicTags={voice.topicTags}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Loading more skeletons */}
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <VoiceSkeleton key={`loading-${i}`} index={i} />
                  ))}
                </div>
              )}

              {/* Infinite scroll trigger */}
              {useInfiniteScroll && pagination.hasMore && !isLoading && !searchQuery && (
                <div ref={observerTarget} className="h-20 flex items-center justify-center">
                  <div className="text-soft-gray/60 text-xs">
                    {lang === 'de' ? 'Scrollen zum Laden...' : 'Scroll to load more...'}
                  </div>
                </div>
              )}

              {/* All loaded message */}
              {!pagination.hasMore && filteredAndSortedVoices.length > 0 && !searchQuery && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-soft-gray/60 text-sm py-4"
                >
                  {lang === 'de'
                    ? `Alle ${pagination.total} Stimmen geladen.`
                    : `All ${pagination.total} voices loaded.`}
                </motion.div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
