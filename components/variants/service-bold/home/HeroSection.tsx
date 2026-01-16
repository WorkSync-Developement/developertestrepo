'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, Award, Shield, Star, CheckCircle } from 'lucide-react';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';

// Lehmann Agency Color Palette
const colors = {
  primary: '#506A7E',
  dark: '#3D5466',
  accent: '#C9A962',
  light: '#F5F7F9',
  white: '#FFFFFF',
};

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundMediaType?: 'image' | 'video';
  phone?: string;
  city?: string;
  state?: string;
  agencyName?: string;
}

// Trust badges - UI labels only
const trustBadges = [
  { icon: Shield, text: 'Licensed & Insured' },
  { icon: Star, text: '5-Star Rated' },
  { icon: CheckCircle, text: 'Trusted Local Agency' },
];

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundVideo,
  backgroundMediaType = 'image',
  phone,
  city,
  state,
  agencyName,
}) => {
  // Parallax scroll effect
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Don't render if no title from database
  if (!title) return null;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {backgroundMediaType === 'video' && backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-110"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <Image
            src={backgroundImage}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover scale-110"
            alt="Hero background"
          />
        ) : (
          <div 
            className="absolute inset-0"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)` 
            }}
          />
        )}
      </motion.div>

      {/* Overlay */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(135deg, rgba(61, 84, 102, 0.9) 0%, rgba(80, 106, 126, 0.7) 100%)' 
        }}
      />

      {/* Content with Parallax */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        style={{ y: contentY, opacity }}
      >
        <div className="max-w-3xl">
          {/* Badge */}
          {agencyName && city && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6 backdrop-blur-sm border border-white/20"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <Award size={18} style={{ color: colors.accent }} />
              <span className="text-white font-medium text-sm">
                {agencyName} - Serving {city}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-4"
          >
            {subtitle}
            {city && state && (
              <span style={{ color: colors.accent }}> in {city}, {state}</span>
            )}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-white/70 mb-8 max-w-xl"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ backgroundColor: colors.accent, color: colors.dark }}
            >
              Request a Free Consultation
            </Link>
            
            {phone && (
              <a
                href={`tel:${normalizePhoneNumber(phone)}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-lg border-2 border-white/30 text-white transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
              >
                <Phone size={20} />
                {formatPhoneNumber(phone)}
              </a>
            )}
          </motion.div>

          {/* Trust Badges Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-6 mt-2"
          >
            {trustBadges.map((badge, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 text-white/80"
              >
                <badge.icon size={18} style={{ color: colors.accent }} />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </motion.div>

    </section>
  );
};

export default HeroSection;
