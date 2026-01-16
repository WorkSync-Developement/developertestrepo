'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';

// Lehmann Agency Color Palette
const colors = {
  primary: '#506A7E',
  dark: '#3D5466',
  accent: '#C9A962',
  light: '#F5F7F9',
  white: '#FFFFFF',
};

interface StickyHeaderCTAProps {
  phone?: string | null;
}

const StickyHeaderCTA: React.FC<StickyHeaderCTAProps> = ({ phone }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approximately 100vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!phone) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[100] shadow-lg flex items-center"
          style={{ backgroundColor: colors.accent, minHeight: '72px' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
            <p className="text-sm font-medium hidden sm:block" style={{ color: colors.dark }}>
              Ready to get protected? Get your free quote today!
            </p>
            <div className="flex items-center gap-4 mx-auto sm:mx-0">
              <a
                href={`tel:${normalizePhoneNumber(phone)}`}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: colors.dark, color: colors.white }}
              >
                <Phone size={16} />
                {formatPhoneNumber(phone)}
              </a>
              <a
                href="/contact"
                className="px-4 py-1.5 rounded-lg font-bold text-sm border-2 transition-all duration-300 hover:bg-white/20"
                style={{ borderColor: colors.dark, color: colors.dark }}
              >
                Get Quote
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyHeaderCTA;
