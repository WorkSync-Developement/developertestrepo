'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Local Badge component for modern variant
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

function Badge({ children, className = '' }: BadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium bg-secondary text-secondary-foreground ${className}`}>
      {children}
    </div>
  );
}

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

export default function LocationFAQSection({ faqSection }: LocationFAQSectionProps): React.ReactElement | null {
  const [openIndex, setOpenIndex] = useState(-1);
  
  // Don't render if no data
  if (!faqSection) {
    return null;
  }

  const questions = faqSection.questions || [];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
      
      <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
        <div className="text-center mb-16">
          {faqSection.tagline && (
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge>
                {faqSection.tagline}
              </Badge>
            </div>
          )}
          {faqSection.subtitle && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">{faqSection.subtitle}</span>
            </h2>
          )}
          {faqSection.description && (
            <>
              <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
              <p className="text-lg md:text-xl text-theme-body max-w-3xl mx-auto leading-relaxed">
                {faqSection.description}
              </p>
            </>
          )}
        </div>
        
        <div className="max-w-3xl mx-auto">
          {questions.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-6 hover:bg-modern-primary-5 transition-colors text-left"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`location-faq-answer-${index}`}
              >
                <span className="font-semibold text-theme-text text-lg pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-primary flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div 
                  id={`location-faq-answer-${index}`}
                  className="bg-modern-primary-5 px-6 pb-6 transition-all duration-300 ease-in-out"
                  aria-hidden={false}
                >
                  <p className="text-theme-body leading-relaxed">{faq.answer || ''}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
