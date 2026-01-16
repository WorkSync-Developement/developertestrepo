import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { isMultiLocation, getAllWebsites, getWebsiteData } from '@/lib/website';
import { getClientData } from '@/lib/client';
import { Phone, MapPin, CheckCircle } from 'lucide-react';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';

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

  return (data as ClientHomePageData | null)?.hero_section;
}

const HeroSection = async () => {
  const [heroContent, multiLocation, locations, clientData, websiteData] = await Promise.all([
    getHeroSection(),
    isMultiLocation(),
    getAllWebsites(),
    getClientData(),
    getWebsiteData(),
  ]);

  if (!heroContent) {
    return null;
  }

  const title = heroContent?.title?.content || 'Protect What\nMatters Most';
  const subtitle = heroContent?.subtitle?.content || 'Personalized Insurance You Can Trust';
  const description = heroContent?.description?.content || 'Get fast, free quotes and expert guidance from local agents who understand your needs.';
  
  const phone = websiteData?.phone || clientData?.phone;
  const city = clientData?.city || 'Your City';
  const state = clientData?.state || '';

  const trustPoints = [
    'Locally Owned',
    'Same-Day Quotes', 
    'Top-Rated Service',
  ];

  return (
    <section className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #faf6f0 0%, #f5efe6 50%, #e8dfd3 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh] py-12 lg:py-0">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ color: '#1e3a5f' }}>
              {title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>

            {/* Subtitle with accent */}
            <p className="text-xl sm:text-2xl mb-4" style={{ color: '#1e3a5f' }}>
              <span className="font-semibold">{subtitle.split(' in ')[0]}</span>
              {subtitle.includes(' in ') && (
                <span style={{ color: '#d4a853' }}> in {city}, {state}</span>
              )}
              {!subtitle.includes(' in ') && (
                <span style={{ color: '#d4a853' }}> in {city}, {state}</span>
              )}
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0" style={{ color: '#5a6a7a' }}>
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#d4a853', color: '#1e3a5f' }}
              >
                Get a Free Quote
              </Link>
              
              {phone && (
                <a
                  href={`tel:${normalizePhoneNumber(phone)}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-lg border-2 transition-all duration-200 hover:bg-gray-50"
                  style={{ borderColor: '#1e3a5f', color: '#1e3a5f' }}
                >
                  <Phone size={20} />
                  Call {formatPhoneNumber(phone)}
                </a>
              )}
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start mb-8">
              {trustPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle size={18} style={{ color: '#1e3a5f' }} />
                  <span className="text-sm font-medium" style={{ color: '#5a6a7a' }}>{point}</span>
                </div>
              ))}
            </div>

            {/* Location Badge */}
            <div 
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full shadow-md"
              style={{ backgroundColor: '#1e3a5f' }}
            >
              <MapPin size={20} className="text-white" />
              <span className="text-white font-medium">
                Serving {city} & surrounding areas
              </span>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-lg mx-auto lg:max-w-none">
              {heroContent?.background_image?.url ? (
                <Image
                  src={heroContent.background_image.url}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover rounded-3xl shadow-2xl"
                  alt={heroContent?.background_image?.alt || 'Happy family protected by insurance'}
                />
              ) : (
                <div 
                  className="w-full h-full rounded-3xl shadow-2xl flex items-center justify-center"
                  style={{ backgroundColor: '#e8dfd3' }}
                >
                  <span className="text-gray-400">Hero Image</span>
                </div>
              )}
              
              {/* Decorative elements */}
              <div 
                className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full -z-10"
                style={{ backgroundColor: '#d4a853', opacity: 0.3 }}
              />
              <div 
                className="absolute -top-4 -right-4 w-32 h-32 rounded-full -z-10"
                style={{ backgroundColor: '#1e3a5f', opacity: 0.1 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 60V30C240 10 480 0 720 0C960 0 1200 10 1440 30V60H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
