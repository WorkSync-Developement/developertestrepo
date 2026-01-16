'use client';

import Link from 'next/link';
import { Phone, MapPin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';

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
  socialLinksModalData?: {
    locations: Array<{
      location_id: string;
      location_name: string;
      city: string;
      state: string;
      links: Array<{
        platform: string;
        url: string;
        display_name?: string;
      }>;
    }>;
  };
}

export default function Footer({
  agencyName,
  city,
  state,
  postalCode,
  phone,
  address,
  socialLinks,
  badges,
  tagline,
  locationPrefix,
  locationName,
  isMultiLocation,
  footerLogoUrl,
  allLocations,
  socialLinksModalData,
}: FooterProps) {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const formattedPhone = formatPhoneNumber(phone);
  const normalizedPhone = normalizePhoneNumber(phone);
  const phoneHref = normalizedPhone ? `tel:${normalizedPhone}` : undefined;

  // Navigation items
  const quickLinks = [
    { label: 'Home', href: locationPrefix || '/', show: true },
    { label: 'About', href: `${locationPrefix || ''}/about`, show: true },
    { label: 'Policies', href: `${locationPrefix || ''}/policies`, show: true },
    { label: 'Contact', href: `${locationPrefix || ''}/contact`, show: true },
  ];

  const resourceLinks = [
    { label: 'Blog', href: `${locationPrefix || ''}/blog`, show: true },
    { label: 'FAQ', href: `${locationPrefix || ''}/faq`, show: true },
    { label: 'Glossary', href: `${locationPrefix || ''}/glossary`, show: true },
    { label: 'Careers', href: `${locationPrefix || ''}/apply`, show: true },
  ];

  return (
    <footer
      className="relative"
      style={{
        backgroundColor: 'var(--footer-bg, var(--color-primary))',
        color: 'var(--footer-text-secondary, var(--color-primary-foreground))',
      }}
    >
      {/* Top border accent */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - About */}
          <div className="space-y-6">
            {footerLogoUrl && (
              <img
                src={footerLogoUrl}
                alt={`${agencyName || 'Company'} logo`}
                className="h-16 w-auto"
              />
            )}
            {!footerLogoUrl && agencyName && (
              <h3
                className="text-2xl font-heading font-bold"
                style={{ color: 'var(--footer-text, var(--color-primary-foreground))' }}
              >
                {agencyName}
              </h3>
            )}
            {tagline && (
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: 'var(--footer-text-secondary, var(--color-primary-foreground))',
                  opacity: 0.9,
                }}
              >
                {tagline}
              </p>
            )}
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-secondary-foreground)',
                    }}
                  >
                    {badge.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4
              className="text-lg font-heading font-semibold mb-6"
              style={{ color: 'var(--footer-text, var(--color-primary-foreground))' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:translate-x-1 inline-block"
                    style={{
                      color: 'var(--footer-text-secondary, var(--color-primary-foreground))',
                      opacity: 0.9,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent)';
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        'var(--footer-text-secondary, var(--color-primary-foreground))';
                      e.currentTarget.style.opacity = '0.9';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h4
              className="text-lg font-heading font-semibold mb-6"
              style={{ color: 'var(--footer-text, var(--color-primary-foreground))' }}
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:translate-x-1 inline-block"
                    style={{
                      color: 'var(--footer-text-secondary, var(--color-primary-foreground))',
                      opacity: 0.9,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent)';
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        'var(--footer-text-secondary, var(--color-primary-foreground))';
                      e.currentTarget.style.opacity = '0.9';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4
              className="text-lg font-heading font-semibold mb-6"
              style={{ color: 'var(--footer-text, var(--color-primary-foreground))' }}
            >
              Contact Us
            </h4>
            {isMultiLocation && allLocations && allLocations.length > 0 ? (
              <div className="space-y-6">
                {allLocations.map((location) => (
                  <div key={location.id} className="space-y-2">
                    <h5
                      className="font-semibold text-sm"
                      style={{ color: 'var(--footer-text, var(--color-primary-foreground))' }}
                    >
                      {location.location_name}
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin
                          size={16}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: 'var(--color-accent)' }}
                        />
                        <span
                          style={{
                            color: 'var(--footer-text-secondary, var(--color-primary-foreground))',
                            opacity: 0.9,
                          }}
                        >
                          {location.address_line_1}
                          <br />
                          {location.city}, {location.state} {location.zip}
                        </span>
                      </div>
                      {location.phone && (
                        <div className="flex items-center gap-2">
                          <Phone
                            size={16}
                            className="flex-shrink-0"
                            style={{ color: 'var(--color-accent)' }}
                          />
                          <a
                            href={`tel:${normalizePhoneNumber(location.phone)}`}
                            className="hover:opacity-100 transition-opacity"
                            style={{
                              color:
                                'var(--footer-text-secondary, var(--color-primary-foreground))',
                              opacity: 0.9,
                            }}
                          >
                            {formatPhoneNumber(location.phone)}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: 'var(--color-accent)' }}
                  />
                  <span
                    style={{
                      color: 'var(--footer-text-secondary, var(--color-primary-foreground))',
                      opacity: 0.9,
                    }}
                  >
                    {address || ''}
                    <br />
                    {city}, {state} {postalCode}
                  </span>
                </div>
                {phone && (
                  <div className="flex items-center gap-3">
                    <Phone
                      size={18}
                      className="flex-shrink-0"
                      style={{ color: 'var(--color-accent)' }}
                    />
                    <a
                      href={phoneHref}
                      className="hover:opacity-100 transition-opacity"
                      style={{
                        color: 'var(--footer-text-secondary, var(--color-primary-foreground))',
                        opacity: 0.9,
                      }}
                    >
                      {formattedPhone}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="mt-12 pt-8 border-t text-sm text-center"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--footer-text-secondary, var(--color-primary-foreground))',
            opacity: 0.8,
          }}
        >
          <p>
            &copy; {currentYear || '2025'} {agencyName || ''}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
