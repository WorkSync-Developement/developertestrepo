import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
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

interface PolicyPage {
  id: string;
  title: string;
  slug: string;
  content_summary: string;
}

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
}

async function getPolicyPages(): Promise<PolicyPage[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from('client_policy_pages')
    .select('id, slug, title, content_summary')
    .eq('client_id', clientId)
    .eq('published', true)
    .limit(5);

  if (error) {
    console.error('Error fetching policy pages:', error);
    return [];
  }

  return data || [];
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


export default async function LocationPoliciesSection(): Promise<React.ReactElement | null> {
  const multiLocation = await isMultiLocation();

  if (multiLocation) {
    const locations = await getLocations();
    if (locations.length === 0) return null;

    return (
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge className="text-sm text-secondary-foreground bg-secondary">
                Insurance by Location
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">Find Coverage </span>
              <span className="text-primary">Near You</span>
            </h2>
            <div className="w-32 h-1.5 rounded-full mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-lg md:text-xl text-theme-body max-w-3xl mx-auto leading-relaxed">
              Explore insurance policies available at each of our locations.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {locations.map((location, index) => (
              <Link
                href={`/locations/${location.location_slug}/policies`}
                key={location.id}
                className="block group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-sm"
              >
                <div className=" shadow-md relative bg-theme-bg rounded-3xl border-2 border-transparent p-8 hover:border-primary hover:shadow-2xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2 overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 from-modern-primary-5 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 from-modern-primary-10 bg-gradient-to-br to-transparent rounded-bl-full"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 bg-gradient-modern-primary">
                          <MapPin className="w-10 h-10 text-primary-foreground" />
                        </div>
                        {/* <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-secondary-foreground" />
                        </div> */}
                      </div>
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-3 text-center text-theme-text group-hover:text-primary transition-colors">
                      {location.location_name}
                    </h3>
                    <p className="text-center mb-6 text-theme-body font-medium">
                      {location.city}, {location.state}
                    </p>
                    
                    {/* Features list */}
                    <div className="mb-8 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-theme-body">
                        <Shield className="w-4 h-4 text-primary" />
                        <span>Full Coverage Available</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-theme-body">
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                        <span>Expert Local Team</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto text-center">
                      <span
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:gap-3 transform group-hover:scale-105 bg-gradient-modern-primary"
                      >
                        View Policies
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
    const policyPages = await getPolicyPages();
    if (policyPages.length === 0) return null;

    return (
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge className="text-sm text-secondary-foreground bg-secondary">
                Our Services
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">Insurance Solutions </span>
              <span className="text-primary">For You</span>
            </h2>
            <div className="w-32 h-1.5 rounded-full mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-lg md:text-xl text-theme-body max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive insurance coverage options.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {policyPages.map((policy, index) => {
              // Use CSS variable-based classes instead of hardcoded colors
              const gradientClasses = [
                'bg-gradient-modern-primary',
                'bg-gradient-modern-primary',
                'bg-gradient-modern-primary',
                'bg-gradient-modern-primary',
                'bg-gradient-modern-primary',
              ];
              const gradientClass = gradientClasses[index % gradientClasses.length];
              
              return (
                <Link
                  href={`/policies/${policy.slug}`}
                  key={policy.id}
                  className="block group w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20%-0.96rem)] max-w-xs"
                >
                  <div className="relative bg-theme-bg rounded-3xl border-2 border-transparent p-6 hover:border-primary hover:shadow-2xl transition-all duration-300 h-full text-center flex flex-col hover:-translate-y-2 overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 from-modern-primary-5 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 from-modern-primary-10 bg-gradient-to-br to-transparent rounded-bl-full"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300 ${gradientClass}`}>
                          <Shield className="w-7 h-7 text-primary-foreground" />
                        </div>
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-3 text-theme-text group-hover:text-primary transition-colors">
                        {policy.title}
                      </h3>
                      <p className="text-sm mb-6 text-theme-body flex-grow leading-relaxed">
                        {policy.content_summary}
                      </p>
                      <span
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-primary-foreground shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:gap-3 transform group-hover:scale-105 ${gradientClass}`}
                      >
                        Learn More
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
