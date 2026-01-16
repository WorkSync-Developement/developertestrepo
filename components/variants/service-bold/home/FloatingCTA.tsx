'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { normalizePhoneNumber, formatPhoneNumber } from '@/lib/utils';

// Lehmann Agency Color Palette
const colors = {
  primary: '#506A7E',
  dark: '#3D5466',
  accent: '#C9A962',
  light: '#F5F7F9',
  white: '#FFFFFF',
};

interface FloatingCTAProps {
  phone?: string | null;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ phone }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 300) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!phone) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 left-4 right-4 z-50 md:hidden"
        >
          <div 
            className="flex items-center justify-between gap-3 p-4 rounded-2xl shadow-2xl"
            style={{ backgroundColor: colors.dark }}
          >
            {/* Call Button */}
            <a
              href={`tel:${normalizePhoneNumber(phone)}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all duration-200 active:scale-95"
              style={{ backgroundColor: colors.accent, color: colors.dark }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Phone size={20} />
              </motion.div>
              <span>Call {formatPhoneNumber(phone)}</span>
            </a>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Dismiss"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
