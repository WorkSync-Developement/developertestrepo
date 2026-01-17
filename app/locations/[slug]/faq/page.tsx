import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HelpCircle, Phone } from 'lucide-react';
import FAQSearch from 'components/faq/FAQSearch';
import FAQItems from 'components/faq/FAQItems';
import BackToTop from 'components/ui/BackToTop';
import { Divider } from '@/components/ui/Divider';
import { getClientData } from '@/lib/client';
import { getWebsiteBySlug, isMultiLocation, getAllWebsites } from '@/lib/website';
import { getPageMetadata } from '@/lib/page-metadata';
import { interpolateTemplate, buildTemplateContext } from '@/lib/template-variables';
import { getBusinessInfo } from '@/lib/business-info';
import { normalizePhoneNumber, getLocationIdBySlug } from '@/lib/utils';
import { getAggregatedFAQs } from '@/lib/faq';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const multiLocation = await isMultiLocation();
  if (!multiLocation) return [];

  const websites = await getAllWebsites();
  return websites.map((website) => ({ slug: website.location_slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const multiLocation = await isMultiLocation();
  if (!multiLocation) return {};

  const [websiteData, clientData, pageMetadata] = await Promise.all([
    getWebsiteBySlug(slug),
    getClientData(),
    getPageMetadata('faq'),
  ]);

  if (!websiteData) return {};

  const locationName = websiteData.client_locations?.location_name || '';
  const agencyName = clientData?.agency_name || '';
  const canonicalUrl = clientData?.client_website?.canonical_url || '';

  return {
    title: pageMetadata.meta_title || `FAQ | ${locationName}`,
    description: pageMetadata.meta_description,
    metadataBase: new URL(canonicalUrl),
    alternates: {
      canonical: `/locations/${slug}/faq`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    openGraph: {
      title: pageMetadata.meta_title || `FAQ | ${locationName}`,
      description: pageMetadata.meta_description,
      url: `/locations/${slug}/faq`,
      siteName: agencyName,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMetadata.meta_title || `FAQ | ${locationName}`,
      description: pageMetadata.meta_description,
    },
  };
}

function generateLdJsonSchema(faqPolicies: any[], clientData: any, websiteData: any, slug: string) {
  const agencyName = clientData?.agency_name || '';
  const location = websiteData?.client_locations;
  const city = location?.city || clientData?.city || '';
  const state = location?.state || clientData?.state || '';
  const locationName = location?.location_name || city;

  // Build name with 60 char limit for SEO
  const fullName = `FAQ | ${locationName} | ${agencyName}`;
  const name = fullName.length > 60 ? fullName.substring(0, 57) + '...' : fullName;

  // Build description with 155 char limit for SEO
  const fullDescription = `Answers to common insurance questions for ${city}, ${state} residents. Learn about coverage, claims, and services.`;
  const description = fullDescription.length > 155 ? fullDescription.substring(0, 152) + '...' : fullDescription;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name,
    description,
    url: `/locations/${slug}/faq`,
    mainEntity: faqPolicies.flatMap((policy) =>
      policy.faqs.map((faq: any) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      }))
    ),
  };
}

