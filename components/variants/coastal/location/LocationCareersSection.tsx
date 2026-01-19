import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Divider } from '@/components/ui/Divider';
import { Badge } from '@/components/ui/Badge';
import { Briefcase, MapPin, ArrowRight } from 'lucide-react';

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

const LocationCareersSection = async ({
  careersSection,
  locationName,
  locationSlug,
  city,
  state,
}: LocationCareersSectionProps) => {
  // Don't render if no data or section is hidden
  if (!careersSection || careersSection.show_section === false) {
    return null;
  }

  const heading = careersSection.heading || `Insurance Careers in ${city}`;
  const description =
    careersSection.description ||
    'Join our team and build a rewarding career in the insurance industry.';
  const buttonText = careersSection.button_text || 'Apply Now';

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: 'var(--loc-section-bg, var(--color-background))' }}
    >
      <Divider position="top" />

      {/* Background Gradient */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-primary) 10%, transparent), transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            className="mb-4 inline-flex items-center gap-2"
            style={{
              backgroundColor: 'var(--loc-badge-bg, var(--color-secondary))',
              color: 'var(--loc-badge-text, var(--color-secondary-foreground))',
            }}
          >
            <Briefcase size={14} />
            Join Our Team
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            style={{ color: 'var(--loc-heading, var(--color-primary))' }}
          >
            {heading}
          </h2>
          <div
            className="h-1 w-24 rounded mx-auto mb-6"
            style={{ backgroundColor: 'var(--loc-accent-line, var(--color-accent))' }}
          />
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--loc-subheading, var(--color-text-secondary))' }}
          >
            {description}
          </p>
        </div>

        {/* Career Card */}
        <div className="flex justify-center">
          <Link
            href={`/locations/${locationSlug}/apply`}
            className="block w-full max-w-lg group"
          >
            <div
              className="rounded-2xl shadow-lg p-8 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border"
              style={{
                backgroundColor: 'var(--loc-card-bg, var(--color-background))',
                borderColor: 'var(--loc-card-border, var(--color-border))',
              }}
            >
              {/* Location Icon */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                }}
              >
                <MapPin size={28} className="text-white" />
              </div>

              <h3
                className="text-2xl font-heading font-bold mb-2 text-center"
                style={{ color: 'var(--loc-card-heading, var(--color-primary))' }}
              >
                {locationName}
              </h3>

              <p
                className="text-center mb-6"
                style={{ color: 'var(--loc-card-body, var(--color-text-secondary))' }}
              >
                {city}, {state}
              </p>

              <div
                className="h-px w-16 mx-auto mb-6"
                style={{
                  backgroundColor:
                    'color-mix(in srgb, var(--loc-accent-line, var(--color-accent)) 30%, transparent)',
                }}
              />

              {/* Benefits List */}
              <ul className="space-y-3 mb-8">
                {['Competitive Salary', 'Growth Opportunities', 'Team Culture'].map(
                  (benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: 'var(--loc-card-body, var(--color-text-secondary))' }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                        style={{
                          backgroundColor:
                            'color-mix(in srgb, var(--color-accent) 20%, transparent)',
                          color: 'var(--color-accent)',
                        }}
                      >
                        ✓
                      </span>
                      {benefit}
                    </li>
                  )
                )}
              </ul>

              {/* CTA Button */}
              <div className="text-center">
                <span
                  className="inline-flex items-center gap-2 font-bold py-3 px-8 rounded-full text-base transition-all duration-300 shadow-md group-hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--loc-button-bg, var(--color-accent))',
                    color: 'var(--loc-button-text, var(--color-accent-foreground))',
                  }}
                >
                  {buttonText}
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationCareersSection;
