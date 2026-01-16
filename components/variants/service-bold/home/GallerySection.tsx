'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, ChevronRight } from 'lucide-react';

// Lehmann Agency Color Palette
const colors = {
  primary: '#506A7E',
  dark: '#3D5466',
  accent: '#C9A962',
  light: '#F5F7F9',
  white: '#FFFFFF',
};

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  location?: string;
}

interface GallerySectionProps {
  items?: GalleryItem[];
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Family Protection',
    category: 'Life Insurance',
    imageUrl: '/Images/placeholders/gallery-1.jpg',
    location: 'Local Family',
  },
  {
    id: '2',
    title: 'Home Coverage',
    category: 'Home Insurance',
    imageUrl: '/Images/placeholders/gallery-2.jpg',
    location: 'Residential',
  },
  {
    id: '3',
    title: 'Business Solutions',
    category: 'Commercial Insurance',
    imageUrl: '/Images/placeholders/gallery-3.jpg',
    location: 'Local Business',
  },
  {
    id: '4',
    title: 'Auto Protection',
    category: 'Auto Insurance',
    imageUrl: '/Images/placeholders/gallery-4.jpg',
    location: 'Vehicle Coverage',
  },
  {
    id: '5',
    title: 'Community Support',
    category: 'Community',
    imageUrl: '/Images/placeholders/gallery-5.jpg',
    location: 'Local Events',
  },
  {
    id: '6',
    title: 'Team Excellence',
    category: 'Our Team',
    imageUrl: '/Images/placeholders/gallery-6.jpg',
    location: 'Agency Team',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const displayItems = items && items.length > 0 ? items : defaultGalleryItems;

  return (
    <section className="py-20" style={{ backgroundColor: colors.light }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p 
            className="text-sm font-semibold uppercase tracking-wider mb-3"
            style={{ color: colors.accent }}
          >
            Gallery
          </p>
          <h2 className="text-4xl font-bold mb-6" style={{ color: colors.dark }}>
            Our Work & Community
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.primary }}>
            See how we&apos;ve helped protect families, businesses, and communities throughout our service area
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayItems.slice(0, 6).map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-xl group h-64 sm:h-72 shadow-lg cursor-pointer"
            >
              {/* Image or Placeholder */}
              {item.imageUrl && !item.imageUrl.includes('placeholder') ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Camera size={48} className="text-white/30" />
                </div>
              )}

              {/* Hover Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                style={{ 
                  background: 'linear-gradient(to top, rgba(61, 84, 102, 0.9) 0%, transparent 100%)' 
                }}
              >
                <div className="p-6 text-white w-full">
                  <p className="text-sm font-medium mb-1" style={{ color: colors.accent }}>
                    {item.category}
                  </p>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  {item.location && (
                    <p className="text-sm text-white/80">{item.location}</p>
                  )}
                </div>
              </div>

              {/* Always visible category badge */}
              <div 
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: colors.accent, color: colors.dark }}
              >
                {item.category}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ backgroundColor: colors.primary, color: colors.white }}
          >
            <Camera size={20} />
            Learn More About Us
            <ChevronRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
