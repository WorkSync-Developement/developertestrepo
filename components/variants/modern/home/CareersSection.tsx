import React from 'react';
import Link from 'next/link';
import { Briefcase, ArrowRight, Users, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
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

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
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

export default async function CareersSection(): Promise<React.ReactElement | null> {
  const [multiLocation, locations] = await Promise.all([
    isMultiLocation(),
    getLocations(),
  ]);

  if (multiLocation && locations.length > 0) {
    const cityNames = locations.map(loc => loc.city);
    return (
      <section className="py-20 relative w-full overflow-hidden" style={{ background: 'linear-gradient(to bottom, var(--color-background-alt, #f8fafc), var(--color-background, #ffffff))' }}>
        {/* Decorative background elements */}

        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20" style={{ background: 'radial-gradient(circle, var(--color-primary), transparent)' }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20" style={{ background: 'radial-gradient(circle, var(--color-secondary), transparent)' }}></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge className="text-sm" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
                Join Our Team
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">Insurance Careers </span>
              <span style={{ color: 'var(--color-primary)' }}>in {cityNames.join(', ')}</span>
            </h2>
            <div className="w-32 h-1.5 rounded-full mx-auto mb-6" style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary), var(--color-primary))' }}></div>
            <p className="text-lg md:text-xl text-theme-body max-w-3xl mx-auto leading-relaxed">
              Start your career in insurance with us.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {locations.map((location, index) => (
              <Link
                key={location.id}
                href={`/locations/${location.location_slug}/apply`}
                className="block group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-sm"
              >
                <div className="relative bg-theme-bg-alt rounded-3xl border-2 border-transparent p-8 hover:shadow-2xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2 overflow-hidden shadow-md" style={{ borderColor: 'transparent' }}>
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 from-modern-primary-5 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 from-modern-primary-10 bg-gradient-to-br to-transparent rounded-bl-full"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 bg-gradient-modern-primary">
                        <Briefcase className="w-10 h-10 text-primary-foreground" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-3 text-center transition-colors" style={{ color: 'var(--color-text-primary)' }}>
                      {location.location_name}
                    </h3>
                    <p className="text-center mb-6 text-theme-body font-medium">
                      {location.city}, {location.state}
                    </p>
                    
                    {/* Features list */}
                    <div className="mb-8 space-y-2">
                      <div className="flex items-center justify-center gap-2 text-sm text-theme-body">
                        <Users className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                        <span>Growing Team</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-theme-body">
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                        <span>Career Growth</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto text-center">
                      <span
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:gap-3 transform group-hover:scale-105 bg-gradient-modern-primary"
                      >
                        View Careers
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  } else {
    const location = locations[0];
    const singleLocationHeading = location 
      ? `Insurance Careers in ${location.city}`
      : 'Insurance Careers';

    return (
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge className="text-sm text-secondary-foreground bg-secondary">
                Join Our Team
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">{singleLocationHeading}</span>
            </h2>
            <div className="w-32 h-1.5 rounded-full mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-lg md:text-xl text-theme-body max-w-3xl mx-auto leading-relaxed">
              Start your career in insurance with us.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="/apply" className="block group w-full max-w-md">
              <div className="relative bg-theme-bg-alt rounded-3xl border-2 border-transparent p-10 hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-2 overflow-hidden shadow-lg text-center" style={{ borderColor: 'transparent' }}>
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 from-modern-primary-5 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 from-modern-primary-10 bg-gradient-to-br to-transparent rounded-bl-full"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 bg-gradient-modern-primary">
                      <Briefcase className="w-10 h-10 text-primary-foreground" />
                    </div>
                  </div>
                  
                  {/* Features list */}
                  <div className="mb-8 space-y-3">
                    <div className="flex items-center justify-center gap-2 text-theme-body">
                      <Users className="w-5 h-5 text-primary" />
                      <span>Growing Team</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-theme-body">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>Career Growth Opportunities</span>
                    </div>
                  </div>
                  
                  <span
                    className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-primary-foreground shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:gap-3 transform group-hover:scale-105 bg-gradient-modern-primary"
                  >
                    View Careers
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
