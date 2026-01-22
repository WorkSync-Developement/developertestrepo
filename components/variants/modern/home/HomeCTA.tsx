import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getClientData } from '@/lib/client';
import { isMultiLocation } from '@/lib/website';

// Local Badge component for modern variant
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function Badge({ children, className = '', style }: BadgeProps) {
  return (
    <div
      className={`inline-block rounded-full px-4 py-1 text-sm font-medium ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

interface CTAContent {
  subtitle?: { content: string };
  description?: { content: string };
  styles?: {
    gradient?: { startColor?: string; endColor?: string; direction?: string };
    card?: { backgroundColor?: string; backgroundOpacity?: number };
    button?: { backgroundColor?: string; textColor?: string };
  };
}

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
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

async function getLocations(): Promise<Location[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from('client_locations')
    .select('id, location_name, city, state, location_slug')
    .eq('client_id', clientId)
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }

  return data || [];
}

export default async function HomeCTA(): Promise<React.ReactElement | null> {
  const [ctaContent, clientData, multiLocation, locations] = await Promise.all([
    getCTASection(),
    getClientData(),
    isMultiLocation(),
    getLocations(),
  ]);

  const subtitle = ctaContent?.subtitle?.content || 'Ready to Get Started?';
  const description = ctaContent?.description?.content || 'Contact us today to learn how we can help protect what matters most.';
  const city = clientData?.city;
  const state = clientData?.state;

  return (
    <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-cta">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10" style={{ background: 'radial-gradient(circle, var(--color-background-alt, #ffffff), transparent)' }}></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10" style={{ background: 'radial-gradient(circle, var(--color-background-alt, #ffffff), transparent)' }}></div>
      
      <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge className="text-sm text-white">
              Get In Touch
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-white">
            {subtitle}
          </h2>
          <div className="w-32 h-1.5 rounded-full mx-auto mb-6 bg-white/30"></div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
        
        {multiLocation && locations.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {locations.map((location, index) => (
              <Link
                key={location.id}
                href={`/locations/${location.location_slug}/contact`}
                className="block group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-sm"
              >
                <div className="relative bg-white rounded-3xl border-2 border-white/20 p-8 hover:border-white/40 hover:shadow-2xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2 overflow-hidden shadow-lg">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 from-modern-primary-5 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 from-modern-primary-10 bg-gradient-to-br to-transparent rounded-bl-full"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 bg-gradient-modern-primary">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-3 text-center transition-colors" style={{ color: 'var(--color-text-primary)' }}>
                      {location.location_name}
                    </h3>
                    <p className="text-center mb-6 text-theme-body font-medium">
                      {location.city}, {location.state}
                    </p>
                    
                    {/* Contact features */}
                    <div className="mb-8 space-y-2">
                      <div className="flex items-center justify-center gap-2 text-sm text-theme-body">
                        <Phone className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                        <span>Call Today</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-theme-body">
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                        <span>Expert Support</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto text-center">
                      <span
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:gap-3 transform group-hover:scale-105 bg-gradient-modern-primary"
                      >
                        Contact Us
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <Link href="/contact" className="block group w-full max-w-md">
              <div className="relative bg-white rounded-3xl border-2 border-white/20 p-10 hover:border-white/40 hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-2 overflow-hidden shadow-lg text-center">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 from-modern-primary-5 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 from-modern-primary-10 bg-gradient-to-br to-transparent rounded-bl-full"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 bg-gradient-modern-primary">
                      <Mail className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-heading font-bold mb-4 transition-colors" style={{ color: 'var(--color-text-primary)', }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}>
                    {clientData?.agency_name || 'Our Office'}
                  </h3>
                  <p className="mb-8 text-theme-body font-medium text-lg">
                    {city && state ? `${city}, ${state}` : 'Get in touch with us'}
                  </p>
                  
                  {/* Contact features */}
                  <div className="mb-8 space-y-3">
                    <div className="flex items-center justify-center gap-2 text-theme-body">
                      <Phone className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                      <span>Call Today</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-theme-body">
                      <Mail className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                      <span>Email Us</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-theme-body">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>Expert Support</span>
                    </div>
                  </div>
                  
                  <span
                    className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-primary-foreground shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:gap-3 transform group-hover:scale-105 bg-gradient-modern-primary"
                  >
                    Contact Us
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
