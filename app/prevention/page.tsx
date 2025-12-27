'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useLanguage } from '@/components/LanguageProvider';
import { Shield, Target, Users } from 'lucide-react';

export default function PreventionPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero title={t('prevention.title')} subtitle={t('prevention.intro')} />

      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Important Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong p-8 rounded-2xl border border-gold/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-gold" />
              <h3 className="text-2xl font-bold text-gold">
                {t('prevention.important.title')}
              </h3>
            </div>
            <ul className="space-y-3 mb-4">
              {(t('prevention.important.points') as string[]).map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gold mt-1">•</span>
                  <span className="text-soft-gray/90">{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-soft-gray/80 text-sm italic">
              {t('prevention.important.note')}
            </p>
          </motion.div>

          {/* Goal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-strong p-8 rounded-2xl border border-gold/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-gold" />
              <h3 className="text-2xl font-bold text-gold">
                {t('prevention.goal').split('–')[0]}
              </h3>
            </div>
            <p className="text-soft-gray/90 text-lg leading-relaxed">
              {t('prevention.goal')}
            </p>
          </motion.div>

          {/* Invitation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-strong p-8 rounded-2xl border border-gold/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-gold" />
              <h3 className="text-2xl font-bold text-gold">
                {t('prevention.invitation').split(':')[0]}
              </h3>
            </div>
            <p className="text-soft-gray/90 text-lg leading-relaxed">
              {t('prevention.invitation')}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

