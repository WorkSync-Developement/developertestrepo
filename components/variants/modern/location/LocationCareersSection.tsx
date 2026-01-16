import React from 'react';
import Link from 'next/link';
import { Briefcase, MapPin } from 'lucide-react';

interface LocationCareersSectionProps {
  careersSection: {
    heading?: string;
    description?: string;
    button_text?: string;
    show_section?: boolean;
  } | null;
  locationName: string;
  locationSlug: string;
  city: string;
  state: string;
}

export default function LocationCareersSection({
  careersSection,
  locationName,
  locationSlug,
  city,
  state,
}: LocationCareersSectionProps) {
  if (!careersSection || careersSection.show_section === false) {
    return null;
  }

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-5"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl shadow-2xl p-12 border-2 space-y-8"
            style={{
              backgroundColor: 'var(--color-background-alt)',
              borderColor: 'var(--color-accent)',
            }}
          >
            {/* Icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <Briefcase size={40} style={{ color: 'var(--color-accent-foreground)' }} />
            </div>

            {/* Heading */}
            <h2
              className="text-3xl md:text-4xl font-bold text-center"
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {careersSection.heading || 'Join Our Team'}
            </h2>

            {/* Location Info */}
            <div className="flex items-center justify-center gap-2 text-lg" style={{ color: 'var(--color-text-body)' }}>
              <MapPin size={20} style={{ color: 'var(--color-accent)' }} />
              <span>{city}, {state}</span>
            </div>

            {/* Description */}
            {careersSection.description && (
              <p
                className="text-lg md:text-xl text-center leading-relaxed max-w-2xl mx-auto"
                style={{ color: 'var(--color-text-body)' }}
              >
                {careersSection.description}
              </p>
            )}

            {/* CTA Button */}
            <div className="text-center pt-4">
              <Link
                href={`/locations/${locationSlug}/apply`}
                className="inline-block px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-lg"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-accent-foreground)',
                }}
              >
                {careersSection.button_text || 'Apply Now'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
