'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';

// Lehmann Agency Color Palette
const colors = {
  primary: '#506A7E',
  dark: '#3D5466',
  accent: '#C9A962',
  light: '#F5F7F9',
  white: '#FFFFFF',
};

interface ContactCTAProps {
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
}

const ContactCTA: React.FC<ContactCTAProps> = ({
  phone,
  email,
  address,
  city,
  state,
}) => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden" style={{ backgroundColor: colors.light }}>
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23506A7E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p 
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: colors.accent }}
            >
              Get In Touch
            </p>
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.dark }}>
              Ready to Get Protected?
            </h2>
            <p className="text-lg mb-8" style={{ color: colors.primary }}>
              Contact us today for a free, no-obligation consultation. Our experienced team is ready 
              to help you find the perfect coverage for your needs.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              {phone && (
                <a 
                  href={`tel:${normalizePhoneNumber(phone)}`}
                  className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:shadow-md group"
                  style={{ backgroundColor: colors.white }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <Phone size={20} style={{ color: colors.dark }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.primary }}>Call Us</p>
                    <p className="font-bold" style={{ color: colors.dark }}>{formatPhoneNumber(phone)}</p>
                  </div>
                </a>
              )}

              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:shadow-md group"
                  style={{ backgroundColor: colors.white }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.primary }}>Email Us</p>
                    <p className="font-bold" style={{ color: colors.dark }}>{email}</p>
                  </div>
                </a>
              )}

              {(address || city) && (
                <div 
                  className="flex items-center gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: colors.white }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors.dark }}
                  >
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.primary }}>Visit Us</p>
                    <p className="font-bold" style={{ color: colors.dark }}>
                      {address && `${address}, `}{city}{state && `, ${state}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right CTA Card with Quick Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-8 shadow-2xl"
            style={{ backgroundColor: colors.dark }}
          >
            <h3 className="text-2xl font-bold text-white mb-2 text-center">
              Get a Free Quote
            </h3>
            <p className="text-white/70 mb-6 text-center text-sm">
              Quick response within 24 hours
            </p>

            {/* Quick Contact Form */}
            <form className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.accent, color: colors.dark }}
              >
                <Send size={18} />
                Request Quote
              </button>
            </form>

            <div className="text-center border-t border-white/20 pt-4">
              <p className="text-white/60 text-xs mb-3">Or call us directly</p>
              {phone && (
                <a
                  href={`tel:${normalizePhoneNumber(phone)}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-medium border border-white/30 text-white transition-all duration-300 hover:bg-white/10"
                >
                  <Phone size={16} />
                  {formatPhoneNumber(phone)}
                </a>
              )}
            </div>

            {/* Office Hours */}
            <div className="flex items-center justify-center gap-2 mt-4 text-white/50 text-xs">
              <Clock size={14} />
              <span>Mon-Fri 9am-5pm • Same-day response</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
