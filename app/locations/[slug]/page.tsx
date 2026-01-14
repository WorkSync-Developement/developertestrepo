import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "@/components/location/Link";
import { getClientData } from "@/lib/client";
import {
  getWebsiteBySlug,
  getAllWebsites,
  isMultiLocation,
} from "@/lib/website";
import { Divider } from "@/components/ui/Divider";
import { supabase } from "@/lib/supabase";
import {
  getSchemaDefaults,
  buildOpeningHoursSpec,
  buildPageUrl,
} from "@/lib/structured-data";
import LocationFeaturedPolicies from "@/components/variants/professional/location/LocationFeaturedPolicies";
import HeroSection from "@/components/variants/professional/home/HeroSection";
import IntroSection from "@/components/variants/professional/home/IntroSection";
import HomeCTA from "@/components/variants/professional/home/HomeCTA";
import FAQPreview, {
  CommonQuestionsContent,
} from "@/components/variants/professional/home/FAQPreview";
import Testimonials, {
  ReviewsContent,
  ReviewItem,
} from "@/components/variants/professional/home/Testimonials";
import CareersSection, {
  CareersContent,
} from "@/components/variants/professional/home/CareersSection";

// Inline interfaces for location page JSONB sections
interface HeroImageBlock {
  url?: string;
  type?: string;
  alt?: string;
}

interface HeroVideoBlock {
  url?: string | null;
  type?: string;
}

interface HeroOverlay {
  color?: string | null;
  opacity?: number;
}

interface HeroContentBlock {
  tag?: string;
  type?: string;
  content?: string;
  color?: string;
}

interface HeroSection {
  heading?: string; // Legacy
  subheading?: string; // Legacy
  description?: HeroContentBlock; // New object style
  // Location-specific hero overrides (same structure as home page)
  background_image?: HeroImageBlock;
  background_video?: HeroVideoBlock;
  background_media_type?: "image" | "video";
  overlay?: HeroOverlay;
  title?: HeroContentBlock;
  subtitle?: HeroContentBlock;
}

interface IntroSection {
  content?: string;
  heading?: string;
  imageUrl?: string;
  imageTag?: string;
}

interface ServicesSection {
  title?: string;
  items?: {
    title: string;
    description: string;
  }[];
  // Legacy
  heading?: string;
  description?: string;
}

interface GoogleReview {
  review_name: string;
  review_description: string;
}

// interface ServicesSection moved/updated
// interface GoogleReview moved/updated

// ReviewItem collision - removing local definition
// interface ReviewItem {
//   author: string;
//   rating: number;
//   content: string;
// }

interface ReviewsSection {
  title?: string;
  items?: ReviewItem[];
}

interface CTASectionStyles {
  gradient?: {
    startColor?: string | null;
    endColor?: string | null;
    direction?: string;
  };
  card?: {
    backgroundMode?: "transparent" | "solid";
    backgroundColor?: string | null;
    backgroundOpacity?: number;
    borderColor?: string | null;
    hoverBackgroundColor?: string | null;
  };
  typography?: {
    headingColor?: string | null;
    bodyColor?: string | null;
  };
  iconContainer?: {
    backgroundColor?: string | null;
    backgroundOpacity?: number;
  };
  button?: {
    backgroundColor?: string | null;
    textColor?: string | null;
    hoverBackgroundColor?: string | null;
  };
}

interface CtaSection {
  title?: string;
  button_text?: string;
  description?: string;
  // Legacy support just in case
  heading?: string;
  buttonLink?: string;
  buttonText?: string;
}

interface QuestionItem {
  question: string;
  answer: string;
}

interface FaqSection {
  items?: QuestionItem[];
  // Legacy support
  tagline?: string;
  subtitle?: string;
  description?: string;
  questions?: QuestionItem[];
  show_section?: boolean;
}

interface CareersSection {
  heading?: string;
  description?: string;
  button_text?: string;
  show_section?: boolean;
}

