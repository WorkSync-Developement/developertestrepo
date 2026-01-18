'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ModernCTASectionProps {
  subtitle?: string;
  description?: string;
  multiLocation?: boolean;
  phone?: string;
  locations?: any[];
}

const ModernCTASection: React.FC<ModernCTASectionProps> = ({
  subtitle = "Ready to Get Started?",
  description = "Contact us today to learn how we can help protect what matters most.",
  multiLocation = false,
  phone,
  locations = []
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Brand background */}
      <div className="absolute inset-0 bg-brand" />
      
      {/* Animated mesh gradient */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(54, 79, 107, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d4af37]/15 backdrop-blur-md rounded-full mb-8 shadow-lg border border-[#d4af37]/30"
          >
            <Sparkles size={16} className="text-[#d4af37]" />
            <span className="text-sm font-semibold text-white">Get Your Free Quote</span>
          </motion.div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {subtitle}
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            {multiLocation && locations.length > 0 ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/locations"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <MapPin size={20} />
                    <span>Find a Location</span>
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border-2 border-[#d4af37]/50 text-white font-semibold hover:bg-white/15 hover:border-[#d4af37] transition-all duration-300"
                  >
                    <Calendar size={20} />
                    <span>Request a Consultation</span>
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Calendar size={20} />
                    <span>Request a Consultation</span>
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
                {phone && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a 
                      href={`tel:${phone.replace(/\D/g, '')}`}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border-2 border-[#d4af37]/50 text-white font-semibold hover:bg-white/15 hover:border-[#d4af37] transition-all duration-300"
                    >
                      <Phone size={20} />
                      <span>Call Us Today</span>
                    </a>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>

          {/* Info Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8 border-t border-white/10"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
                <span className="text-sm font-medium">Available 24/7</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/30 rounded-full" />
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#d4af37]" />
                <span className="text-sm">Monday - Friday, 9 AM - 5 PM</span>
              </div>
              {phone && (
                <>
                  <div className="hidden sm:block w-1 h-1 bg-white/30 rounded-full" />
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[#d4af37]" />
                    <span className="text-sm font-semibold">{phone}</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernCTASection;
