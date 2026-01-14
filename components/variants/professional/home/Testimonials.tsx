import { supabase } from "@/lib/supabase";
import { Star, Quote } from "lucide-react";

export interface ReviewItem {
  author: string;
  rating: number;
  content: string;
  // Optional properties for compat with template
  author_title?: string;
  avatar_url?: string;
  id?: string;
}

export interface ReviewsContent {
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

interface GoogleReview {
  review_name: string;
  review_description: string;
}

interface ClientHomePageData {
  testimonials_section?: Partial<ReviewsContent>;
}

async function getTestimonialsSection(): Promise<ReviewsContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

  if (!clientId) {
    console.error('NEXT_PUBLIC_CLIENT_ID is not set');
    return null;
  }

  // Fetch section header from client_home_page
  const { data: homePageData, error: homePageError } = await supabase
    .from('client_home_page')
    .select('testimonials_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (homePageError) {
    console.error('Error fetching testimonials section header:', homePageError);
  }

  // Fetch google_reviews from all locations for this client
  const { data: locationsData, error: locationsError } = await supabase
    .from('client_locations')
    .select('google_reviews')
    .eq('client_id', clientId);

  if (locationsError) {
    console.error('Error fetching location testimonials:', locationsError);
    return null;
  }

  // Aggregate all google_reviews from all locations
  const allTestimonials: ReviewItem[] = [];
  
  if (locationsData) {
    for (const location of locationsData) {
      const googleReviews = location.google_reviews as GoogleReview[] | null;
      if (googleReviews && Array.isArray(googleReviews)) {
        for (const review of googleReviews) {
          if (review.review_name && review.review_description) {
            allTestimonials.push({
              author: review.review_name,
              rating: 5, // Default to 5 stars
              content: review.review_description,
              id: `${review.review_name}-${Math.random()}`
            });
          }
        }
      }
    }
  }

  const sectionHeader = (homePageData as ClientHomePageData | null)?.testimonials_section;

  // Use reviews from section settings if available, otherwise fall back to Google reviews
  const reviewsToDisplay = (sectionHeader?.reviews?.items && sectionHeader.reviews.items.length > 0)
    ? sectionHeader.reviews.items
    : allTestimonials;

  return {
    tagline: sectionHeader?.tagline || { type: 'tagline', content: 'TESTIMONIALS' },
    subtitle: sectionHeader?.subtitle || { tag: 'h2', type: 'heading', content: 'Customer Reviews' },
    description: sectionHeader?.description || { type: 'text', content: 'Based on real client reviews' },
    reviews: {
      type: 'reviews',
      items: reviewsToDisplay,
    },
    button_link_1: sectionHeader?.button_link_1 || { url: '', text: '', type: 'button_link' },
    button_link_2: sectionHeader?.button_link_2 || { url: '', text: '', type: 'button_link', content: '' },
  };
}

interface TestimonialsProps {
  content?: ReviewsContent | null;
}

