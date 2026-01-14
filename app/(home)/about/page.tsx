import React from 'react';
import { Metadata } from 'next';
import IntroSection from '@/components/variants/professional/home/IntroSection';
import { getClientData } from '@/lib/client';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our agency and our commitment to serving your insurance needs.',
};

export default async function AboutPage() {
  return (
    <div className="about-page pt-8">
      <IntroSection />
    </div>
  );
}
