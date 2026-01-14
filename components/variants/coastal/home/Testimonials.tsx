import React from 'react';
import { supabase } from '@/lib/supabase';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id?: string;
  author_name?: string;
  author?: string;
  author_title?: string;
  content: string;
  rating?: number;
  avatar_url?: string;
}

interface ReviewsContent {
  reviews?: {
    items: Array<{ author: string; rating: number; content: string }>;
  };
}

interface TestimonialsProps {
  reviewsContent?: ReviewsContent;
}

async function getTestimonialsSection() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from('client_home_page')
    .select('testimonials_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error || !data?.testimonials_section) return null;
  return data.testimonials_section;
}

export default async function Testimonials({ reviewsContent }: TestimonialsProps = {}) {
  let testimonials: Testimonial[] = [];
  
  if (reviewsContent?.reviews?.items) {
    testimonials = reviewsContent.reviews.items.map((review, idx) => ({
      id: `review-${idx}`,
      author_name: review.author,
      content: review.content,
      rating: review.rating,
    }));
  } else {
    const data = await getTestimonialsSection();
    if (!data?.testimonials) return null;
    testimonials = data.testimonials;
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-theme-bg relative w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h2 className="section-title mb-4">What Our Clients Say</h2>
          <p className="text-theme-body text-lg">Real experiences from real customers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              className="bg-white rounded-xl shadow-lg p-8 border border-card-border"
            >
              {testimonial.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < testimonial.rating! ? 'var(--color-accent)' : 'none'}
                      style={{ color: i < testimonial.rating! ? 'var(--color-accent)' : '#D1D5DB' }}
                    />
                  ))}
                </div>
              )}
              <p className="text-theme-body mb-6 italic">{testimonial.content}</p>
              <div className="flex items-center gap-4 pt-4 border-t border-secondary/30">
                {testimonial.avatar_url ? (
                  <Image
                    src={testimonial.avatar_url}
                    alt={testimonial.author_name || testimonial.author || 'Customer'}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {((testimonial.author_name || testimonial.author || 'C').charAt(0).toUpperCase())}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-primary">{testimonial.author_name || testimonial.author}</p>
                  {testimonial.author_title && (
                    <p className="text-sm text-theme-muted">{testimonial.author_title}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
