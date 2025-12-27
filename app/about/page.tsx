'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero title={t('about.title')} />

      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong p-8 md:p-12 rounded-2xl border border-gold/10 space-y-6">
            {(t('about.content') as string[]).map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-soft-gray/90 text-lg leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 glass-strong p-8 rounded-2xl border border-gold/10 text-center"
          >
            <h3 className="text-2xl font-bold text-gold mb-4">
              {t('home.hero.cta.primary')}
            </h3>
            <p className="text-soft-gray/80 mb-6">
              {t('home.voices.encouragement.text')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/voices"
                className="bg-gold text-dark-green-primary px-8 py-4 rounded-2xl font-semibold hover:bg-gold/90 hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center justify-center gap-2"
              >
                {t('home.voices.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/rights"
                className="glass border-gold/30 text-off-white px-8 py-4 rounded-2xl font-semibold hover:border-gold/50 hover:scale-105 transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                {t('home.hero.cta.secondary')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

