'use client';

import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Search, MapPin, ArrowUpRight, X, Menu, Home, Briefcase, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import SearchBar from 'components/search/SearchBar';
import { normalizePhoneNumber } from '@/lib/utils';
import type { NavbarSettings, CtaSettings } from '@/lib/types/theme';

interface NavCardLink {
  label: string;
  href: string;
}

interface NavCard {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavCardLink[];
}

interface LocationItem {
  id: string;
  location_slug: string;
  city: string;
  state: string;
}

interface HeaderBarProps {
  websiteName?: string;
  phone?: string;
  locationPrefix?: string; // optional, used for location-aware routing
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

const HeaderBar: React.FC<HeaderBarProps> = ({ websiteName, phone, locationPrefix, logoUrl, showSiteName = true, features, navbarSettings, ctaSettings, locations }) => {
  // Feature flags with defaults (show all if no features provided)
  const showBlog = features?.show_blog ?? true;
  const showGlossary = features?.show_glossary ?? true;
  const showFaq = features?.show_faq_page ?? true;
  const showCareers = features?.show_careers_page ?? true;
  const isMultiLocation = features?.multi_location ?? false;

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  // Ref for GSAP card animations
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Debounce function to improve scroll performance
  const debounce = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  // Animate cards when dropdown opens
  useLayoutEffect(() => {
    if (isExpanded && cardsRef.current.length > 0) {
      // Animate cards sliding in with stagger
      gsap.fromTo(
        cardsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out', stagger: 0.05 }
      );
    }
  }, [isExpanded]);

  // Scroll handler
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 10);
    }

    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 10);
    }, 100);

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (!isSearchVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchVisible]);

  // Toggle menu expansion
  const toggleMenu = useCallback(() => {
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
    } else {
      setIsHamburgerOpen(false);
      setIsExpanded(false);
    }
  }, [isExpanded]);

  const toggleSearch = useCallback(() => {
    setIsSearchVisible(!isSearchVisible);
    if (isExpanded) {
      toggleMenu();
    }
  }, [isSearchVisible, isExpanded, toggleMenu]);

  // Handle navigation item click - closes menu
  const handleNavClick = useCallback(() => {
    if (isExpanded) {
      toggleMenu();
    }
  }, [isExpanded, toggleMenu]);

  // Set card ref helper
  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  // Build nav cards based on route context
  // All cards use the same contrasting background (like search card)
  const cardBg = 'var(--color-background-alt)';
  const cardText = 'var(--color-text-primary)';

  const buildNavCards = useCallback((): NavCard[] => {
    if (isMultiLocation && !locationPrefix && locations && locations.length > 0) {
      // Home route: Each location as its own card
      return locations.map((location) => ({
        label: `${location.city}, ${location.state}`,
        bgColor: cardBg,
        textColor: cardText,
        links: [
          { label: 'Visit Location', href: `/locations/${location.location_slug}` }
        ]
      }));
    }

    // Location route: Nav cards (Company, Resources)
    const cards: NavCard[] = [];

    // Card 1: Company
    const companyLinks: NavCardLink[] = [];
    companyLinks.push({ label: 'Policies', href: locationPrefix ? `${locationPrefix}/policies` : '/policies' });
    companyLinks.push({ label: 'About', href: locationPrefix ? `${locationPrefix}/about` : '/about' });
    companyLinks.push({ label: 'Our Team', href: locationPrefix ? `${locationPrefix}/our-team` : '/our-team' });
    companyLinks.push({ label: 'Contact', href: locationPrefix ? `${locationPrefix}/contact` : '/contact' });
    cards.push({
      label: 'Company',
      bgColor: cardBg,
      textColor: cardText,
      links: companyLinks
    });

    // Card 2: Resources
    const resourceLinks: NavCardLink[] = [];
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
        bgColor: cardBg,
        textColor: cardText,
        links: resourceLinks
      });
    }

    return cards;
  }, [isMultiLocation, locationPrefix, locations, showBlog, showGlossary, showFaq, showCareers]);

  const navCards = buildNavCards();
  return (
    <header
      className={`header ${isScrolled ? 'header-scrolled' : ''}`}
      role="banner"
    >
      <div className="card-nav-container">
        <nav
          className="card-nav"
          role="navigation"
        >
          {/* Top Bar - Fixed Height */}
          <div className="card-nav-top">
            {/* Logo - Enhanced with Animation */}
            <div className="flex items-center">
              <Link href={locationPrefix || '/'} className="flex items-center gap-3 group transition-all duration-300">
                <div className="relative">
                  <Image
                    src={'/logo-removebg-preview.png'}
                    // src={logoUrl || '/logo.png'}
                    alt={websiteName || "Logo"}
                    width={140}
                    height={50}
                    className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                {showSiteName && websiteName && (
                  <span className="hidden md:inline font-bold font-heading text-xl transition-all duration-300 group-hover:text-opacity-80 text-white"
                    style={{
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}>
                    {websiteName}
                  </span>
                )}
              </Link>
            </div>

            {/* Right side: CTA Button + Hamburger */}
            <div className="flex items-center gap-4">
              <Link
                href={`tel:${normalizePhoneNumber(navbarSettings?.phone || phone)}`}
                className="inline-flex items-center px-6 py-3 text-sm md:text-base font-bold whitespace-nowrap cta-button group bg-white text-primary hover:opacity-90 transition rounded-lg"
                style={{
                  borderRadius: 'var(--cta-border-radius)',
                }}
              >
                {(navbarSettings?.show_icon ?? true) && (
                  <Phone
                    size={18}
                    className="mr-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                  />
                )}
                <span className="hidden md:inline relative z-10">{navbarSettings?.text ?? 'Call Today'}</span>
                <span className="md:hidden relative z-10">Call</span>
              </Link>

              {/* Hamburger Menu - Enhanced */}
              <div
                className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                role="button"
                aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                tabIndex={0}
                style={{ color: 'var(--navbar-text-color, #FFFFFF)' }}
              >
                <div
                  className={`hamburger-line ${isHamburgerOpen ? 'translate-y-[5px] rotate-45' : ''}`}
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
                <div
                  className={`hamburger-line ${isHamburgerOpen ? '-translate-y-[5px] -rotate-45' : ''}`}
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Dropdown Panel - Pops out below header */}
          {isExpanded && (
            <div className="card-nav-dropdown animate-fade-in">
              <div className="card-nav-dropdown-content">
                {/* Nav Cards - Enhanced Premium Design */}
                {navCards.map((card, idx) => (
                  <div
                    key={`${card.label}-${idx}`}
                    className="nav-card relative overflow-hidden"
                    ref={setCardRef(idx)}
                    style={{
                      backgroundColor: card.bgColor,
                      color: card.textColor,
                    }}
                  >
                    {/* Gradient Accent Line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 opacity-0 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)',
                      }}
                    />

                    <div className="nav-card-label flex items-center gap-2">
                      {isMultiLocation && !locationPrefix && (
                        <div className="p-1.5 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.15)' }}>
                          <MapPin size={18} />
                        </div>
                      )}
                      {card.label}
                    </div>

                    <div className="nav-card-links">
                      {card.links.map((link, i) => (
                        <Link
                          key={`${link.label}-${i}`}
                          className="nav-card-link group/link"
                          href={link.href}
                          onClick={handleNavClick}
                        >
                          <ArrowUpRight
                            size={16}
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                          />
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    {/* Hover Effect Overlay */}
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
                      }}
                    />
                  </div>
                ))}

                {/* Search Card - Enhanced */}
                <div
                  className="nav-card relative overflow-hidden"
                  ref={setCardRef(navCards.length)}
                  style={{ backgroundColor: 'var(--color-background-alt)', color: 'var(--color-text-primary)' }}
                >
                  {/* Gradient Accent Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)',
                    }}
                  />

                  <div className="nav-card-label flex items-center gap-2 text-foreground">
                    <div className="p-1.5 rounded-lg" style={{ background: 'rgba(54, 79, 107, 0.1)' }}>
                      <Search size={18} className="text-primary" />
                    </div>
                    Search
                  </div>
                  <div className="nav-card-links">
                    <button
                      className="nav-card-link w-full text-left group/link"
                      onClick={toggleSearch}
                    >
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                      />
                      Search Site
                    </button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(54, 79, 107, 0.05) 0%, transparent 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {isSearchVisible && (
        <div className="w-full border-t border-slate-200 bg-white/95">
          <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-primary">Search the site</h3>
              <button
                onClick={toggleSearch}
                className="ml-4 inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/70 text-muted-foreground hover:text-primary hover:border-primary/60 hover:bg-primary/5 transition-colors"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </div>
            <SearchBar
              variant="fullwidth"
              placeholder="Search for insurance, policies, FAQs, or topics..."
              onClose={toggleSearch}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderBar;