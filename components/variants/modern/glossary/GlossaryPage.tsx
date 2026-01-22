import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { stripHtmlTags } from '@/lib/utils/content-formatters';

interface GlossaryTerm {
  id: string;
  slug: string;
  term: string;
  category: string | null;
  head: string;
  body: string | null;
  links: any;
  created_at: string;
  updated_at: string;
}

interface GlossaryPageProps {
  termsByCategory: Record<string, GlossaryTerm[]>;
  sortedCategories: string[];
  firstLetters: string[];
  locationName: string;
  slug: string;
}

export default function ModernGlossaryPage({
  termsByCategory,
  sortedCategories,
  firstLetters,
  locationName,
  slug,
}: GlossaryPageProps) {
  return (
    <main className="flex-grow">
      {/* Glossary Hero */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 py-4 max-w-screen-2xl relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">Insurance </span>
              <span className="text-primary">Glossary</span>
            </h1>
            <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-theme-body text-lg md:text-xl lg:text-2xl text-center max-w-3xl mx-auto leading-relaxed">
              Understanding insurance terms made simple - {locationName}
            </p>
          </div>
        </div>
      </section>

      {/* Alphabetical Navigation */}
      {firstLetters.length > 0 && (
        <section className="py-12 relative w-full overflow-hidden bg-gradient-modern-section">
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="flex flex-wrap justify-center gap-3">
              {firstLetters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-12 h-12 flex items-center justify-center bg-white hover:bg-gradient-modern-primary text-primary hover:text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border-2 border-gray-200 hover:border-primary"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Terms by Category */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
          {sortedCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-theme-body text-lg">No glossary terms available at this time.</p>
            </div>
          ) : (
            sortedCategories.map((category) => (
              <div key={category} className="mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
                  <span className="text-theme-text">{category}</span>
                </h2>
                <div className="h-1 w-24 rounded mb-8 bg-gradient-modern-primary-secondary"></div>
                <div className="flex flex-wrap justify-center gap-6">
                  {termsByCategory[category].map((term) => (
                    <Link
                      key={term.id}
                      href={`/locations/${slug}/glossary/${term.slug}`}
                      className="block group w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm"
                    >
                      <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden h-full">
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
                        
                        <div className="relative z-10">
                          <h4 className="font-bold text-lg text-theme-text group-hover:text-primary transition-colors mb-3">
                            {term.term}
                          </h4>
                          <p className="text-sm text-theme-body line-clamp-3 leading-relaxed mb-4">
                            {stripHtmlTags(term.body || term.head).substring(0, 120)}...
                          </p>
                          <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                            <span>Learn More</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-cta">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-white"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-white"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
            Need Help Understanding Your Coverage?
          </h2>
          <div className="h-1 w-24 rounded mx-auto mb-6 bg-white/30"></div>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Our experienced team at {locationName} is here to help explain your insurance options
            and find the right coverage for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/locations/${slug}/contact`}
              className="inline-flex items-center gap-2 bg-white text-primary font-bold py-4 px-8 rounded-full transition-all hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Contact Us Today
              <ArrowRight size={18} />
            </Link>
            <Link
              href={`/locations/${slug}/policies`}
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/20 font-bold py-4 px-8 rounded-full transition-all"
            >
              View Our Policies
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
