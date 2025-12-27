'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useLanguage } from '@/components/LanguageProvider';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function ArticlesPage() {
  const { t, lang } = useLanguage();

  const mockArticles = [
    {
      category: lang === 'de' ? 'Rechte' : 'Rights',
      title: lang === 'de' 
        ? 'Deine Rechte als Pflege-Auszubildender verstehen'
        : 'Understanding your rights as a nursing trainee',
      excerpt: lang === 'de'
        ? 'Erfahre mehr über die rechtlichen Schutzmöglichkeiten und Rechte, die du während deiner Pflegeausbildung hast.'
        : 'Learn about the legal protections and rights you have during your nursing training program.',
    },
    {
      category: lang === 'de' ? 'Wohlbefinden' : 'Wellness',
      title: lang === 'de'
        ? 'Burnout früh erkennen'
        : 'Recognizing burnout early',
      excerpt: lang === 'de'
        ? 'Frühe Warnsignale von Burnout und wie man sie angeht, bevor sie deine Ausbildung beeinträchtigen.'
        : 'Early warning signs of burnout and how to address them before they impact your training.',
    },
    {
      category: lang === 'de' ? 'Orientierung' : 'Guidance',
      title: lang === 'de'
        ? 'Sicher über Probleme sprechen'
        : 'How to speak up safely during training',
      excerpt: lang === 'de'
        ? 'Praktische Anleitung, wie man Bedenken zu Arbeitsbedingungen und Behandlung respektvoll äußert.'
        : 'Practical guidance on raising concerns about working conditions and treatment respectfully.',
    },
    {
      category: lang === 'de' ? 'Umgang' : 'Management',
      title: lang === 'de'
        ? 'Umgang mit Fehlern'
        : 'Dealing with mistakes',
      excerpt: lang === 'de'
        ? 'Wie man konstruktiv mit Fehlern umgeht und daraus lernt, ohne sich selbst zu kritisieren.'
        : 'How to constructively deal with mistakes and learn from them without self-criticism.',
    },
    {
      category: lang === 'de' ? 'Selbstwert' : 'Self-worth',
      title: lang === 'de'
        ? 'Selbstwert und Rolle als Azubi'
        : 'Self-worth and role as a trainee',
      excerpt: lang === 'de'
        ? 'Die Bedeutung deiner Rolle verstehen und deinen eigenen Wert während der Ausbildung erkennen.'
        : 'Understanding the importance of your role and recognizing your own worth during training.',
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero title={t('articles.title')} subtitle={t('articles.intro')} />

      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Topics List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong p-8 rounded-2xl border border-gold/10 mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-gold" />
              <h3 className="text-2xl font-bold text-gold">
                {t('articles.intro')}
              </h3>
            </div>
            <ul className="space-y-3">
              {(t('articles.topics') as string[]).map((topic, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gold mt-1">•</span>
                  <span className="text-soft-gray/90">{topic}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Article Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-strong p-6 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
              >
                <div className="mb-4">
                  <span className="inline-block bg-gold/20 text-gold px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-off-white mb-3 group-hover:text-gold transition-colors">
                  {article.title}
                </h3>
                <p className="text-soft-gray/80 text-sm mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-gold font-semibold text-sm">
                  {lang === 'de' ? 'Mehr lesen' : 'Read more'}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

