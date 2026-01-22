'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ChevronDown, MapPin, ArrowUpRight, Search } from 'lucide-react';
import { normalizePhoneNumber, formatPhoneNumber } from '@/lib/utils';
import SearchBar from '@/components/variants/modern/search/SearchBar';
import Logo from '@/public/image-logo.png';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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

  // Build dropdown cards based on route context (same logic as common HeaderBar)
  const buildDropdownCards = useCallback(() => {
    if (isMultiLocation && !locationPrefix && locations.length > 0) {
      // Home route: Each location as its own card
      return locations.map((location) => ({
        label: `${location.city}, ${location.state}`,
        links: [
          { label: 'Visit Location', href: `/locations/${location.location_slug}` }
        ]
      }));
    }

    // Location route: Company and Resources cards
    const cards: Array<{ label: string; links: Array<{ label: string; href: string }> }> = [];

    // Card 1: Company
    const companyLinks: Array<{ label: string; href: string }> = [];
    companyLinks.push({ label: 'Policies', href: locationPrefix ? `${locationPrefix}/policies` : '/policies' });
    companyLinks.push({ label: 'About', href: locationPrefix ? `${locationPrefix}/about` : '/about' });
    companyLinks.push({ label: 'Our Team', href: locationPrefix ? `${locationPrefix}/our-team` : '/our-team' });
    companyLinks.push({ label: 'Contact', href: locationPrefix ? `${locationPrefix}/contact` : '/contact' });
    cards.push({
      label: 'Company',
      links: companyLinks
    });

    // Card 2: Resources
    const resourceLinks: Array<{ label: string; href: string }> = [];
    if (showCareers) {
      resourceLinks.push({ label: 'Apply', href: locationPrefix ? `${locationPrefix}/apply` : '/apply' });
    }
    if (showBlog) {
      resourceLinks.push({ label: 'Blog', href: locationPrefix ? `${locationPrefix}/blog` : '/blog' });
    }
    if (showGlossary) {
      resourceLinks.push({ label: 'Glossary', href: locationPrefix ? `${locationPrefix}/glossary` : '/glossary' });
    }
    if (showFaq) {
      resourceLinks.push({ label: 'FAQ', href: locationPrefix ? `${locationPrefix}/faq` : '/faq' });
    }
    if (resourceLinks.length > 0) {
      cards.push({
        label: 'Resources',
        links: resourceLinks
      });
    }

    return cards;
  }, [isMultiLocation, locationPrefix, locations, showBlog, showGlossary, showFaq, showCareers]);

  const dropdownCards = buildDropdownCards();

  const handleNavClick = useCallback(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchVisible(!isSearchVisible);
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  }, [isSearchVisible, isDropdownOpen]);

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
                 src={Logo}
                 alt={websiteName || "Logo"}
                 width={120}
                 height={120}
                 className="h-14 w-auto object-contain"
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
            {/* <nav className="hidden lg:flex items-center gap-8">
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
            </nav> */}

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center gap-4">
              {normalizedPhone && (
                <Link
                  href={`tel:${normalizedPhone}`}
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg bg-primary text-white"
                  style={{
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

              {/* Visit Sites Button for Multi-Location */}
              {isMultiLocation && locations.length > 0 && (
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:bg-opacity-10"
                    style={{
                      borderColor: `color-mix(in srgb, ${navbarTextColor} 30%, transparent)`,
                      color: navbarTextColor,
                    }}
                  >
                    <MapPin size={16} />
                    <span className="text-sm font-medium">Visit Sites</span>
                    <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div 
                      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border p-4 z-50 animate-fade-in"
                      style={{
                        borderColor: `color-mix(in srgb, ${navbarTextColor} 20%, transparent)`,
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dropdownCards.map((card, idx) => (
                          <div
                            key={`${card.label}-${idx}`}
                            className="p-4 rounded-lg border transition-all hover:shadow-md"
                            style={{
                              backgroundColor: 'var(--color-background-alt, #f9fafb)',
                              borderColor: `color-mix(in srgb, ${navbarTextColor} 20%, transparent)`,
                            }}
                          >
                            <div className="flex items-center gap-2 mb-3 font-semibold" style={{ color: navbarTextColor }}>
                              {isMultiLocation && !locationPrefix && <MapPin size={16} />}
                              {card.label}
                            </div>
                            <div className="space-y-2">
                              {card.links.map((link, i) => (
                                <Link
                                  key={`${link.label}-${i}`}
                                  href={link.href}
                                  onClick={handleNavClick}
                                  className="flex items-center gap-2 text-sm transition-colors hover:opacity-80 group"
                                  style={{ color: navbarTextColor }}
                                >
                                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}

                        {/* Search Card */}
                        <div
                          className="p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer"
                          style={{
                            backgroundColor: 'var(--color-background-alt, #f9fafb)',
                            borderColor: `color-mix(in srgb, ${navbarTextColor} 20%, transparent)`,
                          }}
                          onClick={toggleSearch}
                        >
                          <div className="flex items-center gap-2 mb-3 font-semibold" style={{ color: navbarTextColor }}>
                            <Search size={16} />
                            Search
                          </div>
                          <div className="flex items-center gap-2 text-sm transition-colors hover:opacity-80 group" style={{ color: navbarTextColor }}>
                            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            Search Site
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
                  className="flex items-center justify-center gap-2 mt-4 px-5 py-3 rounded-full font-semibold bg-primary text-white"
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

      {/* Search Overlay */}
      {isSearchVisible && (
        <div className="fixed inset-0 bg-white z-50 p-4 animate-fade-in" role="dialog" aria-label="Search">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium" style={{ color: navbarTextColor }}>Search</h3>
            <button 
              onClick={toggleSearch}
              style={{ color: navbarTextColor }}
              aria-label="Close search"
            >
              <X size={24} />
            </button>
          </div>
          <SearchBar 
            variant="fullwidth" 
            placeholder="Search for insurance, policies, etc..."
            onClose={toggleSearch}
          />
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
