'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useLanguage } from '@/components/LanguageProvider';
import { CheckCircle2 } from 'lucide-react';

export default function HelpPage() {
  const { t } = useLanguage();
  const [step1Selections, setStep1Selections] = useState<string[]>([]);
  const [step2Selection, setStep2Selection] = useState<string>('');
  const [email, setEmail] = useState('');
  const [stayAnonymous, setStayAnonymous] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleStep1Toggle = (option: string) => {
    setStep1Selections((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step1Selections.length === 0 || !step2Selection) {
      alert(t('help.note'));
      return;
    }
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setStep1Selections([]);
      setStep2Selection('');
      setEmail('');
      setStayAnonymous(true);
    }, 5000);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero title={t('help.title')} subtitle={t('help.intro')} />

      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-strong p-8 rounded-2xl border border-gold/30 text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gold mb-4">
                {t('help.success')}
              </h3>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-strong p-8 rounded-2xl border border-gold/10"
              >
                <h3 className="text-2xl font-bold text-gold mb-6">
                  {t('help.step1.title')}
                </h3>
                <div className="space-y-3">
                  {(t('help.step1.options') as string[]).map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg hover:bg-dark-green-2/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={step1Selections.includes(option)}
                        onChange={() => handleStep1Toggle(option)}
                        className="w-5 h-5 text-gold border-dark-green-mid rounded focus:ring-gold focus:ring-2"
                      />
                      <span className="text-soft-gray/90">{option}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-strong p-8 rounded-2xl border border-gold/10"
              >
                <h3 className="text-2xl font-bold text-gold mb-6">
                  {t('help.step2.title')}
                </h3>
                <div className="space-y-3">
                  {(t('help.step2.options') as string[]).map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg hover:bg-dark-green-2/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="step2"
                        value={option}
                        checked={step2Selection === option}
                        onChange={(e) => setStep2Selection(e.target.value)}
                        className="w-5 h-5 text-gold border-dark-green-mid focus:ring-gold focus:ring-2"
                      />
                      <span className="text-soft-gray/90">{option}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-strong p-8 rounded-2xl border border-gold/10"
              >
                <h3 className="text-2xl font-bold text-gold mb-6">
                  {t('help.step3.title')}
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 rounded-lg hover:bg-dark-green-2/50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="contact"
                      checked={stayAnonymous}
                      onChange={() => {
                        setStayAnonymous(true);
                        setEmail('');
                      }}
                      className="w-5 h-5 text-gold border-dark-green-mid focus:ring-gold focus:ring-2"
                    />
                    <span className="text-soft-gray/90">{t('help.step3.anonymous')}</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-lg hover:bg-dark-green-2/50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="contact"
                      checked={!stayAnonymous}
                      onChange={() => setStayAnonymous(false)}
                      className="w-5 h-5 text-gold border-dark-green-mid focus:ring-gold focus:ring-2"
                    />
                    <span className="text-soft-gray/90">{t('help.step3.email')}</span>
                  </label>
                  {!stayAnonymous && (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('help.step3.placeholder')}
                      className="w-full bg-dark-green-3/50 border border-dark-green-mid rounded-lg px-4 py-3 text-off-white focus:outline-none focus:border-gold transition-colors mt-2"
                    />
                  )}
                </div>
              </motion.div>

              {/* Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass p-4 rounded-xl border border-gold/20"
              >
                <p className="text-soft-gray/80 text-sm text-center">
                  {t('help.note')}
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <button
                  type="submit"
                  className="bg-gold text-dark-green-primary px-12 py-4 rounded-2xl font-semibold hover:bg-gold/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-gold/30"
                >
                  {t('help.submit')}
                </button>
              </motion.div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

