'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ChevronDown, MapPin } from 'lucide-react';
import { normalizePhoneNumber, formatPhoneNumber } from '@/lib/utils';
import LocationPickerPopup from '@/components/ui/LocationPickerPopup';

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
  locations = [],
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);

  const showBlog = features?.show_blog ?? false;
  const showGlossary = features?.show_glossary ?? false;
  const showFaq = features?.show_faq_page ?? false;
  const showCareers = features?.show_careers_page ?? false;
  const isMultiLocation = features?.multi_location ?? false;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarBgColor = navbarSettings?.bg_color || 'var(--navbar-bg-color, #ffffff)';
  const navbarBgOpacity = navbarSettings?.bg_opacity ?? 0.95;
  const navbarTextColor = navbarSettings?.text_color || 'var(--navbar-text-color, var(--color-text-primary))';
  const navbarTextHoverColor = navbarSettings?.text_hover_color || 'var(--navbar-text-hover-color, var(--color-accent))';
  const phoneNumber = navbarSettings?.phone || phone || '';
  const phoneText = navbarSettings?.text || 'Call Today';
  const normalizedPhone = normalizePhoneNumber(phoneNumber);

  const basePath = locationPrefix || '';

  const navLinks = [
    { label: 'Home', href: basePath || '/' },
    { label: 'About', href: `${basePath}/about` },
    { label: 'Policies', href: `${basePath}/policies` },
    ...(showBlog ? [{ label: 'Blog', href: `${basePath}/blog` }] : []),
    ...(showFaq ? [{ label: 'FAQ', href: `${basePath}/faq` }] : []),
    ...(showGlossary ? [{ label: 'Glossary', href: `${basePath}/glossary` }] : []),
    ...(showCareers ? [{ label: 'Careers', href: `${basePath}/apply` }] : []),
    { label: 'Contact', href: `${basePath}/contact` },
  ];

  const headerStyle: React.CSSProperties = {
    backgroundColor: `color-mix(in srgb, ${navbarBgColor} ${navbarBgOpacity * 100}%, transparent)`,
    backdropFilter: 'blur(10px)',
    borderBottom: isScrolled ? `1px solid color-mix(in srgb, ${navbarBgColor} 20%, transparent)` : 'none',
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
        style={headerStyle}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={basePath || '/'} className="flex items-center gap-3 group">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={websiteName || 'Logo'}
                  width={140}
                  height={50}
                  className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    {(websiteName || 'A').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {showSiteName && websiteName && (
                <span
                  className="hidden md:block font-heading font-semibold text-xl"
                  style={{ color: navbarSettings?.agency_name_color || navbarTextColor }}
                >
                  {websiteName}
                </span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors duration-200 hover:opacity-80"
                  style={{
                    color: navbarTextColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = navbarTextHoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = navbarTextColor;
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center gap-4">
              {normalizedPhone && (
                <Link
                  href={`tel:${normalizedPhone}`}
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: ctaSettings?.bg_color || 'var(--cta-bg-color, var(--color-accent))',
                    color: ctaSettings?.text_color || 'var(--cta-text-color, #ffffff)',
                    borderRadius: `${ctaSettings?.border_radius || 9999}px`,
                    border: ctaSettings?.border_width
                      ? `${ctaSettings.border_width}px solid ${ctaSettings.border_color || 'transparent'}`
                      : 'none',
                  }}
                >
                  {navbarSettings?.show_icon !== false && <Phone size={16} />}
                  <span>{phoneText}</span>
                </Link>
              )}

              {/* Location Picker for Multi-Location */}
              {isMultiLocation && locations.length > 0 && (
                <>
                  <button
                    onClick={() => setIsLocationPickerOpen(true)}
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:bg-opacity-10"
                    style={{
                      borderColor: `color-mix(in srgb, ${navbarTextColor} 30%, transparent)`,
                      color: navbarTextColor,
                    }}
                  >
                    <MapPin size={16} />
                    <span className="text-sm font-medium">Locations</span>
                    <ChevronDown size={16} />
                  </button>
                  <LocationPickerPopup
                    isOpen={isLocationPickerOpen}
                    onClose={() => setIsLocationPickerOpen(false)}
                    locations={locations.map(loc => ({
                      id: loc.id,
                      location_name: `${loc.city}, ${loc.state}`,
                      city: loc.city,
                      state: loc.state,
                      location_slug: loc.location_slug,
                    }))}
                  />
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg transition-colors"
                style={{ color: navbarTextColor }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t animate-fade-in" style={{ borderColor: `color-mix(in srgb, ${navbarTextColor} 20%, transparent)` }}>
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-base font-medium transition-colors"
                  style={{ color: navbarTextColor }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {normalizedPhone && (
                <Link
                  href={`tel:${normalizedPhone}`}
                  className="flex items-center justify-center gap-2 mt-4 px-5 py-3 rounded-full font-semibold"
                  style={{
                    backgroundColor: ctaSettings?.bg_color || 'var(--cta-bg-color, var(--color-accent))',
                    color: ctaSettings?.text_color || 'var(--cta-text-color, #ffffff)',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {navbarSettings?.show_icon !== false && <Phone size={18} />}
                  <span>{phoneText}</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
      <div className="h-20" /> {/* Spacer for fixed header */}
    </>
  );
}
