import { ReactNode } from "react";
import Link from '@/components/location/Link';
import Image from "next/image";
import YouTubeEmbed from "@/components/policies/YouTubeEmbed";
import RelatedTermsSection from "@/components/policies/RelatedTermsSection";
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface FeaturesSectionProps {
  title: string;
  items: string[];
}

interface FaqSectionProps {
  title: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const ModernFeaturesSection = ({ title, items }: FeaturesSectionProps) => (
  <section className="my-10">
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
      
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
          <span className="text-theme-text">{title}</span>
        </h2>
        <div className="h-1 w-16 rounded mb-6 bg-gradient-modern-primary-secondary"></div>
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-modern-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 size={16} className="text-white" />
              </div>
              <span className="text-theme-body text-lg leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const ModernFaqSection = ({ title, faqs }: FaqSectionProps) => (
  <section className="my-10">
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
      
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
          <span className="text-theme-text">{title}</span>
        </h2>
        <div className="h-1 w-16 rounded mb-6 bg-gradient-modern-primary-secondary"></div>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-theme-text mb-3">
                {faq.question}
              </h3>
              <p className="text-theme-body leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

interface PolicyPageTemplateProps {
  children: ReactNode;
  heroSection: { heading: string; subheading?: string };
  relatedPolicies?: { title: string; slug: string; basePath?: string }[];
  relatedTerms?: Array<{ slug: string; term: string }>;
  canonicalUrl?: string;
  contentSections?: Array<{
    type: string;
    tag?: string;
    heading?: string;
    content?: string;
    title?: string;
    items?: string[];
    text?: string;
    button_text?: string;
    faqs?: Array<{
      question: string;
      answer: string;
    }>;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  youtubeUrl?: string;
}

export default function ModernPolicyPageTemplate({
  children,
  heroSection,
  relatedPolicies = [],
  relatedTerms = [],
  canonicalUrl = "",
  contentSections = [],
  faqs = [],
  youtubeUrl,
}: PolicyPageTemplateProps) {

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 py-4 max-w-screen-2xl relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">{heroSection.heading}</span>
            </h1>
            {heroSection.subheading && (
              <>
                <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
                <p className="text-lg md:text-xl lg:text-2xl text-center max-w-3xl mx-auto text-theme-body leading-relaxed">
                  {heroSection.subheading}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      {youtubeUrl && (
        <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
          
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                  <span className="text-theme-text">Video </span>
                  <span className="text-primary">Overview</span>
                </h2>
                <div className="h-1 w-16 rounded mb-6 bg-gradient-modern-primary-secondary"></div>
                <YouTubeEmbed url={youtubeUrl} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Sections */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-8 border border-gray-100 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
            
            <div className="relative z-10">
              {contentSections &&
                contentSections.length > 0 &&
                contentSections.map((item, idx) => {
                  switch (item.type) {
                    case "heading":
                      return (
                        <div key={idx} className="mb-6 mt-8 first:mt-0">
                          {item.tag === "h2" ? (
                            <>
                              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                                <span className="text-theme-text">{item.content}</span>
                              </h2>
                              <div className="h-1 w-16 rounded mb-6 bg-gradient-modern-primary-secondary" />
                            </>
                          ) : (
                            <h3 className="text-xl md:text-2xl font-heading font-bold mb-4">
                              <span className="text-theme-text">{item.content}</span>
                            </h3>
                          )}
                        </div>
                      );

                    case "text":
                      return (
                        <div key={idx} className="mb-8">
                          <p
                            className="text-theme-body text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </div>
                      );

                    case "features":
                      return (
                        <div key={idx} className="mb-8">
                          <ModernFeaturesSection title={item.title} items={item.items} />
                        </div>
                      );

                    case "cta":
                      return (
                        <div key={idx} className="text-center mt-10 mb-8 bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5 rounded-2xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
                          {/* Decorative corner accent */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-10 to-transparent rounded-bl-full"></div>
                          
                          <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                              <span className="text-theme-text">{item.title}</span>
                            </h3>
                            <div className="h-1 w-16 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
                            <p className="text-theme-body mb-8 text-lg leading-relaxed">{item.text}</p>
                            <Link
                              href="/contact"
                              className="text-center align-center items-center"
                            >
                              <button className="inline-flex items-center gap-2 font-bold py-4 px-8 rounded-full text-lg transition-all bg-gradient-modern-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                {item.button_text}
                                <ArrowRight size={18} />
                              </button>
                            </Link>
                          </div>
                        </div>
                      );

                    case "faqs":
                      return (
                        <div key={idx} className="mb-8">
                          <ModernFaqSection title={item.title || "Frequently Asked Questions"} faqs={item.faqs || []} />
                        </div>
                      );
                      
                    default:
                      return null;
                  }
                })}
                
                {/* Render page-level FAQs if provided */}
                {faqs.length > 0 && (
                  <div className="mb-8">
                    <ModernFaqSection title="Frequently Asked Questions" faqs={faqs} />
                  </div>
                )}
              {children}
            </div>
          </div>
        </div>
      </section>

      {/* Related Terms */}
      {relatedTerms.length > 0 && (
        <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <RelatedTermsSection terms={relatedTerms} />
            </div>
          </div>
        </section>
      )}

      {/* Related Policies */}
      {relatedPolicies.length > 0 && (
        <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col items-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-4">
                    <span className="text-theme-text">Related Insurance </span>
                    <span className="text-primary">Policies</span>
                  </h2>
                  <div className="h-1 w-24 rounded bg-gradient-modern-primary-secondary" />
                </div>

                <div className="flex flex-wrap justify-center gap-6 mt-8">
                  {relatedPolicies.map((policy) => (
                    <Link
                      key={policy.slug}
                      href={`${policy.basePath || '/policies'}/${policy.slug}`}
                      className="block group w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-xs"
                    >
                      <div className="bg-white rounded-xl p-6 text-center shadow-lg border-2 border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center h-full relative overflow-hidden">
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
                        
                        <div className="relative z-10">
                          <span className="text-lg font-heading font-semibold text-theme-text mb-2 group-hover:text-primary transition-colors block">
                            {policy.title}
                          </span>
                          <div className="mt-4 flex items-center justify-center gap-2 text-primary font-semibold text-sm">
                            <span>Learn More</span>
                            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
