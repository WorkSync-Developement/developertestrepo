import React from 'react';
import { supabase } from '@/lib/supabase';
import { getClientData } from '@/lib/client';
import { getWebsiteData } from '@/lib/website';
import HeroSection from './HeroSection';

interface HeroContentBlock {
  content: string;
}

interface HeroImageBlock {
  url: string;
  alt?: string;
}

interface HeroVideoBlock {
  url: string | null;
}

interface ClientHomePageData {
  hero_section?: {
    title?: HeroContentBlock;
    subtitle?: HeroContentBlock;
    description?: HeroContentBlock;
    background_image?: HeroImageBlock;
    background_video?: HeroVideoBlock;
    background_media_type?: 'image' | 'video';
  };
}

async function getHeroSection(): Promise<ClientHomePageData['hero_section'] | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from('client_home_page')
    .select('hero_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }

  return (data as ClientHomePageData | null)?.hero_section;
}

const HeroSectionWrapper = async () => {
  const [heroContent, clientData, websiteData] = await Promise.all([
    getHeroSection(),
    getClientData(),
    getWebsiteData(),
  ]);

  const title = heroContent?.title?.content;
  const subtitle = heroContent?.subtitle?.content;
  const description = heroContent?.description?.content;
  
  const phone = websiteData?.phone || clientData?.phone;
  const city = clientData?.city;
  const state = clientData?.state;
  const agencyName = clientData?.agency_name;

  return (
    <HeroSection
      title={title}
      subtitle={subtitle}
      description={description}
      backgroundImage={heroContent?.background_image?.url}
      backgroundVideo={heroContent?.background_video?.url || undefined}
      backgroundMediaType={heroContent?.background_media_type}
      phone={phone}
      city={city}
      state={state}
      agencyName={agencyName}
    />
  );
};

export default HeroSectionWrapper;
