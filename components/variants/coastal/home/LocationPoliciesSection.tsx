import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Divider } from '@/components/ui/Divider';
import { isMultiLocation } from '@/lib/website';
import { Shield, MapPin, ArrowRight } from 'lucide-react';

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

const LocationPoliciesSection = async () => {  
  const multiLocation = await isMultiLocation();

  if (multiLocation) {
    // Multi-location: Show location cards
    const locations = await getLocations();
    if (locations.length === 0) return null;

    return (
      <section
        className="py-20 lg:py-28 relative"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <Divider position="top" />

        <div className="container mx-auto px-4 max-w-screen-xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <MapPin size={20} style={{ color: 'var(--color-accent)' }} />
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-accent)' }}
              >
                Our Locations
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Find Coverage Near You
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Visit one of our local offices to discuss your insurance needs in person.
            </p>
          </div>

          {/* Location Cards Grid */}
          <div className={`grid gap-6 ${
            locations.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
            locations.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/locations/${location.location_slug}/policies`}
                className="group block"
              >
                <div
                  className="rounded-xl p-6 md:p-8 h-full border transition-all duration-200 hover:-translate-y-2 hover:shadow-xl"
                  style={{ 
                    backgroundColor: 'var(--color-background)',
                    borderColor: 'var(--color-border)'
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    <MapPin size={28} style={{ color: 'var(--color-accent-foreground)' }} />
                  </div>

                  <h3
                    className="text-xl font-heading font-bold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {location.location_name}
                  </h3>

                  <p
                    className="text-sm mb-6"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {location.city}, {location.state}
                  </p>

                  <span
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    View Policies
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Single-location: Show policy cards
  const policies = await getPolicyPages();
  if (policies.length === 0) return null;

  return (
    <section
      className="py-20 lg:py-28 relative"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Divider position="top" />

      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shield size={20} style={{ color: 'var(--color-accent)' }} />
            <span
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: 'var(--color-accent)' }}
            >
              Insurance Solutions
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Protection for Every Need
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Explore our comprehensive range of insurance products designed to protect what matters most.
          </p>
        </div>

        {/* Policy Cards Grid */}
        <div className={`grid gap-6 ${
          policies.length <= 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {policies.map((policy) => (
            <Link
              key={policy.id}
              href={`/policies/${policy.slug}`}
              className="group block"
            >
              <div
                className="rounded-xl p-6 md:p-8 h-full border transition-all duration-200 hover:-translate-y-2 hover:shadow-xl"
                style={{ 
                  backgroundColor: 'var(--color-background)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  <Shield size={28} style={{ color: 'var(--color-accent-foreground)' }} />
                </div>

                <h3
                  className="text-xl font-heading font-bold mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {policy.title}
                </h3>

                {policy.content_summary && (
                  <p
                    className="text-sm mb-6 line-clamp-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {policy.content_summary}
                  </p>
                )}

                <span
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Learn More
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/policies"
            className="inline-flex items-center gap-2 py-3 px-8 rounded-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-accent-foreground)',
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

export default LocationPoliciesSection;
