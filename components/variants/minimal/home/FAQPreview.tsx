'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQContent {
  tagline: { content: string };
  subtitle: { content: string };
  description: { content: string };
  faqs: { items: FAQItem[] };
}

interface FAQPreviewProps {
  faqContent: FAQContent;
}

export default function FAQPreview({ faqContent }: FAQPreviewProps) {
  const [openIndex, setOpenIndex] = useState(-1);
  const faqs = faqContent?.faqs?.items || [];

  if (!faqs || faqs.length === 0) return null;

  const displayFaqs = faqs.slice(0, 5);

  return (
    <section className="py-32" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <p className="text-xs uppercase tracking-widest font-light" style={{ color: 'var(--color-text-muted)' }}>
              {faqContent.tagline?.content}
            </p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ color: 'var(--color-text-primary)' }}>
              {faqContent.subtitle?.content}
            </h2>
          </div>

          <div className="space-y-1">
            {displayFaqs.map((faq, index) => (
              <div key={index} className="border-t" style={{ borderColor: 'var(--color-text-muted)', borderWidth: '1px', opacity: 0.2 }}>
                <button
                  className="w-full flex items-center justify-between py-6 text-left transition-opacity hover:opacity-60"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-light text-lg pr-8" style={{ color: 'var(--color-text-primary)' }}>
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp size={20} style={{ color: 'var(--color-text-muted)' }} />
                  ) : (
                    <ChevronDown size={20} style={{ color: 'var(--color-text-muted)' }} />
                  )}
                </button>
                {openIndex === index && (
                  <div className="pb-6 pr-12" style={{ color: 'var(--color-text-body)' }}>
                    <p className="text-sm font-light leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {faqs.length > 5 && (
            <div className="text-center mt-12">
              <Link
                href="/faq"
                className="inline-block text-sm font-light tracking-wide transition-opacity hover:opacity-60"
                style={{ color: 'var(--color-primary)' }}
              >
                View All Questions →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
