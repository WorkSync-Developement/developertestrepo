import { supabase } from '@/lib/supabase';
import Testimonials from './Testimonials';

interface ReviewItem {
  author: string;
  rating: number;
  content: string;
}

interface ReviewsContent {
  tagline: { type: string; content: string };
  subtitle: { tag: string; type: string; content: string };
  description: { type: string; content: string };
  reviews: { type: string; items: ReviewItem[] };
  button_link_1: { url: string; text: string; type: string };
  button_link_2: { url: string; text: string; type: string; content: string };
}

async function getTestimonialsSection(): Promise<ReviewsContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from('client_home_page')
    .select('testimonials_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) return null;

  const section = data?.testimonials_section;
  let reviews: ReviewItem[] = section?.reviews?.items || [];

  // Fallback to google_reviews from client_locations
  if (!reviews.length) {
    const { data: locations } = await supabase
      .from('client_locations')
      .select('google_reviews')
      .eq('client_id', clientId);

    reviews = locations?.flatMap(loc => 
      (loc.google_reviews || [])
        .filter((r: { review_name?: string; review_description?: string }) => r.review_name && r.review_description)
        .map((r: { review_name: string; review_description: string }) => ({
          author: r.review_name,
          rating: 5,
          content: r.review_description,
        }))
    ) || [];
  }

  if (!reviews.length) return null;

  return {
    tagline: section?.tagline || { type: 'tagline', content: 'Testimonials' },
    subtitle: section?.subtitle || { tag: 'h2', type: 'heading', content: 'What Our Customers Say' },
    description: section?.description || { type: 'text', content: 'Based on real client reviews' },
    reviews: { type: 'reviews', items: reviews },
    button_link_1: section?.button_link_1 || { url: '', text: '', type: 'button_link' },
    button_link_2: section?.button_link_2 || { url: '', text: '', type: 'button_link', content: '' },
  };
}

export default async function TestimonialsWrapper() {
  const reviewsContent = await getTestimonialsSection();
  return reviewsContent ? <Testimonials reviewsContent={reviewsContent} /> : null;
}
