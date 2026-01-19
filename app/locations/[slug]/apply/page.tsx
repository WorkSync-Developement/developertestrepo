import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JobApplicationForm from 'components/apply/JobApplicationForm';
import { getClientData } from '@/lib/client';
import { getWebsiteBySlug, isMultiLocation, getAllWebsites } from '@/lib/website';
import { getJobApplicationSettings } from '@/lib/apply';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';
import { CheckCircle, Briefcase, Users, TrendingUp, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

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
    title: `Careers - Join Our Team | ${locationName}`,
    description: `Join the ${agencyName} team in ${city}, ${state}. We're looking for passionate individuals to help serve our community. Apply now!`,
    keywords: [
      `insurance jobs ${city} ${state}`,
      'insurance agent careers',
      `insurance jobs ${state}`,
      `${agencyName} careers`,
      `insurance employment ${city}`,
    ],
    metadataBase: new URL(canonicalUrl),
    alternates: {
      canonical: `/locations/${slug}/apply`,
    },
    openGraph: {
      title: `Careers at ${locationName}`,
      description: `Join our team and build a rewarding career in insurance serving the ${city} community.`,
      url: `/locations/${slug}/apply`,
      siteName: agencyName,
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function LocationApplyPage({ params }: PageProps) {
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

  const locationId = websiteData.client_locations?.id;
  const settings = await getJobApplicationSettings(locationId);

  const locationName = websiteData.client_locations?.location_name || '';
  const phone = websiteData?.phone || clientData?.phone;
  const formattedPhone = formatPhoneNumber(phone);
  const normalizedPhone = normalizePhoneNumber(phone);

  const { hero_section, form_section, form_fields, form_title, success_message, is_enabled } = settings;

  // If the application page is disabled
  if (!is_enabled) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-2xl shadow-xl p-8 text-center border border-border">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
            Applications Closed
          </h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We are not accepting applications at this time. However, we're always looking for talent - please check back later or contact us directly.
          </p>
          <a
            href={`/locations/${slug}/contact`}
            className="inline-flex items-center justify-center text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            Contact Us <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  const benefits = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Growth Opportunities",
      description: "We invest in your professional development with ongoing training and clear career paths."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Great Culture",
      description: "Join a supportive team that values collaboration, integrity, and serving our community."
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Competitive Benefits",
      description: "We offer a comprehensive benefits package designed to support you and your family."
    }
  ];

  return (
    <main className="flex-grow bg-background">
      {/* Hero Section - Matched to Contact/Team Pages */}
      <section className="w-full py-20 sm:py-24 relative overflow-hidden bg-background">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium bg-secondary/10 text-secondary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75">
              </span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span>Join Our Team</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 tracking-tight">
            {hero_section.title}
          </h1>
          <div className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed space-y-2">
            {hero_section.description.split('\n').map((line: string, index: React.Key) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left Column: Benefits & Info (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Benefits Card */}
              <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
                <h2 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Why Work With Us?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {form_section.description || "At our agency, we believe that our people are our greatest asset. We strive to create an environment where you can thrive both personally and professionally."}
                </p>

                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground mb-1">{benefit.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact/Questions Card */}
              <div className="bg-primary/5 rounded-2xl border border-primary/10 p-8">
                <h3 className="text-lg font-heading font-bold text-foreground mb-4">Have Questions?</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Not ready to apply yet? We're happy to answer any questions you might have about our open positions.
                </p>

                <div className="space-y-4">
                  <a
                    href={`tel:${normalizedPhone}`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors font-medium"
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                      <Phone className="w-4 h-4" />
                    </div>
                    {formattedPhone}
                  </a>
                  <a
                    href={`/locations/${slug}/contact`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors font-medium"
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                      <Mail className="w-4 h-4" />
                    </div>
                    Contact Us
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Application Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-card rounded-2xl shadow-sm border border-border p-1">
                {/* Inner container to match styling if needed, or just pass directly */}
                <div className="bg-card rounded-xl p-6 md:p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                      {form_section.title}
                    </h2>
                    <p className="text-muted-foreground">Please fill out the form below to submit your application.</p>
                  </div>

                  <JobApplicationForm
                    formFields={form_fields}
                    formTitle="" // Title handled above
                    successMessage={success_message}
                    locationId={locationId}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

export const revalidate = 3600;