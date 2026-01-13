import React from 'react';
import { supabase } from '@/lib/supabase';
import TestimonialsCarousel from './TestimonialsCarousel';

interface Testimonial {
  id: string;
  author_name: string;
  author_title?: string;
  content: string;
  rating?: number;
  avatar_url?: string;
}

interface GoogleReview {
  review_name: string;
  review_description: string;
}

interface ClientHomePageData {
  testimonials_section?: {
    tagline?: { content: string };
    subtitle?: { content: string };
    description?: { content: string };
  };
}

async function getTestimonials(): Promise<Testimonial[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data: locationsData, error } = await supabase
    .from('client_locations')
    .select('google_reviews')
    .eq('client_id', clientId);

  if (error) {
    console.error('Error fetching location testimonials:', error);
    return [];
  }

  const testimonials: Testimonial[] = [];
  
  if (locationsData) {
    for (const location of locationsData) {
      const googleReviews = location.google_reviews as GoogleReview[] | null;
      if (googleReviews && Array.isArray(googleReviews)) {
        for (const review of googleReviews) {
          if (review.review_name && review.review_description) {
            testimonials.push({
              id: `${review.review_name}-${review.review_description.slice(0, 10)}`,
              author_name: review.review_name,
              rating: 5,
              content: review.review_description,
            });
          }
        }
      }
    }
  }

  return testimonials;
}

async function getSectionHeader() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data } = await supabase
    .from('client_home_page')
    .select('testimonials_section')
    .eq('client_id', clientId)
    .maybeSingle();

  return (data as ClientHomePageData | null)?.testimonials_section || null;
}

export default async function Testimonials(): Promise<JSX.Element | null> {
  const [testimonials, sectionHeader] = await Promise.all([
    getTestimonials(),
    getSectionHeader(),
  ]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const tagline = sectionHeader?.tagline?.content;
  const subtitle = sectionHeader?.subtitle?.content || 'What Our Customers Say';
  const description = sectionHeader?.description?.content;

  return (
    <section className="py-16 bg-theme-bg relative">
      <div className="container mx-auto px-4 max-w-screen-xl">
        {(tagline || subtitle || description) && (
          <div className="text-center mb-12">
            {tagline && (
              <p className="text-sm font-medium text-accent mb-2">{tagline}</p>
            )}
            {subtitle && (
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                {subtitle}
              </h2>
            )}
            {description && (
              <p className="text-theme-body text-lg max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
