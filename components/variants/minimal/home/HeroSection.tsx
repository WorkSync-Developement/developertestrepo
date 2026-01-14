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
  if (!clientId) return null;

  const { data, error } = await supabase
    .from('client_home_page')
    .select('hero_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) return null;
  return data?.hero_section || null;
}

export default async function HeroSection() {
  const [heroContent, multiLocation, locations] = await Promise.all([
    getHeroSection(),
    isMultiLocation(),
    getAllWebsites(),
  ]);

  if (!heroContent) return null;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-background)' }}
      role="banner"
    >
      {/* Background Media */}
      {heroContent.background_media_type === 'video' && heroContent.background_video?.url ? (
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-10">
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
            className="object-cover opacity-10"
            alt={heroContent.background_image.alt || 'Hero background'}
          />
        </div>
      ) : null}

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-32">
        <div className="container mx-auto max-w-4xl text-center space-y-12">
          {/* Title */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tight"
            style={{
              color: heroContent.title?.color || 'var(--color-text-primary)',
            }}
          >
            {heroContent.title?.content}
          </h1>

          {/* Accent Line */}
          <div className="flex justify-center">
            <div className="w-24 h-px" style={{ backgroundColor: 'var(--color-primary)' }} />
          </div>

          {/* Subtitle */}
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide"
            style={{
              color: heroContent.subtitle?.color || 'var(--color-text-body)',
            }}
          >
            {heroContent.subtitle?.content}
          </h2>

          {/* Description */}
          {heroContent.description?.content && (
            <p
              className="text-base sm:text-lg font-light max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-body)' }}
            >
              {heroContent.description.content}
            </p>
          )}

          {/* CTA */}
          <div className="pt-8">
            <HeroCTAButton isMultiLocation={multiLocation} locations={locations || []} />
          </div>
        </div>
      </div>
    </section>
  );
}
