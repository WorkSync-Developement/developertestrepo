import React from 'react';
import { Phone, MapPin, Clock, MessageSquare, Send, Mail } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getClientData } from '@/lib/client';
import { getWebsiteBySlug, isMultiLocation, getAllWebsites, getFeatures } from '@/lib/website';
import { getPageMetadata } from '@/lib/page-metadata';
import { formatPhoneNumber } from '@/lib/utils';
import { getSchemaDefaults } from '@/lib/structured-data';

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

  const locationName = websiteData.client_locations?.location_name || '';
  const agencyName = clientData?.agency_name || '';
  const locationId = websiteData.client_locations?.location_id;
  const pageMetadata = await getPageMetadata('contact', locationId);
  const canonicalUrl = clientData?.client_website?.canonical_url || '';

  return {
    title: pageMetadata.meta_title || `Contact Us | ${agencyName}`,
    description: pageMetadata.meta_description || `Contact ${agencyName} at ${locationName} for all your insurance needs.`,
    metadataBase: new URL(canonicalUrl),
    alternates: {
      canonical: `/locations/${slug}/contact`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    openGraph: {
      title: pageMetadata.meta_title || `Contact Us | ${agencyName}`,
      description: pageMetadata.meta_description || `Contact ${agencyName} at ${locationName} for all your insurance needs.`,
      url: `/locations/${slug}/contact`,
      siteName: agencyName,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMetadata.meta_title || `Contact Us | ${agencyName}`,
      description: pageMetadata.meta_description || `Contact ${agencyName} at ${locationName} for all your insurance needs.`,
    },
  };
}

// Helper function to generate structured data
function generateLdJsonSchema(clientData: any, websiteData: any, locationData: any) {
  const { agencyName } = getSchemaDefaults(clientData);
  const location = locationData?.client_locations;

  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": agencyName,
    "description": `Contact ${agencyName} for all your insurance needs.`,
    "url": `/locations/${locationData?.client_locations?.location_slug || ''}/contact`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location?.address_line_1 || '',
      "addressLocality": location?.city || '',
      "addressRegion": location?.state || '',
      "postalCode": location?.zip || '',
      "addressCountry": "US"
    },
    "telephone": websiteData?.phone || clientData?.phone,
    "openingHours": "Mo-Fr 08:00-17:00",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": websiteData?.phone || clientData?.phone,
      "email": websiteData?.email || clientData?.contact_email,
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  };
}

export default async function LocationContactPage({ params }: PageProps) {
  const { slug } = await params;

  // Only show for multi-location clients
  const multiLocation = await isMultiLocation();
  if (!multiLocation) {
    notFound();
  }

  const [websiteData, clientData, features] = await Promise.all([
    getWebsiteBySlug(slug),
    getClientData(),
    getFeatures(),
  ]);

  if (!websiteData) {
    notFound();
  }

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const location = websiteData.client_locations;
  const phone = location?.phone || websiteData?.phone || clientData?.phone;
  const formattedPhone = formatPhoneNumber(phone);
  const smsPhone = location?.sms_phone || websiteData?.sms_phone;
  const smsMessage = location?.sms_default_message || websiteData?.sms_default_message || "Hi! I'd like to get an insurance quote. Please contact me.";
  const showBusinessHours = features?.show_business_hours ?? false;
  const businessHours = location?.business_hours || websiteData?.business_hours;

  const mapAddressParts = [
    location?.address_line_1,
    location?.city,
    location?.state,
    location?.zip,
  ].filter(Boolean);

  const fallbackLocation = [
    clientData?.agency_name,
    location?.city,
    location?.state,
  ]
    .filter(Boolean)
    .join(', ');

  const mapQuery = mapAddressParts.length ? mapAddressParts.join(', ') : fallbackLocation;
  const mapSrc = `https://maps.google.com/maps?width=600&height=400&hl=en&q=${encodeURIComponent(mapQuery)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
  const mapTitle = clientData?.agency_name
    ? `Map of ${clientData.agency_name} in ${location?.city || ''}, ${location?.state || ''}`
    : 'Map location';

  return (
    <main className="flex-grow bg-background">
      {/* Hero Section */}
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
            <span>Contact Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We&apos;re here to answer your questions and provide the support you need. Reach out to us today.
          </p>
        </div>
      </section>

      {/* Quick Text Banner - Floating Card */}
      {formattedPhone && (
        <section className="relative -mt-12 z-20 px-4 mb-16">
          <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl border border-border/50 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-card to-background">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Get a Quick Quote via Text
                </h2>
                <p className="text-muted-foreground text-sm max-w-md">
                  For the fastest service, text us your questions. We&apos;ll respond quickly with personalized quotes.
                </p>
              </div>
            </div>
            <a
              href={`sms:${smsPhone || phone}?body=${encodeURIComponent(smsMessage)}`}
              className="whitespace-nowrap bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Text Us: {formattedPhone}
            </a>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Contact Form Section */}
            <div className="lg:col-span-7">
              <div className="bg-card rounded-2xl shadow-sm border border-border p-1">
                 <ContactForm clientId={clientId} locationId={location?.id} />
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              {/* Contact Details Card */}
              <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
                <h3 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Office Location</p>
                      <p className="text-foreground font-medium">{location?.address_line_1 || ''}</p>
                      {location?.address_line_2 && (
                        <p className="text-foreground font-medium">{location.address_line_2}</p>
                      )}
                      <p className="text-foreground font-medium">
                        {location?.city || ''}, {location?.state || ''} {location?.zip || ''}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Phone Number</p>
                      <a href={`tel:${phone}`} className="text-foreground font-medium hover:text-primary transition-colors text-lg block">
                        {formattedPhone || ''}
                      </a>
                    </div>
                  </div>
                  
                  {/* Email (if available in websiteData/clientData - inferred) */}
                  {(websiteData?.email || clientData?.contact_email) && (
                     <div className="flex items-start gap-4 group">
                       <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors shrink-0">
                         <Mail className="w-5 h-5" />
                       </div>
                       <div>
                         <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Email Address</p>
                         <a href={`mailto:${websiteData?.email || clientData?.contact_email}`} className="text-foreground font-medium hover:text-primary transition-colors block break-all">
                           {websiteData?.email || clientData?.contact_email}
                         </a>
                       </div>
                     </div>
                  )}

                </div>
              </div>

              {/* Business Hours Card */}
              {showBusinessHours && businessHours && (
                <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    Business Hours
                  </h3>
                  <div className="space-y-3">
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                      const hours = (businessHours as any)[day];
                      if (!hours) return null;
                      const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() === day;
                      
                      return (
                        <div key={day} className={`flex justify-between items-center text-sm py-2 border-b border-border/40 last:border-0 ${isToday ? 'bg-primary/5 -mx-4 px-4 rounded-lg font-medium' : ''}`}>
                          <span className={`capitalize ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>{day}</span>
                          <span className={isToday ? 'text-foreground' : 'text-foreground/80'}>
                            {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Full Width Container with Border Radius */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="bg-card rounded-3xl overflow-hidden shadow-lg border border-border h-[450px] relative group">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={mapTitle}
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
            {/* Overlay hint */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-xs font-medium border border-border pointer-events-none">
              <span className="flex items-center gap-1.5">
                 <MapPin className="w-3 h-3 text-primary" />
                 {location?.address_line_1 || clientData?.agency_name}
              </span>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLdJsonSchema(clientData, websiteData, websiteData)) }}
      />
    </main>
  );
}

export const revalidate = 3600;