import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import * as Label from "@radix-ui/react-label";

interface FooterProps {
  agencyName?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
  address?: string;
  locationName?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  badges?: any[];
  tagline?: string;
  locationPrefix?: string;
  isMultiLocation?: boolean;
  footerLogoUrl?: string;
  allLocations?: Array<{
    id: string;
    location_name: string;
    location_slug: string;
    city?: string;
    state?: string;
  }>;
  socialLinksModalData?: any;
}

export default function Footer(props: FooterProps): React.JSX.Element {
  const {
    agencyName = "Insurance Agency",
    city,
    state,
    postalCode,
    phone,
    address,
    locationName,
    socialLinks,
    badges,
    tagline,
    locationPrefix = "",
    isMultiLocation,
    footerLogoUrl,
    allLocations = [],
    socialLinksModalData,
  } = props;

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: locationPrefix || "/" },
    { label: "About", href: `${locationPrefix}/about` },
    { label: "Blog", href: `${locationPrefix}/blog` },
    { label: "FAQ", href: `${locationPrefix}/faq` },
    { label: "Contact", href: `${locationPrefix}/contact` },
  ];

  const socialIcons = [
    { name: "facebook", icon: Facebook, url: socialLinks?.facebook },
    { name: "twitter", icon: Twitter, url: socialLinks?.twitter },
    { name: "instagram", icon: Instagram, url: socialLinks?.instagram },
    { name: "linkedin", icon: Linkedin, url: socialLinks?.linkedin },
    { name: "youtube", icon: Youtube, url: socialLinks?.youtube },
  ].filter((social) => social.url);

  return (
    <footer
      className="py-16 md:py-20 mt-auto"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-primary-foreground, #ffffff)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-opacity-20"
          style={{
            borderColor: "var(--color-primary-foreground, #ffffff)",
          }}
        >
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                {agencyName}
              </h3>
              {tagline && (
                <p
                  className="text-sm opacity-80 leading-relaxed"
                  style={{ fontFamily: "var(--font-body, sans-serif)" }}
                >
                  {tagline}
                </p>
              )}
            </div>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <Label.Root
                htmlFor="newsletter-email"
                className="text-sm font-bold mb-3 uppercase tracking-wider block"
              >
                Join our newsletter
              </Label.Root>
              <p className="text-xs opacity-75 mb-4">
                Keep up to date with everything {agencyName}
              </p>
              <div className="flex gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "var(--color-primary-foreground, #ffffff)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
                <button
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "var(--color-secondary, #A7D8DE)",
                    color: "var(--color-accent-foreground, #ffffff)",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2.5 text-sm opacity-80">
              {address && (
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <div>{address}</div>
                    {(city || state || postalCode) && (
                      <div>
                        {city}
                        {city && (state || postalCode) && ", "}
                        {state} {postalCode}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="flex-shrink-0" />
                  <a
                    href={`tel:${phone}`}
                    className="text-xs hover:underline transition-all"
                  >
                    {phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Pages / Locations Section */}
          <div className="lg:col-span-2">
            <h4
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-heading, sans-serif)" }}
            >
              {isMultiLocation ? "Our Locations" : "Other Pages"}
            </h4>
            <ul className="space-y-2.5">
              {isMultiLocation ? (
                allLocations.map((location) => (
                  <li key={location.id}>
                    <Link
                      href={`/locations/${location.location_slug}`}
                      className="text-sm opacity-80 hover:opacity-100 transition-opacity block"
                    >
                      {location.location_name}
                      {(location.city || location.state) && (
                        <span className="block text-xs opacity-60 mt-0.5">
                          {location.city}
                          {location.city && location.state && ", "}
                          {location.state}
                        </span>
                      )}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link
                      href={`${locationPrefix}/privacy-policy`}
                      className="text-sm opacity-80 hover:opacity-100 transition-opacity block"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${locationPrefix}/terms`}
                      className="text-sm opacity-80 hover:opacity-100 transition-opacity block"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3">
            <h4
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-heading, sans-serif)" }}
            >
              Social
            </h4>
            {socialIcons.length > 0 ? (
              <>
                <div className="flex gap-3 mb-6">
                  {socialIcons.map(({ name, icon: Icon, url }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg transition-all hover:opacity-80"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                      aria-label={`Follow us on ${name}`}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
                <ul className="space-y-2.5">
                  {socialIcons.map(({ name, url }) => (
                    <li key={name}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm opacity-80 hover:opacity-100 transition-opacity block capitalize"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm opacity-60">Follow us on social media</p>
            )}
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-70">
          <p>
            &copy; {currentYear} {agencyName}, All rights reserved
          </p>
          <div className="flex gap-6">
            <Link
              href={`${locationPrefix}/privacy-policy`}
              className="hover:opacity-100 transition-opacity"
            >
              Privacy Policy
            </Link>
            <Link
              href={`${locationPrefix}/terms`}
              className="hover:opacity-100 transition-opacity"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
