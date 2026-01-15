import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Divider } from '@/components/ui/Divider';
import { TrustBadgeDivider } from '@/components/ui/TrustBadgeDivider';
import { BadgeSmall } from '@/components/ui/Badge';
import type { HeroDividerSettings } from '@/lib/types/theme';
import { DEFAULT_THEME } from '@/lib/theme/defaults';

interface ContentBlock {
  tag?: string;
  type?: string;
  content: string;
}

interface ImageBlock {
  url: string;
  type?: string;
}

interface ParagraphBlock {
  type: string;
  content: string;
}

interface IntroDescription {
  type: string;
  paragraphs: {
    paragraph_1?: ParagraphBlock;
    paragraph_2?: ParagraphBlock;
    [key: string]: ParagraphBlock | undefined;
  };
}

interface IntroContent {
  image: ImageBlock;
  title: ContentBlock;
  tagline: ContentBlock;
  image_tag: ContentBlock;
  description: IntroDescription;
}

interface ClientHomePageData {
  intro_section?: IntroContent;
}

interface ThemeSettings {
  intro_section_aspect_ratio?: string;
  hero_divider_settings?: HeroDividerSettings;
}

async function getIntroSection(): Promise<IntroContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

  if (!clientId) {
    console.error('NEXT_PUBLIC_CLIENT_ID is not set');
    return null;
  }

  const query = supabase
    .from('client_home_page')
    .select('intro_section')
    .eq('client_id', clientId);

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error('Error fetching intro section:', error);
    return null;
  }

  const introData = (data as ClientHomePageData | null)?.intro_section;

  return introData;
}

async function getThemeData(): Promise<{ aspectRatio: string; heroDividerSettings: HeroDividerSettings }> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

  if (!clientId) {
    return { 
      aspectRatio: '4:3', 
      heroDividerSettings: DEFAULT_THEME.hero_divider_settings! 
    };
  }

  const { data, error } = await supabase
    .from('client_theme_settings')
    .select('intro_section_aspect_ratio, hero_divider_settings')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error || !data) {
    return { 
      aspectRatio: '4:3', 
      heroDividerSettings: DEFAULT_THEME.hero_divider_settings! 
    };
  }

  const themeData = data as ThemeSettings;
  return {
    aspectRatio: themeData.intro_section_aspect_ratio || '4:3',
    heroDividerSettings: themeData.hero_divider_settings || DEFAULT_THEME.hero_divider_settings!,
  };
}

function getAspectRatioClasses(aspectRatio: string): string {
  switch (aspectRatio) {
    case '1:1':
      return 'h-80 md:h-[400px] lg:h-[500px] xl:h-[600px]';
    case '16:9':
      return 'h-80 md:h-[450px] lg:h-[550px] xl:h-[650px]';
    case '4:3':
    default:
      return 'h-80 md:h-[500px] lg:h-[600px] xl:h-[700px]';
  }
}

const IntroSection = async () => {
  const [introContent, themeData] = await Promise.all([
    getIntroSection(),
    getThemeData()
  ]);

  if (!introContent) {
    return null;
  }

  const { aspectRatio, heroDividerSettings } = themeData;

  // Get paragraphs in order
  const paragraphs = Object.keys(introContent?.description?.paragraphs || {})
    .sort()
    .map(key => introContent?.description?.paragraphs?.[key])
    .filter((p): p is ParagraphBlock => p !== undefined);

  const imageClasses = getAspectRatioClasses(aspectRatio);

  // Determine which divider to render
  const renderDivider = () => {
    if (heroDividerSettings.type === 'trust_badges') {
      return <TrustBadgeDivider settings={heroDividerSettings} />;
    }
    return <Divider position="top" />;
  };

  return (
    <section className="py-16 sm:py-24 bg-background relative w-full overflow-hidden">
      {renderDivider()}
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} 
      />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={introContent?.image?.url ? "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center" : ""}>
          {/* Left Column - Image with Enhanced Depth */}
          {introContent?.image?.url && (
            <div className={`relative rounded-3xl overflow-hidden group ${imageClasses} animate-fade-in-right`}
              style={{
                boxShadow: 'var(--shadow-2xl)',
              }}>
              <Image 
                src={introContent.image.url} 
                alt="Agency introduction image" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay for Depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30"></div>
              
              {/* Decorative Border */}
              <div className="absolute inset-0 rounded-3xl"
                style={{
                  border: '3px solid rgba(212, 175, 55, 0.3)',
                }}
              />
              
              {/* Premium Image Tag */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 lg:bottom-10 lg:left-10 backdrop-blur-md rounded-2xl px-6 py-4 transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: 'var(--color-accent)' }}
                  />
                  <p className="font-bold text-base lg:text-lg xl:text-xl"
                    style={{ 
                      color: 'var(--color-primary)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    }}>
                    {introContent?.image_tag?.content || ''}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Right Column - Content */}
          <div className="space-y-6">
            {/* Heading */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                {introContent?.title?.content || ''}
              </h2>
            </div>
            
            {/* Paragraphs with Enhanced Readability */}
            <div className="space-y-4">
              {paragraphs?.map((paragraph, index) => (
                <p key={index} 
                  className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                  {paragraph?.content || ''}
                </p>
              ))}
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-foreground">Licensed & Insured</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="font-semibold text-foreground">Expert Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
