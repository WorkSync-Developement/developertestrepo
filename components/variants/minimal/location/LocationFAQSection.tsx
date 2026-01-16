'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LocationFAQSectionProps {
  faqSection: {
    tagline?: string;
    subtitle?: string;
    description?: string;
    questions?: Array<{ question: string; answer: string }>;
    show_section?: boolean;
  } | null;
}

export default function LocationFAQSection({ faqSection }: LocationFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState(-1);

  if (!faqSection || faqSection.show_section === false || !faqSection.questions || faqSection.questions.length === 0) {
    return null;
  }

  return (
    <section className="py-32" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <p className="text-xs uppercase tracking-widest font-light" style={{ color: 'var(--color-text-muted)' }}>
              {faqSection.tagline || 'FAQ'}
            </p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ color: 'var(--color-text-primary)' }}>
              {faqSection.subtitle || 'Questions'}
            </h2>
          </div>

          <div className="space-y-1">
            {faqSection.questions.map((faq, index) => (
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
        </div>
      </div>
    </section>
  );
}
