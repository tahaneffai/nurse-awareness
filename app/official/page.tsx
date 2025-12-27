'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useLanguage } from '@/components/LanguageProvider';
import { FileText, Shield, Target, Lock } from 'lucide-react';

export default function OfficialPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero title={t('official.title')} subtitle={t('official.intro')} />

      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong p-8 rounded-2xl border border-gold/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-gold" />
              <h3 className="text-2xl font-bold text-gold">
                {t('official.goals.title')}
              </h3>
            </div>
            
            {/* Support Goal */}
            <div className="mb-6">
              <h4 className="text-xl font-bold text-off-white mb-3">
                {t('official.goals.support.title')}
              </h4>
              <ul className="space-y-2 ml-4">
                {(t('official.goals.support.points') as string[]).map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-gold mt-1">•</span>
                    <span className="text-soft-gray/90">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention Goal */}
            <div>
              <h4 className="text-xl font-bold text-off-white mb-3">
                {t('official.goals.prevention.title')}
              </h4>
              <ul className="space-y-2 ml-4">
                {(t('official.goals.prevention.points') as string[]).map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-gold mt-1">•</span>
                    <span className="text-soft-gray/90">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-strong p-8 rounded-2xl border border-gold/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-gold" />
              <h3 className="text-2xl font-bold text-gold">
                {t('official.privacy.title')}
              </h3>
            </div>
            <ul className="space-y-3">
              {(t('official.privacy.points') as string[]).map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gold mt-1">•</span>
                  <span className="text-soft-gray/90">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-strong p-8 rounded-2xl border border-gold/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-gold" />
              <h3 className="text-2xl font-bold text-gold">
                {t('official.stance').split('–')[0]}
              </h3>
            </div>
            <p className="text-soft-gray/90 text-lg leading-relaxed">
              {t('official.stance')}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

