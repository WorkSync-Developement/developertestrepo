import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { CheckCircle } from 'lucide-react';

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

  return (data as ClientHomePageData | null)?.intro_section ?? null;
}

const IntroSection = async () => {
  const introContent = await getIntroSection();

  if (!introContent) {
    return null;
  }

  const paragraphs = Object.keys(introContent?.description?.paragraphs || {})
    .sort()
    .map((key) => introContent?.description?.paragraphs?.[key])
    .filter((p): p is ParagraphBlock => p !== undefined);

  const benefits = [
    'Personalized coverage plans',
    'Competitive rates',
    'Local expertise you can trust',
    '24/7 claims support',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            {introContent?.image?.url ? (
              <div className="relative">
                <Image
                  src={introContent.image.url}
                  alt="About our agency"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover rounded-2xl shadow-xl"
                />
                
                {/* Floating experience badge */}
                {introContent?.image_tag?.content && (
                  <div 
                    className="absolute -bottom-6 -right-6 px-6 py-4 rounded-xl shadow-lg"
                    style={{ backgroundColor: '#1e3a5f' }}
                  >
                    <p className="text-white font-bold text-lg">
                      {introContent.image_tag.content}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div 
                className="w-full aspect-[4/3] rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: '#f0ebe3' }}
              >
                <span className="text-gray-400">About Image</span>
              </div>
            )}
          </div>

          {/* Right Column - Content */}
          <div>
            {/* Section label */}
            <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#d4a853' }}>
              About Our Agency
            </p>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#1e3a5f' }}>
              {introContent?.title?.content || 'Your Trusted Insurance Partner'}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 mb-8">
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed" style={{ color: '#5a6a7a' }}>
                    {paragraph?.content || ''}
                  </p>
                ))
              ) : (
                <p className="text-base leading-relaxed" style={{ color: '#5a6a7a' }}>
                  We&apos;re dedicated to providing personalized insurance solutions that protect what matters most to you. 
                  With years of experience serving our community, we understand the unique needs of local families and businesses.
                </p>
              )}
            </div>

            {/* Benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle size={18} style={{ color: '#d4a853' }} />
                  <span className="text-sm font-medium" style={{ color: '#1e3a5f' }}>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#1e3a5f', color: '#ffffff' }}
            >
              Learn More About Us →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
