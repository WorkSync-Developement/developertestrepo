import React from 'react';
import { Metadata } from 'next';
import { getAggregatedFAQs } from '@/lib/faq';
import { getClientPrimaryLocation } from '@/lib/utils';
import FAQPreview from '@/components/variants/professional/home/FAQPreview';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about our insurance services and policies.',
};

export default async function FAQPage() {
  const primaryLocation = await getClientPrimaryLocation();
  const faqPolicies = primaryLocation ? await getAggregatedFAQs(primaryLocation.id) : [];
  
  // Flatten FAQs from policies for the general display
  const allFaqs = faqPolicies.flatMap(policy => policy.faqs);

  return (
    <div className="faq-page pt-8">
      {/* Use the variant preview as a header/intro */}
      <FAQPreview />
    </div>
  );
}
