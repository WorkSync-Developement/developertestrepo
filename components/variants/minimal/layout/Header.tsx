'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X } from 'lucide-react';
import { normalizePhoneNumber } from '@/lib/utils';

interface HeaderProps {
  websiteName?: string;
  phone?: string;
  logoUrl?: string | null;
  showSiteName?: boolean;
  locationPrefix?: string;
  features?: {
    show_blog?: boolean;
    show_glossary?: boolean;
    show_faq_page?: boolean;
    show_careers_page?: boolean;
    multi_location?: boolean;
  };
  navbarSettings?: {
    bg_color: string | null;
    bg_opacity: number;
    height: number | null;
    text_color: string | null;
    text_hover_color: string | null;
    agency_name_color: string | null;
    phone: string | null;
    text: string;
    show_icon: boolean;
  };
  ctaSettings?: {
    bg_color: string | null;
    text_color: string | null;
    hover_bg_color: string | null;
    border_color: string | null;
    border_width: number;
    border_radius: number;
  };
  locations?: Array<{
    id: string;
    location_slug: string;
    city: string;
    state: string;
  }>;
}

export default function Header({
  websiteName,
  phone,
  logoUrl,
  showSiteName = true,
  locationPrefix,
  features,
  navbarSettings,
  ctaSettings,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const showBlog = features?.show_blog ?? true;
  const showGlossary = features?.show_glossary ?? true;
  const showFaq = features?.show_faq_page ?? true;
  const showCareers = features?.show_careers_page ?? true;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: locationPrefix || '/', show: true },
    { label: 'About', href: `${locationPrefix || ''}/about`, show: true },
    { label: 'Policies', href: `${locationPrefix || ''}/policies`, show: true },
    { label: 'Blog', href: `${locationPrefix || ''}/blog`, show: showBlog },
    { label: 'FAQ', href: `${locationPrefix || ''}/faq`, show: showFaq },
    { label: 'Glossary', href: `${locationPrefix || ''}/glossary`, show: showGlossary },
    { label: 'Careers', href: `${locationPrefix || ''}/apply`, show: showCareers },
    { label: 'Contact', href: `${locationPrefix || ''}/contact`, show: true },
  ].filter((item) => item.show);

  const phoneNumber = navbarSettings?.phone || phone;
  const ctaText = navbarSettings?.text || 'Call Today';
  const showPhoneIcon = navbarSettings?.show_icon ?? true;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={locationPrefix || '/'} className="flex items-center gap-3">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={websiteName || 'Logo'}
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            ) : (
              <div
                className="h-8 w-8 border-2"
                style={{ borderColor: 'var(--color-primary)' }}
              />
            )}
            {showSiteName && websiteName && (
              <span
                className="hidden lg:inline font-light text-xl tracking-wide"
                style={{ color: navbarSettings?.agency_name_color || 'var(--color-text-primary)' }}
              >
                {websiteName}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" role="navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-light tracking-wide transition-opacity hover:opacity-60"
                style={{
                  color: navbarSettings?.text_color || 'var(--color-text-primary)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            {phoneNumber && (
              <Link
                href={`tel:${normalizePhoneNumber(phoneNumber)}`}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-light border transition-opacity hover:opacity-70"
                style={{
                  backgroundColor: 'transparent',
                  color: ctaSettings?.text_color || 'var(--color-primary)',
                  borderColor: ctaSettings?.border_color || 'var(--color-primary)',
                  borderWidth: '1px',
                }}
              >
                {showPhoneIcon && <Phone size={16} />}
                <span>{ctaText}</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            style={{ color: navbarSettings?.text_color || 'var(--color-text-primary)' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white z-40">
          <nav className="flex flex-col p-6 gap-1" role="navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 px-4 text-sm font-light tracking-wide transition-opacity hover:opacity-60"
                style={{
                  color: navbarSettings?.text_color || 'var(--color-text-primary)',
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {phoneNumber && (
              <Link
                href={`tel:${normalizePhoneNumber(phoneNumber)}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-light border mt-4"
                style={{
                  backgroundColor: 'transparent',
                  color: ctaSettings?.text_color || 'var(--color-primary)',
                  borderColor: ctaSettings?.border_color || 'var(--color-primary)',
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {showPhoneIcon && <Phone size={16} />}
                <span>{ctaText}</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
