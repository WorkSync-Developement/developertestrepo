'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Search, MapPin, Menu, X, Home, Briefcase, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from 'components/search/SearchBar';
import { normalizePhoneNumber } from '@/lib/utils';
import type { NavbarSettings, CtaSettings } from '@/lib/types/theme';

interface LocationItem {
  id: string;
  location_slug: string;
  city: string;
  state: string;
}

interface HeaderBarProps {
  websiteName?: string;
  phone?: string;
  locationPrefix?: string;
  logoUrl?: string | null;
  showSiteName?: boolean;
  features?: {
    show_blog?: boolean;
    show_glossary?: boolean;
    show_faq_page?: boolean;
    show_careers_page?: boolean;
    multi_location?: boolean;
  };
  navbarSettings?: NavbarSettings;
  ctaSettings?: CtaSettings;
  locations?: LocationItem[];
}

const ModernHeaderBar: React.FC<HeaderBarProps> = ({ 
  websiteName, 
  phone, 
  locationPrefix, 
  logoUrl, 
  showSiteName = true, 
  features, 
  navbarSettings, 
  ctaSettings, 
  locations 
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Feature flags with defaults
  const showBlog = features?.show_blog ?? true;
  const showGlossary = features?.show_glossary ?? true;
  const showFaq = features?.show_faq_page ?? true;
  const showCareers = features?.show_careers_page ?? true;
  const isMultiLocation = features?.multi_location ?? false;

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchVisible(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Build navigation items
  const buildNavigation = () => {
    const baseUrl = locationPrefix || '';
    
    const navigation = [
      {
        label: 'Home',
        href: baseUrl || '/',
        icon: Home,
      },
      {
        label: 'Services',
        href: `${baseUrl}/policies`,
        icon: Briefcase,
        dropdown: [
          { label: 'All Policies', href: `${baseUrl}/policies` },
          { label: 'Auto Insurance', href: `${baseUrl}/policies/auto-insurance` },
          { label: 'Home Insurance', href: `${baseUrl}/policies/home-insurance` },
          { label: 'Life Insurance', href: `${baseUrl}/policies/life-insurance` },
          { label: 'Business Insurance', href: `${baseUrl}/policies/business-insurance` },
        ]
      },
      {
        label: 'About',
        href: `${baseUrl}/about`,
      },
      {
        label: 'Contact',
        href: `${baseUrl}/contact`,
        icon: Mail,
      },
    ];

    // Add locations dropdown if multi-location
    if (isMultiLocation && locations && locations.length > 0) {
      navigation.push({
        label: 'Locations',
        href: `${baseUrl}/locations`,
        icon: MapPin,
        dropdown: locations.map(loc => ({
          label: `${loc.city}, ${loc.state}`,
          href: `/locations/${loc.location_slug}`
        }))
      } as any);
    }

    // Add resources if features are enabled
    const resourceDropdown: any[] = [];
    if (showBlog) resourceDropdown.push({ label: 'Blog', href: `${baseUrl}/blog` });
    if (showGlossary) resourceDropdown.push({ label: 'Glossary', href: `${baseUrl}/glossary` });
    if (showFaq) resourceDropdown.push({ label: 'FAQ', href: `${baseUrl}/faq` });
    if (showCareers) resourceDropdown.push({ label: 'Careers', href: `${baseUrl}/apply` });

    if (resourceDropdown.length > 0) {
      navigation.push({
        label: 'Resources',
        href: '#',
        dropdown: resourceDropdown
      } as any);
    }

    return navigation;
  };

  const navigation = buildNavigation();

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white shadow-lg border-b border-brand/20' 
            : 'bg-white shadow-md border-b border-brand/20'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={locationPrefix || '/'} className="flex items-center gap-3 group transition-all duration-300">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt={websiteName || "Lehmann Agency"}
                  width={140}
                  height={50}
                  className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              {showSiteName && websiteName && (
                <span className="hidden md:inline font-bold text-xl text-gray-900">
                  {websiteName}
                </span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <div key={index} className="relative group">
                  {item.dropdown ? (
                    <>
                      <button
                        onMouseEnter={() => setActiveDropdown(item.label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 text-gray-700 hover:text-brand hover:bg-brand/10`}
                      >
                        {item.icon && <item.icon size={16} />}
                        {item.label}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            onMouseEnter={() => setActiveDropdown(item.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200/50 overflow-hidden"
                          >
                            <div className="py-2">
                              {item.dropdown.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-brand transition-all duration-200"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 text-gray-700 hover:text-brand hover:bg-brand/10`}
                    >
                      {item.icon && <item.icon size={16} />}
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Search Button */}
              <button
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                    : 'text-gray-100 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`tel:${normalizePhoneNumber(navbarSettings?.phone || phone)}`}
                  className="ml-4 inline-flex items-center gap-2 px-6 py-3 bg-brand via-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50"
                >
                  <Phone size={16} />
                  <span>{navbarSettings?.text || 'Call Today'}</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                  : 'text-gray-100 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 bg-white"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <SearchBar
                  variant="fullwidth"
                  placeholder="Search for insurance, policies, FAQs..."
                  onClose={() => setIsSearchVisible(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <span className="text-lg font-bold text-gray-900">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-4 space-y-2">
                {navigation.map((item, index) => (
                  <div key={index}>
                    {item.dropdown ? (
                      <div className="space-y-1">
                        <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                          {item.label}
                        </div>
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-brand rounded-lg transition-all duration-200"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-brand rounded-lg transition-all duration-200 font-medium"
                      >
                        {item.icon && <item.icon size={18} />}
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200 mt-auto">
                <Link
                  href={`tel:${normalizePhoneNumber(navbarSettings?.phone || phone)}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-brand to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
                >
                  <Phone size={18} />
                  <span>{navbarSettings?.text || 'Call Today'}</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernHeaderBar;
