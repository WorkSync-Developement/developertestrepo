'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { normalizePhoneNumber, formatPhoneNumber } from '@/lib/utils';
import type { NavbarSettings, CtaSettings } from '@/lib/types/theme';

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
      setIsScrolled(window.scrollY > 10);
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

  // Simplified nav - like Larson example
  const mainNavLinks = [
    { label: 'Home', href: locationPrefix || '/' },
    { label: 'About Us', href: locationPrefix ? `${locationPrefix}/about` : '/about' },
    ...(showFaq ? [{ label: 'FAQ', href: locationPrefix ? `${locationPrefix}/faq` : '/faq' }] : []),
  ];

  const insuranceTypes = [
    { label: 'Auto Insurance', href: `${locationPrefix || ''}/policies` },
    { label: 'Home Insurance', href: `${locationPrefix || ''}/policies` },
    { label: 'Business Insurance', href: `${locationPrefix || ''}/policies` },
    { label: 'Life Insurance', href: `${locationPrefix || ''}/policies` },
    { label: 'View All Policies', href: `${locationPrefix || ''}/policies` },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Top bar with phone */}
        <div className="hidden lg:block border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end py-2">
              {phoneNumber && (
                <a
                  href={`tel:${normalizedPhone}`}
                  className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: '#1e3a5f' }}
                >
                  <Phone size={14} />
                  {formatPhoneNumber(phoneNumber)}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href={locationPrefix || '/'}
              className="flex items-center gap-3 group"
            >
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
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#1e3a5f' }}
                  >
                    <span className="text-white font-bold text-lg">
                      {websiteName?.charAt(0) || 'I'}
                    </span>
                  </div>
                  {showSiteName && websiteName && (
                    <div className="hidden sm:block">
                      <span className="font-bold text-lg block" style={{ color: '#1e3a5f' }}>
                        {websiteName.split(' ')[0]}
                      </span>
                      <span className="text-xs" style={{ color: '#5a6a7a' }}>
                        {websiteName.split(' ').slice(1).join(' ') || 'Insurance Group'}
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
                  className="px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-[#d4a853]"
                  style={{ color: '#1e3a5f' }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Insurance Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsInsuranceDropdownOpen(true)}
                onMouseLeave={() => setIsInsuranceDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-[#d4a853]"
                  style={{ color: '#1e3a5f' }}
                >
                  Insurance
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isInsuranceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isInsuranceDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    {insuranceTypes.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-gray-50"
                        style={{ color: item.label === 'View All Policies' ? '#d4a853' : '#1e3a5f' }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right side - CTA */}
            <div className="flex items-center gap-3">
              {/* Phone - mobile only */}
              {phoneNumber && (
                <a
                  href={`tel:${normalizedPhone}`}
                  className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ backgroundColor: '#1e3a5f' }}
                >
                  <Phone size={18} className="text-white" />
                </a>
              )}

              {/* Get a Quote CTA */}
              <Link
                href={`${locationPrefix || ''}/contact`}
                className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: '#1e3a5f', 
                  color: '#ffffff',
                  border: '2px solid #1e3a5f'
                }}
              >
                Get a Quote
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg transition-colors duration-200"
                style={{ color: '#1e3a5f' }}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 font-medium rounded-lg transition-colors duration-200 hover:bg-gray-50"
                  style={{ color: '#1e3a5f' }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Insurance section */}
              <div className="pt-2 border-t border-gray-100">
                <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: '#5a6a7a' }}>
                  Insurance
                </p>
                {insuranceTypes.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 font-medium rounded-lg transition-colors duration-200 hover:bg-gray-50"
                    style={{ color: item.label === 'View All Policies' ? '#d4a853' : '#1e3a5f' }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 space-y-3">
                <Link
                  href={`${locationPrefix || ''}/contact`}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center w-full px-6 py-4 font-bold rounded-xl transition-all duration-200"
                  style={{ backgroundColor: '#d4a853', color: '#1e3a5f' }}
                >
                  Get a Free Quote
                </Link>
                {phoneNumber && (
                  <a
                    href={`tel:${normalizedPhone}`}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 font-bold rounded-xl border-2 transition-all duration-200"
                    style={{ borderColor: '#1e3a5f', color: '#1e3a5f' }}
                  >
                    <Phone size={20} />
                    Call {formatPhoneNumber(phoneNumber)}
                  </a>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-[88px]" />
    </>
  );
};

export default Header;
