import React from 'react';
import { supabase } from '@/lib/supabase';
import { Star, Quote } from 'lucide-react';

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

async function getTestimonials(): Promise<Testimonial[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from('client_home_page')
    .select('testimonials_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error || !data?.testimonials_section) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data.testimonials_section.testimonials || [];
}

export default async function Testimonials({ reviewsContent }: TestimonialsProps = {}) {
  // Handle both patterns: receive data as props OR fetch own data
  let testimonials: Testimonial[] = [];
  
  if (reviewsContent?.reviews?.items) {
    // Data provided by wrapper - transform to expected format
    testimonials = reviewsContent.reviews.items.map((review, idx) => ({
      id: `review-${idx}`,
      author_name: review.author,
      content: review.content,
      rating: review.rating,
    }));
  } else {
    // Fetch own data
    testimonials = await getTestimonials();
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-5"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-secondary-foreground)',
            }}
          >
            Testimonials
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            What Our Clients Say
          </h2>
          <p className="text-lg md:text-xl" style={{ color: 'var(--color-text-body)' }}>
            Real experiences from real customers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id || index}
                className="animate-fade-in"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div
                  className="h-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 space-y-6 border relative"
                  style={{
                    backgroundColor: 'var(--color-background-alt)',
                    borderColor: 'var(--color-secondary)',
                  }}
                >
                  {/* Quote Icon */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    <Quote size={24} style={{ color: 'var(--color-accent-foreground)' }} />
                  </div>

                  {/* Rating Stars */}
                  {testimonial.rating && (
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill={i < testimonial.rating! ? 'var(--color-accent)' : 'none'}
                          style={{
                            color: i < testimonial.rating! ? 'var(--color-accent)' : '#D1D5DB',
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <p
                    className="text-base leading-relaxed italic"
                    style={{ color: 'var(--color-text-body)' }}
                  >
                    "{testimonial.content}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: 'var(--color-secondary)' }}>
                    {testimonial.avatar_url ? (
                      <img
                        src={testimonial.avatar_url}
                        alt={testimonial.author_name || testimonial.author || 'Customer'}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                        style={{
                          backgroundColor: 'var(--color-primary)',
                          color: 'var(--color-primary-foreground)',
                        }}
                      >
                        {((testimonial.author_name || testimonial.author || 'C').charAt(0).toUpperCase())}
                      </div>
                    )}
                    <div>
                      <p
                        className="font-semibold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {testimonial.author_name || testimonial.author}
                      </p>
                      {testimonial.author_title && (
                        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                          {testimonial.author_title}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
