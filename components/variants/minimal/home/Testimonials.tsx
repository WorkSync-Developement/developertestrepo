import React from 'react';
import { supabase } from '@/lib/supabase';
import { Star } from 'lucide-react';

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

  if (error || !data?.testimonials_section) return [];
  return data.testimonials_section.testimonials || [];
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
    testimonials = await getTestimonials();
  }
  
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-32" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <p className="text-xs uppercase tracking-widest font-light" style={{ color: 'var(--color-text-muted)' }}>
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ color: 'var(--color-text-primary)' }}>
              Client Feedback
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id || index} className="space-y-6">
                {testimonial.rating && (
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < testimonial.rating! ? 'var(--color-primary)' : 'none'}
                        style={{ color: i < testimonial.rating! ? 'var(--color-primary)' : '#D1D5DB' }}
                      />
                    ))}
                  </div>
                )}
                <p className="text-base font-light leading-relaxed" style={{ color: 'var(--color-text-body)' }}>
                  "{testimonial.content}"
                </p>
                <div className="pt-4 border-t" style={{ borderColor: 'var(--color-text-muted)', borderWidth: '1px', opacity: 0.2 }}>
                  <p className="text-sm font-normal" style={{ color: 'var(--color-text-primary)' }}>
                    {testimonial.author_name || testimonial.author}
                  </p>
                  {testimonial.author_title && (
                    <p className="text-xs font-light" style={{ color: 'var(--color-text-muted)' }}>
                      {testimonial.author_title}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
