import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BadgeSmall } from '@/components/ui/Badge';
import FAQPreviewAccordion from './FAQPreviewAccordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQContent {
  tagline?: { content: string };
  subtitle?: { content: string };
  description?: { content: string };
  questions?: {
    items?: FAQItem[];
  };
}

async function getCommonQuestionsSection(): Promise<FAQContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from('client_home_page')
    .select('common_questions_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching common questions section:', error);
    return null;
  }

  return data?.common_questions_section || null;
}

export default async function FAQPreview(): Promise<JSX.Element | null> {
  const faqContent = await getCommonQuestionsSection();

  if (!faqContent || !faqContent.questions?.items || faqContent.questions.items.length === 0) {
    return null;
  }

  const tagline = faqContent.tagline?.content;
  const subtitle = faqContent.subtitle?.content || 'Frequently Asked Questions';
  const description = faqContent.description?.content;

  return (
    <section className="py-16 bg-theme-bg-alt relative w-full">
      <div className="container mx-auto px-4 py-6 relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          {tagline && (
            <BadgeSmall className="mb-4">
              {tagline}
            </BadgeSmall>
          )}
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-primary">
            {subtitle}
          </h2>
          {description && (
            <p className="text-theme-body text-lg">
              {description}
            </p>
          )}
        </div>
        
        <FAQPreviewAccordion faqs={faqContent.questions.items.slice(0, 5)} />
        
        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-primary font-medium hover:opacity-80 transition-opacity"
          >
            View All FAQs
            <svg className="w-4 h-4 rotate-[-90deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
