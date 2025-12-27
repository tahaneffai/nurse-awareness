'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';
import { ArrowRight, Scale } from 'lucide-react';

export default function RightsPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero title={t('rights.title')} subtitle={t('rights.intro')} />

      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong p-8 rounded-2xl border border-gold/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-gold" />
              <h3 className="text-2xl font-bold text-gold">
                {t('rights.intro')}
              </h3>
            </div>
            <div className="space-y-4">
              {(t('rights.topics') as string[]).map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-dark-green-2/50 transition-colors"
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-soft-gray/90 text-lg">{topic}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Closing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass p-6 rounded-xl border border-gold/20 text-center"
          >
            <p className="text-soft-gray/90 text-lg font-semibold">
              {t('rights.closing')}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-strong p-8 rounded-2xl border border-gold/10 text-center"
          >
            <h3 className="text-2xl font-bold text-gold mb-4">
              {t('home.rights.contactTitle')}
            </h3>
            <p className="text-soft-gray/80 mb-6">
              {t('home.rights.contactNote')}
            </p>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 bg-gold text-dark-green-primary px-8 py-4 rounded-2xl font-semibold hover:bg-gold/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-gold/30"
            >
              {t('help.title')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

