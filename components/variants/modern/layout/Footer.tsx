'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';
import SocialLinksModal from '@/components/layout/SocialLinksModal';
import type { SocialLinksModalData } from '@/lib/types/social-links';

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
  allLocations?: Array<{
    id: string;
    location_name: string;
    address_line_1?: string;
    city: string;
    state: string;
    zip: string;
    phone?: string;
    location_slug: string;
  }>;
  socialLinksModalData?: SocialLinksModalData;
}

export default function Footer({
  agencyName,
  city,
  state,
  postalCode,
  phone,
  address,
  locationPrefix,
  locationName,
  socialLinks,
  badges,
  tagline,
  isMultiLocation,
  footerLogoUrl,
  allLocations = [],
  socialLinksModalData,
}: FooterProps) {
  const [currentYear, setCurrentYear] = useState('');
  const [isSocialLinksModalOpen, setIsSocialLinksModalOpen] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const basePath = locationPrefix || '';
  const formattedPhone = formatPhoneNumber(phone);
  const phoneHref = phone ? `tel:+1${phone.replace(/\D/g, '')}` : undefined;

  const quickLinks = [
    { label: 'Home', href: basePath || '/' },
    { label: 'About', href: `${basePath}/about` },
    { label: 'Policies', href: `${basePath}/policies` },
    { label: 'Contact', href: `${basePath}/contact` },
  ];

  return (
    <footer
      className="relative bg-theme-bg-alt"
      style={{
        backgroundColor: 'var(--footer-bg, var(--color-background-alt))',
        color: 'var(--footer-text-secondary, var(--color-text-body))',
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {footerLogoUrl && (
              <Image
                src={footerLogoUrl}
                alt={`${agencyName || 'Company'} logo`}
                width={140}
                height={50}
                className="h-12 w-auto mb-4 object-contain"
              />
            )}
            {agencyName && (
              <h3
                className="text-xl font-heading font-bold mb-3"
                style={{ color: 'var(--footer-text, var(--color-text-primary))' }}
              >
                {agencyName}
              </h3>
            )}
            {tagline && (
              <p className="text-sm mb-4 opacity-80">{tagline}</p>
            )}
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-3 py-1 text-xs rounded-full border"
                    style={{
                      borderColor: 'var(--footer-badge-bg, var(--color-secondary))',
                      backgroundColor: 'color-mix(in srgb, var(--footer-badge-bg, var(--color-secondary)) 15%, transparent)',
                      color: 'var(--footer-text, var(--color-text-primary))',
                    }}
                  >
                    {badge.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-heading font-semibold text-lg mb-4"
              style={{ color: 'var(--footer-text, var(--color-text-primary))' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-70 inline-block"
                    style={{ color: 'var(--footer-text-secondary, var(--color-text-body))' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {socialLinksModalData && socialLinksModalData.locations.length > 0 && (
                <li>
                  <button
                    onClick={() => setIsSocialLinksModalOpen(true)}
                    className="text-sm transition-colors hover:opacity-70 text-left"
                    style={{ color: 'var(--footer-text-secondary, var(--color-text-body))' }}
                  >
                    Social Links
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="font-heading font-semibold text-lg mb-4"
              style={{ color: 'var(--footer-text, var(--color-text-primary))' }}
            >
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              {address && (
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 opacity-70" />
                  <div>
                    <p>{address}</p>
                    {(city || state || postalCode) && (
                      <p>
                        {city && `${city}, `}
                        {state} {postalCode}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {phoneHref && (
                <a
                  href={phoneHref}
                  className="flex items-center gap-2 transition-colors hover:opacity-70"
                >
                  <Phone size={16} className="opacity-70" />
                  <span>{formattedPhone}</span>
                </a>
              )}
            </div>
          </div>

          {/* Locations (if multi-location) */}
          {isMultiLocation && allLocations.length > 0 && (
            <div>
              <h4
                className="font-heading font-semibold text-lg mb-4"
                style={{ color: 'var(--footer-text, var(--color-text-primary))' }}
              >
                Locations
              </h4>
              <ul className="space-y-2 text-sm">
                {allLocations.slice(0, 4).map((location) => (
                  <li key={location.id}>
                    <Link
                      href={`/locations/${location.location_slug}`}
                      className="transition-colors hover:opacity-70 inline-block"
                      style={{ color: 'var(--footer-text-secondary, var(--color-text-body))' }}
                    >
                      {location.location_name || `${location.city}, ${location.state}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t" style={{ borderColor: 'var(--divider-color, var(--color-secondary))' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="opacity-70">
              © {currentYear} {agencyName || 'Company'}. All rights reserved.
            </p>
            {socialLinks && (
              <div className="flex items-center gap-4">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Facebook"
                  >
                    <span className="text-sm">Facebook</span>
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Instagram"
                  >
                    <span className="text-sm">Instagram</span>
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="LinkedIn"
                  >
                    <span className="text-sm">LinkedIn</span>
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="YouTube"
                  >
                    <span className="text-sm">YouTube</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {socialLinksModalData && (
        <SocialLinksModal
          isOpen={isSocialLinksModalOpen}
          onClose={() => setIsSocialLinksModalOpen(false)}
          data={socialLinksModalData}
        />
      )}
    </footer>
  );
}
