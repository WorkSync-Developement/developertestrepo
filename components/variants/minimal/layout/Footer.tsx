'use client';

import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';

interface Location {
  id: string;
  location_name: string;
  address_line_1?: string;
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
  locationPrefix,
  isMultiLocation,
  allLocations,
}: FooterProps) {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const formattedPhone = formatPhoneNumber(phone);
  const normalizedPhone = normalizePhoneNumber(phone);
  const phoneHref = normalizedPhone ? `tel:${normalizedPhone}` : undefined;

  const quickLinks = [
    { label: 'Home', href: locationPrefix || '/' },
    { label: 'About', href: `${locationPrefix || ''}/about` },
    { label: 'Policies', href: `${locationPrefix || ''}/policies` },
    { label: 'Contact', href: `${locationPrefix || ''}/contact` },
  ];

  return (
    <footer className="border-t" style={{ borderColor: 'var(--color-text-muted)', borderWidth: '1px', opacity: 0.2 }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Column 1 - Brand */}
          <div className="space-y-4">
            <h3
              className="text-2xl font-light tracking-wide"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {agencyName}
            </h3>
            <div className="w-12 h-px" style={{ backgroundColor: 'var(--color-primary)' }} />
          </div>

          {/* Column 2 - Links */}
          <div className="space-y-4">
            <h4
              className="text-sm uppercase tracking-widest font-light"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Navigate
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-light transition-opacity hover:opacity-60"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div className="space-y-4">
            <h4
              className="text-sm uppercase tracking-widest font-light"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Contact
            </h4>
            {isMultiLocation && allLocations && allLocations.length > 0 ? (
              <div className="space-y-4">
                {allLocations.map((location) => (
                  <div key={location.id} className="text-sm font-light space-y-1" style={{ color: 'var(--color-text-body)' }}>
                    <p className="font-normal">{location.city}, {location.state}</p>
                    {location.phone && (
                      <a href={`tel:${normalizePhoneNumber(location.phone)}`} className="block hover:opacity-60">
                        {formatPhoneNumber(location.phone)}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 text-sm font-light" style={{ color: 'var(--color-text-body)' }}>
                {address && <p>{address}</p>}
                {city && <p>{city}, {state} {postalCode}</p>}
                {phone && (
                  <a href={phoneHref} className="block hover:opacity-60">
                    {formattedPhone}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t text-center text-sm font-light" style={{ borderColor: 'var(--color-text-muted)', borderWidth: '1px', opacity: 0.2, color: 'var(--color-text-muted)' }}>
          <p>&copy; {currentYear || '2025'} {agencyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
