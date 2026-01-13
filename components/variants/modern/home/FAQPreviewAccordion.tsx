'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPreviewAccordionProps {
  faqs: FAQItem[];
}

export default function FAQPreviewAccordion({ faqs }: FAQPreviewAccordionProps) {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="mb-4 border rounded-lg overflow-hidden"
          style={{ borderColor: 'var(--color-card-border, #e2e8f0)' }}
        >
          <button
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
            onClick={() => toggleFAQ(index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-medium text-primary">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp size={18} className="text-primary flex-shrink-0" />
            ) : (
              <ChevronDown size={18} className="text-primary flex-shrink-0" />
            )}
          </button>
          
          {openIndex === index && (
            <div className="bg-white px-4 py-4 transition-all duration-300">
              <p className="text-theme-body text-sm">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
