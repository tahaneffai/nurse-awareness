'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import Link from 'next/link';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark-green-very-dark border-t border-gold/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Mission */}
          <div>
            <h3 className="text-gold font-bold text-xl mb-4">{t('brand.name')}</h3>
            <p className="text-soft-gray/80 text-sm font-semibold mb-2">
              {t('footer.mission')}
            </p>
            <p className="text-soft-gray/70 text-sm">
              {t('brand.tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-off-white font-semibold mb-4">{t('nav.home')}</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: t('nav.home'), href: '/' },
                { name: t('nav.about'), href: '/about' },
                { name: t('nav.rights'), href: '/rights' },
                { name: t('nav.voices'), href: '/voices' },
                { name: t('nav.articles'), href: '/articles' },
                { name: t('nav.help'), href: '/help' },
                { name: t('nav.prevention'), href: '/prevention' },
                { name: t('nav.official'), href: '/official' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-soft-gray/80 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-off-white font-semibold mb-4">
              {t('home.rights.disclaimer').split('.')[0]}
            </h4>
            <p className="text-soft-gray/70 text-xs leading-relaxed">
              {t('footer.disclaimer')}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-green-3/50 text-center text-soft-gray/60 text-sm">
          <p>&copy; {new Date().getFullYear()} {t('brand.name')}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
