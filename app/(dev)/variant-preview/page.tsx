import React from 'react';
import {
  HeroSection,
  IntroSection,
  LocationPoliciesSection,
  TestimonialsWrapper,
  HomeCTA,
  FAQPreviewWrapper,
  CareersSection
} from '@/components/variants/coastal';

export const metadata = {
  title: 'Homepage Variant B Preview',
  description: 'Preview of the homepage-variant-b template',
};

export default async function VariantBPreviewPage() {
  return (
    <div className="home-content">
      {/* Hero Section - Server Component, fetches its own data */}
      <HeroSection />

      {/* Intro Section - Server Component, fetches its own data */}
      <IntroSection />

      {/* Location/Policies Section - Server Component, fetches its own data */}
      <LocationPoliciesSection />

      {/* Testimonials - Uses wrapper pattern for data fetching */}
      <TestimonialsWrapper />

      {/* Home CTA - Server Component, fetches its own data */}
      <HomeCTA />

      {/* FAQ Preview - Uses wrapper pattern for data fetching */}
      <FAQPreviewWrapper />

      {/* Careers Section - Server Component, fetches its own data */}
      <CareersSection />
    </div>
  );
}
