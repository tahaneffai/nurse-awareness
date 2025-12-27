'use client';

import { motion } from 'framer-motion';
import { Shield, Heart, BookOpen } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import Link from 'next/link';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-green-very-dark via-dark-green-primary to-dark-green-2 z-0">
        {/* Floating Blobs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-dark-green-3/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-muted-green/15 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-50, 50, -50],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              x: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-5 md:space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-off-white leading-[1.1] sm:leading-tight px-2">
            {t('home.hero.title')}
          </h1>
          <div className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl lg:text-2xl text-soft-gray/90 leading-relaxed max-w-3xl mx-auto px-2">
            <p>{t('home.hero.paragraph')}</p>
            <ul className="text-left space-y-2 sm:space-y-2.5 text-sm sm:text-base md:text-lg lg:text-xl pl-4 sm:pl-6">
              {(t('home.hero.list') as string[]).map((item, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <span className="text-gold mt-1.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-center font-semibold text-sm sm:text-base md:text-lg lg:text-xl pt-2">{t('home.hero.closing')}</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
        >
          <Link
            href="/voices"
            className="bg-gold text-dark-green-primary px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:bg-gold/90 hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-gold/30"
          >
            {t('home.hero.cta.primary')}
          </Link>
          <Link
            href="/rights"
            className="glass border-gold/30 text-off-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:border-gold/50 hover:scale-105 transition-all duration-200"
          >
            {t('home.hero.cta.secondary')}
          </Link>
        </motion.div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 md:pt-8 px-4"
        >
          <div className="flex items-center gap-2 text-soft-gray/80 text-xs sm:text-sm">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold flex-shrink-0" />
            <span>{t('home.hero.trust.anonymous')}</span>
          </div>
          <div className="flex items-center gap-2 text-soft-gray/80 text-xs sm:text-sm">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold flex-shrink-0" />
            <span>{t('home.hero.trust.respectful')}</span>
          </div>
          <div className="flex items-center gap-2 text-soft-gray/80 text-xs sm:text-sm">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold flex-shrink-0" />
            <span>{t('home.hero.trust.rights')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
