import React from 'react';
import { supabase } from '@/lib/supabase';
import TestimonialsSection from './TestimonialsSection';

interface ReviewItem {
  author: string;
  content: string;
  rating?: number;
}

interface TestimonialsSectionData {
  reviews?: {
    type?: string;
    items?: ReviewItem[];
  };
  subtitle?: { content?: string };
}

async function getTestimonials(): Promise<ReviewItem[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from('client_home_page')
    .select('testimonials_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  const testimonialsData = data?.testimonials_section as TestimonialsSectionData | null;
  return testimonialsData?.reviews?.items || [];
}

const TestimonialsSectionWrapper = async () => {
  const reviews = await getTestimonials();

  // Transform to expected format - use index as id since DB doesn't have id
  const formattedTestimonials = reviews.map((r, index) => ({
    id: String(index + 1),
    quote: r.content,
    name: r.author,
    rating: r.rating || 5,
  }));

  return <TestimonialsSection testimonials={formattedTestimonials.length > 0 ? formattedTestimonials : undefined} />;
};

export default TestimonialsSectionWrapper;
