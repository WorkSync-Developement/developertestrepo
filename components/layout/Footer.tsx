'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';
import { Divider } from '@/components/ui/Divider';
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Footer({ agencyName, city, state, postalCode, phone, address, socialLinks, badges, tagline, locationPrefix, locationName, isMultiLocation, footerLogoUrl, allLocations, socialLinksModalData }: FooterProps) {
  // Use state to handle values that would cause hydration mismatch
  const [currentYear, setCurrentYear] = useState('');
  const [isSocialLinksModalOpen, setIsSocialLinksModalOpen] = useState(false);

  // Only update on client-side to prevent hydration errors
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const formattedPhone = formatPhoneNumber(phone);
  const normalizedPhone = normalizePhoneNumber(phone);
  const phoneHref = normalizedPhone ? `tel:${normalizedPhone}` : undefined;

  const showLocationDepedentPage = isMultiLocation ? locationPrefix : true;
  const showCorePage = isMultiLocation ? locationPrefix : true;

  return (
    <footer className="w-full bg-primary text-primary-foreground py-12 sm:py-16">
      <Divider position="top" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            {footerLogoUrl && (
              <Image
                // src={footerLogoUrl || '/logo-removebg-preview.png'}
                src={'/logo-removebg-preview.png'}
                alt={agencyName || "Logo"}
                width={140}
                height={50}
                className="h-16 w-auto block mb-4"
              />
            )}
            <h3 className="font-bold text-lg mb-4">{agencyName || "Agency"}</h3>
            {tagline ? (
              <p className="text-sm text-primary-foreground/80">
                {tagline}
              </p>
            ) : (
              <p className="text-sm text-primary-foreground/80">
                Your trusted local insurance partner for over 25 years.
              </p>
            )}
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="rounded px-2 py-1 text-xs bg-primary-foreground/15 text-primary-foreground/90"
                  >
                    {badge.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={locationPrefix || '/'} className="hover:text-accent transition">
                  Home
                </Link>
              </li>
              {showCorePage && (
                <li>
                  <Link href={locationPrefix ? `${locationPrefix}/about` : '/about'} className="hover:text-accent transition">
                    About Us
                  </Link>
                </li>
              )}
              {showLocationDepedentPage && (
                <li>
                  <Link href={locationPrefix ? `${locationPrefix}/policies` : '/policies'} className="hover:text-accent transition">
                    Policies
                  </Link>
                </li>
              )}
              {showCorePage && (
                <li>
                  <Link href={locationPrefix ? `${locationPrefix}/faq` : '/faq'} className="hover:text-accent transition">
                    FAQs
                  </Link>
                </li>
              )}
              {showLocationDepedentPage && (
                <li>
                  <Link href={locationPrefix ? `${locationPrefix}/blog` : '/blog'} className="hover:text-accent transition">
                    Blog
                  </Link>
                </li>
              )}
              {showCorePage && (
                <li>
                  <Link href={locationPrefix ? `${locationPrefix}/contact` : '/contact'} className="hover:text-accent transition">
                    Contact
                  </Link>
                </li>
              )}
              {socialLinksModalData && socialLinksModalData.locations.length > 0 && (
                <li>
                  <button
                    onClick={() => setIsSocialLinksModalOpen(true)}
                    className="hover:text-accent transition cursor-pointer text-left"
                  >
                    Social Links
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Services / Policies */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            {showLocationDepedentPage ? (
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={locationPrefix ? `${locationPrefix}/policies` : '/policies'}
                    className="hover:text-accent transition"
                  >
                    View All Policies
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={locationPrefix ? `${locationPrefix}/policies` : '/policies'} className="hover:text-accent transition">
                    Home Insurance
                  </Link>
                </li>
                <li>
                  <Link href={locationPrefix ? `${locationPrefix}/policies` : '/policies'} className="hover:text-accent transition">
                    Auto Insurance
                  </Link>
                </li>
                <li>
                  <Link href={locationPrefix ? `${locationPrefix}/policies` : '/policies'} className="hover:text-accent transition">
                    Business Insurance
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            {isMultiLocation && allLocations && allLocations.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {allLocations.map((location, idx) => {
                  const locPhone = formatPhoneNumber(location.phone);
                  const locPhoneHref = location.phone ? `tel:${normalizePhoneNumber(location.phone)}` : undefined;
                  const locAddress = location.address_line_1 || '';

                  return (
                    <li key={location.id} className={idx > 0 ? "pt-2" : ""}>
                      {location.phone && (
                        <div className="mb-1">
                          <a href={locPhoneHref} className="hover:text-accent transition">
                            📞 {locPhone}
                          </a>
                        </div>
                      )}
                      <div className="text-primary-foreground/80">
                        {location.location_name}: {locAddress}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="space-y-2 text-sm">
                {!!phone && (
                  <li>
                    <a href={phoneHref} className="hover:text-accent transition">
                      📞 {formattedPhone}
                    </a>
                  </li>
                )}
                {address && (
                  <li className="pt-2 text-primary-foreground/80">
                    {address}
                  </li>
                )}
                {(city || state || postalCode) && (
                  <li className="text-primary-foreground/80">
                    <span className="capitalize">{city || ''}</span>{city && state ? ', ' : ''}{state || ''} {postalCode || ''}
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/80">
            <p>&copy; {currentYear || '2025'} <span className="capitalize">{agencyName || ""}</span>. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-accent transition">
                Terms of Service
              </Link>
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
};
