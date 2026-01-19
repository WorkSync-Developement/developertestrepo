import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogTopics from 'components/blog/BlogTopics';
import { getClientData } from '@/lib/client';
import { getWebsiteBySlug, isMultiLocation, getAllWebsites } from '@/lib/website';
import { getPageMetadata } from '@/lib/page-metadata';
import { getAllTopics } from '@/lib/blog';
import { getSchemaDefaults } from '@/lib/structured-data';
import { Divider } from '@/components/ui/Divider';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const multiLocation = await isMultiLocation();
  if (!multiLocation) return [];

  const websites = await getAllWebsites();
  return (websites || [])
    .filter((website) => website?.location_slug && typeof website.location_slug === 'string')
    .map((website) => ({ slug: website.location_slug }));
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

  const agencyName = clientData?.agency_name || '';
  const pageMetadata = await getPageMetadata('blog', websiteData?.client_locations?.location_id);
  const canonicalUrl = clientData?.client_website?.canonical_url || '';

  return {
    title: pageMetadata.meta_title || `Insurance Blog | ${agencyName}`,
    description: pageMetadata.meta_description,
    metadataBase: new URL(canonicalUrl),
    alternates: {
      canonical: `/locations/${slug}/blog`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    openGraph: {
      title: pageMetadata.meta_title || `Insurance Blog | ${agencyName}`,
      description: pageMetadata.meta_description,
      url: `/locations/${slug}/blog`,
      siteName: agencyName,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMetadata.meta_title || `Insurance Blog | ${agencyName}`,
      description: pageMetadata.meta_description,
    },
  };
}

const buildLdJsonSchema = (clientData: any, websiteData: any, slug: string) => {
  const { agencyName, city, state } = getSchemaDefaults(clientData);
  const locationCity = websiteData?.client_locations?.city || city;

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `${agencyName} Insurance Blog`,
    "description": `Insurance tips, industry updates, and helpful guides for ${locationCity}${state ? `, ${state}` : ''} residents from ${agencyName}.`,
    "url": `/locations/${slug}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": agencyName,
      "logo": {
        "@type": "ImageObject",
        "url": "/Images/logo.png"
      }
    }
  };
};

export default async function LocationBlogPage({ params }: PageProps) {
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
  const topics = await getAllTopics(slug, { agency_name: websiteData?.agency_name, city: websiteData?.client_locations?.city, state: websiteData?.client_locations?.state });

  if (!websiteData) {
    notFound();
  }

  const locationCity = websiteData?.client_locations?.city || clientData?.city || '';
  const locationState = websiteData?.client_locations?.state || clientData?.state || '';
  const agencyName = clientData?.agency_name || '';

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
            <span>Insurance Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-foreground mb-4 tracking-tight">
            {locationCity || ''}{locationState ? ` ${locationState},` : ''} Insurance Blog
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Practical tips, local insights, and expert guidance from {agencyName} to help you make confident coverage decisions.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            <div className="lg:col-span-2">
              <BlogTopics topics={topics} basePath={`/locations/${slug}/blog`} />
            </div>

            <aside className="lg:col-span-1 space-y-6 lg:pt-2 lg:sticky lg:top-32 lg:self-start">
              <section className="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-7">
                <h2 className="text-xl font-heading font-bold text-foreground mb-2">
                  Stay Informed
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest insurance tips, industry news, and local updates delivered straight to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Subscribe
                  </button>
                </form>
              </section>

              <section className="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-7">
                <h2 className="text-xl font-heading font-bold text-foreground mb-2">
                  Why Our Blog?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Articles are written with {locationCity || 'your area'} families and businesses in mind, so you can understand coverage options, avoid gaps, and stay ahead of changes that affect your protection.
                </p>
              </section>
            </aside>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLdJsonSchema(clientData, websiteData, slug)) }}
      />
    </main>
  );
}

export const revalidate = 3600;