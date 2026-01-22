import React from 'react';
import { Metadata } from 'next';
import { getTemplateVariant } from '@/lib/variants';
import { getClientData } from '@/lib/client';

// Common components
import HeroSection from '@/components/home-page/HeroSection';
import IntroSection from '@/components/home-page/IntroSection';
import LocationPoliciesSection from '@/components/home-page/LocationPoliciesSection';
import Testimonials from '@/components/home-page/TestimonialsWrapper';
import HomeCTA from '@/components/home-page/HomeCTA';
import FAQPreview from '@/components/home-page/FAQPreviewWrapper';
import InsuranceCareersSection from '@/components/home-page/InsuranceCareersSection';

// Modern variant components
import ModernHeroSection from '@/components/variants/modern/home/HeroSection';
import ModernIntroSection from '@/components/variants/modern/home/IntroSection';
import ModernLocationPoliciesSection from '@/components/variants/modern/home/LocationPoliciesSection';
import ModernTestimonials from '@/components/variants/modern/home/Testimonials';
import ModernHomeCTA from '@/components/variants/modern/home/HomeCTA';
import ModernFAQPreview from '@/components/variants/modern/home/FAQPreview';
import ModernCareersSection from '@/components/variants/modern/home/CareersSection';

// Page-specific metadata overrides - inherits from layout.tsx
export async function generateMetadata(): Promise<Metadata> {
  const clientMetadata = await getClientData();
  const agencyName = clientMetadata?.agency_name || "";
  const url = clientMetadata?.client_website?.canonical_url || "";
  const city = clientMetadata?.city || "";

  return {
    title: `${agencyName} | Your Trusted ${city} Insurance Partner`,

    // Homepage-specific description (under 150 characters)
    description: `${agencyName} is a trusted insurance agency in ${city}, ${clientMetadata?.state || ''}. Auto, home, life & business coverage.`,

    // Page-specific OpenGraph overrides
    openGraph: {
      title: `${agencyName} | ${city}'s Trusted Insurance Partner`,
      description: `Protect what matters most with personalized insurance solutions. Serving ${city} families and businesses with auto, home, life, and commercial coverage.`,
      url: url,
    },

    // Page-specific Twitter/X overrides
    twitter: {
      title: `${agencyName} | ${city} Insurance Expert`,
      description: `Personalized insurance protection for ${city} families and businesses. Auto, home, life & commercial insurance.`,
    },
  };
}


export default async function Home() {
  const variant = await getTemplateVariant();

  // Use modern variant components if variant is modern
  if (variant === 'modern') {
    return (
      <div className="home-content">
        <ModernHeroSection />
        <ModernIntroSection />
        <ModernLocationPoliciesSection />
        <ModernTestimonials />
        <ModernHomeCTA />
        <ModernFAQPreview />
        <ModernCareersSection />
      </div>
    );
  }

  // Default/common components
  return (
    <div className="home-content">
      <HeroSection />
      <IntroSection />
      <LocationPoliciesSection />
      <Testimonials />
      <HomeCTA />
      <FAQPreview />
      <InsuranceCareersSection />
    </div>
  );
}

export const revalidate = 3600;
