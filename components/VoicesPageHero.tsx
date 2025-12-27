'use client';

import { useLanguage } from './LanguageProvider';
import PageHero from './PageHero';

export default function VoicesPageHero() {
  const { t } = useLanguage();
  return <PageHero title={t('voices.title')} subtitle={t('voices.intro')} />;
}

