import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase/server';
import { injectClientData, stripHtmlTags } from '@/lib/utils/content-formatters';
import { getClientData } from '@/lib/client';
import { getWebsiteBySlug, isMultiLocation, getAllWebsites } from '@/lib/website';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

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

  const [websiteData, clientData] = await Promise.all([
    getWebsiteBySlug(slug),
    getClientData(),
  ]);

  if (!websiteData) return {};

  const locationName = websiteData.client_locations?.location_name || '';
  const agencyName = clientData?.agency_name || '';
  const canonicalUrl = clientData?.client_website?.canonical_url || '';
  const city = websiteData.client_locations?.city || '';
  const state = websiteData.client_locations?.state || '';

  return {
    title: `Insurance Glossary | ${locationName}`,
    description: `Comprehensive insurance glossary with definitions of key terms and concepts from ${agencyName} in ${city}, ${state}.`,
    metadataBase: new URL(canonicalUrl),
    alternates: {
      canonical: `/locations/${slug}/glossary`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    openGraph: {
      title: `Insurance Glossary | ${locationName}`,
      description: `Comprehensive insurance glossary with definitions of key terms and concepts from ${agencyName} in ${city}, ${state}.`,
      url: `/locations/${slug}/glossary`,
      siteName: agencyName,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Insurance Glossary | ${locationName}`,
      description: `Comprehensive insurance glossary with definitions of key terms and concepts from ${agencyName} in ${city}, ${state}.`,
    },
  };
}

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

async function getGlossaryTerms(clientId: string, locationId: string): Promise<GlossaryTerm[]> {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
      .from('client_insurance_glossary_pages')
      .select('*')
      .eq('client_id', clientId)
      .eq('location_id', locationId)
      .eq('published', true)
      .order('term', { ascending: true });

    if (error) {
      console.error('Error fetching glossary terms:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getGlossaryTerms:', error);
    return [];
  }
}

function generateLdJsonSchema(clientData: any, locationName: string) {
  const agencyName = clientData?.agency_name || '';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Insurance Glossary | ${locationName}`,
    description: 'Comprehensive insurance glossary with definitions of key terms and concepts',
    url: '/glossary',
    publisher: {
      '@type': 'Organization',
      name: agencyName || 'Insurance Agency',
      logo: {
        '@type': 'ImageObject',
        url: '/Images/logo.png',
      },
    },
  };
}

export default async function LocationGlossaryPage({ params }: PageProps) {
  const { slug } = await params;

  // Only show for multi-location clients
  const multiLocation = await isMultiLocation();
  if (!multiLocation) {
    notFound();
  }

  const [websiteData, clientData] = await Promise.all([
    getWebsiteBySlug(slug),
    getClientData(),
  ]);

  if (!websiteData) {
    notFound();
  }

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const locationId = websiteData.client_locations?.id;
  const locationName = websiteData.client_locations?.location_name || '';

  const terms = clientId && locationId ? await getGlossaryTerms(clientId, locationId) : [];

  // Inject client data into each term's head content
  const processedTerms = terms.map((term) => ({
    ...term,
    head: injectClientData(term.head, clientData as any),
    body: injectClientData(term.body || '', clientData as any),
  }));

  // Group terms by category and sort them alphabetically
  const termsByCategory = processedTerms
    .sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }))
    .reduce(
      (acc, term) => {
        const category = term.category || 'General';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(term);
        return acc;
      },
      {} as Record<string, GlossaryTerm[]>
    );

  // Sort categories alphabetically
  const sortedCategories = Object.keys(termsByCategory).sort((a, b) => a.localeCompare(b));

  // Get all unique first letters for alphabetical navigation
  const firstLetters = [
    ...new Set(processedTerms.map((term) => term.term.charAt(0).toUpperCase())),
  ].sort();

  return (
    <main className="flex-grow bg-background">
      <section className="w-full py-20 sm:py-24 relative overflow-hidden bg-background">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium bg-secondary/10 text-secondary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span>Insurance Glossary</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 tracking-tight">
            Understand Insurance With Confidence
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Plain-language explanations of common insurance terms from our {locationName} team, so you can make confident coverage decisions.
          </p>
        </div>
      </section>

      {firstLetters.length > 0 && (
        <section className="relative -mt-10 z-20 px-4 mb-12">
          <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl border border-border/50 p-6 sm:p-8 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-left">
                <h2 className="text-lg font-heading font-semibold text-foreground">
                  Browse by Letter
                </h2>
                <p className="text-sm text-muted-foreground">
                  Jump to terms starting with a specific letter.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {firstLetters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-secondary/10 hover:bg-secondary/20 text-primary font-semibold rounded-lg transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-screen-xl">
          {sortedCategories.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-border shadow-sm">
              <p className="text-lg text-muted-foreground">
                No glossary terms are available at this time. Please check back soon or contact our team with your questions.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-8 space-y-10">
                {sortedCategories.map((category) => (
                  <div key={category} id={`letter-${category.charAt(0).toUpperCase()}`} className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-1 h-6 bg-primary rounded-full"></span>
                      <h2 className="text-2xl font-heading font-bold text-foreground">
                        {category}
                      </h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {termsByCategory[category].map((term) => (
                        <Link
                          key={term.id}
                          href={`/locations/${slug}/glossary/${term.slug}`}
                          className="group bg-card rounded-xl border border-border hover:border-primary/40 hover:shadow-md transition-all p-5 flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {term.term}
                            </h3>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                              Learn more
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {stripHtmlTags(term.body || term.head).substring(0, 140)}...
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <aside className="lg:col-span-4 space-y-6">
                <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    How to Use This Glossary
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use this glossary as a quick reference when reviewing your policies, asking questions, or comparing coverage options.
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>• Browse by letter or category</li>
                    <li>• Click any term for a full explanation</li>
                    <li>• Save your most important terms for future reference</li>
                  </ul>
                </div>

                <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    Still Have Questions?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Insurance language can be complex. Our team is happy to walk through your coverage and answer any questions.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      href={`/locations/${slug}/contact`}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                    >
                      Contact our team
                    </Link>
                    <Link
                      href={`/locations/${slug}/policies`}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-border text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      Explore coverage options
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLdJsonSchema(clientData, locationName)),
        }}
      />
    </main>
  );
}

export const revalidate = 3600;