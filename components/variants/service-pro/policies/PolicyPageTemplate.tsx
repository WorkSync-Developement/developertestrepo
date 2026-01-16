import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, ArrowRight, ChevronDown, Shield, CheckCircle } from 'lucide-react';
import { Divider } from '@/components/ui/Divider';

interface PolicyFAQ {
  question: string;
  answer: string;
}

interface RelatedPolicy {
  title: string;
  slug: string;
  policy_type?: string;
}

interface ContentSection {
  title?: string;
  content?: string;
  items?: string[];
}

interface HeroSection {
  title?: string;
  subtitle?: string;
  background_image?: string;
}

interface PolicyPageTemplateProps {
  policy: {
    title: string;
    slug: string;
    meta_title?: string;
    meta_description?: string;
    hero_section?: HeroSection;
    content_sections?: ContentSection[];
    faqs?: PolicyFAQ[];
    related_policies?: RelatedPolicy[];
    youtube_url?: string;
    ldjson?: object;
    policy_type?: string;
  };
  locationSlug?: string;
  phone?: string;
}

const PolicyPageTemplate: React.FC<PolicyPageTemplateProps> = ({ policy, locationSlug, phone }) => {
  const locationPrefix = locationSlug ? `/locations/${locationSlug}` : '';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 bg-primary overflow-hidden">
        {policy.hero_section?.background_image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={policy.hero_section.background_image}
              fill
              className="object-cover opacity-20"
              alt=""
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
              <Link href={locationPrefix || '/'} className="hover:text-primary-foreground transition-colors duration-200">
                Home
              </Link>
              <span>/</span>
              <Link
                href={`${locationPrefix}/policies`}
                className="hover:text-primary-foreground transition-colors duration-200"
              >
                Policies
              </Link>
              <span>/</span>
              <span className="text-primary-foreground">{policy.title}</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
              <Shield size={16} />
              <span className="text-sm font-semibold">Insurance Coverage</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              {policy.hero_section?.title || policy.title}
            </h1>

            {/* Subtitle */}
            {policy.hero_section?.subtitle && (
              <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8">
                {policy.hero_section.subtitle}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-accent text-accent-foreground transition-all duration-200 hover:scale-105"
                >
                  <Phone size={18} />
                  Get a Free Quote
                </a>
              )}
              <Link
                href={`${locationPrefix}/contact`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold border-2 border-primary-foreground/30 text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10"
              >
                Contact Us
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Divider position="top" />

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Video Embed */}
              {policy.youtube_url && (
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src={policy.youtube_url.replace('watch?v=', 'embed/')}
                    title={`${policy.title} Video`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Content Sections */}
              {policy.content_sections?.map((section, idx) => (
                <div key={idx} className="prose prose-lg max-w-none">
                  {section.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                      <div className="w-1 h-8 bg-accent rounded-full" />
                      {section.title}
                    </h2>
                  )}
                  {section.content && (
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  )}
                  {section.items && section.items.length > 0 && (
                    <ul className="space-y-3 mt-4">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* FAQs */}
              {policy.faqs && policy.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="w-1 h-8 bg-accent rounded-full" />
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {policy.faqs.map((faq, idx) => (
                      <details
                        key={idx}
                        className="group bg-background-alt rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:border-primary/30"
                      >
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                          <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                          <ChevronDown
                            size={20}
                            className="text-primary flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                          />
                        </summary>
                        <div className="px-5 pb-5 pt-0">
                          <div className="border-t border-gray-100 pt-4">
                            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Card */}
              <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-2xl bg-primary text-primary-foreground">
                  <h3 className="text-xl font-bold mb-4">Get Your Free Quote</h3>
                  <p className="text-primary-foreground/80 text-sm mb-6">
                    Speak with our insurance experts today and find the coverage that's right for you.
                  </p>
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-bold bg-accent text-accent-foreground transition-all duration-200 hover:scale-105 mb-3"
                    >
                      <Phone size={18} />
                      Call Now
                    </a>
                  )}
                  <Link
                    href={`${locationPrefix}/contact`}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-semibold border-2 border-primary-foreground/30 text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10"
                  >
                    Request Quote Online
                  </Link>
                </div>

                {/* Related Policies */}
                {policy.related_policies && policy.related_policies.length > 0 && (
                  <div className="p-6 rounded-2xl bg-background-alt border border-gray-200">
                    <h3 className="text-lg font-bold text-foreground mb-4">Related Policies</h3>
                    <ul className="space-y-3">
                      {policy.related_policies.slice(0, 5).map((related, idx) => {
                        const relatedTypeSlug = related.policy_type
                          ? related.policy_type.toLowerCase().replace(/\s+/g, '-')
                          : 'personal-insurance';

                        return (
                          <li key={idx}>
                            <Link
                              href={`${locationPrefix}/policies/${relatedTypeSlug}/${related.slug}`}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                              <ArrowRight size={14} />
                              {related.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20">
                  <h3 className="text-lg font-bold text-foreground mb-4">Why Choose Us</h3>
                  <ul className="space-y-3">
                    {[
                      'Licensed & Insured Agents',
                      '25+ Years of Experience',
                      'Competitive Rates',
                      'Local & Trusted',
                      '5-Star Customer Reviews',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle size={16} className="text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Get Protected?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Contact us today for a free, no-obligation quote on {policy.title.toLowerCase()}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-accent text-accent-foreground transition-all duration-200 hover:scale-105"
              >
                <Phone size={20} />
                Call Now
              </a>
            )}
            <Link
              href={`${locationPrefix}/contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border-2 border-primary-foreground/30 text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10"
            >
              Get a Quote
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PolicyPageTemplate;
