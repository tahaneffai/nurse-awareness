'use client';

import { motion } from 'framer-motion';
import { Stethoscope, HeartPulse, Clipboard, Shield, MessageCircle } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function NursingHero() {
  const { lang } = useLanguage();

  const icons = [
    { Icon: Stethoscope, delay: 0 },
    { Icon: HeartPulse, delay: 0.1 },
    { Icon: Clipboard, delay: 0.2 },
    { Icon: Shield, delay: 0.3 },
    { Icon: MessageCircle, delay: 0.4 },
  ];

  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Medical grid background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(199, 171, 80, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(199, 171, 80, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Plus/cross pattern overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(199, 171, 80, 0.05) 39px, rgba(199, 171, 80, 0.05) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(199, 171, 80, 0.05) 39px, rgba(199, 171, 80, 0.05) 40px)
            `,
          }}
        />
      </div>

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-green-very-dark via-dark-green-primary to-dark-green-2">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-dark-green-3/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 sm:space-y-8"
        >
          {/* Healthcare Icons */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            {icons.map(({ Icon, delay }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  delay: delay,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="p-3 sm:p-4 rounded-full bg-gold/10 border border-gold/20 backdrop-blur-sm"
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
              </motion.div>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-off-white leading-[1.1] sm:leading-tight px-2">
            {lang === 'de' ? 'Anonym teilen' : 'Share Anonymously'}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-soft-gray/90 leading-relaxed px-2 max-w-3xl mx-auto">
            {lang === 'de'
              ? 'Jede geteilte Erfahrung hilft anderen Pflege-Auszubildenden und macht strukturelle Probleme sichtbar.'
              : 'Every shared experience helps other nursing trainees and makes structural problems visible.'}
          </p>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
