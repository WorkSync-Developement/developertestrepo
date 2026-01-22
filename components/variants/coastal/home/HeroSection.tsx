import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { isMultiLocation, getAllWebsites } from '@/lib/website';
import HeroCTAButton from '@/components/home-page/HeroCTAButton';
import { Shield, CheckCircle, Phone } from 'lucide-react';

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

  return (data as ClientHomePageData | null)?.hero_section || null;
}

const HeroSection = async () => {
  const [heroContent, multiLocation, locations] = await Promise.all([
    getHeroSection(),
    isMultiLocation(),
    getAllWebsites()
  ]);
  console.log(heroContent, )
  const title = heroContent?.title?.content || 'Protect What Matters Most';
  const subtitle = heroContent?.subtitle?.content || 'Your trusted local insurance partner';
  const description = heroContent?.description?.content;
  // Force strong overlay for text visibility - minimum 70%
  const overlayOpacity = Math.max((heroContent?.overlay?.opacity ?? 60) / 100, 0.70);

  const trustBadges = [
    { label: 'Licensed & Insured' },
    { label: 'Free Quotes' },
    { label: 'Local Experts' },
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center" 
      role="banner"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {heroContent?.background_media_type === 'video' && heroContent?.background_video?.url ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroContent.background_video.url} type="video/mp4" />
          </video>
        ) : heroContent?.background_image?.url ? (
          <Image
            src={heroContent.background_image.url}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
            alt={heroContent.background_image.alt || 'Hero background'}
          />
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: 'var(--hero-bg)' }} />
        )}
        
        {/* Overlay - strong dark overlay for text visibility */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 max-w-screen-xl">
        <div className="max-w-3xl">
          {/* Trust Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: '#ffffff',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            <Shield size={16} className="text-white" />
            <span>Trusted Insurance Partner</span>
          </div>

          {/* Title */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1] text-white"
            style={{ 
              textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.4)'
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl mb-4 font-medium text-white"
            style={{ 
              textShadow: '0 2px 10px rgba(0,0,0,0.4)'
            }}
          >
            {subtitle}
          </p>

          {/* Description */}
          {description && (
            <p 
              className="text-base md:text-lg mb-8 max-w-xl text-white/90"
              style={{ 
                textShadow: '0 1px 8px rgba(0,0,0,0.3)'
              }}
            >
              {description}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <HeroCTAButton
              isMultiLocation={multiLocation}
              locations={locations || []}
            />
            <a
              href="tel:+1234567890"
              className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all duration-200 hover:scale-[1.02] text-white"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 'var(--cta-border-radius, 9999px)',
              }}
            >
              <Phone size={18} />
              Call Us Now
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6">
            {trustBadges.map((badge, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 text-white/90"
              >
                <CheckCircle size={18} className="text-white" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Fade to Next Section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--color-background), transparent)' }}
      />
    </section>
  );
};

export default HeroSection;
