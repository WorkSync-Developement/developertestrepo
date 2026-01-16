import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { BadgeSmall } from '@/components/ui/Badge';

interface IntroContent {
  image: { url: string };
  title: { content: string };
  tagline: { content: string };
  image_tag: { content: string };
  description: {
    paragraphs: {
      [key: string]: { content: string };
    };
  };
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

  if (error) {
    console.error('Error fetching intro section:', error);
    return null;
  }

  return data?.intro_section || null;
}

export default async function IntroSection() {
  const introContent = await getIntroSection();

  if (!introContent) {
    return null;
  }

  // Get paragraphs in order
  const paragraphs = Object.keys(introContent.description?.paragraphs || {})
    .sort()
    .map((key) => introContent.description?.paragraphs?.[key])
    .filter((p): p is { content: string } => p !== undefined);

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          {introContent.image?.url && (
            <div className="order-2 lg:order-1 animate-fade-in-left">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                  <Image
                    src={introContent.image.url}
                    alt="About our agency"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Image tag badge */}
                  {introContent.image_tag?.content && (
                    <div className="absolute bottom-6 left-6 right-6">
                      <div
                        className="backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          borderColor: 'var(--color-accent)',
                        }}
                      >
                        <p
                          className="font-semibold text-lg md:text-xl"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {introContent.image_tag.content}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Content Column */}
          <div className="order-1 lg:order-2 space-y-6 animate-fade-in-right">
            {/* Tagline Badge */}
            {introContent.tagline?.content && (
              <div>
                <BadgeSmall
                  className="inline-block px-4 py-2 text-sm md:text-base font-medium rounded-full"
                  style={{
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-secondary-foreground)',
                  }}
                >
                  {introContent.tagline.content}
                </BadgeSmall>
              </div>
            )}

            {/* Title */}
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {introContent.title?.content || ''}
            </h2>

            {/* Accent line */}
            <div
              className="w-24 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />

            {/* Paragraphs */}
            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg md:text-xl leading-relaxed"
                  style={{ color: 'var(--color-text-body)' }}
                >
                  {paragraph.content}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
