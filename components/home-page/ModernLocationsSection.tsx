'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
  address?: string;
  phone?: string;
}

interface ModernLocationsSectionProps {
  locations: Location[];
  title?: string;
  description?: string;
}

const ModernLocationsSection: React.FC<ModernLocationsSectionProps> = ({
  locations,
  title = "Find Coverage Near You",
  description = "Explore insurance policies available at each of our locations."
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      },
    },
  };

  return (
    <section ref={ref} className="relative py-24 bg-white to-white overflow-hidden">
      {/* Background effects */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(54, 79, 107, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 backdrop-blur-sm rounded-full mb-6 shadow-lg border border-[#d4af37]/30"
          >
            <MapPin size={16} className="text-brand" />
            <span className="text-sm font-semibold text-brand">Our Locations</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-brand">
            {title}
          </h2>
          <p className="text-xl text-brand/80 leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Location Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {locations.slice(0, 2).map((location) => (
            <motion.div
              key={location.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link href={`/locations/${location.location_slug}`}>
                <div className="group relative h-full bg-white backdrop-blur-md rounded-2xl overflow-hidden border border-brand/20 hover:border-[#d4af37]/30 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#d4af37]/20">
                  {/* Map Image with real map styling */}
                  <div className="relative h-48 overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent z-10" />
                    
                    {/* Map pattern background */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`grid-${location.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(54, 79, 107, 0.25)" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-${location.id})`} />
                      </svg>
                    </div>

                    {/* Animated route lines */}
                    <svg className="absolute inset-0 w-full h-full z-[5]">
                      <motion.path
                        d="M 20,60 Q 80,30 140,50 T 260,40"
                        fill="none"
                        stroke="rgba(54, 79, 107, 0.5)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </svg>

                    {/* Map markers */}
                    <div className="absolute inset-0 z-[6]">
                      <motion.div
                        className="absolute top-[30%] left-[40%]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-[#d4af37] rounded-full shadow-lg shadow-[#d4af37]/50" />
                      </motion.div>
                      <motion.div
                        className="absolute top-[60%] left-[70%]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full shadow-lg shadow-brand/40" />
                      </motion.div>
                    </div>
                    
                    {/* Floating map pin */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-brand rounded-full blur-xl opacity-50 animate-pulse" />
                        <div className="relative p-3 bg-brand rounded-full shadow-lg shadow-brand/50">
                          <MapPin size={24} className="text-white" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-brand mb-2 group-hover:text-[#d4af37] transition-colors">
                      {location.location_name}
                    </h3>
                    <p className="text-brand/70 mb-4 flex items-center gap-2">
                      <MapPin size={16} className="text-[#d4af37]" />
                      {location.city}, {location.state}
                    </p>

                    {location.address && (
                      <p className="text-sm text-brand/70 mb-3 line-clamp-2">
                        {location.address}
                      </p>
                    )}

                    {location.phone && (
                      <div className="flex items-center gap-2 text-sm text-brand/70 mb-4">
                        <Phone size={14} className="text-brand" />
                        <span>{location.phone}</span>
                      </div>
                    )}

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2 text-brand font-semibold group-hover:text-[#d4af37] transition-colors"
                    >
                      <span>View Policies</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Coming Soon Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="group relative h-full bg-white backdrop-blur-md rounded-2xl overflow-hidden border border-[#d4af37]/40 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#d4af37]/20">
              {/* Animated background */}
              <motion.div 
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(54, 79, 107, 0.12) 0%, transparent 50%)',
                  backgroundSize: '200% 200%',
                }}
              />

              {/* Map pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="coming-soon-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#coming-soon-grid)" />
                </svg>
              </div>

              {/* Map area with expanding circles */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Expanding circles animation */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-20 h-20 border-2 border-[#d4af37]/30 rounded-full"
                      animate={{
                        scale: [1, 2.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                  
                  {/* Center icon */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-10"
                  >
                    <div className="p-4 bg-[#d4af37] rounded-full shadow-lg shadow-[#d4af37]/50">
                      <TrendingUp size={32} className="text-white" />
                    </div>
                  </motion.div>
                </div>

                {/* Floating sparkles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + (i % 3) * 25}%`,
                    }}
                    animate={{
                      y: [-5, 5, -5],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  >
                    <Sparkles size={16} className="text-[#d4af37]" />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <div className="relative p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d4af37]/20 backdrop-blur-sm rounded-full mb-4 border border-[#d4af37]/40">
                  <Sparkles size={14} className="text-[#d4af37]" />
                  <span className="text-xs font-semibold text-[#d4af37]">Coming Soon</span>
                </div>

                <h3 className="text-2xl font-bold text-brand mb-2">
                  Expanding to More Areas
                </h3>
                <p className="text-brand/80 mb-4">
                  We're growing! New locations opening soon to serve you better.
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-brand/60">
                    <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
                    <span>New locations in planning</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand/60">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span>Serving more communities</span>
                  </div>
                </div>

                {/* CTA */}
                <motion.a
                  href="/contact"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-[#d4af37] font-semibold hover:text-[#d4af37]/80 transition-colors"
                >
                  <span>Stay Updated</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#d4af37]/20 to-transparent rounded-bl-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernLocationsSection;
