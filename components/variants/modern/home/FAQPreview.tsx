'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQContent {
  tagline: { type: string; content: string };
  subtitle: { tag: string; type: string; content: string };
  description: { type: string; content: string };
  faqs: { type: string; items: FAQItem[] };
}

interface FAQPreviewProps {
  faqContent: FAQContent;
}

export default function FAQPreview({ faqContent }: FAQPreviewProps) {
  const [openIndex, setOpenIndex] = useState(-1);
  const faqs = faqContent?.faqs?.items || [];

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Show first 5 FAQs
  const displayFaqs = faqs.slice(0, 5);

  return (
    <section
      className="py-20 relative"
      style={{ backgroundColor: 'var(--color-background-alt)' }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-secondary-foreground)',
            }}
          >
            {faqContent.tagline?.content || 'FAQ'}
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {faqContent.subtitle?.content || 'Frequently Asked Questions'}
          </h2>
          <p className="text-lg md:text-xl" style={{ color: 'var(--color-text-body)' }}>
            {faqContent.description?.content || 'Find answers to common questions'}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {displayFaqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border"
              style={{
                backgroundColor: 'var(--color-background-alt)',
                borderColor: openIndex === index ? 'var(--color-accent)' : 'var(--color-secondary)',
              }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:opacity-90 transition-opacity"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                style={{
                  backgroundColor:
                    openIndex === index
                      ? 'var(--color-secondary)'
                      : 'var(--color-background-alt)',
                }}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor:
                        openIndex === index ? 'var(--color-accent)' : 'var(--color-primary)',
                    }}
                  >
                    <HelpCircle
                      size={20}
                      style={{
                        color:
                          openIndex === index
                            ? 'var(--color-accent-foreground)'
                            : 'var(--color-primary-foreground)',
                      }}
                    />
                  </div>
                  <span
                    className="font-semibold text-lg flex-1"
                    style={{
                      color:
                        openIndex === index
                          ? 'var(--color-secondary-foreground)'
                          : 'var(--color-text-primary)',
                    }}
                  >
                    {faq.question}
                  </span>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <ChevronUp
                      size={24}
                      style={{ color: 'var(--color-secondary-foreground)' }}
                    />
                  ) : (
                    <ChevronDown size={24} style={{ color: 'var(--color-text-primary)' }} />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div
                  className="px-6 pb-6 pl-20 animate-fade-in"
                  id={`faq-answer-${index}`}
                  style={{ color: 'var(--color-text-body)' }}
                >
                  <p className="text-base leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Link */}
        {faqs.length > 5 && (
          <div className="text-center mt-12">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-accent-foreground)',
              }}
            >
              <span>View All FAQs</span>
              <ChevronDown size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
