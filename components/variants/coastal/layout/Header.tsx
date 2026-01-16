'use client';

import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Search, MapPin, ArrowUpRight, X } from 'lucide-react';
import { gsap } from 'gsap';
import SearchBar from '@/components/search/SearchBar';
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
  locationPrefix,
  logoUrl,
  showSiteName = true,
  features,
  navbarSettings,
  ctaSettings,
  locations,
}: HeaderProps) {
  const showBlog = features?.show_blog ?? true;
  const showGlossary = features?.show_glossary ?? true;
  const showFaq = features?.show_faq_page ?? true;
  const showCareers = features?.show_careers_page ?? true;
  const isMultiLocation = features?.multi_location ?? false;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    if (isExpanded && cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out', stagger: 0.05 }
      );
    }
  }, [isExpanded]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 10);
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsHamburgerOpen(!isHamburgerOpen);
    setIsExpanded(!isExpanded);
  }, [isExpanded, isHamburgerOpen]);

  const toggleSearch = useCallback(() => {
    setIsSearchVisible(!isSearchVisible);
    if (isExpanded) toggleMenu();
  }, [isSearchVisible, isExpanded, toggleMenu]);

  const handleNavClick = useCallback(() => {
    if (isExpanded) toggleMenu();
  }, [isExpanded, toggleMenu]);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const cardBg = 'var(--color-background-alt)';
  const cardText = 'var(--color-text-primary)';

  const buildNavCards = useCallback(() => {
    if (isMultiLocation && !locationPrefix && locations && locations.length > 0) {
      return locations.map((location) => ({
        label: `${location.city}, ${location.state}`,
        bgColor: cardBg,
        textColor: cardText,
        links: [{ label: 'Visit Location', href: `/locations/${location.location_slug}` }]
      }));
    }

    const cards = [];
    const companyLinks = [
      { label: 'Policies', href: locationPrefix ? `${locationPrefix}/policies` : '/policies' },
      { label: 'About', href: locationPrefix ? `${locationPrefix}/about` : '/about' },
      { label: 'Our Team', href: locationPrefix ? `${locationPrefix}/our-team` : '/our-team' },
      { label: 'Contact', href: locationPrefix ? `${locationPrefix}/contact` : '/contact' },
    ];
    cards.push({ label: 'Company', bgColor: cardBg, textColor: cardText, links: companyLinks });

    const resourceLinks = [];
    if (showCareers) resourceLinks.push({ label: 'Apply', href: locationPrefix ? `${locationPrefix}/apply` : '/apply' });
    if (showBlog) resourceLinks.push({ label: 'Blog', href: locationPrefix ? `${locationPrefix}/blog` : '/blog' });
    if (showGlossary) resourceLinks.push({ label: 'Glossary', href: locationPrefix ? `${locationPrefix}/glossary` : '/glossary' });
    if (showFaq) resourceLinks.push({ label: 'FAQ', href: locationPrefix ? `${locationPrefix}/faq` : '/faq' });
    if (resourceLinks.length > 0) {
      cards.push({ label: 'Resources', bgColor: cardBg, textColor: cardText, links: resourceLinks });
    }

    return cards;
  }, [isMultiLocation, locationPrefix, locations, showBlog, showGlossary, showFaq, showCareers]);

  const navCards = buildNavCards();

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`} role="banner">
      <div className="card-nav-container">
        <nav className="card-nav" role="navigation">
          <div className="card-nav-top">
            <div className="flex items-center">
              <Link href={locationPrefix || '/'} className="flex items-center gap-3">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={websiteName || "Logo"}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain"
                    priority
                  />
                ) : (
                  <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">
                      {(websiteName || "").charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                {showSiteName && websiteName && (
                  <span className="hidden md:inline font-medium font-heading text-lg" style={{ color: 'var(--navbar-agency-name-color)' }}>
                    {websiteName}
                  </span>
                )}
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link 
                href={`tel:${normalizePhoneNumber(navbarSettings?.phone || phone)}`} 
                className="inline-flex items-center px-4 py-1.5 text-sm md:text-base transition-colors duration-300 font-medium whitespace-nowrap cta-button"
                style={{
                  backgroundColor: 'var(--cta-bg-color)',
                  color: 'var(--cta-text-color)',
                  borderRadius: 'var(--cta-border-radius)',
                  borderWidth: 'var(--cta-border-width)',
                  borderColor: 'var(--cta-border-color)',
                  borderStyle: ctaSettings?.border_width ? 'solid' : 'none',
                }}
              >
                {(navbarSettings?.show_icon ?? true) && <Phone size={16} className="mr-1.5" />}
                <span className="hidden md:inline">{navbarSettings?.text ?? 'Call Today'}</span>
                <span className="md:hidden">Call</span>
              </Link>

              <div
                className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group`}
                onClick={toggleMenu}
                role="button"
                aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                tabIndex={0}
                style={{ color: 'var(--navbar-text-color)' }}
              >
                <div className={`hamburger-line ${isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''} group-hover:opacity-75`} />
                <div className={`hamburger-line ${isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''} group-hover:opacity-75`} />
              </div>
            </div>
          </div>

          {isExpanded && (
            <div className="card-nav-dropdown animate-fade-in">
              <div className="card-nav-dropdown-content">
                {navCards.map((card, idx) => (
                  <div
                    key={`${card.label}-${idx}`}
                    className="nav-card"
                    ref={setCardRef(idx)}
                    style={{ backgroundColor: card.bgColor, color: card.textColor }}
                  >
                    <div className="nav-card-label flex items-center gap-2">
                      {isMultiLocation && !locationPrefix && <MapPin size={16} />}
                      {card.label}
                    </div>
                    <div className="nav-card-links">
                      {card.links.map((link, i) => (
                        <Link
                          key={`${link.label}-${i}`}
                          className="nav-card-link"
                          href={link.href}
                          onClick={handleNavClick}
                        >
                          <ArrowUpRight size={14} aria-hidden="true" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div
                  className="nav-card"
                  ref={setCardRef(navCards.length)}
                  style={{ backgroundColor: 'var(--color-background-alt)', color: 'var(--color-text-primary)' }}
                >
                  <div className="nav-card-label flex items-center gap-2">
                    <Search size={16} />
                    Search
                  </div>
                  <div className="nav-card-links">
                    <button className="nav-card-link w-full text-left" onClick={toggleSearch}>
                      <ArrowUpRight size={14} aria-hidden="true" />
                      Search Site
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {isSearchVisible && (
        <div className="fixed inset-0 bg-white z-50 p-4 animate-fade-in" role="dialog" aria-label="Search">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-primary">Search</h3>
            <button onClick={toggleSearch} className="text-primary" aria-label="Close search">
              <X size={24} />
            </button>
          </div>
          <SearchBar variant="fullwidth" placeholder="Search for insurance, policies, etc..." onClose={toggleSearch} />
        </div>
      )}
    </header>
  );
}
