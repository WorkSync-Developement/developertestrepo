'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
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
  locations,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Feature flags with defaults
  const showBlog = features?.show_blog ?? true;
  const showGlossary = features?.show_glossary ?? true;
  const showFaq = features?.show_faq_page ?? true;
  const showCareers = features?.show_careers_page ?? true;
  const isMultiLocation = features?.multi_location ?? false;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
      style={{
        backgroundColor: `rgba(${hexToRgb(navbarSettings?.bg_color || '#FFFFFF')}, ${navbarSettings?.bg_opacity ?? 1})`,
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      }}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Site Name */}
          <Link href={locationPrefix || '/'} className="flex items-center gap-3 z-50">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={websiteName || 'Logo'}
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            ) : (
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <span
                  className="font-bold text-lg"
                  style={{ color: 'var(--color-primary-foreground)' }}
                >
                  {(websiteName || '').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            {showSiteName && websiteName && (
              <span
                className="hidden lg:inline font-heading font-semibold text-xl"
                style={{ color: navbarSettings?.agency_name_color || 'var(--color-text-primary)' }}
              >
                {websiteName}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" role="navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium transition-colors duration-200 hover:scale-105"
                style={{
                  color: navbarSettings?.text_color || 'var(--color-text-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    navbarSettings?.text_hover_color || 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    navbarSettings?.text_color || 'var(--color-text-primary)';
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {phoneNumber && (
              <Link
                href={`tel:${normalizePhoneNumber(phoneNumber)}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: ctaSettings?.bg_color || 'var(--cta-bg-color)',
                  color: ctaSettings?.text_color || 'var(--cta-text-color)',
                  borderRadius: `${ctaSettings?.border_radius || 8}px`,
                  borderWidth: `${ctaSettings?.border_width || 0}px`,
                  borderColor: ctaSettings?.border_color || 'transparent',
                  borderStyle: ctaSettings?.border_width ? 'solid' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (ctaSettings?.hover_bg_color) {
                    e.currentTarget.style.backgroundColor = ctaSettings.hover_bg_color;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    ctaSettings?.bg_color || 'var(--cta-bg-color)';
                }}
              >
                {showPhoneIcon && <Phone size={18} />}
                <span>{ctaText}</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 p-2"
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
        <div
          className="md:hidden fixed inset-0 top-16 z-40 animate-fade-in"
          style={{
            backgroundColor: navbarSettings?.bg_color || 'var(--color-background-alt)',
          }}
        >
          <nav className="flex flex-col p-6 gap-4" role="navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 px-4 rounded-lg font-medium transition-colors"
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium mt-4"
                style={{
                  backgroundColor: ctaSettings?.bg_color || 'var(--cta-bg-color)',
                  color: ctaSettings?.text_color || 'var(--cta-text-color)',
                  borderRadius: `${ctaSettings?.border_radius || 8}px`,
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {showPhoneIcon && <Phone size={18} />}
                <span>{ctaText}</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '255, 255, 255';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
