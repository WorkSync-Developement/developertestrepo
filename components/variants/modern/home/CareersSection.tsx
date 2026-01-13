import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/Badge';
import { isMultiLocation } from '@/lib/website';
import type { LocationPoliciesSectionSettings } from '@/lib/types/theme';
import { DEFAULT_THEME } from '@/lib/theme/defaults';

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
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

export default async function CareersSection(): Promise<JSX.Element | null> {
  const [multiLocation, settings, locations] = await Promise.all([
    isMultiLocation(),
    getSectionSettings(),
    getLocations(),
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
  const buttonStyle = {
    backgroundColor: settings.button_bg_color || 'var(--loc-button-bg)',
    color: settings.button_text_color || 'var(--loc-button-text)',
  };

  const cityNames = locations.map(loc => loc.city);
  const headingText = cityNames.length > 0 
    ? `Insurance Careers in ${cityNames.join(', ')}`
    : 'Insurance Careers';

  if (multiLocation && locations.length > 0) {
    return (
      <section className="py-16 relative" style={sectionStyle}>
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="text-center mb-12">
            <Badge className="mb-4" style={badgeStyle}>
              <span>Join Our Team</span>
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4" style={headingStyle}>
              {headingText}
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={subheadingStyle}>
              Start your career in insurance with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/locations/${location.location_slug}/apply`}
                className="block"
              >
                <div
                  className="rounded-xl border p-8 hover:shadow-lg transition-all duration-300 h-full text-center"
                  style={cardStyle}
                >
                  <h3 className="text-2xl font-heading font-bold mb-3" style={headingStyle}>
                    {location.location_name}
                  </h3>
                  <p className="mb-6" style={subheadingStyle}>
                    {location.city}, {location.state}
                  </p>
                  <span
                    className="inline-block px-6 py-2 rounded-full font-medium"
                    style={buttonStyle}
                  >
                    View Careers
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  } else {
    const location = locations[0];
    const singleLocationHeading = location 
      ? `Insurance Careers in ${location.city}`
      : 'Insurance Careers';

    return (
      <section className="py-16 relative" style={sectionStyle}>
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="text-center mb-12">
            <Badge className="mb-4" style={badgeStyle}>
              <span>Join Our Team</span>
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4" style={headingStyle}>
              {singleLocationHeading}
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={subheadingStyle}>
              Start your career in insurance with us.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="/apply" className="block max-w-md w-full">
              <div
                className="rounded-xl border p-8 hover:shadow-lg transition-all duration-300 text-center"
                style={cardStyle}
              >
                <span
                  className="inline-block px-8 py-3 rounded-full font-medium text-lg"
                  style={buttonStyle}
                >
                  View Careers
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
