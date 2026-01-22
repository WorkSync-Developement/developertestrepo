'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, ChevronUp, ExternalLink } from 'lucide-react';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';
import SocialLinksModal from '@/components/layout/SocialLinksModal';
import type { SocialLinksModalData } from '@/lib/types/social-links';

interface Location {
  id: string;
  location_name: string;
  address_line_1?: string;
  address_line_2?: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  location_slug: string;
}

interface FooterProps {
  agencyName?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
  address?: string;
  locationPrefix?: string;
  locationName?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  badges?: Array<{ name: string; icon_class: string }>;
  tagline?: string;
  isMultiLocation?: boolean;
  footerLogoUrl?: string | null;
  allLocations?: Location[];
  socialLinksModalData?: SocialLinksModalData;
}

const Footer: React.FC<FooterProps> = ({
  agencyName,
  city,
  state,
  postalCode,
  phone,
  address,
  locationPrefix,
  socialLinks,
  badges,
  tagline,
  isMultiLocation,
  footerLogoUrl,
  allLocations,
  socialLinksModalData,
}) => {
  const [currentYear, setCurrentYear] = useState('');
  const [isSocialLinksModalOpen, setIsSocialLinksModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formattedPhone = formatPhoneNumber(phone);
  const normalizedPhone = normalizePhoneNumber(phone);
  const phoneHref = normalizedPhone ? `tel:${normalizedPhone}` : undefined;

  const showLocationDependentPage = isMultiLocation ? locationPrefix : true;

  // Navigation links matching Header
  const navLinks = [
    { label: 'Home', href: locationPrefix || '/' },
    { label: 'About', href: locationPrefix ? `${locationPrefix}/about` : '/about' },
    ...(showLocationDependentPage
      ? [{ label: 'Policies', href: locationPrefix ? `${locationPrefix}/policies` : '/policies' }]
      : []),
    { label: 'FAQ', href: locationPrefix ? `${locationPrefix}/faq` : '/faq' },
    ...(showLocationDependentPage
      ? [{ label: 'Blog', href: locationPrefix ? `${locationPrefix}/blog` : '/blog' }]
      : []),
    { label: 'Contact', href: locationPrefix ? `${locationPrefix}/contact` : '/contact' },
  ];

  // Social media icons
  const socialIcons = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  };

  const activeSocialLinks = socialLinks
    ? Object.entries(socialLinks).filter(([, url]) => url)
    : [];

  return (
    <>
      <footer style={{ backgroundColor: 'var(--footer-bg)', color: 'var(--footer-text)' }}>
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <div className="mb-6">
                {footerLogoUrl ? (
                  <Image
                    src={footerLogoUrl}
                    alt={`${agencyName || 'Company'} logo`}
                    width={160}
                    height={50}
                    className="h-12 w-auto object-contain"
                  />
                ) : agencyName ? (
                  <h3
                    className="text-xl font-heading font-bold"
                    style={{ color: 'var(--footer-text)' }}
                  >
                    {agencyName}
                  </h3>
                ) : null}
              </div>

              {tagline && (
                <p
                  className="text-sm leading-relaxed mb-6 max-w-xs"
                  style={{ color: 'var(--footer-text)', opacity: 0.8 }}
                >
                  {tagline}
                </p>
              )}

              {/* Social Links */}
              {activeSocialLinks.length > 0 && (
                <div className="flex items-center gap-3">
                  {activeSocialLinks.map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg transition-all duration-200 hover:scale-110"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--footer-text) 10%, transparent)',
                        color: 'var(--footer-text)',
                      }}
                      aria-label={`Follow us on ${platform}`}
                    >
                      {socialIcons[platform as keyof typeof socialIcons]}
                    </a>
                  ))}
                </div>
              )}

              {/* Badges */}
              {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--footer-badge-bg) 20%, transparent)',
                        color: 'var(--footer-badge-text)',
                      }}
                    >
                      {badge.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-2">
              <h4
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--footer-text)' }}
              >
                Navigation
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-opacity duration-200 hover:opacity-100"
                      style={{ color: 'var(--footer-text)', opacity: 0.7 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {socialLinksModalData && socialLinksModalData.locations.length > 0 && (
                  <li>
                    <button
                      onClick={() => setIsSocialLinksModalOpen(true)}
                      className="text-sm transition-opacity duration-200 hover:opacity-100"
                      style={{ color: 'var(--footer-text)', opacity: 0.7 }}
                    >
                      Social Links
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="lg:col-span-2">
              <h4
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--footer-text)' }}
              >
                Resources
              </h4>
              <ul className="space-y-3">
                {showLocationDependentPage && (
                  <>
                    <li>
                      <Link
                        href={locationPrefix ? `${locationPrefix}/policies` : '/policies'}
                        className="text-sm transition-opacity duration-200 hover:opacity-100"
                        style={{ color: 'var(--footer-text)', opacity: 0.7 }}
                      >
                        All Policies
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={locationPrefix ? `${locationPrefix}/glossary` : '/glossary'}
                        className="text-sm transition-opacity duration-200 hover:opacity-100"
                        style={{ color: 'var(--footer-text)', opacity: 0.7 }}
                      >
                        Glossary
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link
                    href={locationPrefix ? `${locationPrefix}/careers` : '/careers'}
                    className="text-sm transition-opacity duration-200 hover:opacity-100"
                    style={{ color: 'var(--footer-text)', opacity: 0.7 }}
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href={locationPrefix ? `${locationPrefix}/contact` : '/contact'}
                    className="text-sm transition-opacity duration-200 hover:opacity-100"
                    style={{ color: 'var(--footer-text)', opacity: 0.7 }}
                  >
                    Get a Quote
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="lg:col-span-4">
              <h4
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--footer-text)' }}
              >
                Contact
              </h4>

              {isMultiLocation && allLocations && allLocations.length > 0 ? (
                <div className="space-y-4">
                  {allLocations.slice(0, 2).map((location) => {
                    const locPhone = formatPhoneNumber(location.phone);
                    const locPhoneHref = location.phone
                      ? `tel:${normalizePhoneNumber(location.phone)}`
                      : undefined;

                    return (
                      <div
                        key={location.id}
                        className="p-4 rounded-lg"
                        style={{
                          backgroundColor: 'color-mix(in srgb, var(--footer-text) 5%, transparent)',
                        }}
                      >
                        <Link
                          href={`/locations/${location.location_slug}`}
                          className="flex items-center gap-2 font-medium text-sm mb-2 hover:underline"
                          style={{ color: 'var(--footer-text)' }}
                        >
                          {location.location_name}
                          <ExternalLink size={12} className="opacity-50" />
                        </Link>
                        <div className="space-y-1.5">
                          <p
                            className="flex items-start gap-2 text-xs"
                            style={{ color: 'var(--footer-text)', opacity: 0.7 }}
                          >
                            <MapPin size={12} className="flex-shrink-0 mt-0.5" />
                            <span>
                              {location.city}, {location.state} {location.zip}
                            </span>
                          </p>
                          {location.phone && (
                            <a
                              href={locPhoneHref}
                              className="flex items-center gap-2 text-xs transition-opacity duration-200 hover:opacity-100"
                              style={{ color: 'var(--footer-text)', opacity: 0.7 }}
                            >
                              <Phone size={12} />
                              {locPhone}
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {allLocations.length > 2 && (
                    <Link
                      href="/locations"
                      className="inline-flex items-center gap-1 text-sm font-medium transition-opacity duration-200 hover:opacity-100"
                      style={{ color: 'var(--color-accent)', opacity: 0.9 }}
                    >
                      View all {allLocations.length} locations
                      <ExternalLink size={12} />
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {address && (
                    <p
                      className="flex items-start gap-3 text-sm"
                      style={{ color: 'var(--footer-text)', opacity: 0.7 }}
                    >
                      <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                      <span>
                        {address}
                        <br />
                        {city}, {state} {postalCode}
                      </span>
                    </p>
                  )}
                  {phone && (
                    <a
                      href={phoneHref}
                      className="flex items-center gap-3 text-sm transition-opacity duration-200 hover:opacity-100"
                      style={{ color: 'var(--footer-text)', opacity: 0.7 }}
                    >
                      <Phone size={16} />
                      {formattedPhone}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t"
          style={{ borderColor: 'color-mix(in srgb, var(--footer-text) 15%, transparent)' }}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <p
                className="text-xs"
                style={{ color: 'var(--footer-text)', opacity: 0.6 }}
              >
                © {currentYear || '2025'} {agencyName || 'Company'}. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href={locationPrefix ? `${locationPrefix}/privacy` : '/privacy'}
                  className="text-xs transition-opacity duration-200 hover:opacity-100"
                  style={{ color: 'var(--footer-text)', opacity: 0.6 }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href={locationPrefix ? `${locationPrefix}/terms` : '/terms'}
                  className="text-xs transition-opacity duration-200 hover:opacity-100"
                  style={{ color: 'var(--footer-text)', opacity: 0.6 }}
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-40 transition-all duration-300 ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)',
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      </footer>

      {/* Social Links Modal */}
      {socialLinksModalData && (
        <SocialLinksModal
          isOpen={isSocialLinksModalOpen}
          onClose={() => setIsSocialLinksModalOpen(false)}
          socialLinksData={socialLinksModalData}
          isMultiLocation={isMultiLocation}
        />
      )}
    </>
  );
};

export default Footer;
