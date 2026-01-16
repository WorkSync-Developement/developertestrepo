import React from 'react';
import { supabase } from '@/lib/supabase';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  author_name: string;
  author_title?: string;
  content: string;
  rating?: number;
  avatar_url?: string;
}

interface TestimonialsSection {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

async function getTestimonials(): Promise<TestimonialsSection | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

  if (!clientId) {
    console.error('NEXT_PUBLIC_CLIENT_ID is not set');
    return null;
  }

  const { data, error } = await supabase
    .from('client_home_page')
    .select('testimonials_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching testimonials:', error);
    return null;
  }

  return data?.testimonials_section || null;
}

const Testimonials = async () => {
  const testimonialsData = await getTestimonials();

  if (!testimonialsData?.testimonials || testimonialsData.testimonials.length === 0) {
    return null;
  }

  const { testimonials, title } = testimonialsData;

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}
      />
    ));
  };

  return (
    <section className="py-20" style={{ backgroundColor: '#f8f6f3' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#d4a853' }}>
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#1e3a5f' }}>
            {title || 'What Our Clients Say'}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, idx) => (
            <div
              key={testimonial.id || idx}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              {/* Rating */}
              <div className="flex gap-0.5 mb-4">{renderStars(testimonial.rating || 5)}</div>

              {/* Content */}
              <p className="leading-relaxed mb-6 line-clamp-4" style={{ color: '#5a6a7a' }}>
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: '#1e3a5f', color: '#ffffff' }}
                >
                  {testimonial.author_name?.charAt(0) || 'C'}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>
                    {testimonial.author_name}
                  </p>
                  {testimonial.author_title && (
                    <p className="text-xs" style={{ color: '#5a6a7a' }}>{testimonial.author_title}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
