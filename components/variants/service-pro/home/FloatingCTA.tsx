'use client';

import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { normalizePhoneNumber } from '@/lib/utils';

interface FloatingCTAProps {
  phone?: string;
  text?: string;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ phone, text = 'Call Now' }) => {
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

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!phone || !isVisible) {
    return null;
  }

  const normalizedPhone = normalizePhoneNumber(phone);

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <div className="relative">
        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
          aria-label="Dismiss call button"
        >
          <X size={14} />
        </button>

        {/* Call Button */}
        <a
          href={`tel:${normalizedPhone}`}
          className="flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-accent-foreground)',
          }}
          aria-label={`Call ${phone}`}
        >
          <Phone size={22} className="animate-pulse" />
          <span className="font-bold text-base">{text}</span>
        </a>

        {/* Pulse Animation Ring */}
        <div
          className="absolute inset-0 rounded-full animate-ping opacity-30 pointer-events-none"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      </div>
    </div>
  );
};

export default FloatingCTA;