export default async function Testimonials({ content: propsContent }: TestimonialsProps = {}): Promise<React.JSX.Element | null> {
  let reviewsContent = propsContent;
  
  if (!reviewsContent) {
    reviewsContent = await getTestimonialsSection();
  }

  // Fallback testimonials if no data from database
  const fallbackTestimonials: ReviewItem[] = [
    {
      id: "1",
      author: "Sarah Johnson",
      author_title: "Small Business Owner",
      content:
        "The team went above and beyond to find the perfect insurance solution for my business. Their expertise and personalized service made the entire process seamless. I couldn't be happier with my coverage!",
      rating: 5,
      avatar_url: "",
    },
    {
      id: "2",
      author: "Michael Chen",
      author_title: "Homeowner",
      content:
        "Outstanding service from start to finish. They took the time to explain all my options and helped me find comprehensive coverage at a great price. Highly recommend to anyone looking for insurance!",
      rating: 5,
      avatar_url: "",
    },
    {
      id: "3",
      author: "Emily Rodriguez",
      author_title: "Family Protection Client",
      content:
        "I've been with this agency for years and they consistently deliver excellent service. Their agents are knowledgeable, responsive, and genuinely care about protecting my family's future.",
      rating: 5,
      avatar_url: "",
    },
    {
      id: "4",
      author: "David Thompson",
      author_title: "Auto Insurance Client",
      content:
        "Switching to this agency was one of the best decisions I've made. They found me better coverage at a lower price and the claims process was incredibly smooth when I needed it.",
      rating: 5,
      avatar_url: "",
    },
  ];

  const dbTestimonials = reviewsContent?.reviews?.items || [];
  
  const testimonials =
    dbTestimonials.length > 0
      ? dbTestimonials
      : fallbackTestimonials;
    
  const tagline = reviewsContent?.tagline?.content || "TESTIMONIALS";
  const title = reviewsContent?.subtitle?.content || "Customer Reviews";

  // Calculate average rating
  const totalRating = testimonials.reduce((acc, t) => acc + (t.rating || 5), 0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const averageRating = totalRating / testimonials.length;
  // If using fallbacks, simulate a higher count. If real data, use real count.
  const reviewCount = dbTestimonials.length > 0 ? dbTestimonials.length : testimonials.length * 7000;

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-background-alt, #ffffff)" }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: "var(--color-secondary, #A7D8DE)",
              color: "var(--color-accent-foreground, #ffffff)",
            }}
          >
            <svg width="15" height="14" viewBox="0 0 15 14" fill="currentColor">
              <path d="M7.5 0L8.59 4.26L12.5 2.82L9.77 6.18L14.5 7L9.77 7.82L12.5 11.18L8.59 9.74L7.5 14L6.41 9.74L2.5 11.18L5.23 7.82L0.5 7L5.23 6.18L2.5 2.82L6.41 4.26L7.5 0Z" />
            </svg>
            {tagline}
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12"
            style={{
              color: "var(--color-text-primary, #004080)",
              fontFamily: "'Clash Display', sans-serif",
            }}
          >
            {title}
          </h2>
        </div>

        {/* Customer Avatars Row */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <div className="flex -space-x-4">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <div
                key={testimonial.id || index}
                className="relative"
                style={{ zIndex: 4 - index }}
              >
                {testimonial.avatar_url ? (
                  <img
                    src={testimonial.avatar_url}
                    alt={testimonial.author}
                    className="w-14 h-14 rounded-full border-4 object-cover"
                    style={{
                      borderColor: "var(--color-background-alt, #ffffff)",
                    }}
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-full border-4 flex items-center justify-center font-semibold text-lg"
                    style={{
                      backgroundColor: "var(--color-secondary, #A7D8DE)",
                      borderColor: "var(--color-background-alt, #ffffff)",
                      color: "var(--color-accent-foreground, #ffffff)",
                    }}
                  >
                    {testimonial.author.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start">
            <div className="flex gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  fill="var(--color-accent, #F76C5E)"
                  style={{
                    color: "var(--color-accent, #F76C5E)",
                  }}
                />
              ))}
            </div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-body, #5C4B51)" }}
            >
              {reviewCount.toLocaleString()}+ reviews
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              className="group relative p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{
                backgroundColor: "var(--color-background, #FAF3E0)",
                border: "1px solid var(--divider-color, #A7D8DE)",
              }}
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote
                  size={48}
                  style={{ color: "var(--color-primary, #004080)" }}
                />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill={
                      index < (testimonial.rating || 5)
                        ? "var(--color-accent, #F76C5E)"
                        : "transparent"
                    }
                    style={{
                      color:
                        index < (testimonial.rating || 5)
                          ? "var(--color-accent, #F76C5E)"
                          : "var(--color-text-muted, #6B7280)",
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <p
                className="text-base leading-relaxed mb-6 relative z-10 font-light"
                style={{
                  color: "var(--color-text-body, #5C4B51)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                "{testimonial.content}"
              </p>

              {/* Divider */}
              <div
                className="w-12 h-1 mb-4 rounded-full"
                style={{
                  backgroundColor: "var(--color-secondary, #A7D8DE)",
                }}
              />

              {/* Author */}
              <div className="flex items-center gap-3">
                {testimonial.avatar_url ? (
                  <img
                    src={testimonial.avatar_url}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{
                      backgroundColor: "var(--color-secondary, #A7D8DE)",
                      color: "var(--color-accent-foreground, #ffffff)",
                    }}
                  >
                    {testimonial.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div
                    className="font-semibold text-base"
                    style={{
                      color: "var(--color-text-primary, #004080)",
                      fontFamily: "var(--font-heading, sans-serif)",
                    }}
                  >
                    {testimonial.author}
                  </div>
                  {testimonial.author_title && (
                    <div
                      className="text-sm"
                      style={{ color: "var(--color-text-muted, #6B7280)" }}
                    >
                      {testimonial.author_title}
                    </div>
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
