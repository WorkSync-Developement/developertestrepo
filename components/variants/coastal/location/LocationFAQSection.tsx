'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Divider } from '@/components/ui/Divider';
import { BadgeSmall } from '@/components/ui/Badge';

interface QuestionItem {
  question: string;
  answer: string;
}

interface FaqSection {
  tagline?: string;
  subtitle?: string;
  description?: string;
  questions?: QuestionItem[];
  show_section?: boolean;
}

interface LocationFAQSectionProps {
  faqSection: FaqSection | null;
}

const LocationFAQSection: React.FC<LocationFAQSectionProps> = ({ faqSection }) => {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  // Don't render if no data
  if (!faqSection) {
    return null;
  }

  const questions = faqSection.questions || [];

  if (questions.length === 0) {
    return null;
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      className="py-20 relative w-full overflow-hidden"
      style={{ backgroundColor: 'var(--color-background-alt)' }}
    >
      <Divider position="top" />

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, var(--color-primary) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 py-6 relative z-20 max-w-screen-xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {faqSection.tagline && (
            <BadgeSmall className="mb-4 inline-flex items-center gap-2">
              <HelpCircle size={14} />
              {faqSection.tagline}
            </BadgeSmall>
          )}
          {faqSection.subtitle && (
            <h2
              className="text-3xl md:text-4xl font-heading font-bold mb-4"
              style={{ color: 'var(--color-primary)' }}
            >
              {faqSection.subtitle}
            </h2>
          )}
          {faqSection.description && (
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {faqSection.description}
            </p>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {questions.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              style={{
                backgroundColor: 'var(--color-background)',
                border: `1px solid var(--color-border)`,
              }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`location-faq-answer-${index}`}
                style={{
                  backgroundColor:
                    openIndex === index
                      ? 'color-mix(in srgb, var(--color-secondary) 5%, transparent)'
                      : 'transparent',
                }}
              >
                <span
                  className="font-medium text-base pr-4"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor:
                      openIndex === index
                        ? 'var(--color-accent)'
                        : 'color-mix(in srgb, var(--color-secondary) 10%, transparent)',
                    color:
                      openIndex === index
                        ? 'var(--color-accent-foreground)'
                        : 'var(--color-primary)',
                  }}
                >
                  {openIndex === index ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div
                  id={`location-faq-answer-${index}`}
                  className="px-5 pb-5"
                  style={{
                    borderTop: `1px solid color-mix(in srgb, var(--color-border) 50%, transparent)`,
                  }}
                >
                  <p
                    className="pt-4 text-sm leading-relaxed"
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
    </section>
  );
};

export default LocationFAQSection;
