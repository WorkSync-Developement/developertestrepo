'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Divider } from '@/components/ui/Divider';

interface ReviewItem {
  author: string;
  rating: number;
  content: string;
}

interface ReviewsContent {
  tagline: {
    type: string;
    content: string;
  };
  subtitle: {
    tag: string;
    type: string;
    content: string;
  };
  description: {
    type: string;
    content: string;
  };
  reviews: {
    type: string;
    items: ReviewItem[];
  };
  button_link_1: {
    url: string;
    text: string;
    type: string;
  };
  button_link_2: {
    url: string;
    text: string;
    type: string;
    content: string;
  };
}

interface TestimonialsProps {
  reviewsContent: ReviewsContent;
}

const Testimonials: React.FC<TestimonialsProps> = ({ reviewsContent }) => {
  const reviewsData = reviewsContent.reviews.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, reviewsData.length]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % reviewsData.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, reviewsData.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reviewsData.length === 0) return;
    const interval = setInterval(goToNext, 7000);
    return () => clearInterval(interval);
  }, [mounted, reviewsData.length, goToNext]);

  if (!reviewsData || reviewsData.length === 0) return null;

  const currentReview = reviewsData[activeIndex];

  return (
    <section
      className="py-20 lg:py-28 relative"
      style={{ backgroundColor: 'var(--color-background-alt)' }}
    >
      <Divider position="top" />

      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            {reviewsContent?.tagline?.content || 'Testimonials'}
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {reviewsContent?.subtitle?.content || 'What Our Clients Say'}
          </h2>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} fill="#FFD700" color="#FFD700" size={24} />
            ))}
          </div>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {reviewsContent?.description?.content || 'Based on real client reviews'}
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Nav Buttons */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: 'var(--color-background)' }}
              aria-label="Previous review"
            >
              <ChevronLeft size={24} style={{ color: 'var(--color-primary)' }} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: 'var(--color-background)' }}
              aria-label="Next review"
            >
              <ChevronRight size={24} style={{ color: 'var(--color-primary)' }} />
            </button>

            {/* Card */}
            <div
              key={activeIndex}
              className="rounded-2xl shadow-xl p-8 md:p-12 relative transition-all duration-300 min-h-[280px] md:min-h-[320px] flex flex-col"
              style={{ backgroundColor: 'var(--color-background)' }}
            >
              {/* Quote Icon */}
              <div
                className="absolute -top-5 left-8 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                <Quote size={20} style={{ color: 'var(--color-accent-foreground)' }} />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6 pt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill={i < currentReview.rating ? '#FFD700' : '#E5E7EB'}
                    color={i < currentReview.rating ? '#FFD700' : '#E5E7EB'}
                    size={20}
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote
                className="text-lg md:text-xl leading-relaxed mb-8 flex-grow"
                style={{ color: 'var(--color-text-primary)' }}
              >
                &ldquo;{currentReview?.content || ''}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-foreground)',
                  }}
                >
                  {currentReview.author.trim().charAt(0).toUpperCase()}
                </div>
                <div>
                  <p
                    className="font-heading font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {currentReview.author.trim()}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Verified Customer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviewsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setActiveIndex(index);
                    setTimeout(() => setIsAnimating(false), 400);
                  }
                }}
                className="w-2.5 h-2.5 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: index === activeIndex
                    ? 'var(--color-accent)'
                    : 'var(--color-text-muted)',
                  opacity: index === activeIndex ? 1 : 0.3,
                  transform: index === activeIndex ? 'scale(1.3)' : 'scale(1)',
                }}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
