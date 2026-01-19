import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Divider } from '@/components/ui/Divider';
import { Badge } from '@/components/ui/Badge';
import type { LocationPoliciesSectionSettings } from '@/lib/types/theme';
import { DEFAULT_THEME } from '@/lib/theme/defaults';

interface CareersSection {
  heading?: string;
  description?: string;
  button_text?: string;
  show_section?: boolean;
}

interface LocationCareersSectionProps {
  careersSection: CareersSection | null;
  locationName: string;
  locationSlug: string;
  city: string;
  state: string;
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

const LocationCareersSection = async ({ 
  careersSection, 
  locationName, 
  locationSlug,
  city, 
  state 
}: LocationCareersSectionProps) => {
  // Don't render if no data
  if (!careersSection) {
    return null;
  }

  const settings = await getSectionSettings();

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

  const heading = careersSection.heading || `Insurance Careers in ${city}`;
  const description = careersSection.description || 'Start your career in insurance with us.';
  const buttonText = careersSection.button_text || 'Apply Now';

  // Create positions array for the grid layout
  const positions = [
    {
      location: locationName,
      city: city,
      icon: "👔",
    }
  ];

  return (
    <section id="careers" className="w-full py-16 sm:py-24 bg-background">
      <Divider position="top" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{heading}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {positions.map((pos, index) => (
            <Link 
              key={index} 
              href={`/locations/${locationSlug}/apply`}
              className="block group"
            >
              <div className="bg-white rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{pos.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{pos.location}</h3>
                    <p className="text-sm text-muted-foreground">{pos.city}, {state}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 flex-grow">
                  We're looking for passionate professionals to join our growing team.
                </p>
                <div className="mt-auto">
                  <span className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
                    {buttonText} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationCareersSection;
