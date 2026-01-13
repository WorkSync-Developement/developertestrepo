import { ReactNode } from 'react';
import Link from '@/components/location/Link';
import Image from 'next/image';
import YouTubeEmbed from '@/components/policies/YouTubeEmbed';
import RelatedTermsSection from '@/components/policies/RelatedTermsSection';

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

const FeaturesSection = ({ title, items }: { title: string; items: string[] }) => (
  <div className="bg-theme-bg-alt rounded-xl p-8 border mb-8" style={{ borderColor: 'var(--color-card-border)' }}>
    <h2 className="text-2xl font-heading font-bold text-primary mb-4">
      {title}
    </h2>
    <ul className="list-disc ml-6 text-theme-body space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const FaqSection = ({ title, faqs }: { title: string; faqs: Array<{ question: string; answer: string }> }) => (
  <div className="bg-theme-bg-alt rounded-xl p-8 border mb-8" style={{ borderColor: 'var(--color-card-border)' }}>
    <h2 className="text-2xl font-heading font-bold text-primary mb-6">
      {title}
    </h2>
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="border-b pb-4 last:border-0"
          style={{ borderColor: 'var(--divider-color)' }}
        >
          <h3 className="text-base font-semibold text-primary mb-1">
            {faq.question}
          </h3>
          <p className="text-sm text-theme-body leading-relaxed">{faq.answer}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function PolicyPageTemplate({
  children,
  heroSection,
  relatedPolicies = [],
  relatedTerms = [],
  canonicalUrl = '',
  contentSections = [],
  faqs = [],
  youtubeUrl,
}: PolicyPageTemplateProps) {
  return (
    <main className="min-h-screen bg-theme-bg">
      {/* Hero Section */}
      <section className="py-20 relative w-full" style={{ backgroundColor: 'var(--hero-bg, var(--color-background))' }}>
        <div className="container mx-auto px-4 py-4 max-w-screen-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-center" style={{ color: 'var(--hero-text, var(--color-text-primary))' }}>
            {heroSection.heading}
          </h1>

          {heroSection.subheading && (
            <p className="text-lg md:text-xl lg:text-2xl text-center max-w-3xl mx-auto" style={{ color: 'var(--hero-text-secondary, var(--color-text-body))' }}>
              {heroSection.subheading}
            </p>
          )}
        </div>

      </section>

      {/* YouTube Video Section */}
      {youtubeUrl && (
        <section className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-6 border" style={{ borderColor: 'var(--color-card-border)' }}>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Video Overview
            </h2>
            <YouTubeEmbed url={youtubeUrl} />
          </div>
        </section>
      )}

      {/* Main Content Sections */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 border" style={{ borderColor: 'var(--color-card-border)' }}>
          {contentSections.map((item, idx) => {
            switch (item.type) {
              case 'heading':
                return (
                  <div key={idx} className="mb-4 mt-8 first:mt-0">
                    {item.tag === 'h2' ? (
                      <>
                        <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                          {item.content}
                        </h2>
                        <div className="h-1 w-16 bg-accent/60 rounded mb-4" />
                      </>
                    ) : (
                      <h3 className="text-xl font-heading font-bold text-primary mb-4">
                        {item.content}
                      </h3>
                    )}
                  </div>
                );

              case 'text':
                return (
                  <div key={idx} className="mb-8">
                    <p
                      className="text-theme-body leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.content || '' }}
                    />
                  </div>
                );

              case 'features':
                return (
                  <div key={idx} className="mb-8">
                    <FeaturesSection title={item.title || ''} items={item.items || []} />
                  </div>
                );

              case 'cta':
                return (
                  <div key={idx} className="text-center mt-10 mb-8 bg-secondary/10 rounded-xl p-8">
                    <h3 className="text-xl font-heading font-bold text-primary mb-4">
                      {item.title}
                    </h3>
                    <p className="text-theme-body mb-6">{item.text}</p>
                    <Link href="/contact" className="text-center align-center items-center">
                      <button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-8 rounded-full text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex justify-center mx-auto">
                        {item.button_text}
                      </button>
                    </Link>
                  </div>
                );

              case 'faqs':
                return (
                  <div key={idx} className="mb-8">
                    <FaqSection title={item.title || 'Frequently Asked Questions'} faqs={item.faqs || []} />
                  </div>
                );

              default:
                return null;
            }
          })}

          {/* Render page-level FAQs if provided */}
          {faqs.length > 0 && (
            <div className="mb-8">
              <FaqSection title="Frequently Asked Questions" faqs={faqs} />
            </div>
          )}
          {children}
        </div>
      </section>

      {/* Related Terms */}
      {relatedTerms.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <RelatedTermsSection terms={relatedTerms} />
          </div>
        </section>
      )}

      {/* Related Policies */}
      {relatedPolicies.length > 0 && (
        <section className="container mx-auto px-4 py-12 mb-12">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border" style={{ borderColor: 'var(--color-card-border)' }}>
            <div className="flex flex-col items-center mb-6">
              <span className="text-2xl font-heading font-bold text-primary text-center">
                Related Insurance Policies
              </span>
              <div className="h-1 w-24 bg-accent/60 rounded mt-3" />
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {relatedPolicies.map((policy) => (
                <li key={policy.slug}>
                  <Link
                    href={`${policy.basePath || '/policies'}/${policy.slug}`}
                    className="bg-theme-bg-alt rounded-xl p-5 text-center shadow-md border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center h-full"
                    style={{ borderColor: 'var(--color-card-border)' }}
                  >
                    <span className="text-lg font-heading font-semibold text-primary mb-2">
                      {policy.title}
                    </span>
                    <div className="mt-2 flex items-center text-accent/90 font-medium text-sm">
                      <span>Learn More</span>
                      <Image
                        src="/Images/icons/arrow-right.svg"
                        alt="Arrow Right"
                        width={14}
                        height={14}
                        className="ml-1"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
