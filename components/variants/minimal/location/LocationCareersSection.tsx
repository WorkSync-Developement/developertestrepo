import React from 'react';
import Link from 'next/link';

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
  locationSlug,
  city,
  state,
}: LocationCareersSectionProps) {
  if (!careersSection || careersSection.show_section === false) return null;

  return (
    <section className="py-32" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-light" style={{ color: 'var(--color-text-primary)' }}>
            {careersSection.heading || 'Join Our Team'}
          </h2>
          <div className="flex justify-center">
            <div className="w-16 h-px" style={{ backgroundColor: 'var(--color-primary)' }} />
          </div>
          {careersSection.description && (
            <p className="text-lg font-light" style={{ color: 'var(--color-text-body)' }}>
              {careersSection.description}
            </p>
          )}
          <p className="text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
            {city}, {state}
          </p>
          <Link
            href={`/locations/${locationSlug}/apply`}
            className="inline-block px-12 py-4 border text-sm font-light tracking-wide transition-opacity hover:opacity-60"
            style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
          >
            {careersSection.button_text || 'Apply Now'}
          </Link>
        </div>
      </div>
    </section>
  );
}
