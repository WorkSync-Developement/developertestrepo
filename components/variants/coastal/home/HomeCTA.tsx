import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getClientData } from '@/lib/client';
import { isMultiLocation } from '@/lib/website';
import { Divider } from '@/components/ui/Divider';
import { Phone, MapPin, ArrowRight } from 'lucide-react';

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
}

interface CTAContent {
  title?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
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

const HomeCTA = async () => {
  const [ctaContent, clientData, multiLocation, locations] = await Promise.all([
    getCTASection(),
    getClientData(),
    isMultiLocation(),
    getLocations()
  ]);

  const title = ctaContent?.title || 'Ready to Get Started?';
  const description = ctaContent?.description || 'Contact us today to learn how we can help protect what matters most.';
  const buttonText = ctaContent?.button_text || 'Get a Quote';
  const buttonLink = ctaContent?.button_link || '/contact';
  const city = clientData?.city;
  const state = clientData?.state;
  const phone = clientData?.phone;
  const agencyName = clientData?.agency_name;

  return (
    <section
      className="py-20 lg:py-28 relative"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <Divider position="top" />

      <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4"
            style={{ color: 'var(--color-primary-foreground)' }}
          >
            {title}
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto opacity-90"
            style={{ color: 'var(--color-primary-foreground)' }}
          >
            {description}
          </p>
        </div>

        {multiLocation && locations.length > 0 ? (
          // Multi-location: Show location cards
          <div className={`grid gap-6 ${
            locations.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
            locations.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/locations/${location.location_slug}/contact`}
                className="group block"
              >
                <div
                  className="p-6 md:p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--popup-border-radius, 12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <MapPin size={24} style={{ color: 'var(--color-accent-foreground)' }} />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl font-heading font-bold mb-1"
                        style={{ color: 'var(--color-primary-foreground)' }}
                      >
                        {location.location_name}
                      </h3>
                      <p
                        className="text-sm mb-4 opacity-80"
                        style={{ color: 'var(--color-primary-foreground)' }}
                      >
                        {location.city}, {location.state}
                      </p>
                      <span
                        className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        {buttonText}
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Single-location: Show contact card with phone
          <div className="max-w-2xl mx-auto">
            <div
              className="p-8 md:p-12 text-center"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--popup-border-radius, 16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                <Phone size={36} style={{ color: 'var(--color-accent-foreground)' }} />
              </div>

              <h3
                className="text-2xl md:text-3xl font-heading font-bold mb-2"
                style={{ color: 'var(--color-primary-foreground)' }}
              >
                {agencyName || 'Contact Us'}
              </h3>

              {city && state && (
                <p
                  className="text-lg mb-6 opacity-80"
                  style={{ color: 'var(--color-primary-foreground)' }}
                >
                  Serving {city}, {state} and surrounding areas
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\D/g, '')}`}
                    className="inline-flex items-center justify-center gap-2 py-4 px-8 font-semibold transition-all hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-accent-foreground)',
                      borderRadius: 'var(--cta-border-radius, 9999px)',
                    }}
                  >
                    <Phone size={20} />
                    {phone}
                  </a>
                )}

                <Link
                  href={buttonLink}
                  className="inline-flex items-center justify-center gap-2 py-4 px-8 border-2 font-semibold transition-all hover:-translate-y-1 hover:bg-white/10"
                  style={{
                    borderColor: 'var(--color-primary-foreground)',
                    color: 'var(--color-primary-foreground)',
                    borderRadius: 'var(--cta-border-radius, 9999px)',
                  }}
                >
                  {buttonText}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeCTA;
