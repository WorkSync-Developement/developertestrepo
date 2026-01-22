'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  author_name: string;
  author_title?: string;
  content: string;
  rating?: number;
  avatar_url?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
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
    <>
      <div className="relative max-w-4xl mx-auto">
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} className="text-primary" />
        </button>

        <div className="overflow-hidden px-12">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            {currentTestimonial.rating && (
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < (currentTestimonial.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
            )}
            
            <p className="text-theme-body text-lg mb-6 italic">
              &ldquo;{currentTestimonial.content}&rdquo;
            </p>
            
            <div className="flex items-center gap-4">
              {currentTestimonial.avatar_url && (
                <img
                  src={currentTestimonial.avatar_url}
                  alt={currentTestimonial.author_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-primary">{currentTestimonial.author_name}</p>
                {currentTestimonial.author_title && (
                  <p className="text-sm text-theme-muted">{currentTestimonial.author_title}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} className="text-primary" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}
