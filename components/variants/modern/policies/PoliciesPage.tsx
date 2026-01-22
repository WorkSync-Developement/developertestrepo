import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface Policy {
  slug: string;
  title: string;
  content_summary?: string;
  icon_url?: string;
}

interface PoliciesPageProps {
  allPolicies: Policy[];
  slug: string;
  heroHeading: string;
  heroSubheading: string;
}

export default function ModernPoliciesPage({
  allPolicies,
  slug,
  heroHeading,
  heroSubheading,
}: PoliciesPageProps) {
  return (
    <div>
      {/* Policies Page Hero */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 py-4 max-w-screen-2xl relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">{heroHeading}</span>
            </h1>
            <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-lg md:text-xl lg:text-2xl text-center max-w-3xl mx-auto text-theme-body leading-relaxed">
              {heroSubheading}
            </p>
          </div>
        </div>
      </section>

      {/* Policies Grid */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center gap-8">
            {allPolicies.map((policy) => (
              <Link 
                key={policy.slug} 
                href={`/locations/${slug}/policies/${policy.slug}`} 
                className="block group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-sm"
              >
                <div className="bg-white rounded-2xl p-8 text-center shadow-xl border-2 border-gray-100 hover:border-primary hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full flex flex-col relative overflow-hidden">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
                  
                  {/* Icon container */}
                  <div className="relative z-10 mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-modern-primary flex items-center justify-center mx-auto shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      {policy.icon_url ? (
                        <Image src={policy.icon_url} alt="" width={40} height={40} className="text-white" />
                      ) : (
                        <ShieldCheck size={32} className="text-white" />
                      )}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-2xl font-heading font-bold text-theme-text mb-3 group-hover:text-primary transition-colors">
                      {policy.title}
                    </h3>
                    <div className="h-1 w-16 rounded mx-auto mb-4 bg-gradient-modern-primary-secondary"></div>
                    {policy.content_summary && (
                      <p className="text-theme-body mb-6 min-h-[3rem] line-clamp-2 leading-relaxed flex-1">
                        {policy.content_summary}
                      </p>
                    )}
                    <div className="flex justify-center mt-auto">
                      <span className="inline-flex items-center gap-2 font-semibold py-3 px-6 rounded-full text-sm transition-all bg-gradient-modern-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <span>Learn More</span>
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
