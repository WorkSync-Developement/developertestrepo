'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ChevronDown, Search, MapPin } from 'lucide-react';
import { normalizePhoneNumber } from '@/lib/utils';
import SearchBar from 'components/search/SearchBar';
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

interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
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
  const showBlog = features?.show_blog ?? true;
  const showGlossary = features?.show_glossary ?? true;
  const showFaq = features?.show_faq_page ?? true;
  const showCareers = features?.show_careers_page ?? true;
  const isMultiLocation = features?.multi_location ?? false;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setOpenDropdown(null);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  const buildNavLinks = useCallback((): NavLink[] => {
    const links: NavLink[] = [];
    const prefix = locationPrefix || '';

    // Home link
    links.push({ label: 'Home', href: prefix || '/' });

    // About link
    links.push({ label: 'About', href: `${prefix}/about` || '/about' });

    // Policies
    links.push({ label: 'Policies', href: `${prefix}/policies` || '/policies' });

    // Resources dropdown
    const resourceLinks: NavLink[] = [];
    if (showBlog) resourceLinks.push({ label: 'Blog', href: `${prefix}/blog` || '/blog' });
    if (showFaq) resourceLinks.push({ label: 'FAQ', href: `${prefix}/faq` || '/faq' });
    if (showGlossary) resourceLinks.push({ label: 'Glossary', href: `${prefix}/glossary` || '/glossary' });
    if (showCareers) resourceLinks.push({ label: 'Careers', href: `${prefix}/apply` || '/apply' });

    if (resourceLinks.length > 0) {
      links.push({ label: 'Resources', href: '#', children: resourceLinks });
    }

    // Locations dropdown for multi-location
    if (isMultiLocation && !locationPrefix && locations && locations.length > 0) {
      links.push({
        label: 'Locations',
        href: '#',
        children: locations.map((loc) => ({
          label: `${loc.city}, ${loc.state}`,
          href: `/locations/${loc.location_slug}`,
        })),
      });
    }

    // Contact link
    links.push({ label: 'Contact', href: `${prefix}/contact` || '/contact' });

    return links;
  }, [locationPrefix, isMultiLocation, locations, showBlog, showFaq, showGlossary, showCareers]);

  const navLinks = buildNavLinks();

  return (
    <>
      <header
        className="sticky top-0 left-0 right-0 z-50 py-4"
        style={{
          backgroundColor: 'var(--navbar-bg-color, var(--color-primary, #1e3a5f))',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href={locationPrefix || '/'}
              className="flex items-center gap-3 group"
              onClick={handleNavClick}
            >
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={websiteName || 'Logo'}
                  width={140}
                  height={48}
                  className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  priority
                />
              ) : (
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-accent, #ffffff)' }}
                >
                  <span
                    className="font-bold text-lg"
                    style={{ color: 'var(--cta-text-color, #000000)' }}
                  >
                    {(websiteName || 'A').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {showSiteName && websiteName && (
                <span
                  className="hidden md:inline font-heading font-bold text-lg"
                  style={{
                    color: 'var(--navbar-text-color, #ffffff)',
                  }}
                >
                  {websiteName}
                </span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.children ? (
                    <div
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                        style={{
                          color: 'var(--navbar-text-color, #ffffff)',
                          backgroundColor: openDropdown === link.label 
                            ? 'rgba(255,255,255,0.15)' 
                            : 'transparent',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                        }}
                        onMouseOut={(e) => {
                          if (openDropdown !== link.label) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            openDropdown === link.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                          openDropdown === link.label
                            ? 'opacity-100 visible translate-y-0'
                            : 'opacity-0 invisible -translate-y-2'
                        }`}
                      >
                        <div
                          className="min-w-[200px] rounded-xl shadow-xl p-2 border"
                          style={{
                            backgroundColor: 'var(--color-background)',
                            borderColor: 'var(--color-border)',
                          }}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-all duration-200 hover:bg-black/5"
                              style={{ color: 'var(--color-text-primary)' }}
                              onClick={handleNavClick}
                            >
                              {link.label === 'Locations' && (
                                <MapPin size={14} style={{ color: 'var(--color-accent)' }} />
                              )}
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                      style={{
                        color: 'var(--navbar-text-color, #ffffff)',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      onClick={handleNavClick}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Search */}
              <button
                onClick={toggleSearch}
                className="p-2.5 rounded-lg transition-all duration-200"
                style={{ 
                  color: 'var(--navbar-text-color, #ffffff)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* CTA Button */}
              <Link
                href={`tel:${normalizePhoneNumber(navbarSettings?.phone || phone)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--cta-bg-color)',
                  color: 'var(--cta-text-color)',
                  borderRadius: 'var(--cta-border-radius)',
                  borderWidth: 'var(--cta-border-width)',
                  borderColor: 'var(--cta-border-color)',
                  borderStyle: 'solid',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--cta-hover-bg-color)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--cta-bg-color)';
                }}
              >
                <Phone size={16} />
                <span className="hidden sm:inline">{navbarSettings?.text ?? 'Call Now'}</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2.5 rounded-lg transition-all duration-200"
                style={{ 
                  color: 'var(--navbar-text-color, #ffffff)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-full z-50 lg:hidden transition-transform duration-300 overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-heading font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>
              Menu
            </span>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {link.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          openDropdown === link.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openDropdown === link.label ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm rounded-lg"
                            style={{ color: 'var(--color-text-secondary)' }}
                            onClick={handleNavClick}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-base font-medium rounded-lg"
                    style={{ color: 'var(--color-text-primary)' }}
                    onClick={handleNavClick}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <button
              onClick={toggleSearch}
              className="w-full flex items-center gap-2 px-4 py-3 text-base font-medium rounded-lg"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <Search size={18} />
              Search
            </button>
          </nav>

          <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <Link
              href={`tel:${normalizePhoneNumber(navbarSettings?.phone || phone)}`}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 text-base font-semibold rounded-full"
              style={{ backgroundColor: 'var(--cta-bg-color)', color: 'var(--cta-text-color)' }}
              onClick={handleNavClick}
            >
              <Phone size={18} />
              {navbarSettings?.text ?? 'Call Now'}
            </Link>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
          onClick={toggleSearch}
        >
          <div
            className="w-full max-w-xl mx-4 p-6 rounded-2xl shadow-2xl"
            style={{ backgroundColor: 'var(--color-background)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Search
              </h3>
              <button onClick={toggleSearch} className="p-2 rounded-lg" style={{ color: 'var(--color-text-primary)' }}>
                <X size={24} />
              </button>
            </div>
            <SearchBar variant="fullwidth" placeholder="Search..." onClose={toggleSearch} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
