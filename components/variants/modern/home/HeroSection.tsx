import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { isMultiLocation, getAllWebsites } from '@/lib/website';
import { Star, CheckCircle2, Users } from 'lucide-react';
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

const renderWithLineBreaks = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </React.Fragment>
  ));
};

export async function Hero() {
  const [heroContent, multiLocation, locations] = await Promise.all([
    getHeroSection(),
    isMultiLocation(),
    getAllWebsites()
  ]);

  if (!heroContent) {
    return null;
  }

  const locationData = locations?.map(loc => ({
    id: loc.id,
    location_name: `${loc.city}, ${loc.state}`,
    city: loc.city,
    state: loc.state,
    location_slug: loc.location_slug,
  })) || [];

  // TEMPORARY: Force no background media to test old decorative design
  // Remove this line to restore normal behavior
  const hasBackgroundMedia = heroContent?.background_image?.url || (heroContent?.background_media_type === 'video' && heroContent?.background_video?.url);

  return (
    <section 
      className={`relative min-h-[600px] overflow-hidden ${
        !hasBackgroundMedia 
          ? 'bg-gradient-to-b from-primary/10 to-background' 
          : ''
      }`}
    >
      {/* Background media - Image or Video */}
      {hasBackgroundMedia && heroContent?.background_media_type === 'video' && heroContent?.background_video?.url ? (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroContent.background_video.url} type="video/mp4" />
          </video>
        </div>
      ) : hasBackgroundMedia && heroContent?.background_image?.url ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroContent.background_image.url}
            fill
            priority
            quality={90}
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            alt={heroContent?.background_image?.alt || "Hero background image"}
          />
        </div>
      ) : null}
      
      {/* Configurable overlay filter (only when background media exists) */}
      {hasBackgroundMedia && (heroContent?.overlay?.opacity ?? 0) > 0 && (
        <div 
          className="absolute inset-0 z-[1]"
          style={{
            backgroundColor: heroContent?.overlay?.color || '#000000',
            opacity: (heroContent?.overlay?.opacity ?? 0) / 100
          }}
        />
      )}
      
      {/* Fallback overlay when no custom overlay is set (only when background media exists) */}
      {hasBackgroundMedia && (heroContent?.overlay?.opacity ?? 0) === 0 && (
        <div className="absolute inset-0 bg-theme-bg/20 z-[1]"></div>
      )}

      {/* Decorative Elements (only show when no background media - old design) */}
      {!hasBackgroundMedia && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 bg-modern-primary-5 z-0"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 bg-modern-primary-5 z-0"></div>
        </>
      )}

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Main Heading */}
          {heroContent?.title?.content && (
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight max-w-3xl">
              <span 
                style={{ color: heroContent?.title?.color || 'var(--color-text-primary)' }}
                className="text-theme-text"
              >
                {renderWithLineBreaks(heroContent.title.content)}
              </span>
            </h1>
          )}

          {/* Subtitle */}
          {heroContent?.subtitle?.content && (
            <h2 
              className="text-lg sm:text-xl text-theme-body max-w-2xl leading-relaxed"
              style={{ color: heroContent?.subtitle?.color || 'var(--color-text-body)' }}
            >
              {renderWithLineBreaks(heroContent.subtitle.content)}
            </h2>
          )}

          {/* Description */}
          {heroContent?.description?.content && (
            <p className="text-lg sm:text-xl text-theme-body max-w-2xl leading-relaxed">
              {renderWithLineBreaks(heroContent.description.content)}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <HeroCTAButton 
              isMultiLocation={multiLocation}
              locations={locationData}
            />
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-12">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <span className="text-sm text-theme-body font-medium">5-Star Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm text-theme-body font-medium">Family Owned</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-theme-body font-medium">Local Experts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default export for backward compatibility
export default Hero;
