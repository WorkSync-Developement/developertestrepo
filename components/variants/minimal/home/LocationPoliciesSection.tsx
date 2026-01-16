import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { isMultiLocation } from '@/lib/website';

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

  if (error) return [];
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

  if (error) return [];
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

  if (!showLocations && !showPolicies) return null;

  const items = showLocations ? locations : policies;

  return (
    <section className="py-32 border-t" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-text-muted)', borderWidth: '1px', opacity: 0.2 }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <p className="text-xs uppercase tracking-widest font-light" style={{ color: 'var(--color-text-muted)' }}>
              {showLocations ? 'Our Locations' : 'Our Services'}
            </p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ color: 'var(--color-text-primary)' }}>
              {showLocations ? 'Find Us' : 'What We Offer'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item: any) => (
              <Link
                key={item.id}
                href={showLocations ? `/locations/${item.location_slug}` : `/policies/${item.slug}`}
                className="group block p-8 border transition-opacity hover:opacity-60"
                style={{ borderColor: 'var(--color-text-muted)', borderWidth: '1px', opacity: 0.2 }}
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-light" style={{ color: 'var(--color-text-primary)' }}>
                    {showLocations ? item.location_name : item.title}
                  </h3>
                  {showLocations ? (
                    <p className="text-sm font-light" style={{ color: 'var(--color-text-body)' }}>
                      {item.city}, {item.state}
                    </p>
                  ) : (
                    <p className="text-sm font-light line-clamp-3" style={{ color: 'var(--color-text-body)' }}>
                      {item.content_summary}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
