import React from 'react';
import Image from "next/image";
import { supabase } from '@/lib/supabase';
import { isMultiLocation, getAllWebsites } from '@/lib/website';
import HeroCTAButton from './HeroCTAButton';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HeroSection = async ({ locationId }: { locationId?: string | null }) => {
  const [heroContent, multiLocation, locations] = await Promise.all([
    getHeroSection(),
    isMultiLocation(),
    getAllWebsites()
  ]);

  if (!heroContent) {
    return null;
  }

  const renderWithLineBreaks = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Use title from heroContent or fallback
  const title = heroContent?.title?.content || 'Your Trusted Local Insurance Partner';
  const description = heroContent?.description?.content || heroContent?.subtitle?.content || 'Expert guidance and dependable coverage tailored to your needs. Protecting what matters most.';

  // Check if we have background media
  const hasBackgroundMedia = (heroContent?.background_media_type === 'video' && heroContent?.background_video?.url) || 
                             (heroContent?.background_image?.url);

  return (
    <section 
      className={`relative w-full min-h-screen flex items-center ${!hasBackgroundMedia ? 'bg-gradient-to-b from-primary/10 to-background' : ''}`}
      aria-label="Agency introduction and welcome"
      role="banner"
    >
      {/* Background media - Image or Video */}
      {heroContent?.background_media_type === 'video' && heroContent?.background_video?.url ? (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'brightness(0.7)',
            }}
          >
            <source src={heroContent.background_video.url} type="video/mp4" />
          </video>
        </div>
      ) : heroContent?.background_image?.url ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroContent.background_image.url}
            fill
            priority
            quality={95}
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.7)',
            }}
            alt={heroContent?.background_image?.alt || "Hero background image"}
          />
        </div>
      ) : null}
      
      {/* Overlay for better text readability when background image/video is present */}
      {hasBackgroundMedia && (
        <div 
          className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/20 to-black/40"
        />
      )}
      
      {/* Configurable overlay filter */}
      {(heroContent?.overlay?.opacity ?? 0) > 0 && (
        <div 
          className="absolute inset-0 z-[2]"
          style={{
            backgroundColor: heroContent?.overlay?.color || '#000000',
            opacity: (heroContent?.overlay?.opacity ?? 0) / 100
          }}
        />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${hasBackgroundMedia ? 'text-white' : 'text-foreground'}`}>
            {renderWithLineBreaks(title)}
          </h1>

          <p className={`text-lg sm:text-xl mb-8 leading-relaxed ${hasBackgroundMedia ? 'text-white/90' : 'text-muted-foreground'}`}>
            {renderWithLineBreaks(description)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <HeroCTAButton 
              isMultiLocation={multiLocation} 
              locations={locations || []} 
            />
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${hasBackgroundMedia ? 'bg-white' : 'bg-primary'}`}></div>
              <span className={hasBackgroundMedia ? 'text-white/80' : 'text-muted-foreground'}>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${hasBackgroundMedia ? 'bg-white' : 'bg-primary'}`}></div>
              <span className={hasBackgroundMedia ? 'text-white/80' : 'text-muted-foreground'}>25+ Years Serving Our Community</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${hasBackgroundMedia ? 'bg-white' : 'bg-primary'}`}></div>
              <span className={hasBackgroundMedia ? 'text-white/80' : 'text-muted-foreground'}>Local Expertise</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
