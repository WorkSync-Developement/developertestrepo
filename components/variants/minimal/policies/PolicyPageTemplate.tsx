import { ReactNode } from 'react';
import Link from '@/components/location/Link';
import Image from 'next/image';
import YouTubeEmbed from '@/components/policies/YouTubeEmbed';

interface PolicyPageTemplateProps {
  policy: {
    title: string;
    slug: string;
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
  };
  locationSlug?: string;
}

export default function PolicyPageTemplate({ policy, locationSlug }: PolicyPageTemplateProps) {
  const basePath = locationSlug ? `/locations/${locationSlug}/policies` : '/policies';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Hero */}
      {policy.hero_section && (
        <section className="py-32 border-b" style={{ borderColor: 'var(--color-text-muted)', borderWidth: '1px', opacity: 0.2 }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-5xl md:text-6xl font-light" style={{ color: 'var(--color-text-primary)' }}>
                {policy.hero_section.heading || policy.title}
              </h1>
              {policy.hero_section.subheading && (
                <p className="text-xl font-light" style={{ color: 'var(--color-text-body)' }}>
                  {policy.hero_section.subheading}
                </p>
              )}
              <div className="flex justify-center pt-4">
                <Link
                  href="/contact"
                  className="inline-block px-12 py-4 border text-sm font-light tracking-wide transition-opacity hover:opacity-60"
                  style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-16">
          {policy.content_sections?.map((section, index) => (
            <div key={index}>
              {section.type === 'paragraph' && (
                <div className="space-y-4">
                  {section.heading && (
                    <h2 className="text-3xl font-light" style={{ color: 'var(--color-text-primary)' }}>
                      {section.heading}
                    </h2>
                  )}
                  <p className="text-base font-light leading-relaxed" style={{ color: 'var(--color-text-body)' }}>
                    {section.content}
                  </p>
                </div>
              )}

              {section.type === 'list' && section.items && (
                <div className="space-y-6">
                  {section.title && (
                    <h3 className="text-2xl font-light" style={{ color: 'var(--color-text-primary)' }}>
                      {section.title}
                    </h3>
                  )}
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <span className="text-sm mt-1" style={{ color: 'var(--color-primary)' }}>—</span>
                        <span className="text-base font-light" style={{ color: 'var(--color-text-body)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.type === 'faq' && section.faqs && (
                <div className="space-y-6">
                  {section.title && (
                    <h3 className="text-2xl font-light" style={{ color: 'var(--color-text-primary)' }}>
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-6">
                    {section.faqs.map((faq, idx) => (
                      <div key={idx}>
                        <h4 className="text-lg font-normal mb-2" style={{ color: 'var(--color-text-primary)' }}>
                          {faq.question}
                        </h4>
                        <p className="text-sm font-light" style={{ color: 'var(--color-text-body)' }}>
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {policy.youtube_url && (
            <div className="my-12">
              <YouTubeEmbed videoUrl={policy.youtube_url} />
            </div>
          )}

          {policy.related_policies && policy.related_policies.length > 0 && (
            <div className="mt-20 pt-12 border-t" style={{ borderColor: 'var(--color-text-muted)', borderWidth: '1px', opacity: 0.2 }}>
              <h3 className="text-2xl font-light mb-8" style={{ color: 'var(--color-text-primary)' }}>
                Related Policies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {policy.related_policies.map((related, index) => (
                  <Link
                    key={index}
                    href={`${basePath}/${related.slug}`}
                    className="p-6 border transition-opacity hover:opacity-60"
                    style={{ borderColor: 'var(--color-text-muted)', borderWidth: '1px' }}
                  >
                    <p className="text-sm font-light" style={{ color: 'var(--color-text-primary)' }}>
                      {related.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
