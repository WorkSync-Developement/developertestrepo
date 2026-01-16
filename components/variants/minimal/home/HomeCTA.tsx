import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getClientData } from '@/lib/client';
import { isMultiLocation } from '@/lib/website';

interface CTAContent {
  subtitle?: { content: string };
  description?: { content: string };
}

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
}

async function getCTASection(): Promise<CTAContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from('client_home_page')
    .select('cta_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) return null;
  return data?.cta_section || null;
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

export default async function HomeCTA() {
  const [ctaContent, clientData, multiLocation, locations] = await Promise.all([
    getCTASection(),
    getClientData(),
    isMultiLocation(),
    getLocations(),
  ]);

  if (!ctaContent) return null;

  return (
    <section className="py-32 border-t" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-text-muted)', borderWidth: '1px', opacity: 0.2 }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-light" style={{ color: 'var(--color-text-primary)' }}>
              {ctaContent.subtitle?.content || 'Get Started'}
            </h2>
            <div className="flex justify-center">
              <div className="w-16 h-px" style={{ backgroundColor: 'var(--color-primary)' }} />
            </div>
            <p className="text-lg font-light" style={{ color: 'var(--color-text-body)' }}>
              {ctaContent.description?.content || 'Contact us today'}
            </p>
          </div>

          {multiLocation && locations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {locations.map((location) => (
                <Link
                  key={location.id}
                  href={`/locations/${location.location_slug}/contact`}
                  className="p-8 border transition-opacity hover:opacity-60"
                  style={{ borderColor: 'var(--color-text-muted)', borderWidth: '1px' }}
                >
                  <div className="space-y-2">
                    <p className="text-lg font-light" style={{ color: 'var(--color-text-primary)' }}>
                      {location.city}
                    </p>
                    <p className="text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                      {location.state}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Link
              href="/contact"
              className="inline-block px-12 py-4 border text-sm font-light tracking-wide transition-opacity hover:opacity-60"
              style={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
              }}
            >
              Contact Us
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
