'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Lehmann Agency Color Palette
const colors = {
  primary: '#506A7E',
  dark: '#3D5466',
  accent: '#C9A962',
  light: '#F5F7F9',
  white: '#FFFFFF',
};

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title?: string;
  location?: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}


const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonialsLength = testimonials?.length || 0;

  const goToNext = useCallback(() => {
    if (testimonialsLength === 0) return;
    setDirection(1);
    setActiveIndex((current) => (current + 1) % testimonialsLength);
  }, [testimonialsLength]);

  const goToPrevious = () => {
    if (testimonialsLength === 0) return;
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + testimonialsLength) % testimonialsLength);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Auto rotate
  useEffect(() => {
    if (testimonialsLength === 0) return;
    const interval = setInterval(goToNext, 7000);
    return () => clearInterval(interval);
  }, [goToNext, testimonialsLength]);

  // Don't render if no testimonials from database
  if (!testimonials || testimonials.length === 0) return null;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className="py-20" style={{ backgroundColor: colors.primary }}>
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
            Testimonials
          </p>
          <h2 className="text-4xl font-bold mb-6 text-white">
            What Our Clients Say
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience working with us
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-5 bg-white rounded-xl shadow-2xl overflow-hidden"
              >
                {/* Avatar Side */}
                <div 
                  className="p-8 md:p-12 md:col-span-2 flex items-center justify-center"
                  style={{ backgroundColor: colors.accent }}
                >
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: colors.dark }}
                    >
                      <span className="text-white text-2xl font-bold">
                        {currentTestimonial.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: colors.dark }}>
                      {currentTestimonial.name}
                    </h3>
                    {currentTestimonial.title && (
                      <p className="text-sm" style={{ color: colors.dark }}>
                        {currentTestimonial.title}
                      </p>
                    )}
                    {currentTestimonial.location && (
                      <p className="text-sm mt-1" style={{ color: colors.primary }}>
                        {currentTestimonial.location}
                      </p>
                    )}
                    
                    {/* Star Rating */}
                    {currentTestimonial.rating && (
                      <div className="flex justify-center gap-1 mt-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < currentTestimonial.rating! ? 'fill-current' : ''}
                            style={{ color: i < currentTestimonial.rating! ? colors.dark : colors.primary }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quote Side */}
                <div className="p-8 md:p-12 md:col-span-3" style={{ color: colors.dark }}>
                  <Quote size={48} className="mb-6" style={{ color: colors.accent }} />
                  <p className="text-xl font-light italic mb-8" style={{ color: colors.primary }}>
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots with Progress Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="relative w-8 h-2 rounded-full overflow-hidden transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.3)'
                }}
                aria-label={`View testimonial ${index + 1}`}
              >
                {activeIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: colors.accent }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 7, ease: 'linear' }}
                    key={`progress-${activeIndex}`}
                  />
                )}
                {activeIndex !== index && (
                  <div 
                    className="absolute inset-0 rounded-full opacity-50"
                    style={{ backgroundColor: colors.white, width: '100%' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hidden md:block"
            style={{ backgroundColor: colors.white, color: colors.primary }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hidden md:block"
            style={{ backgroundColor: colors.white, color: colors.primary }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
