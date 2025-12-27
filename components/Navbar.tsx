'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.rights'), href: '/rights' },
    { name: t('nav.voices'), href: '/voices' },
    { name: t('nav.articles'), href: '/articles' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-gold/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-sm group-hover:bg-gold/30 transition-colors"></div>
              <div className="relative w-8 h-8 border-2 border-gold rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-gold rounded-full"></div>
              </div>
            </div>
            <span className="text-xl md:text-2xl font-bold text-off-white group-hover:text-gold transition-colors">
              {t('brand.name')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-soft-gray hover:text-gold transition-colors text-sm font-medium group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-dark-green-2/50 px-2 py-1 rounded-lg border border-gold/20">
              <button
                onClick={() => setLang('de')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  lang === 'de'
                    ? 'bg-gold text-dark-green-primary'
                    : 'text-soft-gray hover:text-gold'
                }`}
              >
                DE
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  lang === 'en'
                    ? 'bg-gold text-dark-green-primary'
                    : 'text-soft-gray hover:text-gold'
                }`}
              >
                EN
              </button>
            </div>

            <Link
              href="/voices"
              className="bg-gold text-dark-green-primary px-6 py-2.5 rounded-lg font-semibold hover:bg-gold/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-gold/20"
            >
              {t('nav.shareAnonymously')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-soft-gray hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-soft-gray hover:text-gold hover:bg-dark-green-2/50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Language Switcher */}
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="text-soft-gray/80 text-sm mr-2">Language:</span>
                  <button
                    onClick={() => setLang('de')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                      lang === 'de'
                        ? 'bg-gold text-dark-green-primary'
                        : 'text-soft-gray hover:text-gold'
                    }`}
                  >
                    DE
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                      lang === 'en'
                        ? 'bg-gold text-dark-green-primary'
                        : 'text-soft-gray hover:text-gold'
                    }`}
                  >
                    EN
                  </button>
                </div>

                <Link
                  href="/voices"
                  className="block bg-gold text-dark-green-primary px-4 py-2 rounded-lg font-semibold text-center mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.shareAnonymously')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
