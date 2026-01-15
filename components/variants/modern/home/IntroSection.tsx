import React from 'react';
import Image from 'next/image';
import { Heart, Users, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { TrustBadgeDivider } from '@/components/ui/TrustBadgeDivider';
import type { HeroDividerSettings } from '@/lib/types/theme';
import { DEFAULT_THEME } from '@/lib/theme/defaults';

// Local BadgeSmall component for IntroSection to avoid color conflicts
interface BadgeSmallProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function BadgeSmall({ children, className = '', style }: BadgeSmallProps) {
  return (
    <div
      className={`inline-block rounded-full px-4 py-1 text-sm font-medium ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

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

  return (data as ClientHomePageData | null)?.intro_section || null;
}

async function getThemeData(): Promise<{ aspectRatio: string; heroDividerSettings: HeroDividerSettings }> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) {
    return {
      aspectRatio: '4:3',
      heroDividerSettings: DEFAULT_THEME.hero_divider_settings!,
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
      heroDividerSettings: DEFAULT_THEME.hero_divider_settings!,
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
      return 'h-80 md:h-[400px] lg:h-[500px]';
    case '16:9':
      return 'h-80 md:h-[450px] lg:h-[550px]';
    case '4:3':
    default:
      return 'h-80 md:h-[500px] lg:h-[600px]';
  }
}

export default async function IntroSection(): Promise<React.ReactElement | null> {
  const [introContent, themeData] = await Promise.all([
    getIntroSection(),
    getThemeData(),
  ]);

  if (!introContent) return null;

  const { aspectRatio, heroDividerSettings } = themeData;
  const paragraphs = Object.keys(introContent?.description?.paragraphs || {})
    .sort()
    .map(key => introContent?.description?.paragraphs?.[key])
    .filter((p): p is ParagraphBlock => p !== undefined);

  const imageClasses = getAspectRatioClasses(aspectRatio);

  const renderDivider = () => {
    if (heroDividerSettings.type === 'trust_badges') {
      return <TrustBadgeDivider settings={heroDividerSettings} />;
    }
    return null; // Divider removed
  };

  return (
    <section className="py-20 bg-theme-bg relative w-full">
      {renderDivider()}
      
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className={introContent?.image?.url ? 'grid grid-cols-1 md:grid-cols-2 gap-12 items-center' : ''}>
          {/* Image/Card Section - LEFT SIDE */}
          {introContent?.image?.url && (
           <div className="relative order-1 md:order-1">
           <div className="relative aspect-square max-w-md mx-auto md:mx-0">
             {/* Background circle */}
             <div className="absolute inset-0 bg-modern-primary-70 rounded-full shadow-2xl" />
             
             {/* Main card */}
             <div className="absolute inset-8 bg-theme-bg backdrop-blur-sm rounded-3xl shadow-lg border border-secondary/20 flex flex-col items-center justify-center p-8 text-center">
               <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-primary">
                 <Heart className="w-10 h-10 text-primary-foreground" />
               </div>
               <h3 className="text-2xl font-bold text-theme-text mb-2">Family Values</h3>
               <p className="text-theme-body text-sm">Protecting what matters since day one</p>
             </div>

             {/* Floating badges */}
             <div className="absolute -top-4 right-8 bg-theme-bg backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-secondary/20">
               <div className="flex items-center gap-2">
                 <Users className="w-4 h-4 text-primary" />
                 <span className="text-sm font-semibold text-theme-text">Local Team</span>
               </div>
             </div>

             <div className="absolute -bottom-4 left-8 bg-theme-bg backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-secondary/20" style={{ animationDelay: '-2s' }}>
               <div className="flex items-center gap-2">
                 <MapPin className="w-4 h-4 text-primary" />
                 <span className="text-sm font-semibold text-theme-text">Georgia Based</span>
               </div>
             </div>
           </div>
         </div>
          )}

          {/* Text Content Section - RIGHT SIDE */}
          <div className="space-y-8 order-2 md:order-2">
            {introContent?.tagline?.content && (
              <div className="inline-block">
                <BadgeSmall className="text-sm text-secondary-foreground bg-secondary">{introContent.tagline.content}</BadgeSmall>
              </div>
            )}
            
            {introContent?.title?.content && (
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-theme-text">
                  {introContent.title.content}
                </h2>
                {/* Decorative line */}
                <div className="w-24 h-1 rounded-full bg-gradient-modern-primary-horizontal"></div>
              </div>
            )}

            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <div key={index} className="relative pl-6">
                  {/* Decorative bullet */}
                  <div className="absolute left-0 top-3 w-2 h-2 rounded-full bg-primary"></div>
                  <p className="text-theme-body text-base md:text-lg leading-relaxed">
                    {paragraph?.content || ''}
                  </p>
                </div>
              ))}
            </div>

            {/* Call to Action Card */}
            <div className="pt-6">
              <div className="inline-flex items-center gap-4 px-6 py-4 bg-theme-bg rounded-xl shadow-lg border border-secondary/20 hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-md bg-primary">
                  <Heart className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-theme-text">Trusted by Families</p>
                  <p className="text-xs text-theme-body">Since 2005</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
