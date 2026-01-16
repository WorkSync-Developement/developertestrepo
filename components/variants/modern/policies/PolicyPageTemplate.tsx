import { ReactNode } from 'react';
import Link from '@/components/location/Link';
import Image from 'next/image';
import YouTubeEmbed from '@/components/policies/YouTubeEmbed';
import { CheckCircle2, Phone } from 'lucide-react';

interface PolicyPageTemplateProps {
  policy: {
    title: string;
    slug: string;
    meta_title?: string;
    meta_description?: string;
    hero_section?: {
      heading: string;
      subheading?: string;
      background_image?: { url: string };
    };
    content_sections?: Array<{
      type: string;
      heading?: string;
      content?: string;
      title?: string;
      items?: string[];
      faqs?: Array<{ question: string; answer: string }>;
    }>;
    faqs?: Array<{ question: string; answer: string }>;
    related_policies?: Array<{ title: string; slug: string }>;
    youtube_url?: string;
    ldjson?: object;
  };
  locationSlug?: string;
}

export default function PolicyPageTemplate({ policy, locationSlug }: PolicyPageTemplateProps) {
  const basePath = locationSlug ? `/locations/${locationSlug}/policies` : '/policies';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Hero Section */}
      {policy.hero_section && (
        <section
          className="relative py-20 md:py-32 overflow-hidden"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          {policy.hero_section.background_image?.url && (
            <div className="absolute inset-0 z-0">
              <Image
                src={policy.hero_section.background_image.url}
                fill
                alt="Policy hero background"
                className="object-cover opacity-20"
              />
            </div>
          )}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{
                  color: 'var(--color-primary-foreground)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {policy.hero_section.heading || policy.title}
              </h1>
              {policy.hero_section.subheading && (
                <p
                  className="text-xl md:text-2xl"
                  style={{ color: 'var(--color-primary-foreground)', opacity: 0.95 }}
                >
                  {policy.hero_section.subheading}
                </p>
              )}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-transform hover:scale-105"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-foreground)',
                  }}
                >
                  <Phone size={20} />
                  <span>Get a Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Content Sections */}
          {policy.content_sections?.map((section, index) => (
            <div key={index}>
              {section.type === 'paragraph' && (
                <div
                  className="prose prose-lg max-w-none"
                  style={{ color: 'var(--color-text-body)' }}
                >
                  {section.heading && (
                    <h2
                      className="text-3xl md:text-4xl font-bold mb-6"
                      style={{
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {section.heading}
                    </h2>
                  )}
                  <p className="text-lg leading-relaxed">{section.content}</p>
                </div>
              )}

              {section.type === 'list' && section.items && (
                <div
                  className="rounded-2xl shadow-lg p-8 border"
                  style={{
                    backgroundColor: 'var(--color-background-alt)',
                    borderColor: 'var(--color-secondary)',
                  }}
                >
                  {section.title && (
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-6"
                      style={{
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {section.title}
                    </h3>
                  )}
                  <ul className="space-y-4">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2
                          size={24}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: 'var(--color-accent)' }}
                        />
                        <span
                          className="text-lg leading-relaxed"
                          style={{ color: 'var(--color-text-body)' }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.type === 'faq' && section.faqs && (
                <div
                  className="rounded-2xl shadow-lg p-8 border"
                  style={{
                    backgroundColor: 'var(--color-background-alt)',
                    borderColor: 'var(--color-secondary)',
                  }}
                >
                  {section.title && (
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-6"
                      style={{
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-6">
                    {section.faqs.map((faq, idx) => (
                      <div key={idx} className="border-b last:border-0 pb-6 last:pb-0" style={{ borderColor: 'var(--color-secondary)' }}>
                        <h4
                          className="text-lg font-semibold mb-2"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {faq.question}
                        </h4>
                        <p
                          className="text-base leading-relaxed"
                          style={{ color: 'var(--color-text-body)' }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* YouTube Video */}
          {policy.youtube_url && (
            <div className="my-12">
              <YouTubeEmbed videoUrl={policy.youtube_url} />
            </div>
          )}

          {/* Related Policies */}
          {policy.related_policies && policy.related_policies.length > 0 && (
            <div className="mt-16">
              <h3
                className="text-3xl font-bold mb-8 text-center"
                style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Related Insurance Policies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {policy.related_policies.map((relatedPolicy, index) => (
                  <Link
                    key={index}
                    href={`${basePath}/${relatedPolicy.slug}`}
                    className="group"
                  >
                    <div
                      className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 p-6 border-2"
                      style={{
                        backgroundColor: 'var(--color-background-alt)',
                        borderColor: 'var(--color-secondary)',
                      }}
                    >
                      <h4
                        className="text-xl font-bold group-hover:translate-x-1 transition-transform"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {relatedPolicy.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div
            className="rounded-3xl shadow-2xl p-12 text-center space-y-6 mt-16"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <h3
              className="text-3xl md:text-4xl font-bold"
              style={{
                color: 'var(--color-primary-foreground)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Ready to Get Started?
            </h3>
            <p
              className="text-xl"
              style={{ color: 'var(--color-primary-foreground)', opacity: 0.95 }}
            >
              Contact us today for a personalized quote
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-accent-foreground)',
              }}
            >
              <Phone size={20} />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
