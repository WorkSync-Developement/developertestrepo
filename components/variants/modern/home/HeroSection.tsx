import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { isMultiLocation, getAllWebsites } from '@/lib/website';
import HeroCTAButton from '@/components/home-page/HeroCTAButton';

interface HeroContent {
  title?: { content: string; color?: string };
  subtitle?: { content: string; color?: string };
  description?: { content: string };
  background_image?: { url: string; alt?: string };
  background_video?: { url: string | null };
  background_media_type?: 'image' | 'video';
  overlay?: { color: string | null; opacity: number };
}

async function getHeroSection(): Promise<HeroContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) {
    console.error('NEXT_PUBLIC_CLIENT_ID is not set');
    return null;
  }

  const { data, error } = await supabase
    .from('client_home_page')
    .select('hero_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }

  return data?.hero_section || null;
}

export default async function HeroSection() {
  const [heroContent, multiLocation, locations] = await Promise.all([
    getHeroSection(),
    isMultiLocation(),
    getAllWebsites(),
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

  return (
    <section
      className="relative overflow-hidden w-full min-h-[600px] lg:min-h-[700px] flex items-center"
      aria-label="Hero section"
      role="banner"
    >
      {/* Background Media */}
      {heroContent.background_media_type === 'video' && heroContent.background_video?.url ? (
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
      ) : heroContent.background_image?.url ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroContent.background_image.url}
            fill
            priority
            quality={90}
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            alt={heroContent.background_image.alt || 'Hero background'}
          />
        </div>
      ) : null}

      {/* Overlay */}
      {(heroContent.overlay?.opacity ?? 0) > 0 && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            backgroundColor: heroContent.overlay?.color || '#000000',
            opacity: (heroContent.overlay?.opacity ?? 0) / 100,
          }}
        />
      )}

      {/* Default subtle overlay */}
      {(heroContent.overlay?.opacity ?? 0) === 0 && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-[1]" />
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-6 animate-fade-in">
            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
              style={{
                color: heroContent.title?.color || 'var(--color-primary-foreground)',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              {renderWithLineBreaks(heroContent.title?.content || '')}
            </h1>

            {/* Subtitle */}
            <div
              className="inline-block px-8 py-4 rounded-2xl backdrop-blur-md shadow-xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide"
                style={{
                  color: heroContent.subtitle?.color || 'var(--color-primary-foreground)',
                }}
              >
                {renderWithLineBreaks(heroContent.subtitle?.content || '')}
              </h2>
            </div>

            {/* Description */}
            <div className="max-w-2xl mx-auto">
              <p
                className="text-lg sm:text-xl md:text-2xl leading-relaxed px-6 py-4 rounded-xl backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  color: 'var(--color-text-primary)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                {renderWithLineBreaks(heroContent.description?.content || '')}
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4">
              <HeroCTAButton isMultiLocation={multiLocation} locations={locations || []} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent z-[1]" />
    </section>
  );
}
