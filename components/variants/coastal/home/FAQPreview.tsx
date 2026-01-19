'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Divider } from '@/components/ui/Divider';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQContent {
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
  faqs: {
    type: string;
    items: FAQItem[];
  };
}

interface FAQPreviewProps {
  faqContent: FAQContent;
}

// Dummy FAQ data for preview/development
const dummyFAQs: FAQItem[] = [
  {
    question: 'What types of insurance do you offer?',
    answer: 'We offer a comprehensive range of insurance products including auto insurance, home insurance, life insurance, business insurance, renters insurance, and more. Our experienced agents can help you find the right coverage for your specific needs.'
  },
  {
    question: 'How can I get a free quote?',
    answer: 'Getting a free quote is easy! You can call our office directly, fill out our online quote form, or schedule an appointment with one of our licensed agents. We\'ll review your needs and provide competitive rates from multiple carriers.'
  },
  {
    question: 'What factors affect my insurance premium?',
    answer: 'Several factors influence your premium including your coverage level, deductible amount, claims history, credit score, location, and the type of property or vehicle being insured. Our agents can help you understand these factors and find ways to save.'
  },
  {
    question: 'How do I file a claim?',
    answer: 'To file a claim, contact our office as soon as possible after an incident. We\'ll guide you through the process, help you gather necessary documentation, and work with your insurance carrier to ensure your claim is handled promptly and fairly.'
  },
  {
    question: 'Can I bundle multiple policies for a discount?',
    answer: 'Yes! Bundling multiple policies (such as auto and home insurance) is one of the best ways to save money. Many carriers offer significant multi-policy discounts. Ask our agents about bundling options to maximize your savings.'
  }
];

const FAQPreview: React.FC<FAQPreviewProps> = ({ faqContent }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  
  // Use dummy FAQs if no data provided
  const faqs = (faqContent?.faqs?.items && faqContent.faqs.items.length > 0) 
    ? faqContent.faqs.items 
    : dummyFAQs;
  
  // Use dummy content if not provided
  const tagline = faqContent?.tagline?.content || 'FAQ';
  const subtitle = faqContent?.subtitle?.content || 'Frequently Asked Questions';
  const description = faqContent?.description?.content || 'Find answers to common questions about our insurance services.';

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      className="py-20 lg:py-28 relative"
      style={{ backgroundColor: 'var(--color-background-alt)' }}
    >
      <Divider position="top" />

      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <HelpCircle size={20} style={{ color: 'var(--color-accent)' }} />
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-accent)' }}
              >
                {tagline}
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {subtitle}
            </h2>

            <p
              className="text-lg mb-8"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {description}
            </p>

            <Link
              href="/faq"
              className="inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
              style={{ color: 'var(--color-accent)' }}
            >
              View All FAQs
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="space-y-4">
            {faqs.slice(0, 5).map((faq, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden border transition-all duration-200"
                style={{
                  backgroundColor: 'var(--color-background)',
                  borderColor: openIndex === index ? 'var(--color-accent)' : 'var(--color-border)',
                  boxShadow: openIndex === index ? '0 10px 30px rgba(0, 0, 0, 0.08)' : 'none'
                }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span
                    className="text-base md:text-lg pr-4 font-heading font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {faq.question}
                  </span>
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: openIndex === index ? 'var(--color-accent)' : 'transparent',
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <ChevronDown
                      size={20}
                      style={{
                        color: openIndex === index ? 'var(--color-accent-foreground)' : 'var(--color-text-muted)'
                      }}
                    />
                  </div>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                  aria-hidden={openIndex !== index}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <div
                      className="h-px mb-4"
                      style={{ backgroundColor: 'var(--color-border)' }}
                    />
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {faq.answer || ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { FAQPreview };
export default FAQPreview;
