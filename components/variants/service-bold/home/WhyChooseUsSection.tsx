'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Clock, Heart, ThumbsUp, Medal, FileCheck, User, Briefcase, Leaf, Shield, Droplet } from 'lucide-react';

// Lehmann Agency Color Palette
const colors = {
  primary: '#506A7E',
  dark: '#3D5466',
  accent: '#C9A962',
  light: '#F5F7F9',
  white: '#FFFFFF',
};

const benefits = [
  {
    icon: Award,
    title: 'Industry Experience',
    description: 'Over 15 years of professional insurance expertise serving our community',
  },
  {
    icon: ThumbsUp,
    title: 'Local Expertise',
    description: 'Deep understanding of local needs and personalized coverage solutions',
  },
  {
    icon: Clock,
    title: 'Dedicated Service',
    description: 'Consistent, responsive support with 98% client satisfaction rating',
  },
  {
    icon: Heart,
    title: 'Quality Assurance',
    description: 'Award-winning service with hundreds of successful policy placements',
  },
];

const credentials = [
  {
    icon: Medal,
    title: 'Licensed Agents',
    description: 'State-licensed insurance professionals',
  },
  {
    icon: FileCheck,
    title: 'Fully Insured',
    description: 'E&O coverage for your protection',
  },
  {
    icon: User,
    title: 'Certified Advisors',
    description: 'Industry-certified insurance specialists',
  },
  {
    icon: Briefcase,
    title: 'Multi-Carrier Access',
    description: 'Access to top-rated insurance carriers',
  },
];

const commitmentPoints = [
  { icon: Leaf, text: 'Personalized coverage plans tailored to your unique needs' },
  { icon: Shield, text: 'Fully licensed and insured professionals you can trust' },
  { icon: Droplet, text: 'Competitive rates with comprehensive protection options' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface WhyChooseUsSectionProps {
  title?: string;
  subtitle?: string;
  agencyName?: string;
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ title, subtitle, agencyName }) => {
  // Database is source of truth - don't render if no data
  if (!title && !subtitle) return null;
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: colors.primary }}>
      {/* Background elements */}
      <div 
        className="absolute -left-20 top-40 w-40 h-40 rounded-full opacity-10"
        style={{ backgroundColor: colors.accent }}
      />
      <div 
        className="absolute right-10 bottom-20 w-60 h-60 rounded-full opacity-5"
        style={{ backgroundColor: colors.white }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Why Choose Us
          </p>
          <h2 className="text-4xl font-bold mb-6 text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div 
                className="p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto group-hover:ring-2 group-hover:ring-offset-2 transition-all"
                style={{ 
                  backgroundColor: colors.dark,
                  '--tw-ring-color': colors.accent,
                } as React.CSSProperties}
              >
                <benefit.icon size={24} className="text-white" />
              </div>
              <h3 
                className="text-xl font-bold mb-4 text-center group-hover:opacity-80 transition-colors"
                style={{ color: colors.dark }}
              >
                {benefit.title}
              </h3>
              <p className="text-center" style={{ color: colors.primary }}>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Credentials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Why Trust Us</h3>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Our professional credentials and industry certifications ensure your insurance needs 
              are handled with the highest standards of expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((credential, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center mb-4">
                  <credential.icon size={24} style={{ color: colors.accent }} />
                  <h4 className="ml-3 text-white font-bold">{credential.title}</h4>
                </div>
                <p className="text-white/70 text-sm">{credential.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commitment to Excellence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-10 rounded-2xl shadow-xl flex flex-col md:flex-row items-center"
        >
          <div className="md:w-2/3 mb-8 md:mb-0 md:pr-10">
            <h3 className="text-2xl font-bold mb-4" style={{ color: colors.dark }}>
              Our Commitment to Excellence
            </h3>
            <p className="mb-4" style={{ color: colors.primary }}>
              Every client relationship begins with understanding your unique needs and goals. 
              Our experienced advisors work closely with you to create personalized insurance 
              solutions that provide comprehensive protection and peace of mind.
            </p>
            <ul className="space-y-3">
              {commitmentPoints.map((item, i) => (
                <li key={i} className="flex items-center gap-3" style={{ color: colors.primary }}>
                  <item.icon size={18} style={{ color: colors.accent }} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div 
            className="md:w-1/3 rounded-xl p-8 text-center"
            style={{ backgroundColor: colors.dark }}
          >
            <h4 className="text-xl font-bold mb-4 text-white">Ready to get protected?</h4>
            <p className="mb-6 text-white/80">
              Schedule a consultation with our insurance experts today.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: colors.accent, color: colors.dark }}
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
