'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  name: string;
  review_text: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps): React.ReactElement | null {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [mounted, testimonials.length]);

  // Safety check for empty testimonials - must be after hooks
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[activeIndex];

  const goToPrev = () => {
    setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveIndex((activeIndex + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
      
      <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="text-theme-text">What Our </span>
            <span className="text-primary">Clients Say</span>
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  fill="#FFD700" 
                  color="#FFD700" 
                  size={24} 
                  className="mr-1"
                />
              ))}
            </div>
            <span className="ml-2 text-lg font-medium text-theme-text">5.0 out of 5</span>
          </div>
        </div>

        <div className="relative mb-10 max-w-3xl mx-auto">
          <button 
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-modern-primary-10 transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft size={24} className="text-primary" />
          </button>
          
          <div className="overflow-hidden px-12">
            <div 
              key={activeIndex}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mx-auto transition-opacity duration-500"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-modern-primary flex items-center justify-center text-lg font-bold text-white mr-3">
                  {currentTestimonial.name.trim().charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-theme-text text-lg">{currentTestimonial.name.trim()}</h4>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    fill="#FFD700"
                    color="#FFD700"
                    size={18} 
                    className="mr-1"
                  />
                ))}
              </div>
              
              <p className="text-theme-body text-lg italic mb-2 leading-relaxed">
                &ldquo;{currentTestimonial.review_text}&rdquo;
              </p>
            </div>
          </div>
          
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-modern-primary-10 transition-colors"
            aria-label="Next review"
          >
            <ChevronRight size={24} className="text-primary" />
          </button>
        </div>
        
        <div className="flex justify-center gap-2 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-6 bg-primary" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
