import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Divider } from '@/components/ui/Divider';
import { Badge } from '@/components/ui/Badge';
import { isMultiLocation } from '@/lib/website';
import type { LocationPoliciesSectionSettings } from '@/lib/types/theme';
import { DEFAULT_THEME } from '@/lib/theme/defaults';

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

async function getSectionSettings(): Promise<LocationPoliciesSectionSettings> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return DEFAULT_THEME.location_policies_section_settings!;

  const { data, error } = await supabase
    .from('client_theme_settings')
    .select('location_policies_section_settings')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error || !data?.location_policies_section_settings) {
    return DEFAULT_THEME.location_policies_section_settings!;
  }

  return data.location_policies_section_settings;
}

const LocationPoliciesSection = async () => {
  const [multiLocation, settings] = await Promise.all([
    isMultiLocation(),
    getSectionSettings()
  ]);

  // Build inline styles from settings (null = use CSS variable defaults)
  const sectionStyle = {
    backgroundColor: settings.section_bg_color || 'var(--loc-section-bg)',
  };
  const badgeStyle = {
    backgroundColor: settings.badge_bg_color || 'var(--loc-badge-bg)',
    color: settings.badge_text_color || 'var(--loc-badge-text)',
  };
  const headingStyle = {
    color: settings.heading_color || 'var(--loc-heading)',
  };
  const subheadingStyle = {
    color: settings.subheading_color || 'var(--loc-subheading)',
  };
  const cardStyle = {
    backgroundColor: settings.card_bg_color || 'var(--loc-card-bg)',
    borderColor: settings.card_border_color || 'var(--loc-card-border)',
  };
  const cardHeadingStyle = {
    color: settings.card_heading_color || 'var(--loc-card-heading)',
  };
  const cardBodyStyle = {
    color: settings.card_body_color || 'var(--loc-card-body)',
  };
  const accentLineStyle = {
    backgroundColor: settings.accent_line_color || 'var(--loc-accent-line)',
  };
  const buttonStyle = {
    backgroundColor: settings.button_bg_color || 'var(--loc-button-bg)',
    color: settings.button_text_color || 'var(--loc-button-text)',
  };
  const linkStyle = {
    color: settings.link_color || 'var(--loc-link)',
  };

  if (multiLocation) {
    // Multi-location: Show location cards
    const locations = await getLocations();
    
    if (locations.length === 0) return null;

    const locationCount = locations.length;
    const lgGridCols =
      locationCount === 1
        ? 'lg:grid-cols-1'
        : locationCount === 2
          ? 'lg:grid-cols-2'
          : locationCount === 5
            ? 'lg:grid-cols-4'
            : 'lg:grid-cols-3';

    const gridContainerWidth = locationCount === 2 ? 'max-w-4xl mx-auto' : '';

    return (
      <section className="py-16 sm:py-24 bg-background">
        <Divider position="top" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Find Coverage Near You
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore insurance policies available at each of our locations.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 ${lgGridCols} gap-8 justify-items-center ${gridContainerWidth}`}>
            {locations.map((location, idx) => (
              <Link 
                href={`/locations/${location.location_slug}/policies`} 
                key={location.id}
                className="block w-full max-w-md group"
              >
                <div 
                  className="bg-white rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full animate-fade-in-up"
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                    opacity: 0,
                    animationFillMode: 'forwards',
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{location.location_name}</h3>
                      <p className="text-sm text-muted-foreground">{location.city}, {location.state}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <span className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-white border border-primary text-primary font-medium hover:bg-primary/5 transition">
                      View Policies →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
        </div>
      </section>
    );
  } else {
    // Single-location: Show policy cards
    const policyPages = await getPolicyPages();
    
    if (policyPages.length === 0) return null;

    return (
      <section className="py-20 md:py-28 relative overflow-hidden" style={sectionStyle}>
        <Divider position="top" />
        
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        
        <div className="container mx-auto px-6 max-w-screen-xl relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            {/* Premium Badge */}
            <div className="inline-flex mb-6">
              <Badge className="text-base font-bold px-6 py-3 shadow-lg" style={{
                ...badgeStyle,
                boxShadow: 'var(--shadow-lg)',
                border: '2px solid rgba(46, 38, 11, 0.3)',
              }}>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Our Services
                </span>
              </Badge>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 relative px-4" style={{
              ...headingStyle,
              lineHeight: '1.2',
            }}>
              Insurance Solutions For You
              
              {/* Decorative Underline */}
              <div className="flex justify-center mt-6">
                <div className="h-1.5 w-32 rounded-full" style={{
                  background: 'linear-gradient(90deg, transparent 0%, var(--color-accent) 50%, transparent 100%)',
                }}></div>
              </div>
            </h2>
            
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed" style={{
              ...subheadingStyle,
              fontWeight: '500',
            }}>
              Explore our comprehensive insurance coverage options designed to protect what matters most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 mb-16">
            {policyPages.map((policy, idx) => (
              <Link 
                href={`/policies/${policy.slug}`} 
                key={policy.id}
                className="block group"
              >
                <div 
                  className="relative rounded-2xl border-2 p-8 transition-all duration-500 flex flex-col h-full cursor-pointer overflow-hidden animate-fade-in-up"
                  style={{
                    ...cardStyle,
                    boxShadow: 'var(--shadow-lg)',
                    minHeight: '280px',
                    animationDelay: `${idx * 0.05}s`,
                    opacity: 0,
                    animationFillMode: 'forwards',
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-accent-soft) 0%, transparent 100%)',
                    }}
                  />
                  
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{
                      background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)',
                    }}
                  />
                  
                  {/* Icon Container */}
                  <div className="relative z-10 flex justify-center mb-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-accent-soft) 0%, rgba(212, 175, 55, 0.15) 100%)',
                        boxShadow: 'var(--shadow-sm)',
                      }}>
                      <svg className="w-7 h-7" style={{ color: 'var(--color-accent)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="relative z-10 text-xl font-heading font-bold mb-3 text-center transition-colors duration-300" style={cardHeadingStyle}>
                    {policy.title}
                  </h3>
                  
                  <div className="relative z-10 flex justify-center mb-4">
                    <div className="h-1 w-16 rounded-full transition-all duration-500 group-hover:w-24" style={{
                      background: 'linear-gradient(90deg, var(--color-accent) 0%, transparent 100%)',
                    }}></div>
                  </div>
                  
                  <p className="relative z-10 text-sm mb-4 text-center flex-grow leading-relaxed" style={cardBodyStyle}>
                    {policy.content_summary}
                  </p>
                  
                  <div className="relative z-10 text-center mt-auto">
                    <span className="inline-flex items-center gap-2 font-bold text-sm transition-all duration-300 group-hover:gap-3" style={linkStyle}>
                      Learn More
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* CTA Button - Premium Design */}
          <div className="text-center">
            <Link 
              href="/policies" 
              className="inline-flex items-center gap-3 font-bold py-5 px-10 rounded-full text-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group"
              style={{
                ...buttonStyle,
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              View All Policies
              <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }
};

export default LocationPoliciesSection;
