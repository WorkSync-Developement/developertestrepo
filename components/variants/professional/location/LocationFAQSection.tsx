'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

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

export default function LocationFAQSection({ faqSection }: LocationFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Don't render if no data
  if (!faqSection || faqSection.show_section === false) {
    return null;
  }

  const questions = faqSection.questions || [];
  
  if (questions.length === 0) {
    return null;
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background-alt">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          {faqSection.tagline && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
              {faqSection.tagline}
            </span>
          )}
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
             {faqSection.subtitle || "Frequently Asked Questions"}
          </h2>
          
          {faqSection.description && (
             <p className="text-lg text-theme-body max-w-2xl mx-auto">
               {faqSection.description}
             </p>
          )}
        </div>

        <div className="space-y-4">
          {questions.map((faq, index) => (
            <div 
              key={index}
              className={`bg-card-bg rounded-xl border ${openIndex === index ? 'border-primary/30 shadow-md' : 'border-card-border shadow-sm'} overflow-hidden transition-all duration-300`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`text-lg font-medium pr-8 ${openIndex === index ? 'text-primary' : 'text-theme-body'}`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 p-2 rounded-full ${openIndex === index ? 'bg-primary text-white' : 'bg-background-alt text-theme-body'}`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-theme-body/80 leading-relaxed border-t border-dashed border-gray-100 pt-4 mt-2">
                   {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