interface PoliciesSection {
  title?: string;
  description?: string;
  featured_policy_ids?: string[];
  show_section?: boolean;
}

interface LocationPageData {
  hero_section: HeroSection | null;
  intro_section: IntroSection | null;
  services_section: ServicesSection | null;
  policies_section: PoliciesSection | null;
  faq_section: FaqSection | null;
  reviews_section: ReviewsSection | null;
  careers_section: CareersSection | null;
  cta_section: CtaSection | null;
  meta_title: string | null;
  meta_description: string | null;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPolicies(policyIds?: string[]) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  let query = supabase
    .from("client_policy_pages")
    .select("id, title, slug, content_summary")
    .eq("client_id", clientId)
    .eq("published", true);

  if (policyIds && policyIds.length > 0) {
    query = query.in("id", policyIds);
  } else {
    query = query.limit(4);
  }

  const { data } = await query;
  return (
    data?.map((p) => ({
      id: p.id,
      policy_name: p.title,
      policy_slug: p.slug,
      content_summary: p.content_summary,
    })) || []
  );
}

// Fetch location page content from client_location_page table
async function getLocationPageData(
  locationId: string
): Promise<LocationPageData | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId || !locationId) return null;

  const { data, error } = await supabase
    .from("client_location_page")
    // .select('hero_section, intro_section, services_section, policies_section, faq_section, careers_section, cta_section, meta_title, meta_description')
    .select("*")
    .eq("client_id", clientId)
    .eq("location_id", locationId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching location page data:", error);
    return null;
  }

  return data as LocationPageData | null;
}

// Fetch home page hero settings (full structure for fallback)
interface HomePageHeroSection {
  background_image?: HeroImageBlock;
  background_video?: HeroVideoBlock;
  background_media_type?: "image" | "video";
  overlay?: HeroOverlay;
  title?: HeroContentBlock;
  subtitle?: HeroContentBlock;
}

// Fetch intro section aspect ratio from theme settings
async function getIntroAspectRatio(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return "4:3";

  const { data, error } = await supabase
    .from("client_theme_settings")
    .select("intro_section_aspect_ratio")
    .eq("client_id", clientId)
    .maybeSingle();

  if (error || !data) return "4:3";
  return data.intro_section_aspect_ratio || "4:3";
}

function getAspectRatioClasses(aspectRatio: string): string {
  switch (aspectRatio) {
    case "1:1":
      return "h-80 md:h-[400px] lg:h-[500px] xl:h-[600px]";
    case "16:9":
      return "h-80 md:h-[450px] lg:h-[550px] xl:h-[650px]";
    case "4:3":
    default:
      return "h-80 md:h-[500px] lg:h-[600px] xl:h-[700px]";
  }
}

// Fetch home page hero settings (background image, video, colors, overlay)
interface HomePageHeroSettings {
  backgroundImage: string | null;
  backgroundVideo: string | null;
  backgroundMediaType: "image" | "video" | null;
  titleColor: string | null;
  subtitleColor: string | null;
  overlayColor: string | null;
  overlayOpacity: number;
}

async function getHomePageHeroSettings(): Promise<HomePageHeroSettings | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

  const defaultSettings: HomePageHeroSettings = {
    backgroundImage: null,
    backgroundVideo: null,
    backgroundMediaType: null,
    titleColor: null,
    subtitleColor: null,
    overlayColor: null,
    overlayOpacity: 0,
  };

  if (!clientId) return defaultSettings;

  const { data, error } = await supabase
    .from("client_home_page")
    .select("hero_section")
    .eq("client_id", clientId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching home page hero:", error);
    return defaultSettings;
  }

  return {
    backgroundImage: data?.hero_section?.background_image?.url || null,
    backgroundVideo: data?.hero_section?.background_video?.url || null,
    backgroundMediaType: data?.hero_section?.background_media_type || null,
    titleColor: data?.hero_section?.title?.color || null,
    subtitleColor: data?.hero_section?.subtitle?.color || null,
    overlayColor: data?.hero_section?.overlay?.color || null,
    overlayOpacity: data?.hero_section?.overlay?.opacity ?? 0,
  };
}

