import React from 'react';
import { supabase } from '@/lib/supabase';
import { isMultiLocation, getAllWebsites } from '@/lib/website';
import ModernHeroSection from './ModernHeroSection';

interface HeroContentBlock {
  tag?: string;
  type?: string;
  content: string;
  color?: string;
}

interface HeroImageBlock {
  url: string;
  type?: string;
  alt?: string;
}

interface HeroVideoBlock {
  url: string | null;
  type?: string;
}

interface HeroOverlay {
  color: string | null;
  opacity: number;
}

interface ClientHomePageData {
  hero_section?: {
    title?: HeroContentBlock;
    subtitle?: HeroContentBlock;
    description?: HeroContentBlock;
    background_image?: HeroImageBlock;
    background_video?: HeroVideoBlock;
    background_media_type?: 'image' | 'video';
    overlay?: HeroOverlay;
  };
}

async function getHeroSection(): Promise<any | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

  if (!clientId) {
    console.error('NEXT_PUBLIC_CLIENT_ID is not set');
    return null;
  }

  const query = supabase
    .from('client_home_page')
    .select('hero_section')
    .eq('client_id', clientId);

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }

  const heroData = (data as ClientHomePageData | null)?.hero_section;
  
  return heroData;
}

const ModernHeroSectionWrapper = async ({ locationId }: { locationId?: string | null }) => {
  const [heroContent, multiLocation, locations] = await Promise.all([
    getHeroSection(),
    isMultiLocation(),
    getAllWebsites()
  ]);

  return (
    <ModernHeroSection
      heroContent={heroContent}
      isMultiLocation={multiLocation}
      locations={locations || []}
    />
  );
};

export default ModernHeroSectionWrapper;
