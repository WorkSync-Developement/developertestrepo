import React from 'react';
import Link from 'next/link';
import { Phone, ArrowRight, HelpCircle } from 'lucide-react';
import ModernFAQSearch from '@/components/variants/modern/faq/FAQSearch';
import ModernFAQItems from '@/components/variants/modern/faq/FAQItems';
import BackToTop from 'components/ui/BackToTop';

interface FAQPageProps {
  faqPolicies: any[];
  locationName: string;
  slug: string;
  phone: string;
  phoneTel: string | null;
}

export default function ModernFAQPage({
  faqPolicies,
  locationName,
  slug,
  phone,
  phoneTel,
}: FAQPageProps) {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 py-4 max-w-screen-2xl relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">Frequently Asked </span>
              <span className="text-primary">Questions</span>
            </h1>
            <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-lg md:text-xl lg:text-2xl text-center max-w-3xl mx-auto text-theme-body leading-relaxed">
              Find answers to common questions about insurance coverage, claims, and our services at{' '}
              {locationName}.
            </p>
          </div>
        </div>
      </section>

      <ModernFAQSearch items={faqPolicies} />

      <ModernFAQItems items={faqPolicies} />

      {/* Insurance Resources Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              <span className="text-theme-text">Insurance </span>
              <span className="text-primary">Resources</span>
            </h2>
            <div className="h-1 w-24 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-theme-body text-lg text-center max-w-2xl mx-auto leading-relaxed">
              Explore our helpful resources to better understand your insurance options and how we can assist you.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <Link
              href={`/locations/${slug}/contact`}
              className="block group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-sm"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100 hover:border-primary hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center flex flex-col items-center h-full relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-heading font-bold text-theme-text mb-3 group-hover:text-primary transition-colors">
                    Understanding Insurance Terms
                  </h3>
                  <p className="text-theme-body leading-relaxed">
                    Insurance terminology can be confusing. Contact us for help understanding the language of insurance.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href={`/locations/${slug}/contact`}
              className="block group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-sm"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100 hover:border-primary hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center flex flex-col items-center h-full relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-heading font-bold text-theme-text mb-3 group-hover:text-primary transition-colors">
                    Policy Review
                  </h3>
                  <p className="text-theme-body leading-relaxed">
                    Not sure if your current policy meets your needs? Schedule a free policy review with our team.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href={`/locations/${slug}/contact`}
              className="block group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-sm"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100 hover:border-primary hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center flex flex-col items-center h-full relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-heading font-bold text-theme-text mb-3 group-hover:text-primary transition-colors">
                    Claims Process
                  </h3>
                  <p className="text-theme-body leading-relaxed">
                    Learn about our simple claims process and how we support you when you need us most.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-cta">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-white"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-white"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-white">Still Have Questions?</h2>
          <div className="h-1 w-24 rounded mx-auto mb-6 bg-white/30"></div>
          <p className="text-white/90 max-w-2xl mx-auto text-lg mb-8 leading-relaxed">
            Our team at {locationName} is here to help. Contact us directly for personalized assistance with your insurance needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/locations/${slug}/contact`}
              className="inline-flex items-center gap-2 bg-white text-primary py-4 px-8 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
            {phone && (
              <Link
                href={phoneTel ? `tel:${phoneTel}` : '#'}
                className="inline-flex items-center gap-2 bg-white/20 text-white py-4 px-8 rounded-full font-bold hover:bg-white/30 transition-all border-2 border-white/30"
              >
                <Phone size={18} />
                {phone}
              </Link>
            )}
          </div>
        </div>
      </section>

      <BackToTop />
    </main>
  );
}
