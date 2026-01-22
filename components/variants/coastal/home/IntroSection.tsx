import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Divider } from '@/components/ui/Divider';
import { TrustBadgeDivider } from '@/components/ui/TrustBadgeDivider';
import type { HeroDividerSettings } from '@/lib/types/theme';
import { DEFAULT_THEME } from '@/lib/theme/defaults';
import { CheckCircle, Shield, Users, Clock } from 'lucide-react';

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

  const { data, error } = await supabase
    .from('client_home_page')
    .select('intro_section')
    .eq('client_id', clientId)
    .maybeSingle();
  console.log(data)

  if (error) {
    console.error('Error fetching intro section:', error);
    return null;
  }

  return (data as ClientHomePageData | null)?.intro_section || null;
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
    heroDividerSettings: themeData.hero_divider_settings || DEFAULT_THEME.hero_divider_settings!
  };
}

const IntroSection = async () => {
  const [introContent, themeData] = await Promise.all([
    getIntroSection(),
    getThemeData()
  ]);

  if (!introContent) {
    return null;
  }

  const { heroDividerSettings } = themeData;

  // Get paragraphs in order
  const paragraphs = Object.keys(introContent?.description?.paragraphs || {})
    .sort()
    .map(key => introContent?.description?.paragraphs?.[key])
    .filter((p): p is ParagraphBlock => p !== undefined);

  const renderDivider = () => {
    if (heroDividerSettings.type === 'trust_badges') {
      return <TrustBadgeDivider settings={heroDividerSettings} />;
    }
    return <Divider position="top" />;
  };

  const features = [
    { icon: Shield, label: 'Comprehensive Coverage' },
    { icon: Users, label: 'Personalized Service' },
    { icon: Clock, label: 'Quick Claims Process' },
    { icon: CheckCircle, label: 'Trusted Experts' },
  ];

  return (
    <section
      className="py-20 lg:py-28 relative"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {renderDivider()}

      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <div className="order-2 lg:order-1">
            {/* Tagline */}
            {introContent?.tagline?.content && (
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--color-accent)' }}
              >
                {introContent.tagline.content}
              </p>
            )}

            {/* Title */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {introContent?.title?.content || 'Why Choose Us'}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 mb-8">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {paragraph?.content || ''}
                </p>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group cursor-default hover:bg-opacity-100"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--color-secondary) 8%, transparent)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    <feature.icon size={20} style={{ color: 'var(--color-accent-foreground)' }} />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className="order-1 lg:order-2">
            {introContent?.image?.url && (
              <div className="relative">
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3]">
                    <Image
                      src={introContent.image.url}
                      alt="About our agency"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Stats Card */}
                {introContent?.image_tag?.content && (
                  <div
                    className="absolute -bottom-6 -left-6 rounded-xl shadow-xl px-6 py-4"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <p
                      className="text-lg font-heading font-bold"
                      style={{ color: 'var(--color-primary-foreground)' }}
                    >
                      {introContent.image_tag.content}
                    </p>
                  </div>
                )}

                {/* Decorative Element */}
                <div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 -z-10"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
