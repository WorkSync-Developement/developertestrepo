'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Facebook, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#09314a',
        color: '#ffffff',
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10" style={{ background: 'radial-gradient(circle, #5b7c99, transparent)' }}></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {footerLogoUrl && (
              <Image
                src={footerLogoUrl}
                alt={`${agencyName || 'Company'} logo`}
                width={140}
                height={50}
                className="h-12 w-auto mb-6 object-contain filter brightness-0 invert"
              />
            )}
            {agencyName && (
              <h3 className="text-2xl font-heading font-bold mb-4 text-white">
                {agencyName}
              </h3>
            )}
            {tagline && (
              <p className="text-sm mb-6 text-white/80 leading-relaxed">{tagline}</p>
            )}
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-4 py-2 text-xs rounded-full font-medium"
                    style={{
                      backgroundColor: 'rgba(91, 124, 153, 0.2)',
                      color: '#ffffff',
                      border: '1px solid rgba(91, 124, 153, 0.3)',
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
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUp size={14} className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
              {socialLinksModalData && socialLinksModalData.locations.length > 0 && (
                <li>
                  <button
                    onClick={() => setIsSocialLinksModalOpen(true)}
                    className="text-sm text-white/80 hover:text-white transition-colors text-left inline-flex items-center gap-2 group"
                  >
                    <span>Social Links</span>
                    <ArrowUp size={14} className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-0 group-hover:opacity-100" />
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">
              Contact
            </h4>
            <div className="space-y-4 text-sm">
              {address && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(91, 124, 153, 0.2)' }}>
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div className="text-white/80">
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
                  className="flex items-center gap-3 transition-colors hover:text-white text-white/80 group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(91, 124, 153, 0.2)' }}>
                    <Phone size={16} className="text-white" />
                  </div>
                  <span>{formattedPhone}</span>
                </a>
              )}
            </div>
          </div>

          {/* Locations (if multi-location) */}
          {isMultiLocation && allLocations.length > 0 && (
            <div>
              <h4 className="font-heading font-semibold text-lg mb-6 text-white">
                Locations
              </h4>
              <ul className="space-y-3 text-sm">
                {allLocations.slice(0, 4).map((location) => (
                  <li key={location.id}>
                    <Link
                      href={`/locations/${location.location_slug}`}
                      className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <MapPin size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                      <span>{location.location_name || `${location.city}, ${location.state}`}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/70 text-sm">
              © {currentYear} {agencyName || 'Company'}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {socialLinks && (
                <div className="flex items-center gap-4">
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{ backgroundColor: 'rgba(91, 124, 153, 0.2)' }}
                      aria-label="Facebook"
                    >
                      <Facebook size={18} className="text-white" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{ backgroundColor: 'rgba(91, 124, 153, 0.2)' }}
                      aria-label="Instagram"
                    >
                      <Instagram size={18} className="text-white" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{ backgroundColor: 'rgba(91, 124, 153, 0.2)' }}
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} className="text-white" />
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{ backgroundColor: 'rgba(91, 124, 153, 0.2)' }}
                      aria-label="YouTube"
                    >
                      <Youtube size={18} className="text-white" />
                    </a>
                  )}
                </div>
              )}
              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(91, 124, 153, 0.3)' }}
                aria-label="Back to top"
              >
                <ArrowUp size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {socialLinksModalData && (
        <SocialLinksModal
          isOpen={isSocialLinksModalOpen}
          onClose={() => setIsSocialLinksModalOpen(false)}
          socialLinksData={socialLinksModalData}
          isMultiLocation={isMultiLocation}
        />
      )}
    </footer>
  );
}
