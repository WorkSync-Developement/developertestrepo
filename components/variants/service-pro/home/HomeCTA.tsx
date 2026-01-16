import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getWebsiteData } from '@/lib/website';
import { getClientData } from '@/lib/client';
import { Phone } from 'lucide-react';
import { formatPhoneNumber, normalizePhoneNumber } from '@/lib/utils';

interface CTAContent {
  subtitle?: { content: string };
  description?: { content: string };
}

async function getCTASection(): Promise<CTAContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

  if (!clientId) return null;

  const { data, error } = await supabase
    .from('client_home_page')
    .select('cta_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching CTA section:', error);
    return null;
  }

  return data?.cta_section || null;
}

const HomeCTA = async () => {
  const [ctaContent, clientData, websiteData] = await Promise.all([
    getCTASection(),
    getClientData(),
    getWebsiteData(),
  ]);

  const phone = websiteData?.phone || clientData?.phone;

  return (
    <section className="py-16" style={{ backgroundColor: '#1e3a5f' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
          {ctaContent?.subtitle?.content || 'Ready to Get Started?'}
        </h2>

        <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          {ctaContent?.description?.content ||
            'Contact us today for a free, no-obligation quote. Our team is ready to help you find the perfect coverage.'}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#d4a853', color: '#1e3a5f' }}
          >
            Get a Free Quote
          </Link>

          {phone && (
            <a
              href={`tel:${normalizePhoneNumber(phone)}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/30 text-white transition-all duration-200 hover:bg-white/10"
            >
              <Phone size={20} />
              Call {formatPhoneNumber(phone)}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;
