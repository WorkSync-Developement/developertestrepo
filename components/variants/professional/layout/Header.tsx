"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

interface HeaderProps {
  websiteName?: string;
  phone?: string;
  locationPrefix?: string;
  logoUrl?: string;
  showSiteName?: boolean;
  features?: {
    show_blog?: boolean;
    show_faq_page?: boolean;
    show_glossary?: boolean;
    show_careers_page?: boolean;
  };
  navbarSettings?: any;
  ctaSettings?: any;
  locations?: Array<{
    id: string;
    location_name: string;
    location_slug: string;
    city?: string;
    state?: string;
  }>;
}

export default function Header(props: HeaderProps): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);

  const {
    websiteName = "Insurance Agency",
    phone,
    logoUrl,
    showSiteName = true,
    locationPrefix = "",
    features = {},
    locations = [],
  } = props;

  const isMultiLocation = locations && locations.length > 1;

  const navItems = [
    { label: "Home", href: locationPrefix || "/", show: true },
    { label: "About", href: `${locationPrefix}/about`, show: true },
    { label: "Blog", href: `${locationPrefix}/blog`, show: features.show_blog },
    {
      label: "FAQ",
      href: `${locationPrefix}/faq`,
      show: features.show_faq_page,
    },
    {
      label: "Careers",
      href: `${locationPrefix}/apply`,
      show: features.show_careers_page,
    },
    { label: "Contact", href: `${locationPrefix}/contact`, show: true },
  ].filter((item) => item.show);

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 lg:px-8 py-4">
        <div
          className="flex items-center justify-between gap-4 rounded-full border px-6 py-3 shadow-sm backdrop-blur"
          style={{
            backgroundColor: "var(--navbar-pill-bg, rgba(255, 255, 255, 0.9))",
            borderColor: "var(--navbar-pill-border, rgba(255, 255, 255, 0.2))",
            color: "var(--navbar-text-color, #0e0f11)",
          }}
        >
          {/* Logo */}
          <Link
            href={locationPrefix || "/"}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${websiteName} Logo`}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <div
                className="text-lg font-semibold tracking-tight"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  color: "var(--navbar-text-color, #0e0f11)",
                }}
              >
                {showSiteName && websiteName}
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium uppercase tracking-[0.18em] transition-opacity duration-200 hover:opacity-60"
                style={{ color: "var(--navbar-text-color, #0e0f11)" }}
              >
                {item.label}
              </Link>
            ))}

            {/* Locations Dropdown in Nav */}
            {isMultiLocation && (
              <div className="relative">
                <button
                  onClick={() =>
                    setLocationsDropdownOpen(!locationsDropdownOpen)
                  }
                  onBlur={() =>
                    setTimeout(() => setLocationsDropdownOpen(false), 200)
                  }
                  className="flex items-center gap-1 text-[13px] font-medium uppercase tracking-[0.18em] transition-opacity duration-200 hover:opacity-60"
                  style={{ color: "var(--navbar-text-color, #0e0f11)" }}
                >
                  Locations
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${locationsDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {locationsDropdownOpen && (
                  <div
                    className="absolute top-full mt-3 w-60 rounded-2xl shadow-lg py-2 border"
                    style={{
                      backgroundColor: "var(--color-background-alt, #ffffff)",
                      borderColor: "var(--divider-color, rgba(0, 0, 0, 0.08))",
                    }}
                  >
                    {locations.map((location) => (
                      <Link
                        key={location.id}
                        href={`/locations/${location.location_slug}`}
                        className="block px-4 py-2.5 hover:bg-gray-50 transition-colors"
                        style={{
                          color: "var(--color-text-primary, #1a1a1a)",
                        }}
                      >
                        <div className="font-medium text-sm">
                          {location.location_name}
                        </div>
                        {(location.city || location.state) && (
                          <div
                            className="text-xs mt-0.5"
                            style={{
                              color: "var(--color-text-muted, #6B7280)",
                            }}
                          >
                            {location.city}
                            {location.city && location.state && ", "}
                            {location.state}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* CTA Button - Right Side */}
          <div className="hidden lg:block">
            <Link
              href={`${locationPrefix}/contact`}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: "var(--navbar-cta-bg, #000000)",
                color: "var(--navbar-cta-text, #ffffff)",
                border: "1px solid var(--navbar-cta-border, rgba(0, 0, 0, 0))",
              }}
            >
              Get started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 transition-opacity hover:opacity-70"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X
                size={22}
                style={{ color: "var(--navbar-text-color, #0e0f11)" }}
              />
            ) : (
              <Menu
                size={22}
                style={{ color: "var(--navbar-text-color, #0e0f11)" }}
              />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden mt-4 rounded-3xl border p-4 shadow-sm"
            style={{
              backgroundColor: "var(--navbar-mobile-bg, #ffffff)",
              borderColor: "var(--divider-color, rgba(0, 0, 0, 0.08))",
            }}
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 px-4 text-sm font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
                  style={{
                    color: "var(--color-text-primary, #1a1a1a)",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Locations Section (Mobile) */}
              {isMultiLocation && (
                <>
                  <button
                    onClick={() =>
                      setLocationsDropdownOpen(!locationsDropdownOpen)
                    }
                    className="flex items-center justify-between w-full py-3 px-4 text-sm font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
                    style={{
                      color: "var(--color-text-primary, #1a1a1a)",
                    }}
                  >
                    Locations
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${locationsDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {locationsDropdownOpen && (
                    <div className="pl-4 space-y-1">
                      {locations.map((location) => (
                        <Link
                          key={location.id}
                          href={`/locations/${location.location_slug}`}
                          className="block py-2.5 px-4 transition-opacity hover:opacity-60"
                          style={{
                            color: "var(--color-text-primary, #1a1a1a)",
                          }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="font-medium text-sm">
                            {location.location_name}
                          </div>
                          {(location.city || location.state) && (
                            <div
                              className="text-xs mt-0.5"
                              style={{
                                color: "var(--color-text-muted, #6B7280)",
                              }}
                            >
                              {location.city}
                              {location.city && location.state && ", "}
                              {location.state}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* CTA Button (Mobile) */}
            <div className="mt-5 px-4">
              <Link
                href={`${locationPrefix}/contact`}
                className="block text-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: "var(--navbar-cta-bg, #000000)",
                  color: "var(--navbar-cta-text, #ffffff)",
                  border: "1px solid var(--navbar-cta-border, rgba(0, 0, 0, 0))",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Get started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
