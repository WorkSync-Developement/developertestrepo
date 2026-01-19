import React from 'react';
import { supabase } from '@/lib/supabase';
import ModernLocationsSection from './ModernLocationsSection';

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
  address?: string;
  phone?: string;
}

async function getLocations(): Promise<Location[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from('client_locations')
    .select('id, location_name, city, state, location_slug, phone')
    .eq('client_id', clientId)
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }

  return data || [];
}

export default async function ModernLocationsSectionWrapper() {
  const locations = await getLocations();

  if (locations.length === 0) {
    return null;
  }

  return (
    <ModernLocationsSection 
      locations={locations}
      title="Find Coverage Near You"
      description="Explore insurance policies available at each of our locations."
    />
  );
}
