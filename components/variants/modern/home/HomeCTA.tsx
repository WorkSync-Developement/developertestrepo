import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getClientData } from '@/lib/client';
import { isMultiLocation } from '@/lib/website';
import { Phone, MapPin, ArrowRight } from 'lucide-react';

interface CTAContent {
  subtitle?: { content: string };
  description?: { content: string };
  styles?: {
    gradient?: { startColor?: string; endColor?: string; direction?: string };
    card?: { backgroundColor?: string; backgroundOpacity?: number };
    button?: { backgroundColor?: string; textColor?: string };
  };
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

  if (error) {
    console.error('Error fetching CTA section:', error);
    return null;
  }

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

  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }

  return data || [];
}

export default async function HomeCTA() {
  const [ctaContent, clientData, multiLocation, locations] = await Promise.all([
    getCTASection(),
    getClientData(),
    isMultiLocation(),
    getLocations(),
  ]);

  if (!ctaContent) {
    return null;
  }

  const gradientStyle = ctaContent.styles?.gradient
    ? {
        background: `linear-gradient(${ctaContent.styles.gradient.direction || 'to right'}, ${
          ctaContent.styles.gradient.startColor || 'var(--color-primary)'
        }, ${ctaContent.styles.gradient.endColor || 'var(--color-accent)'})`,
      }
    : { backgroundColor: 'var(--color-primary)' };

  return (
    <section className="py-20 relative overflow-hidden" style={gradientStyle}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6 animate-fade-in">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              color: 'var(--color-primary-foreground)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {ctaContent.subtitle?.content || 'Ready to Get Started?'}
          </h2>
          <p
            className="text-xl md:text-2xl"
            style={{ color: 'var(--color-primary-foreground)', opacity: 0.95 }}
          >
            {ctaContent.description?.content || 'Contact us today for a free consultation'}
          </p>
        </div>

        {/* CTA Cards */}
        {multiLocation && locations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {locations.map((location, index) => (
              <Link
                key={location.id}
                href={`/locations/${location.location_slug}/contact`}
                className="group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className="h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 p-8 space-y-6 backdrop-blur-md border-2"
                  style={{
                    backgroundColor: `rgba(255, 255, 255, ${
                      ctaContent.styles?.card?.backgroundOpacity ?? 0.95
                    })`,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    <MapPin size={32} style={{ color: 'var(--color-accent-foreground)' }} />
                  </div>

                  {/* Location Name */}
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {location.location_name}
                  </h3>

                  {/* City, State */}
                  <p className="text-lg" style={{ color: 'var(--color-text-body)' }}>
                    {location.city}, {location.state}
                  </p>

                  {/* Button */}
                  <button
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all group-hover:gap-4"
                    style={{
                      backgroundColor:
                        ctaContent.styles?.button?.backgroundColor || 'var(--color-accent)',
                      color: ctaContent.styles?.button?.textColor || 'var(--color-accent-foreground)',
                    }}
                  >
                    <span>Contact {location.city}</span>
                    <ArrowRight size={20} className="transition-transform" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-2xl shadow-2xl p-12 space-y-8 backdrop-blur-md border-2"
              style={{
                backgroundColor: `rgba(255, 255, 255, ${
                  ctaContent.styles?.card?.backgroundOpacity ?? 0.95
                })`,
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              {/* Phone Icon */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                <Phone size={40} style={{ color: 'var(--color-accent-foreground)' }} />
              </div>

              {/* Agency Name */}
              <h3
                className="text-3xl font-bold text-center"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {clientData?.agency_name || 'Contact Us'}
              </h3>

              {/* Contact Button */}
              <Link
                href="/contact"
                className="block w-full px-8 py-4 rounded-xl font-bold text-center text-xl transition-transform hover:scale-105"
                style={{
                  backgroundColor:
                    ctaContent.styles?.button?.backgroundColor || 'var(--color-accent)',
                  color: ctaContent.styles?.button?.textColor || 'var(--color-accent-foreground)',
                }}
              >
                Get in Touch Today
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
