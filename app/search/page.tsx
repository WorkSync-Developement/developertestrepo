import React, { Suspense } from 'react';
import SearchBar from 'components/search/SearchBar';
import SearchResults from 'components/search/SearchResults';
import SearchHeader from 'components/search/SearchHeader';
import { Metadata } from 'next';
import { getClientData } from '@/lib/client';
import { getWebsiteData } from '@/lib/website';
import { getSchemaDefaults, buildPageUrl, buildOpeningHoursSpec } from '@/lib/structured-data';

export async function generateMetadata(): Promise<Metadata> {
  const clientData = await getClientData();
  const agencyName = clientData?.agency_name || "";
  const url = clientData?.client_website?.canonical_url || "";

  return {
    title: `Search | ${agencyName}`,
    description: `Search for insurance information, policies, and resources on ${agencyName} website.`,
    metadataBase: new URL(url),
    alternates: {
      canonical: '/search'
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    openGraph: {
      title: `Search | ${agencyName}`,
      description: `Search for insurance information, policies, and resources on ${agencyName} website.`,
      url: '/search',
      siteName: agencyName,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: "summary_large_image",
      title: `Search | ${agencyName}`,
      description: `Find insurance policies, resources, and information on ${agencyName} website with our search tool.`,
    }
  };
}

const buildLdJsonSchema = (clientData: any, websiteData: any) => {
  const { agencyName, canonicalUrl, city, state, address, zip, email } = getSchemaDefaults(clientData);

  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": agencyName,
    "url": buildPageUrl(canonicalUrl, '/search'),
    "logo": "/logo.png",
    "image": "/office.jpg",
    "description": `${agencyName} is a trusted independent insurance provider serving ${city}, ${state}. We specialize in auto, home, life, flood, and business insurance with personalized service and competitive rates.`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": city,
      "addressRegion": state,
      "postalCode": zip,
      "addressCountry": "US"
    },
    ...(websiteData?.latitude && websiteData?.longitude ? {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": websiteData.latitude,
        "longitude": websiteData.longitude
      }
    } : {}),
    "telephone": websiteData?.phone || clientData?.phone,
    "email": websiteData?.email || email,
    ...(websiteData?.business_hours ? { "openingHoursSpecification": buildOpeningHoursSpec(websiteData.business_hours) } : {}),
    "sameAs": Object.values(websiteData?.social_links || {}).filter(Boolean)
  };
};

export default async function SearchPage() {
  const [clientData, websiteData] = await Promise.all([
    getClientData(),
    getWebsiteData(),
  ]);

  return (
    <main className="flex-grow bg-background">
      <section className="w-full py-20 sm:py-24 relative overflow-hidden bg-background">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium bg-secondary/10 text-secondary mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            <span>Site-wide search</span>
          </div>

          <SearchHeader />

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
            Find articles, policy pages, FAQs, and more across the entire {clientData?.agency_name || 'agency'} website.
          </p>

          <div className="max-w-2xl mx-auto">
            <SearchBar
              variant="fullwidth"
              placeholder="Search for policies, coverages, topics, or questions..."
            />
          </div>
        </div>
      </section>

      <section className="pb-20 pt-8 bg-background">
        <div className="container mx-auto px-4 max-w-screen-lg">
          <Suspense fallback={<div className="text-center py-8">Loading search results...</div>}>
            <SearchResults />
          </Suspense>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLdJsonSchema(clientData, websiteData)) }}
      />
    </main>
  );
};
