'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
}

interface FooterProps {
  agencyName?: string;
  city?: string;
  state?: string;
  phone?: string;
  address?: string;
  locationPrefix?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  isMultiLocation?: boolean;
  footerLogoUrl?: string | null;
  allLocations?: Location[];
}

export default function ModernFooter({ 
  agencyName, 
  city, 
  state, 
  phone, 
  address, 
  socialLinks, 
  locationPrefix, 
  isMultiLocation, 
  footerLogoUrl, 
  allLocations 
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About Us', href: `${locationPrefix || ''}/about` },
    { label: 'Our Team', href: `${locationPrefix || ''}/our-team` },
    { label: 'Policies', href: `${locationPrefix || ''}/policies` },
    { label: 'FAQ', href: `${locationPrefix || ''}/faq` },
    { label: 'Blog', href: `${locationPrefix || ''}/blog` },
    { label: 'Contact', href: `${locationPrefix || ''}/contact` },
  ];

  const insuranceTypes = [
    { label: 'Auto Insurance', href: `${locationPrefix || ''}/policies/auto-insurance` },
    { label: 'Home Insurance', href: `${locationPrefix || ''}/policies/home-insurance` },
    { label: 'Life Insurance', href: `${locationPrefix || ''}/policies/life-insurance` },
    { label: 'Business Insurance', href: `${locationPrefix || ''}/policies/business-insurance` },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative bg-brand text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href={locationPrefix || '/'} className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Image
                  src={'/logo-removebg-preview.png'}
                  alt={agencyName || 'Lehmann Agency'}
                  width={140}
                  height={50}
                  className="w-auto h-10 md:h-12 object-contain brightness-0 invert"
                />
              </motion.div>
            </Link>
            
            <p className="text-gray-400 leading-relaxed">
              Your trusted insurance partner providing comprehensive coverage and personalized service.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {phone && (
                <motion.a
                  href={`tel:${normalizePhoneNumber(phone)}`}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="p-2 bg-brand/10 rounded-lg group-hover:bg-brand/10/20 transition-colors">
                    <Phone size={16} className="text-brand" />
                  </div>
                  <span>{formatPhoneNumber(phone)}</span>
                </motion.a>
              )}
              
              {address && city && state && (
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 text-gray-400"
                >
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <MapPin size={16} className="text-indigo-400" />
                  </div>
                  <span>{address}, {city}, {state}</span>
                </motion.div>
              )}
            </div>

            {/* Social Links */}
            {socialLinks && (
              <div className="flex gap-3">
                {socialLinks.facebook && (
                  <motion.a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/5 hover:bg-brand/10/20 rounded-xl border border-white/10 hover:border-brand/20/30 transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} className="text-brand" />
                  </motion.a>
                )}
                {socialLinks.instagram && (
                  <motion.a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/5 hover:bg-pink-500/20 rounded-xl border border-white/10 hover:border-pink-500/30 transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} className="text-pink-400" />
                  </motion.a>
                )}
                {socialLinks.linkedin && (
                  <motion.a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/5 hover:bg-brand/10/20 rounded-xl border border-white/10 hover:border-brand/20/30 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} className="text-brand" />
                  </motion.a>
                )}
              </div>
            )}
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 4 }}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <ArrowRight size={14} className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Insurance Types */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              {insuranceTypes.map((type, index) => (
                <motion.li key={index} whileHover={{ x: 4 }}>
                  <Link
                    href={type.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <ArrowRight size={14} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{type.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Locations or Newsletter */}
          <motion.div variants={itemVariants}>
            {isMultiLocation && allLocations && allLocations.length > 0 ? (
              <>
                <h3 className="text-lg font-bold text-white mb-6">Our Locations</h3>
                <ul className="space-y-3">
                  {allLocations.slice(0, 4).map((location, index) => (
                    <motion.li key={index} whileHover={{ x: 4 }}>
                      <Link
                        href={`/locations/${location.location_slug}`}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                      >
                        <MapPin size={14} className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{location.city}, {location.state}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-white mb-6">Stay Connected</h3>
                <p className="text-gray-400 mb-4">Get insurance tips and updates delivered to your inbox.</p>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-brand/20/50 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-brand to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Subscribe
                  </motion.button>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} {agencyName}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
