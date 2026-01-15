import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PolicyPageTemplate from '@/components/variants/professional/policies/PolicyPageTemplate';
import { getClientData } from '@/lib/client';
import { getWebsiteBySlug, isMultiLocation, getAllWebsites } from '@/lib/website';
import { getSchemaDefaults, buildPageUrl } from '@/lib/structured-data';
import { getAllPolicies } from '@/lib/policy-categories';
import { getSupabaseClient, getSupabaseClientForBuildTime } from '@/lib/supabase/server';
import { validateRelatedPolicies } from '@/lib/policy-validation';

interface PageProps {
  params: Promise<{ slug: string; policy: string }>;
}

/**
 * Get a single policy by slug for a specific location (prioritizing location-specific override)
 */
async function getPolicyBySlugForLocation(policySlug: string, locationId: string, supabaseClient: Awaited<ReturnType<typeof getSupabaseClient>>) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  // 1. Try to find a location-specific policy override
  const { data: locationPolicy, error: locationError } = await supabaseClient
    .from('client_policy_pages')
    .select('*')
    .eq('client_id', clientId)
    .eq('slug', policySlug)
    .eq('location_id', locationId)
    .eq('published', true)
    .maybeSingle();

  if (locationPolicy) return locationPolicy;

  if (locationError && locationError.code !== 'PGRST116') {
      console.error('Error fetching location policy by slug:', locationError);
  }

  // 2. Fallback to global policy
  const { data: globalPolicy, error: globalError } = await supabaseClient
    .from('client_policy_pages')
    .select('*')
    .eq('client_id', clientId)
    .eq('slug', policySlug)
    .is('location_id', null)
    .eq('published', true)
    .maybeSingle();

  if (globalError && globalError.code !== 'PGRST116') {
    console.error('Error fetching global policy by slug:', globalError);
  }

  return globalPolicy;
}

