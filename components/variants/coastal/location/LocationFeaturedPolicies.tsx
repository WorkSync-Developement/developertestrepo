import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Divider } from '@/components/ui/Divider';
import { Badge } from '@/components/ui/Badge';
import { Shield, ArrowRight } from 'lucide-react';

interface PoliciesSection {
  heading?: string;
  subheading?: string;
  featured_policy_ids?: string[];
  show_section?: boolean;
}

interface PolicyPage {
  id: string;
  title: string;
  slug: string;
  icon_url: string | null;
  content_summary: string;
}

interface LocationFeaturedPoliciesProps {
  locationId: string;
  locationSlug: string;
}

// Default policy slugs to show if none selected
const DEFAULT_POLICY_SLUGS = ['home', 'auto', 'condo', 'boat'];

async function getPoliciesSection(locationId: string): Promise<PoliciesSection | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId || !locationId) return null;

  const { data, error } = await supabase
    .from('client_location_page')
    .select('policies_section')
    .eq('client_id', clientId)
    .eq('location_id', locationId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching policies section:', error);
    return null;
  }

  return data?.policies_section || null;
}

async function getFeaturedPolicies(
  locationId: string,
  featuredIds: string[] | undefined
): Promise<PolicyPage[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId || !locationId) return [];

  // If specific policies are selected, fetch those
  if (featuredIds && featuredIds.length > 0) {
    const { data, error } = await supabase
      .from('client_policy_pages')
      .select('id, title, slug, icon_url, content_summary')
      .eq('client_id', clientId)
      .eq('location_id', locationId)
      .in('id', featuredIds)
      .eq('published', true);

    if (error) {
      console.error('Error fetching featured policies:', error);
      return [];
    }

    // Sort by the order in featuredIds
    const sortedData = featuredIds
      .map((id) => data?.find((p) => p.id === id))
      .filter((p): p is PolicyPage => p !== undefined);

    return sortedData;
  }

  // Fallback: fetch policies matching default slugs
  const { data, error } = await supabase
    .from('client_policy_pages')
    .select('id, title, slug, icon_url, content_summary')
    .eq('client_id', clientId)
    .eq('location_id', locationId)
    .eq('published', true);

  if (error) {
    console.error('Error fetching default policies:', error);
    return [];
  }

  // Filter to default slugs and limit to 4
  const defaultPolicies = (data || [])
    .filter((p) =>
      DEFAULT_POLICY_SLUGS.some((defaultSlug) =>
        p.slug.toLowerCase().includes(defaultSlug)
      )
    )
    .slice(0, 4);

  // If no defaults found, return first 4 policies
  if (defaultPolicies.length === 0) {
    return (data || []).slice(0, 4);
  }

  return defaultPolicies;
}

const LocationFeaturedPolicies = async ({
  locationId,
  locationSlug,
}: LocationFeaturedPoliciesProps) => {
  const policiesSection = await getPoliciesSection(locationId);

  // Don't render if section is explicitly hidden
  if (policiesSection?.show_section === false) {
    return null;
  }

  const policies = await getFeaturedPolicies(
    locationId,
    policiesSection?.featured_policy_ids
  );

  // Don't render if no policies
  if (policies.length === 0) {
    return null;
  }

  const heading = policiesSection?.heading || 'Featured Insurance Policies';
  const subheading =
    policiesSection?.subheading ||
    'Explore coverage options available at this location';

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: 'var(--loc-section-bg, var(--color-background-alt))' }}
    >
      <Divider position="top" />

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(45deg, var(--color-primary) 25%, transparent 25%),
                            linear-gradient(-45deg, var(--color-primary) 25%, transparent 25%)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 0',
        }}
      />

      <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            className="mb-4 inline-flex items-center gap-2"
            style={{
              backgroundColor: 'var(--loc-badge-bg, var(--color-secondary))',
              color: 'var(--loc-badge-text, var(--color-secondary-foreground))',
            }}
          >
            <Shield size={14} />
            Our Coverage
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            style={{ color: 'var(--loc-heading, var(--color-primary))' }}
          >
            {heading}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--loc-subheading, var(--color-text-secondary))' }}
          >
            {subheading}
          </p>
        </div>

        {/* Policy Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {policies.map((policy, index) => {
            const policyUrl = `/locations/${locationSlug}/policies/${policy.slug}`;

            return (
              <Link
                key={policy.id}
                href={policyUrl}
                className="group block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="rounded-2xl p-6 h-full transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl border flex flex-col"
                  style={{
                    backgroundColor: 'var(--loc-card-bg, var(--color-background))',
                    borderColor: 'var(--loc-card-border, var(--color-border))',
                  }}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    {policy.icon_url ? (
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor:
                            'color-mix(in srgb, var(--color-accent) 15%, transparent)',
                        }}
                      >
                        <img
                          src={policy.icon_url}
                          alt=""
                          className="h-8 w-8"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{
                          background:
                            'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                        }}
                      >
                        <Shield size={24} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-heading font-bold text-center mb-3"
                    style={{ color: 'var(--loc-card-heading, var(--color-primary))' }}
                  >
                    {policy.title}
                  </h3>

                  {/* Accent Line */}
                  <div
                    className="h-0.5 w-12 rounded mx-auto mb-4"
                    style={{
                      backgroundColor:
                        'color-mix(in srgb, var(--loc-accent-line, var(--color-accent)) 40%, transparent)',
                    }}
                  />

                  {/* Summary */}
                  <p
                    className="text-sm text-center mb-6 flex-grow line-clamp-3"
                    style={{ color: 'var(--loc-card-body, var(--color-text-secondary))' }}
                  >
                    {policy.content_summary}
                  </p>

                  {/* Learn More Link */}
                  <div className="text-center mt-auto">
                    <span
                      className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                      style={{ color: 'var(--loc-link, var(--color-accent))' }}
                    >
                      Learn More
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href={`/locations/${locationSlug}/policies`}
            className="inline-flex items-center gap-2 font-bold rounded-full py-3 px-8 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--loc-button-bg, var(--color-accent))',
              color: 'var(--loc-button-text, var(--color-accent-foreground))',
            }}
          >
            View All Policies
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationFeaturedPolicies;
