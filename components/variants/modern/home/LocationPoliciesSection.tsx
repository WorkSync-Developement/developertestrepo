import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { isMultiLocation } from '@/lib/website';
import { MapPin, ArrowRight } from 'lucide-react';

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
    .limit(6);

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

export default async function LocationPoliciesSection() {
  const [multiLocation, policies, locations] = await Promise.all([
    isMultiLocation(),
    getPolicyPages(),
    getLocations(),
  ]);

  const showLocations = multiLocation && locations.length > 0;
  const showPolicies = !multiLocation && policies.length > 0;

  if (!showLocations && !showPolicies) {
    return null;
  }

  return (
    <section
      className="py-20 relative"
      style={{ backgroundColor: 'var(--loc-section-bg, var(--color-background-alt))' }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-2"
            style={{
              backgroundColor: 'var(--loc-badge-bg, var(--color-secondary))',
              color: 'var(--loc-badge-text, var(--color-secondary-foreground))',
            }}
          >
            {showLocations ? 'Our Locations' : 'Our Services'}
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              color: 'var(--loc-heading, var(--color-text-primary))',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {showLocations ? 'Visit Us Today' : 'Insurance Solutions'}
          </h2>
          <p
            className="text-lg md:text-xl"
            style={{ color: 'var(--loc-subheading, var(--color-text-body))' }}
          >
            {showLocations
              ? 'Find the office nearest to you'
              : 'Comprehensive coverage for all your needs'}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showLocations &&
            locations.map((location, index) => (
              <Link
                key={location.id}
                href={`/locations/${location.location_slug}`}
                className="group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className="h-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:scale-105 border-2"
                  style={{
                    backgroundColor: 'var(--loc-card-bg, var(--color-background-alt))',
                    borderColor: 'var(--loc-card-border, transparent)',
                  }}
                >
                  <div className="p-8 space-y-4">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <MapPin size={32} style={{ color: 'var(--color-accent-foreground)' }} />
                    </div>

                    {/* Location Name */}
                    <h3
                      className="text-2xl font-bold group-hover:translate-x-1 transition-transform"
                      style={{
                        color: 'var(--loc-card-heading, var(--color-text-primary))',
                      }}
                    >
                      {location.location_name}
                    </h3>

                    {/* City, State */}
                    <p
                      className="text-lg"
                      style={{ color: 'var(--loc-card-body, var(--color-text-body))' }}
                    >
                      {location.city}, {location.state}
                    </p>

                    {/* Link */}
                    <div className="flex items-center gap-2 pt-4">
                      <span
                        className="font-semibold"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        View Location
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

          {showPolicies &&
            policies.map((policy, index) => (
              <Link
                key={policy.id}
                href={`/policies/${policy.slug}`}
                className="group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className="h-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:scale-105 border-2"
                  style={{
                    backgroundColor: 'var(--loc-card-bg, var(--color-background-alt))',
                    borderColor: 'var(--loc-card-border, transparent)',
                  }}
                >
                  <div className="p-8 space-y-4">
                    {/* Accent line */}
                    <div
                      className="w-12 h-1.5 rounded-full mb-4"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    />

                    {/* Policy Title */}
                    <h3
                      className="text-2xl font-bold group-hover:translate-x-1 transition-transform"
                      style={{
                        color: 'var(--loc-card-heading, var(--color-text-primary))',
                      }}
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
