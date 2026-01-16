'use client';

import { ChevronUp, ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';
import React, { useState } from 'react';

export default function FAQItems({ items }) {
  const [openFaqs, setOpenFaqs] = useState<Record<string, number[]>>({});
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, Record<number, 'helpful' | 'not-helpful' | null>>>({});

  const toggleFaq = (policyId: string, index: number) => {
    setOpenFaqs(prev => {
      const policyFaqs = prev[policyId] || [];
      return {
        ...prev,
        [policyId]: policyFaqs.includes(index)
          ? policyFaqs.filter(i => i !== index)
          : [...policyFaqs, index]
      };
    });
  };

  const isOpen = (policyId: string, index: number) => {
    return (openFaqs[policyId] || []).includes(index);
  };

  const recordFeedback = (policyId: string, faqIndex: number, isHelpful: boolean) => {
    setHelpfulFeedback(prev => ({
      ...prev,
      [policyId]: {
        ...(prev[policyId] || {}),
        [faqIndex]: isHelpful ? 'helpful' : 'not-helpful'
      }
    }));
  };

  const getFeedback = (policyId: string, faqIndex: number) => {
    return helpfulFeedback[policyId]?.[faqIndex] || null;
  };

  return (
    <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
      
      <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
        <div className="space-y-8">
          {items.map(policy => (
            <div
              key={policy.id}
              id={policy.id}
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 relative"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
              
              <div className="bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5 p-6 flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-modern-primary [&>svg]:text-white !important flex items-center justify-center shadow-lg">
                  {policy.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-theme-text">
                  {policy.name}
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {policy.faqs.map((faq, index) => (
                  <div key={index} className="transition-all duration-300">
                    <button
                      onClick={() => toggleFaq(policy.id, index)}
                      className={`w-full text-left p-6 flex justify-between items-center transition-colors relative z-10 ${
                        isOpen(policy.id, index) ? 'bg-modern-primary-5' : 'hover:bg-gray-50'
                      }`}
                      aria-expanded={isOpen(policy.id, index)}
                    >
                      <span className="font-semibold text-lg text-theme-text pr-4">{faq.question}</span>
                      {isOpen(policy.id, index) ?
                        <ChevronUp className="flex-shrink-0 text-primary" size={24} /> :
                        <ChevronDown className="flex-shrink-0 text-primary" size={24} />
                      }
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen(policy.id, index) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-6 bg-white text-theme-body leading-relaxed text-md">
                        <div 
                          className="prose prose-sm max-w-none [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80"
                          dangerouslySetInnerHTML={{ __html: faq.answer }} 
                        />

                        {/* Feedback buttons */}
                        <div className="mt-6 flex items-center space-x-4 pt-4 border-t border-gray-200">
                          <span className="text-sm text-theme-body font-medium">Was this helpful?</span>

                          <button
                            onClick={() => recordFeedback(policy.id, index, true)}
                            disabled={getFeedback(policy.id, index) !== null}
                            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                              getFeedback(policy.id, index) === 'helpful'
                                ? 'bg-green-100 text-green-700'
                                : 'hover:bg-gray-100 text-gray-600 border border-gray-200'
                            }`}
                            aria-label="Mark as helpful"
                          >
                            <ThumbsUp size={18} />
                            <span className="text-sm font-medium">Yes</span>
                          </button>

                          <button
                            onClick={() => recordFeedback(policy.id, index, false)}
                            disabled={getFeedback(policy.id, index) !== null}
                            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                              getFeedback(policy.id, index) === 'not-helpful'
                                ? 'bg-red-100 text-red-700'
                                : 'hover:bg-gray-100 text-gray-600 border border-gray-200'
                            }`}
                            aria-label="Mark as not helpful"
                          >
                            <ThumbsDown size={18} />
                            <span className="text-sm font-medium">No</span>
                          </button>

                          {getFeedback(policy.id, index) && (
                            <span className="text-sm text-green-700 font-medium animate-fade-in">
                              Thank you for your feedback!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
