import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/Badge';
import { isMultiLocation } from '@/lib/website';
import type { LocationPoliciesSectionSettings } from '@/lib/types/theme';
import { DEFAULT_THEME } from '@/lib/theme/defaults';

interface PolicyPage {
  id: string;
  title: string;
  slug: string;
  content_summary: string;
}

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
}

async function getPolicyPages(): Promise<PolicyPage[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from('client_policy_pages')
    .select('id, slug, title, content_summary')
    .eq('client_id', clientId)
    .eq('published', true)
    .limit(5);

  if (error) {
    console.error('Error fetching policy pages:', error);
    return [];
  }

  return data || [];
}

async function getLocations(): Promise<Location[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from('client_locations')
    .select('id, location_name, city, state, location_slug')
    .eq('client_id', clientId)
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }

  return data || [];
}

async function getSectionSettings(): Promise<LocationPoliciesSectionSettings> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return DEFAULT_THEME.location_policies_section_settings!;

  const { data, error } = await supabase
    .from('client_theme_settings')
    .select('location_policies_section_settings')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error || !data?.location_policies_section_settings) {
    return DEFAULT_THEME.location_policies_section_settings!;
  }

  return data.location_policies_section_settings;
}

export default async function LocationPoliciesSection(): Promise<JSX.Element | null> {
  const [multiLocation, settings] = await Promise.all([
    isMultiLocation(),
    getSectionSettings(),
  ]);

  const sectionStyle = {
    backgroundColor: settings.section_bg_color || 'var(--loc-section-bg)',
  };
  const badgeStyle = {
    backgroundColor: settings.badge_bg_color || 'var(--loc-badge-bg)',
    color: settings.badge_text_color || 'var(--loc-badge-text)',
  };
  const headingStyle = {
    color: settings.heading_color || 'var(--loc-heading)',
  };
  const subheadingStyle = {
    color: settings.subheading_color || 'var(--loc-subheading)',
  };
  const cardStyle = {
    backgroundColor: settings.card_bg_color || 'var(--loc-card-bg)',
    borderColor: settings.card_border_color || 'var(--loc-card-border)',
  };
  const cardHeadingStyle = {
    color: settings.card_heading_color || 'var(--loc-card-heading)',
  };
  const cardBodyStyle = {
    color: settings.card_body_color || 'var(--loc-card-body)',
  };
  const buttonStyle = {
    backgroundColor: settings.button_bg_color || 'var(--loc-button-bg)',
    color: settings.button_text_color || 'var(--loc-button-text)',
  };

  if (multiLocation) {
    const locations = await getLocations();
    if (locations.length === 0) return null;

    return (
      <section className="py-16 relative" style={sectionStyle}>
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="text-center mb-12">
            <Badge className="mb-4" style={badgeStyle}>
              <span>Insurance by Location</span>
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4" style={headingStyle}>
              Find Coverage Near You
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={subheadingStyle}>
              Explore insurance policies available at each of our locations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Link
                href={`/locations/${location.location_slug}/policies`}
                key={location.id}
                className="block"
              >
                <div
                  className="rounded-xl border p-8 hover:shadow-lg transition-all duration-300 h-full"
                  style={cardStyle}
                >
                  <h3 className="text-2xl font-heading font-bold mb-3 text-center" style={cardHeadingStyle}>
                    {location.location_name}
                  </h3>
                  <p className="text-center mb-6" style={cardBodyStyle}>
                    {location.city}, {location.state}
                  </p>
                  <div className="text-center">
                    <span
                      className="inline-block px-6 py-2 rounded-full font-medium transition-colors"
                      style={buttonStyle}
                    >
                      View Policies
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  } else {
    const policyPages = await getPolicyPages();
    if (policyPages.length === 0) return null;

    return (
      <section className="py-16 relative" style={sectionStyle}>
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="text-center mb-12">
            <Badge className="mb-4" style={badgeStyle}>
              <span>Our Services</span>
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4" style={headingStyle}>
              Insurance Solutions For You
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={subheadingStyle}>
              Explore our comprehensive insurance coverage options.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {policyPages.map((policy) => (
              <Link
                href={`/policies/${policy.slug}`}
                key={policy.id}
                className="block"
              >
                <div
                  className="rounded-xl border p-6 hover:shadow-lg transition-all duration-300 h-full text-center"
                  style={cardStyle}
                >
                  <h3 className="text-xl font-heading font-bold mb-3" style={cardHeadingStyle}>
                    {policy.title}
                  </h3>
                  <p className="text-sm mb-4" style={cardBodyStyle}>
                    {policy.content_summary}
                  </p>
                  <span
                    className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                    style={buttonStyle}
                  >
                    Learn More
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
