'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';

interface ReviewItem {
  author: string;
  rating: number;
  content: string;
}

interface ModernTestimonialsProps {
  reviews: ReviewItem[];
  title?: string;
  description?: string;
  tagline?: string;
}

const ModernTestimonials: React.FC<ModernTestimonialsProps> = ({
  reviews,
  title = "What Our Clients Say",
  description = "Don't just take our word for it - hear from the families and businesses we've helped protect.",
  tagline = "Client Testimonials"
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden">
      {/* Background effects */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.25) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(54, 79, 107, 0.25) 0%, transparent 50%)',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating stars */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 2) * 70}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <Star size={24} className="text-[#d4af37] fill-[#d4af37]" />
        </motion.div>
      ))}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d4af37]/15 backdrop-blur-sm rounded-full mb-6 shadow-lg border border-[#d4af37]/30"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-[#d4af37] fill-[#d4af37]" />
              ))}
            </div>
            <span className="text-sm font-semibold text-brand">{tagline}</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-brand">
            {title}
          </h2>
          <p className="text-xl text-brand/80 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative bg-white backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-[#d4af37]/20 shadow-xl">
                {/* Quote icon */}
                <motion.div
                  className="absolute top-8 right-8 opacity-10"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Quote size={80} className="text-[#d4af37]" />
                </motion.div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star 
                        size={24} 
                        className={i < reviews[currentIndex].rating ? "text-[#d4af37] fill-[#d4af37]" : "text-brand/30"} 
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Review content */}
                <p className="text-xl text-brand/90 leading-relaxed mb-8 relative z-10">
                  "{reviews[currentIndex].content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand rounded-full flex items-center justify-center shadow-lg">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-brand font-semibold text-lg">{reviews[currentIndex].author}</p>
                    <p className="text-brand/70 text-sm">Verified Client</p>
                  </div>
                </div>

                {/* Gradient accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-[#d4af37] to-brand rounded-b-3xl" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          {reviews.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                onClick={prevReview}
                className="p-3 bg-white backdrop-blur-md rounded-full border border-brand/20 hover:border-[#d4af37]/30 transition-all shadow-lg hover:shadow-xl hover:shadow-[#d4af37]/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} className="text-brand" />
              </motion.button>

              {/* Dots indicator */}
              <div className="flex items-center gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="relative"
                  >
                    <motion.div
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'bg-[#d4af37] w-8' 
                          : 'bg-white/70 hover:bg-brand/10'
                      }`}
                      animate={{
                        scale: index === currentIndex ? 1 : 0.8,
                      }}
                    />
                  </button>
                ))}
              </div>

              <motion.button
                onClick={nextReview}
                className="p-3 bg-white backdrop-blur-md rounded-full border border-brand/20 hover:border-[#d4af37]/30 transition-all shadow-lg hover:shadow-xl hover:shadow-[#d4af37]/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} className="text-brand" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto"
        >
          {[
            { value: "5.0", label: "Average Rating" },
            { value: `${reviews.length}+`, label: "Reviews" },
            { value: "100%", label: "Satisfaction" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-brand/20 shadow-md"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] to-[#d4af37] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-brand/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ModernTestimonials;