export default async function LocationFAQPage({ params }: PageProps) {
  const { slug } = await params;

  // Only show for multi-location clients
  const multiLocation = await isMultiLocation();
  if (!multiLocation) {
    notFound();
  }

  // Get locationId from slug for location-specific FAQs
  const locationId = await getLocationIdBySlug(slug);

  if (!locationId) {
    notFound();
  }

  const [websiteData, clientData, aggregatedFAQs, businessInfo] = await Promise.all([
    getWebsiteBySlug(slug),
    getClientData(),
    getAggregatedFAQs(locationId),
    getBusinessInfo(),
  ]);

  if (!websiteData) {
    notFound();
  }

  const locationName = websiteData.client_locations?.location_name || '';

  // Transform policy links to include location prefix
  const transformPolicyLinks = (html: string): string => {
    // First, handle full path patterns like /policies/all/[slug] or /policies/[category]/[slug]
    // Strip the category since routes are now /locations/[slug]/policies/[policy]
    let transformed = html.replace(
      /href="\/policies\/(all|[^"\/\s]+)\/([^"\s]+)"/g,
      (match, category, policySlug) => {
        return `href="/locations/${slug}/policies/${policySlug}"`;
      }
    );
    
    // Then, handle simple relative links like href="umbrella-insurance" (no path, just slug)
    // These are policy slugs without any path prefix
    transformed = transformed.replace(
      /href="([a-z][a-z0-9-]*-insurance[^"]*)"/gi,
      (match, policySlug) => {
        // Skip if already transformed (starts with /)
        if (policySlug.startsWith('/')) return match;
        return `href="/locations/${slug}/policies/${policySlug}"`;
      }
    );
    
    return transformed;
  };

  // Build template context for variable interpolation
  const context = buildTemplateContext(clientData, websiteData, null, {
    yearsInBusiness: businessInfo?.years_in_business_text || '',
    regionalDescriptor: businessInfo?.regional_descriptor || '',
    foundingYear: businessInfo?.founding_year?.toString() || '',
  });

  // Process aggregated FAQs with template interpolation and link transformation
  const faqPolicies = aggregatedFAQs.map((policy) => ({
    id: policy.id,
    name: policy.name,
    icon: <HelpCircle className="h-5 w-5 text-primary" />,
    faqs: policy.faqs.map((faq) => ({
      question: interpolateTemplate(faq.question, context),
      answer: transformPolicyLinks(interpolateTemplate(faq.answer, context)),
    })),
  }));

  const phone = websiteData?.phone || clientData?.phone || '';
  const phoneTel = normalizePhoneNumber(phone);
  const totalQuestions = faqPolicies.reduce((sum, policy) => sum + policy.faqs.length, 0);
  const policyCount = faqPolicies.length;
  const yearsInBusinessText = businessInfo?.years_in_business_text || '';
 
  return (
    <main className="flex-grow bg-background">
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-muted/70 to-background">
        <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2 bg-gradient-to-l from-primary/10 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium bg-secondary/10 text-secondary mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
                </span>
                <span>{locationName || 'Insurance'} FAQ Center</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-foreground tracking-tight mb-4">
                Answers tailored to your coverage
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-6">
                Explore real-world questions our clients ask about policies, claims, and everyday coverage decisions from our {locationName || 'local'} office.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-8 text-xs sm:text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1">
                  <HelpCircle className="h-3.5 w-3.5 text-primary" />
                  <span>{totalQuestions}+ answers</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{policyCount} coverage topics</span>
                </span>
                {yearsInBusinessText && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    <span>{yearsInBusinessText}</span>
                  </span>
                )}
              </div>
              <div className="bg-card/80 backdrop-blur-sm border border-border/70 rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-sm font-medium text-foreground">Search the knowledge base</span>
                  <span className="hidden sm:inline-flex text-xs text-muted-foreground">
                    Try: claims, billing, deductibles, home, auto
                  </span>
                </div>
                <FAQSearch items={faqPolicies} />
              </div>
            </div>
            <div>
              <div className="bg-card/90 backdrop-blur border border-border/80 rounded-2xl p-5 sm:p-6 shadow-lg shadow-primary/5">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium mb-4">
                  <Phone className="h-3.5 w-3.5" />
                  <span>Need a human answer?</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">
                  Talk with our {locationName || 'local'} team
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Use this page to get oriented, then reach out and we will walk through what this means for your exact policies and budget.
                </p>
                <div className="space-y-3">
                  <Link
                    href={`/locations/${slug}/contact`}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-semibold py-2.5 px-4 hover:bg-primary/90 transition-colors"
                  >
                    Contact our team
                  </Link>
                  {phone && (
                    <Link
                      href={phoneTel ? `tel:${phoneTel}` : '#'}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium py-2.5 px-4 hover:bg-muted/70 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span>{phone}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 px-4 bg-background">
        <div className="container mx-auto max-w-screen-xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]">
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                    Browse all questions
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
                    Expand the topics that match what is happening in your world right now. You can always come back here as your life and coverage change.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card/60 p-4 sm:p-5">
                <FAQItems items={faqPolicies} />
              </div>
            </div>
            <div className="lg:pl-4">
              <div className="sticky top-24 space-y-5">
                <div className="rounded-2xl border border-border/70 bg-muted/70 p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    How to get the most from this page
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Start with the topics closest to your current questions, then connect with us when you are ready to apply them to your exact policy.
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                    <li>Use the search bar above when you have a specific keyword.</li>
                    <li>Scan by policy type when you are comparing coverages.</li>
                    <li>Share this page with family or business partners who help with decisions.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    Not seeing your exact situation?
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Send us your question and we may add it here to help future clients in {locationName || 'your area'}.
                  </p>
                  <Link
                    href={`/locations/${slug}/contact`}
                    className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                  >
                    Submit a question
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 bg-muted/40">
        <div className="container mx-auto max-w-screen-xl">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
              When you are ready for a guided conversation
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Use these next steps when you are ready to move from general answers to a plan designed specifically around your home, family, or business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href={`/locations/${slug}/contact`}
              className="group bg-card rounded-2xl shadow-sm border border-border/60 hover:border-primary/50 hover:shadow-lg transition-all duration-200 p-6 flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                Clarify insurance language
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">
                Schedule a conversation where we translate the jargon into everyday language and examples that make sense.
              </p>
            </Link>

            <Link
              href={`/locations/${slug}/contact`}
              className="group bg-card rounded-2xl shadow-sm border border-border/60 hover:border-primary/50 hover:shadow-lg transition-all duration-200 p-6 flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                Review and compare policies
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">
                Sit down with us to make sure your coverage keeps up with new drivers, renovations, moves, and life changes.
              </p>
            </Link>

            <Link
              href={`/locations/${slug}/contact`}
              className="group bg-card rounded-2xl shadow-sm border border-border/60 hover:border-primary/50 hover:shadow-lg transition-all duration-200 p-6 flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                Get help with a claim
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">
                When something happens, connect with us early so we can help you navigate the claims process with less stress.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 bg-background">
        <div className="container mx-auto max-w-screen-xl">
          <div className="rounded-3xl border border-border/70 bg-card/80 px-6 py-8 sm:px-10 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                Still deciding what to do next?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Bring your questions, renewal notices, or policy documents and we will walk through them together so you can make decisions with confidence.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/locations/${slug}/contact`}
                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm md:text-base py-2.5 px-6 hover:bg-primary/90 transition-colors"
              >
                Start a conversation
              </Link>
              {phone && (
                <Link
                  href={phoneTel ? `tel:${phoneTel}` : '#'}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background text-sm md:text-base font-medium py-2.5 px-5 hover:bg-muted/80 transition-colors"
                >
                  <Phone size={18} />
                  {phone}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLdJsonSchema(faqPolicies, clientData, websiteData, slug)),
        }}
      />
    </main>
  );
}

export const revalidate = 3600;