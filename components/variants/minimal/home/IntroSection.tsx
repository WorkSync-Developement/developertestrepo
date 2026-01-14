import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

interface IntroContent {
  image: { url: string };
  title: { content: string };
  tagline: { content: string };
  image_tag: { content: string };
  description: { paragraphs: { [key: string]: { content: string } } };
}

async function getIntroSection(): Promise<IntroContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from('client_home_page')
    .select('intro_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) return null;
  return data?.intro_section || null;
}

export default async function IntroSection() {
  const introContent = await getIntroSection();
  if (!introContent) return null;

  const paragraphs = Object.keys(introContent.description?.paragraphs || {})
    .sort()
    .map((key) => introContent.description?.paragraphs?.[key])
    .filter((p): p is { content: string } => p !== undefined);

  return (
    <section className="py-32" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
          {/* Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest font-light" style={{ color: 'var(--color-text-muted)' }}>
                {introContent.tagline?.content}
              </p>
              <h2
                className="text-4xl md:text-5xl font-light leading-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {introContent.title?.content}
              </h2>
              <div className="w-16 h-px" style={{ backgroundColor: 'var(--color-primary)' }} />
            </div>
            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base font-light leading-relaxed" style={{ color: 'var(--color-text-body)' }}>
                  {paragraph.content}
                </p>
              ))}
            </div>
          </div>

          {/* Image */}
          {introContent.image?.url && (
            <div className="order-1 lg:order-2">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={introContent.image.url}
                  alt="About"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
