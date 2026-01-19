import React from 'react';
import { supabase } from '@/lib/supabase';
import { getClientData } from '@/lib/client';
import { isMultiLocation } from '@/lib/website';
import { formatPhoneNumber } from '@/lib/utils';
import ModernCTASection from './ModernCTASection';

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

export default async function ModernCTASectionWrapper() {
  const [ctaContent, clientData, multiLocation, locations] = await Promise.all([
    getCTASection(),
    getClientData(),
    isMultiLocation(),
    getLocations()
  ]);

  const subtitle = ctaContent?.subtitle?.content || 'Ready to Get Started?';
  const description = ctaContent?.description?.content || 'Contact us today to learn how we can help protect what matters most.';
  const formattedPhone = clientData?.phone ? formatPhoneNumber(clientData.phone) : undefined;

  return (
    <ModernCTASection
      subtitle={subtitle}
      description={description}
      multiLocation={multiLocation}
      phone={formattedPhone}
      locations={locations}
    />
  );
}
