'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, Shield, Award, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  const [isSocialLinksModalOpen, setIsSocialLinksModalOpen] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const formattedPhone = formatPhoneNumber(phone);
  const normalizedPhone = normalizePhoneNumber(phone);
  const phoneHref = normalizedPhone ? `tel:${normalizedPhone}` : undefined;

  const quickLinks = [
    { label: 'Home', href: locationPrefix || '/' },
    { label: 'About Us', href: locationPrefix ? `${locationPrefix}/about` : '/about' },
    { label: 'Our Policies', href: locationPrefix ? `${locationPrefix}/policies` : '/policies' },
    { label: 'Contact', href: locationPrefix ? `${locationPrefix}/contact` : '/contact' },
    { label: 'FAQ', href: locationPrefix ? `${locationPrefix}/faq` : '/faq' },
  ];

  const trustBadges = [
    { icon: Shield, label: 'Licensed & Insured' },
    { icon: Award, label: 'A+ BBB Rating' },
    { icon: Star, label: '5-Star Reviews' },
    { icon: Clock, label: '25+ Years Experience' },
  ];

  return (
    <footer className="w-full bg-primary text-primary-foreground">
      {/* Trust Badges Strip */}
      <div className="bg-primary-foreground/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <badge.icon size={20} className="text-accent" />
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              {footerLogoUrl && (
                <Image
                  src={footerLogoUrl}
                  alt={agencyName || 'Logo'}
                  width={160}
                  height={60}
                  className="h-14 w-auto mb-4"
                />
              )}
              <h3 className="font-bold text-xl mb-3">{agencyName || 'Agency'}</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
                {tagline || 'Your trusted local insurance partner. Protecting what matters most to you and your family.'}
              </p>
              
              {/* Custom Badges */}
              {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent"
                    >
                      {badge.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-accent rounded-full" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {socialLinksModalData && socialLinksModalData.locations.length > 0 && (
                  <li>
                    <button
                      onClick={() => setIsSocialLinksModalOpen(true)}
                      className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm cursor-pointer"
                    >
                      Social Media
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-accent rounded-full" />
                Our Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={locationPrefix ? `${locationPrefix}/policies` : '/policies'}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    Auto Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    href={locationPrefix ? `${locationPrefix}/policies` : '/policies'}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    Home Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    href={locationPrefix ? `${locationPrefix}/policies` : '/policies'}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    Life Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    href={locationPrefix ? `${locationPrefix}/policies` : '/policies'}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    Business Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    href={locationPrefix ? `${locationPrefix}/policies` : '/policies'}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm font-medium"
                  >
                    View All Policies →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-accent rounded-full" />
                Contact Us
              </h4>
              
              {isMultiLocation && allLocations && allLocations.length > 0 ? (
                <div className="space-y-4">
                  {allLocations.slice(0, 3).map((location) => (
                    <div key={location.id} className="text-sm">
                      <p className="font-semibold text-primary-foreground mb-1">
                        {location.location_name}
                      </p>
                      {location.phone && (
                        <a
                          href={`tel:${normalizePhoneNumber(location.phone)}`}
                          className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors duration-200 mb-1"
                        >
                          <Phone size={14} />
                          {formatPhoneNumber(location.phone)}
                        </a>
                      )}
                      <p className="flex items-start gap-2 text-primary-foreground/70">
                        <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                        <span>
                          {location.address_line_1 && `${location.address_line_1}, `}
                          {location.city}, {location.state} {location.zip}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  {phone && (
                    <a
                      href={phoneHref}
                      className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Phone size={18} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-primary-foreground/60">Call Us</p>
                        <p className="font-semibold">{formattedPhone}</p>
                      </div>
                    </a>
                  )}
                  {(address || city) && (
                    <div className="flex items-start gap-3 text-primary-foreground/80">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-primary-foreground/60">Visit Us</p>
                        <p className="font-semibold">
                          {address && <span className="block">{address}</span>}
                          {city && <span>{city}, {state} {postalCode}</span>}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
            <p>
              © {currentYear || '2025'} {agencyName || 'Agency'}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-accent transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links Modal */}
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
