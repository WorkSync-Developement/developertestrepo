import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getClientData } from '@/lib/client';
import { isMultiLocation } from '@/lib/website';
import { Divider } from '@/components/ui/Divider';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';

interface CTASectionStyles {
  gradient?: {
    startColor?: string | null;
    endColor?: string | null;
    direction?: string;
  };
  card?: {
    backgroundMode?: 'transparent' | 'solid';
    backgroundColor?: string | null;
    backgroundOpacity?: number;
    borderColor?: string | null;
    hoverBackgroundColor?: string | null;
  };
  typography?: {
    headingColor?: string | null;
    bodyColor?: string | null;
  };
  iconContainer?: {
    backgroundColor?: string | null;
    backgroundOpacity?: number;
  };
  button?: {
    backgroundColor?: string | null;
    textColor?: string | null;
    hoverBackgroundColor?: string | null;
  };
}

interface CTAContent {
  subtitle?: { content: string };
  description?: { content: string };
  styles?: CTASectionStyles;
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

  const query = supabase
    .from('client_home_page')
    .select('cta_section')
    .eq('client_id', clientId);

  const { data, error } = await query.maybeSingle();

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

const GRADIENT_MAP: Record<string, string> = {
  'to-r': 'to right',
  'to-l': 'to left',
  'to-t': 'to top',
  'to-b': 'to bottom',
  'to-br': 'to bottom right',
  'to-bl': 'to bottom left',
  'to-tr': 'to top right',
  'to-tl': 'to top left',
};

const HomeCTA = async () => {
  const [ctaContent, clientData, multiLocation, locations] = await Promise.all([
    getCTASection(),
    getClientData(),
    isMultiLocation(),
    getLocations()
  ]);

  const subtitle = ctaContent?.subtitle?.content || 'Ready to Get Started?';
  const description = ctaContent?.description?.content || 'Contact us today to learn how we can help protect what matters most.';
  
  const formattedPhone = clientData?.phone ? formatPhoneNumber(clientData.phone) : '(555) 123-4567';

  return (
    <section className="w-full py-16 sm:py-24 bg-primary">
      <Divider position="top" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">{subtitle}</h2>
        
        <p className="text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {multiLocation && locations.length > 0 ? (
            <>
              <Link 
                href="/locations"
                className="px-8 py-3 rounded-lg bg-primary-foreground text-primary font-semibold hover:opacity-90 transition"
              >
                Find a Location
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-3 rounded-lg border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition"
              >
                Request a Consultation
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/contact"
                className="px-8 py-3 rounded-lg bg-primary-foreground text-primary font-semibold hover:opacity-90 transition"
              >
                Request a Consultation
              </Link>
              {clientData?.phone && (
                <a 
                  href={`tel:${normalizePhoneNumber(clientData.phone)}`}
                  className="px-8 py-3 rounded-lg border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition"
                >
                  Call Us Today
                </a>
              )}
            </>
          )}
        </div>
        
        {/* Divider */}
        <div className="mt-12 pt-12 border-t border-primary-foreground/20">
          <p className="text-primary-foreground text-sm">
            Available Monday - Friday, 9 AM - 5 PM {formattedPhone && `| ${formattedPhone}`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;
