'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface AdminShellProps {
  children: ReactNode;
  title: string;
}

export default function AdminShell({ children, title }: AdminShellProps) {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gold mb-2">{title}</h1>
            <p className="text-soft-gray/80">Manage anonymous voices and admin settings</p>
          </motion.div>
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}

