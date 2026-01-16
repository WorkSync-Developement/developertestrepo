import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQPreviewData {
  title?: string;
  subtitle?: string;
  faqs?: FAQ[];
}

async function getFAQPreview(): Promise<FAQPreviewData | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

  if (!clientId) {
    console.error('NEXT_PUBLIC_CLIENT_ID is not set');
    return null;
  }

  const { data, error } = await supabase
    .from('client_home_page')
    .select('common_questions_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching FAQ preview:', error);
    return null;
  }

  return data?.common_questions_section || null;
}

// Note: client_faqs table does not exist in current schema
// FAQs are stored in client_home_page.common_questions_section as JSONB
async function getFAQsFromTable(): Promise<FAQ[]> {
  // Return empty array - FAQs come from common_questions_section instead
  return [];
}

const FAQPreview = async () => {
  const [faqPreviewData, tableFaqs] = await Promise.all([getFAQPreview(), getFAQsFromTable()]);

  const faqs = faqPreviewData?.faqs || tableFaqs;

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#d4a853' }}>
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1e3a5f' }}>
            {faqPreviewData?.title || 'Common Questions'}
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.slice(0, 4).map((faq, idx) => (
            <details
              key={faq.id || idx}
              className="group rounded-xl border border-gray-200 overflow-hidden"
            >
              <summary 
                className="flex items-center justify-between p-5 cursor-pointer list-none transition-colors duration-200 hover:bg-gray-50"
              >
                <span className="font-semibold pr-4" style={{ color: '#1e3a5f' }}>{faq.question}</span>
                <ChevronDown
                  size={20}
                  className="flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  style={{ color: '#d4a853' }}
                />
              </summary>
              <div className="px-5 pb-5 pt-0">
                <p className="leading-relaxed" style={{ color: '#5a6a7a' }}>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#1e3a5f', color: '#ffffff' }}
          >
            View All FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQPreview;
