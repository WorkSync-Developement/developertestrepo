import React from 'react';
import { Metadata } from 'next';

// Directly import modern variant components for testing
import HeroSection from '@/components/variants/modern/home/HeroSection';
import IntroSection from '@/components/variants/modern/home/IntroSection';
import LocationPoliciesSection from '@/components/variants/modern/home/LocationPoliciesSection';
import Testimonials from '@/components/variants/modern/home/Testimonials';
import HomeCTA from '@/components/variants/modern/home/HomeCTA';
import FAQPreview from '@/components/variants/modern/home/FAQPreview';
import CareersSection from '@/components/variants/modern/home/CareersSection';

export const metadata: Metadata = {
  title: 'Modern Variant Test Page',
  description: 'Test page to showcase the modern variant design',
};

export default function VariantTestPage() {
  return (
    <div className="home-content">
      <HeroSection />
      <IntroSection />
      <LocationPoliciesSection />
      <Testimonials />
      <HomeCTA />
      <FAQPreview />
      <CareersSection />
    </div>
  );
}
