'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { normalizePhoneNumber, formatPhoneNumber } from '@/lib/utils';
import type { NavbarSettings, CtaSettings } from '@/lib/types/theme';

// Lehmann Agency Color Palette
const colors = {
  primary: '#506A7E',
  dark: '#3D5466',
  accent: '#C9A962',
  light: '#F5F7F9',
  white: '#FFFFFF',
};

interface LocationItem {
  id: string;
  location_slug: string;
  city: string;
  state: string;
}

interface HeaderProps {
  websiteName?: string;
  phone?: string;
  locationPrefix?: string;
  logoUrl?: string | null;
  showSiteName?: boolean;
  features?: {
    show_blog?: boolean;
    show_glossary?: boolean;
    show_faq_page?: boolean;
    show_careers_page?: boolean;
    multi_location?: boolean;
  };
  navbarSettings?: NavbarSettings;
  ctaSettings?: CtaSettings;
  locations?: LocationItem[];
}

const Header: React.FC<HeaderProps> = ({
  websiteName,
  phone,
  locationPrefix,
  logoUrl,
  showSiteName = true,
  features,
  navbarSettings,
  ctaSettings,
  locations,
}) => {
  const showFaq = features?.show_faq_page ?? true;
  const isMultiLocation = features?.multi_location ?? false;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInsuranceDropdownOpen, setIsInsuranceDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const phoneNumber = navbarSettings?.phone || phone;
  const normalizedPhone = normalizePhoneNumber(phoneNumber);

  const mainNavLinks = [
    { label: 'Home', href: locationPrefix || '/' },
    { label: 'About', href: locationPrefix ? `${locationPrefix}/about` : '/about' },
    ...(showFaq ? [{ label: 'FAQ', href: locationPrefix ? `${locationPrefix}/faq` : '/faq' }] : []),
    { label: 'Contact', href: locationPrefix ? `${locationPrefix}/contact` : '/contact' },
  ];

  const insuranceTypes = [
    { label: 'Auto Insurance', href: `${locationPrefix || ''}/policies` },
    { label: 'Home Insurance', href: `${locationPrefix || ''}/policies` },
    { label: 'Business Insurance', href: `${locationPrefix || ''}/policies` },
    { label: 'Life Insurance', href: `${locationPrefix || ''}/policies` },
    { label: 'View All →', href: `${locationPrefix || ''}/policies` },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-3 shadow-lg' 
            : 'py-4'
        }`}
        style={{ 
          backgroundColor: colors.primary,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={locationPrefix || '/'} className="flex items-center gap-3 group">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={websiteName || 'Logo'}
                  width={160}
                  height={50}
                  className="h-10 lg:h-12 w-auto object-contain"
                  priority
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <span className="text-white font-bold text-xl">
                      {websiteName?.charAt(0) || 'L'}
                    </span>
                  </div>
                  {showSiteName && websiteName && (
                    <div className="hidden sm:block">
                      <span className="font-bold text-lg block text-white">
                        {websiteName}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-3/4 transition-all duration-300"
                    style={{ backgroundColor: colors.accent }}
                  />
                </Link>
              ))}

              {/* Insurance Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsInsuranceDropdownOpen(true)}
                onMouseLeave={() => setIsInsuranceDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-200">
                  Insurance
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${isInsuranceDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {isInsuranceDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-xl shadow-2xl border border-white/10 py-2 overflow-hidden"
                      style={{ backgroundColor: colors.dark }}
                    >
                      {insuranceTypes.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
                          style={{ color: item.label === 'View All →' ? colors.accent : undefined }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right side - CTA */}
            <div className="flex items-center gap-3">
              {/* Phone CTA */}
              {phoneNumber && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${normalizedPhone}`}
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-200"
                  style={{ backgroundColor: colors.accent, color: colors.dark }}
                >
                  <Phone size={16} />
                  {formatPhoneNumber(phoneNumber)}
                </motion.a>
              )}

              {/* Mobile phone icon */}
              {phoneNumber && (
                <a
                  href={`tel:${normalizedPhone}`}
                  className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Phone size={18} style={{ color: colors.dark }} />
                </a>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
              style={{ backgroundColor: colors.dark }}
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Insurance section */}
                <div className="pt-2 border-t border-white/10">
                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                    Insurance
                  </p>
                  {insuranceTypes.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 font-medium rounded-lg hover:bg-white/10 transition-colors duration-200"
                      style={{ color: item.label === 'View All →' ? colors.accent : colors.white }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Mobile CTA */}
                {phoneNumber && (
                  <div className="pt-4">
                    <a
                      href={`tel:${normalizedPhone}`}
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 font-bold rounded-xl transition-all duration-200"
                      style={{ backgroundColor: colors.accent, color: colors.dark }}
                    >
                      <Phone size={20} />
                      Call {formatPhoneNumber(phoneNumber)}
                    </a>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
};

export default Header;
