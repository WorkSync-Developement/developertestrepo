import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Shield, Award, Clock, CheckCircle } from 'lucide-react';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';

// Lehmann Agency Color Palette
const colors = {
  primary: '#506A7E',
  dark: '#3D5466',
  accent: '#C9A962',
  light: '#F5F7F9',
  white: '#FFFFFF',
};

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
  phone?: string;
}

interface SocialLinksModalData {
  platforms?: Array<{
    platform_name: string;
    url: string;
  }>;
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
  agencyName = 'Insurance Agency',
  city,
  state,
  phone,
  address,
  locationPrefix,
  socialLinks,
  tagline,
  isMultiLocation,
  footerLogoUrl,
  allLocations,
}) => {
  const currentYear = new Date().getFullYear();

  const credentials = [
    { icon: Shield, text: 'Licensed & Insured' },
    { icon: Award, text: 'Top Rated Agency' },
    { icon: Clock, text: '24/7 Claims Support' },
    { icon: CheckCircle, text: 'Trusted Since 2010' },
  ];

  const quickLinks = [
    { label: 'Home', href: locationPrefix || '/' },
    { label: 'About Us', href: `${locationPrefix || ''}/about` },
    { label: 'Our Services', href: `${locationPrefix || ''}/policies` },
    { label: 'Contact', href: `${locationPrefix || ''}/contact` },
    { label: 'FAQ', href: `${locationPrefix || ''}/faq` },
  ];

  const insuranceLinks = [
    { label: 'Auto Insurance', href: `${locationPrefix || ''}/policies` },
    { label: 'Home Insurance', href: `${locationPrefix || ''}/policies` },
    { label: 'Business Insurance', href: `${locationPrefix || ''}/policies` },
    { label: 'Life Insurance', href: `${locationPrefix || ''}/policies` },
  ];

  return (
    <footer>
      {/* Credentials Strip */}
      <div style={{ backgroundColor: colors.accent }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {credentials.map((cred, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2">
                <cred.icon size={20} style={{ color: colors.dark }} />
                <span className="text-sm font-semibold" style={{ color: colors.dark }}>
                  {cred.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              {footerLogoUrl ? (
                <Image
                  src={footerLogoUrl}
                  alt={agencyName}
                  width={180}
                  height={60}
                  className="h-12 w-auto object-contain mb-4"
                />
              ) : (
                <h3 className="text-2xl font-bold text-white mb-4">{agencyName}</h3>
              )}
              
              {tagline && (
                <p className="text-white/70 mb-6">{tagline}</p>
              )}

              {/* Contact Info */}
              <div className="space-y-3">
                {phone && (
                  <a 
                    href={`tel:${normalizePhoneNumber(phone)}`}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Phone size={18} style={{ color: colors.accent }} />
                    {formatPhoneNumber(phone)}
                  </a>
                )}
                {address && (
                  <div className="flex items-start gap-3 text-white/80">
                    <MapPin size={18} className="flex-shrink-0 mt-0.5" style={{ color: colors.accent }} />
                    <span>{address}{city && state ? `, ${city}, ${state}` : ''}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Insurance Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Insurance</h4>
              <ul className="space-y-2">
                {insuranceLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations or CTA */}
            <div>
              {isMultiLocation && allLocations && allLocations.length > 0 ? (
                <>
                  <h4 className="text-lg font-bold text-white mb-4">Our Locations</h4>
                  <ul className="space-y-2">
                    {allLocations.slice(0, 5).map((loc) => (
                      <li key={loc.id}>
                        <Link 
                          href={`/locations/${loc.location_slug}`}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          {loc.city}, {loc.state}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h4 className="text-lg font-bold text-white mb-4">Get in Touch</h4>
                  <p className="text-white/70 mb-4">
                    Ready to protect what matters most? Contact us for a free consultation.
                  </p>
                  <Link
                    href={`${locationPrefix || ''}/contact`}
                    className="inline-flex items-center px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: colors.accent, color: colors.dark }}
                  >
                    Get a Free Quote
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60 text-sm">
                © {currentYear} {agencyName}. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