export async function generateStaticParams() {
  const multiLocation = await isMultiLocation();
  if (!multiLocation) return [];

  const websites = await getAllWebsites();
  const params: { slug: string; policy: string }[] = [];
  
  // Fetch global policies once
  const globalPolicies = await getAllPolicies(null);

  for (const website of websites) {
    const locationId = website.id;
    if (!locationId) continue;
    
    // Track added policies to avoid duplicates
    const addedPolicySlugs = new Set<string>();

    // Add location specific policies
    const locationPolicies = await getAllPolicies(locationId);
    for (const policy of locationPolicies) {
      params.push({
        slug: website.location_slug,
        policy: policy.slug,
      });
      addedPolicySlugs.add(policy.slug);
    }

    // Add global policies (if not overridden/already added)
    for (const policy of globalPolicies) {
        if (!addedPolicySlugs.has(policy.slug)) {
            params.push({
                slug: website.location_slug,
                policy: policy.slug,
            });
        }
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, policy: policySlug } = await params;

  const multiLocation = await isMultiLocation();
  if (!multiLocation) return {};

  const [websiteData, clientData] = await Promise.all([
    getWebsiteBySlug(slug),
    getClientData(),
  ]);

  if (!websiteData) return {};

  const locationId = websiteData.client_locations?.id;
  if (!locationId) return {};

  const supabaseClient = getSupabaseClientForBuildTime();
  const policy = await getPolicyBySlugForLocation(policySlug, locationId, supabaseClient);
  if (!policy) {
    return {
      title: 'Policy Not Found',
      description: 'The requested policy page could not be found.',
    };
  }

  const { agencyName, canonicalUrl } = getSchemaDefaults(clientData);
  const locationName = websiteData.client_locations?.location_name || '';

  const title = policy.meta_title || `${policy.title} | ${locationName}`;
  const description = policy.hero_section?.subtitle || policy.content_summary || 
    `Learn about ${policy.title} from ${agencyName} at ${locationName}.`;

  // Use absolute title to prevent layout template from appending agency name again
  // (database meta_title already includes agency name)
  return {
    title: {
      absolute: title,
    },
    description,
    keywords: policy.keywords || [],
    metadataBase: new URL(canonicalUrl),
    alternates: {
      canonical: `/locations/${slug}/policies/${policySlug}`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    openGraph: {
      title,
      description,
      url: `/locations/${slug}/policies/${policySlug}`,
      siteName: agencyName,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'X-Robots-Tag': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    },
  };
}

export default async function LocationPolicyPage({ params }: PageProps) {
  const { slug, policy: policySlug } = await params;

  const multiLocation = await isMultiLocation();
  if (!multiLocation) {
    notFound();
  }

  const websiteData = await getWebsiteBySlug(slug);
  if (!websiteData) {
    notFound();
  }

  const locationId = websiteData.client_locations?.id;
  if (!locationId) {
    notFound();
  }

  const supabaseClient = await getSupabaseClient();
  const [policy, clientData] = await Promise.all([
    getPolicyBySlugForLocation(policySlug, locationId, supabaseClient),
    getClientData(),
  ]);

  if (!policy) {
    notFound();
  }

  const locationName = websiteData.client_locations?.location_name || '';
  const locationCity = websiteData.client_locations?.city || '';
  const locationState = websiteData.client_locations?.state || '';
  const locationAddress = websiteData.client_locations?.address_line_1 || '';
  const locationZip = websiteData.client_locations?.zip || '';
  const { agencyName, canonicalUrl } = getSchemaDefaults(clientData);
  
  const pageUrl = buildPageUrl(canonicalUrl, `/locations/${slug}/policies/${policy.slug}`);
  const homeUrl = buildPageUrl(canonicalUrl, '/');
  const policiesUrl = buildPageUrl(canonicalUrl, `/locations/${slug}/policies`);

  // Build areaServed dynamically from service_areas
  const serviceAreas = websiteData.client_locations?.service_areas || websiteData?.service_areas || [];
  const areaServed = serviceAreas.map((areaName: string) => ({
    '@type': 'City',
    'name': areaName,
  }));

  // Build about entities from policy's about_topics
  const aboutEntities = (policy.about_topics || []).map((topic: string) => ({
    '@type': 'Thing',
    'name': topic,
  }));

  // Build LD-JSON schema (always generated on frontend, never from database)
  const agencyId = `${canonicalUrl}/#insurance-agency`;
  const ldJsonSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'InsuranceAgency',
        '@id': agencyId,
        'name': agencyName,
        'url': pageUrl,
        'address': {
          '@type': 'PostalAddress',
          ...(locationAddress ? { 'streetAddress': locationAddress } : {}),
          'addressLocality': locationCity,
          'addressRegion': locationState,
          ...(locationZip ? { 'postalCode': locationZip } : {}),
          'addressCountry': 'US',
        },
        'areaServed': areaServed,
      },
      {
        '@type': 'Service',
        'serviceType': 'Insurance',
        'name': policy.title,
        'description': policy.content_summary || policy.description || '',
        'url': pageUrl,
        'provider': {
          '@id': agencyId,
        },
        'areaServed': areaServed,
        ...(aboutEntities.length > 0 ? { 'about': aboutEntities } : {}),
      },
      ...(policy.faqs && policy.faqs.length > 0 ? [{
        '@type': 'FAQPage',
        'mainEntity': policy.faqs.map((faq: any) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer,
          },
        })),
      }] : []),
    ],
  };

  // Build breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': homeUrl,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': `${locationName} Policies`,
        'item': policiesUrl,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': policy.title,
        'item': pageUrl,
      },
    ],
  };

  // Validate and filter related policies (only show published)
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
  const validatedRelatedPolicies = locationId 
    ? await validateRelatedPolicies(policy.related_policies, clientId, locationId)
    : [];

  // Add basePath for URL construction
  const relatedPolicies = validatedRelatedPolicies.map((p: any) => ({
    policy_name: p.title,
    policy_slug: p.slug,
    content_summary: p.content_summary
  }));

  // Process content_sections to extract features and build HTML body
  let contentBody = '';
  let features: string[] = [];

  if (policy.content_sections && Array.isArray(policy.content_sections)) {
    policy.content_sections.forEach((section: any) => {
      if (section.type === 'heading') {
        const Tag = section.tag || 'h2';
        // Add styling classes to headings
        const classes = Tag === 'h2' 
          ? 'text-2xl font-bold mb-4 mt-8 first:mt-0 text-[var(--color-primary,#004080)]' 
          : 'text-xl font-bold mb-3 mt-6 text-[var(--color-primary,#004080)]';
        contentBody += `<${Tag} class="${classes}">${section.content}</${Tag}>`;
      } else if (section.type === 'text') {
        // Wrap text paragraphs
        contentBody += `<div class="mb-6 leading-relaxed opacity-90">${section.content}</div>`;
      } else if (section.type === 'features' && section.items) {
        // Extract features to pass separately
        features = [...features, ...section.items];
      }
    });
  }

  // Fallback contact info
  const contactInfo = {
    phone_number: websiteData.client_locations?.phone || clientData?.phone || '',
    email: websiteData.client_locations?.email || clientData?.contact_email || '',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PolicyPageTemplate
        policy={{
          policy_name: policy.hero_section?.heading || policy.title || '',
          policy_slug: policySlug,
          content_summary: policy.hero_section?.subheading || policy.content_summary,
          content_body: contentBody,
          features: features,
          faq: policy.faqs || [],
          cta_text: policy.cta_text || 'Get a Quote',
          cta_url: '/contact',
        }}
        relatedPolicies={relatedPolicies}
        contactInfo={contactInfo}
        locationSlug={slug}
      />
    </>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600;