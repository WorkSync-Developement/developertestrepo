import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
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

  let query = supabase
    .from('client_policy_pages')
    .select('id, title, slug, icon_url, content_summary')
    .eq('client_id', clientId)
    .eq('published', true);

  if (featuredIds && featuredIds.length > 0) {
    query = query.in('id', featuredIds);
  } else {
    query = query.limit(6);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching policies:', error);
    return [];
  }

  return data || [];
}

export default async function LocationFeaturedPolicies({
  locationId,
  locationSlug,
}: LocationFeaturedPoliciesProps) {
  const [policiesSection, policies] = await Promise.all([
    getPoliciesSection(locationId),
    getFeaturedPolicies(locationId, undefined),
  ]);

  if (policiesSection?.show_section === false || !policies || policies.length === 0) {
    return null;
  }

  return (
    <section
      className="py-20 relative"
      style={{ backgroundColor: 'var(--loc-section-bg, var(--color-background))' }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: 'var(--loc-badge-bg, var(--color-secondary))',
              color: 'var(--loc-badge-text, var(--color-secondary-foreground))',
            }}
          >
            Our Services
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              color: 'var(--loc-heading, var(--color-text-primary))',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {policiesSection?.heading || 'Insurance Policies We Offer'}
          </h2>
          {policiesSection?.subheading && (
            <p
              className="text-lg md:text-xl"
              style={{ color: 'var(--loc-subheading, var(--color-text-body))' }}
            >
              {policiesSection.subheading}
            </p>
          )}
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policies.map((policy, index) => (
            <Link
              key={policy.id}
              href={`/locations/${locationSlug}/policies/${policy.slug}`}
              className="group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div
                className="h-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 overflow-hidden border-2"
                style={{
                  backgroundColor: 'var(--loc-card-bg, var(--color-background-alt))',
                  borderColor: 'var(--loc-card-border, var(--color-secondary))',
                }}
              >
                <div className="p-8 space-y-6">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    {policy.icon_url ? (
                      <img
                        src={policy.icon_url}
                        alt={policy.title}
                        className="w-8 h-8"
                      />
                    ) : (
                      <Shield size={32} style={{ color: 'var(--color-accent-foreground)' }} />
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl font-bold group-hover:translate-x-1 transition-transform"
                    style={{ color: 'var(--loc-card-heading, var(--color-text-primary))' }}
                  >
                    {policy.title}
                  </h3>

                  {/* Summary */}
                  <p
                    className="text-base leading-relaxed line-clamp-3"
                    style={{ color: 'var(--loc-card-body, var(--color-text-body))' }}
                  >
                    {policy.content_summary}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-2 pt-4">
                    <span
                      className="font-semibold"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      Learn More
                    </span>
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                      style={{ color: 'var(--color-accent)' }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
