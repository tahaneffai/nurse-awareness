'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import VoiceForm from './VoiceForm';
import VoicesList from './VoicesList';

interface Voice {
  id: string;
  message: string;
  createdAt: string;
  topicTags: string | null;
}

interface VoicesPageClientProps {
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

export default function VoicesPageClient({ initialData }: VoicesPageClientProps) {
  const { t } = useLanguage();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    // Don't reload - the message is pending and won't appear until approved
    // Just show success message (handled in VoiceForm)
  };

  return (
    <>
      {/* Safety Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-strong p-6 sm:p-8 rounded-2xl border border-gold/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-gold" />
          <h3 className="text-xl sm:text-2xl font-bold text-gold">
            {t('voices.safety.title')}
          </h3>
        </div>
        <ul className="space-y-3 mb-6">
          {(t('voices.safety.rules') as string[]).map((rule, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-gold mt-1">•</span>
              <span className="text-soft-gray/90 text-sm sm:text-base">{rule}</span>
            </li>
          ))}
        </ul>
        <p className="text-soft-gray/80 text-xs sm:text-sm italic">
          {t('voices.safety.note')}
        </p>
      </motion.div>

      {/* Submission Form */}
      <VoiceForm onSuccess={handleSuccess} />

      {/* Voices List */}
      <div key={refreshKey}>
        <VoicesList
          initialVoices={initialData.voices}
          initialPagination={initialData.pagination}
        />
      </div>
    </>
  );
}