// Fetch home page CTA styles for location landing page fallback
async function getHomePageCTAStyles(): Promise<CTASectionStyles | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from("client_home_page")
    .select("cta_section")
    .eq("client_id", clientId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching home page CTA styles:", error);
    return null;
  }

  return data?.cta_section?.styles || null;
}

const GRADIENT_MAP: Record<string, string> = {
  "to-r": "to right",
  "to-l": "to left",
  "to-t": "to top",
  "to-b": "to bottom",
  "to-br": "to bottom right",
  "to-bl": "to bottom left",
  "to-tr": "to top right",
  "to-tl": "to top left",
};

export async function generateStaticParams() {
  const multiLocation = await isMultiLocation();
  if (!multiLocation) return [];

  const websites = await getAllWebsites();
  return (websites || [])
    .filter(
      (website) =>
        website?.location_slug && typeof website.location_slug === "string"
    )
    .map((website) => ({ slug: website.location_slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [website, clientData] = await Promise.all([
    getWebsiteBySlug(slug),
    getClientData(),
  ]);

  if (!website) {
    return { title: "Location Not Found" };
  }

  // Get location ID and fetch page data for SEO
  const locationId = website?.client_locations?.id;
  const pageData = locationId ? await getLocationPageData(locationId) : null;

  const canonicalUrl = clientData?.client_website?.canonical_url || "";
  const locationName =
    website?.client_locations?.location_name || website.website_name;
  const city = website?.client_locations?.city || "";
  const state = website?.client_locations?.state || "";

  // Use page data meta if available, otherwise fall back to defaults
  const title =
    pageData?.meta_title ||
    website.meta_title ||
    `${locationName} | ${clientData?.agency_name}`;
  const description =
    pageData?.meta_description ||
    website.meta_description ||
    `Visit ${clientData?.agency_name} in ${city}, ${state} for personalized insurance solutions.`;

  return {
    title,
    description,
    metadataBase: new URL(canonicalUrl),
    alternates: {
      canonical: `/locations/${slug}`,
    },
  };
}

// Note: formatBusinessHours available if needed for display

// Generate LD-JSON structured data for location landing page
function generateLdJsonSchema(
  clientData: any,
  websiteData: any,
  locationSlug: string
) {
  const { agencyName, canonicalUrl } = getSchemaDefaults(clientData);
  const location = websiteData?.client_locations;
  const locationName =
    location?.location_name || websiteData?.website_name || "";

  // Build opening hours from business_hours JSONB
  const openingHoursSpec = buildOpeningHoursSpec(websiteData?.business_hours);

  // Build service areas
  const serviceAreas =
    websiteData?.service_areas?.map((area: string) => ({
      "@type": "City",
      name: `${area}, ${location?.state || ""}`,
    })) || [];

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: `${agencyName} - ${locationName}`,
    description: `${agencyName} insurance agency serving ${location?.city || ""}, ${location?.state || ""} and surrounding areas.`,
    url: buildPageUrl(canonicalUrl, `/locations/${locationSlug}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: location?.address_line_1 || "",
      addressLocality: location?.city || "",
      addressRegion: location?.state || "",
      postalCode: location?.zip || "",
      addressCountry: "US",
    },
    telephone: location?.phone || websiteData?.phone || clientData?.phone || "",
  };

  // Add email if available
  if (location?.email) {
    schema.email = location.email;
  }

  // Add geo coordinates if available
  if (websiteData?.latitude && websiteData?.longitude) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: String(websiteData.latitude),
      longitude: String(websiteData.longitude),
    };
  }

  // Add opening hours if available
  if (openingHoursSpec.length > 0) {
    schema.openingHoursSpecification = openingHoursSpec;
  }

  // Add service areas if available
  if (serviceAreas.length > 0) {
    schema.areaServed = serviceAreas;
  }

  return schema;
}

export default async function LocationLandingPage({ params }: PageProps) {
  // Only allow location pages for multi-location clients
  const multiLocation = await isMultiLocation();
  if (!multiLocation) {
    notFound();
  }

  const { slug } = await params;
  const [website, clientData, heroSettings, introAspectRatio, ctaStyles] =
    await Promise.all([
      getWebsiteBySlug(slug),
      getClientData(),
      getHomePageHeroSettings(),
      getIntroAspectRatio(),
      getHomePageCTAStyles(),
    ]);

  if (!website) {
    notFound();
  }

  // Fetch location page content
  const locationId = website?.client_locations?.id;
  const pageData = locationId ? await getLocationPageData(locationId) : null;
  const agencyName = clientData?.agency_name || "";
  const locationName =
    website?.client_locations?.location_name || website.website_name;

  const city = website?.client_locations?.city || "";
  const state = website?.client_locations?.state || "";

  // Feature flags
  const showCareersSection = website?.features?.show_careers_page ?? true;

  // 1. Prepare Hero Data
  const locationHero = pageData?.hero_section;
  // Handle old string description vs new object description
  const heroDescriptionContent =
    locationHero?.subheading || locationHero?.description?.content;

  const heroSubheading =
    heroDescriptionContent ||
    `Your trusted insurance partner in ${city}, ${state}`;

  const heroBackgroundImage =
    locationHero?.background_image?.url ||
    heroSettings?.backgroundImage ||
    null;
  const heroBackgroundVideo =
    locationHero?.background_video?.url ||
    heroSettings?.backgroundVideo ||
    null;
  const heroMediaType =
    locationHero?.background_media_type ||
    heroSettings?.backgroundMediaType ||
    "image";
  const heroOverlayOpacity =
    locationHero?.overlay?.opacity || heroSettings?.overlayOpacity;
  const heroTitleColor =
    locationHero?.title?.color ||
    heroSettings?.titleColor ||
    "var(--color-primary)";
  const heroSubtitleColor =
    locationHero?.subtitle?.color ||
    heroSettings?.subtitleColor ||
    "var(--color-primary-foreground)";
  const heroOverlayColor =
    locationHero?.overlay?.color || heroSettings?.overlayColor || "#000000";

  const heroContent = {
    title: {
      content:
        pageData?.hero_section?.title?.content ||
        `${agencyName} ${locationName !== agencyName ? `- ${locationName}` : ""}`,
      color: heroTitleColor,
    },
    subtitle: {
      content:
        pageData?.hero_section?.subtitle?.content ||
        `Serving ${city}, ${state}`,
      color: heroTitleColor,
    },
    description: {
      content: heroSubheading,
      color: heroSubtitleColor,
    },
    background_image: {
      type: heroMediaType as "image" | "video",
      url:
        (heroMediaType === "video"
          ? heroBackgroundVideo
          : heroBackgroundImage) || "",
    },
    overlay: {
      color: heroOverlayColor,
      opacity: heroOverlayOpacity || 0,
    },
  };

  // 2. Prepare Intro Data
  const introSection = pageData?.intro_section;
  const introContent = {
    title: {
      content: introSection?.heading || `About Our ${locationName} Office`,
    },
    paragraphs: introSection?.content
      ? introSection.content.split("\n\n").map((p) => ({ content: p }))
      : [],
    image: { url: introSection?.imageUrl || "/Images/instrosection.png" },
    tagline: { content: "Learn More", color: "var(--color-secondary)" },
    overlay_tag: introSection?.imageTag
      ? { text: introSection.imageTag }
      : undefined,
  };

  // 3. Prepare CTA Data
  const ctaSection = pageData?.cta_section;
  const ctaContent = {
    title: {
      content:
        ctaSection?.title ||
        ctaSection?.heading ||
        `Connect With Your ${locationName} Team`,
    },
    description: {
      content:
        ctaSection?.description ||
        "Contact us today to learn how we can help protect what matters most.",
    },
    button_text:
      ctaSection?.button_text || ctaSection?.buttonText || "Contact Us",
    button_link: ctaSection?.buttonLink || "/contact",
    styles: ctaStyles || undefined,
  };

  // 4. Prepare FAQ Data
  const faqSection = pageData?.faq_section;
  const faqItems = faqSection?.items || faqSection?.questions || [];

  const faqContent: CommonQuestionsContent = {
    tagline: { content: faqSection?.tagline || "Common Questions" },
    subtitle: { content: faqSection?.subtitle || "Frequently Asked Questions" },
    description: {
      content:
        faqSection?.description ||
        "Quick answers to help you understand your coverage options.",
    },
    questions: {
      items: faqItems,
    },
  };

  // 5. Prepare Testimonials Data
  const reviewsSection = pageData?.reviews_section;
  let testimonialItems: ReviewItem[] = [];

  if (reviewsSection?.items && reviewsSection.items.length > 0) {
    // Use mapped items from reviews_section
    testimonialItems = reviewsSection.items.map((item: any) => ({
      author: item.author,
      rating: item.rating || 5,
      content: item.content,
      id: `${item.author}-${Math.random()}`,
    }));
  } else {
    // Fallback to google_reviews from website object
    const googleReviews: GoogleReview[] =
      website?.client_locations?.google_reviews || [];
    testimonialItems = googleReviews.map((review) => ({
      author: review.review_name,
      rating: 5,
      content: review.review_description,
      id: `${review.review_name}`,
    }));
  }

  const testimonialsContent: ReviewsContent = {
    tagline: { type: "text", content: "TESTIMONIALS" },
    subtitle: {
      tag: "h2",
      type: "text",
      content: reviewsSection?.title || "Customer Reviews",
    },
    description: {
      type: "text",
      content: "See what our clients say about us.",
    },
    reviews: {
      type: "list",
      items: testimonialItems,
    },
    // ... default empty buttons if not provided
    button_link_1: { url: "", text: "", type: "link" },
    button_link_2: { url: "", text: "", type: "link", content: "" },
  };

  // 6. Prepare Services (Mapped to CareersSection) Data
  const servicesSection = pageData?.services_section;
  const careersContent: CareersContent = {
    title:
      servicesSection?.title ||
      servicesSection?.heading ||
      `Services in ${city}`,
    subtitle: "OUR SERVICES",
    description:
      servicesSection?.description ||
      "Comprehensive insurance solutions tailored to your needs.",
    items: servicesSection?.items,
    benefits: [],
  };

  // Fetch policies
  const policies = await getPolicies(
    pageData?.policies_section?.featured_policy_ids
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection heroContent={heroContent} />

      {/* Intro Section */}
      {(introSection?.heading ||
        introSection?.content ||
        introSection?.imageUrl) && <IntroSection introContent={introContent} />}

      {/* Featured Policies Section */}
      {locationId && (
        <LocationFeaturedPolicies
          locationId={locationId}
          locationSlug={slug}
          policies={policies}
          title={pageData?.policies_section?.title}
          description={pageData?.policies_section?.description}
        />
      )}

      {/* Testimonials Section */}
      {testimonialItems.length > 0 && (
        <Testimonials content={testimonialsContent} />
      )}

      {/* CTA Section - Force single mode */}
      <HomeCTA ctaContent={ctaContent} forceSingleMode={true} />

      {/* FAQ Section */}
      {faqItems.length > 0 && faqSection?.show_section !== false && (
        <FAQPreview content={faqContent} />
      )}

      {/* Careers (Services) Section */}
      <CareersSection content={careersContent} />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateLdJsonSchema(clientData, website, slug)
          ),
        }}
      />
    </div>
  );
}
