import React from 'react';
import { supabase } from '@/lib/supabase';
import { getClientData } from '@/lib/client';
import WhyChooseUsSection from './WhyChooseUsSection';

interface IntroSectionData {
  title?: { content?: string };
  tagline?: { content?: string };
  description?: { 
    type?: string;
    paragraphs?: Record<string, { content?: string }>;
  };
}

async function getIntroSection(): Promise<IntroSectionData | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from('client_home_page')
    .select('intro_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching intro section:', error);
    return null;
  }

  return data?.intro_section || null;
}

const WhyChooseUsSectionWrapper = async () => {
  const [introData, clientData] = await Promise.all([
    getIntroSection(),
    getClientData(),
  ]);

  // Extract title from nested structure
  const title = introData?.title?.content;
  
  // Extract description from paragraphs if multi_paragraph_text
  let subtitle: string | undefined;
  if (introData?.description?.paragraphs) {
    const paragraphs = Object.values(introData.description.paragraphs);
    subtitle = paragraphs.map(p => p.content).filter(Boolean).join(' ');
  }

  return (
    <WhyChooseUsSection
      title={title}
      subtitle={subtitle}
      agencyName={clientData?.agency_name}
    />
  );
};

export default WhyChooseUsSectionWrapper;
