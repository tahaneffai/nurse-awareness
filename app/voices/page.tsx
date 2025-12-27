'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';

export default function VoicesPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero title={t('voices.title')} subtitle={t('voices.intro')} />

      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Safety Rules */}
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
                {t('voices.safety.title')}
              </h3>
            </div>
            <ul className="space-y-3 mb-6">
              {(t('voices.safety.rules') as string[]).map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gold mt-1">•</span>
                  <span className="text-soft-gray/90">{rule}</span>
                </li>
              ))}
            </ul>
            <p className="text-soft-gray/80 text-sm italic">
              {t('voices.safety.note')}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-strong p-8 rounded-2xl border border-gold/10 text-center"
          >
            <h3 className="text-2xl font-bold text-off-white mb-4">
              {t('home.voices.encouragement.title')}
            </h3>
            <p className="text-soft-gray/80 mb-6">
              {t('home.voices.encouragement.text')}
            </p>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 bg-gold text-dark-green-primary px-8 py-4 rounded-2xl font-semibold hover:bg-gold/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-gold/30"
            >
              {t('voices.cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

