import React from 'react';
import { Metadata } from 'next';
// Service Bold Variant - Lehmann Agency inspired design
import HeroSectionWrapper from '@/components/variants/service-bold/home/HeroSectionWrapper';
import ServicesSectionWrapper from '@/components/variants/service-bold/home/ServicesSectionWrapper';
import WhyChooseUsSectionWrapper from '@/components/variants/service-bold/home/WhyChooseUsSectionWrapper';
// GallerySection disconnected - component kept for future use
// import GallerySection from '@/components/variants/service-bold/home/GallerySection';
import TestimonialsSectionWrapper from '@/components/variants/service-bold/home/TestimonialsSectionWrapper';
import ContactCTAWrapper from '@/components/variants/service-bold/home/ContactCTAWrapper';
import FloatingCTAWrapper from '@/components/variants/service-bold/home/FloatingCTAWrapper';
import BackToTop from '@/components/variants/service-bold/home/BackToTop';
import StickyHeaderCTAWrapper from '@/components/variants/service-bold/home/StickyHeaderCTAWrapper';
import { getClientData } from '@/lib/client';

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
  return (
    <div className="home-content">
      <StickyHeaderCTAWrapper />
      <HeroSectionWrapper />
      <ServicesSectionWrapper />
      <WhyChooseUsSectionWrapper />
      {/* GallerySection disconnected - component kept for future use */}
      <TestimonialsSectionWrapper />
      <ContactCTAWrapper />
      <FloatingCTAWrapper />
      <BackToTop />
    </div>
  );
}

export const revalidate = 3600;
