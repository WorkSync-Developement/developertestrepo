'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car, Home, Briefcase, Heart, Shield, Umbrella, ChevronRight } from 'lucide-react';

// Lehmann Agency Color Palette
const colors = {
  primary: '#506A7E',
  dark: '#3D5466',
  accent: '#C9A962',
  light: '#F5F7F9',
  white: '#FFFFFF',
};

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  details: string[];
}

interface ServicesSectionProps {
  services?: ServiceItem[];
}


const iconMap: Record<string, React.ElementType> = {
  car: Car,
  home: Home,
  briefcase: Briefcase,
  heart: Heart,
  umbrella: Umbrella,
  shield: Shield,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  // Only render if we have services from the database
  if (!services || services.length === 0) return null;
  
  const displayServices = services;

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 relative" id="services" style={{ backgroundColor: colors.light }}>
      {/* Background decorative elements */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30 -translate-y-1/4 translate-x-1/3"
        style={{ backgroundColor: colors.accent }}
      />
      <div 
        className="absolute bottom-20 left-0 w-40 h-40 rounded-full opacity-20 -translate-x-1/3"
        style={{ backgroundColor: colors.primary }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p 
            className="text-sm font-semibold uppercase tracking-wider mb-3"
            style={{ color: colors.accent }}
          >
            Our Services
          </p>
          <h2 
            className="text-4xl font-bold mb-6"
            style={{ color: colors.dark }}
          >
            Professional Insurance Solutions
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: colors.primary }}>
            We provide comprehensive insurance solutions with personalized service and attention to detail, 
            tailored to protect what matters most to you
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayServices.slice(0, 6).map((service) => {
            const Icon = iconMap[service.icon] || Shield;
            
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 25px 50px -12px rgba(61, 84, 102, 0.35)',
                }}
                transition={{ type: 'tween', duration: 0.15 }}
                className="bg-white rounded-xl p-8 border border-gray-100 flex flex-col h-full group cursor-pointer"
                style={{ boxShadow: '0 10px 25px -5px rgba(61, 84, 102, 0.15)' }}
              >
                {/* Icon */}
                <div 
                  className="p-5 rounded-xl w-16 h-16 flex items-center justify-center mb-6 mx-auto shadow-md group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Icon size={28} className="text-white" />
                </div>

                {/* Title */}
                <h3 
                  className="text-xl font-bold mb-4 text-center group-hover:text-opacity-80 transition-colors"
                  style={{ color: colors.dark }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-center mb-6" style={{ color: colors.primary }}>
                  {service.description}
                </p>

                {/* CTA */}
                <div className="mt-auto">
                  <Link
                    href={`/policies/personal-insurance/${service.slug}`}
                    className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-white hover:opacity-90"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Learn More
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-lg mb-6" style={{ color: colors.primary }}>
            Ready to protect what matters most?
          </p>
          <motion.button
            onClick={scrollToContact}
            className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ backgroundColor: colors.accent, color: colors.dark }}
            animate={{ 
              boxShadow: [
                '0 4px 14px 0 rgba(201, 169, 98, 0.3)',
                '0 6px 20px 0 rgba(201, 169, 98, 0.5)',
                '0 4px 14px 0 rgba(201, 169, 98, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Schedule a Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
