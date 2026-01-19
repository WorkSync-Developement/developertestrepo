import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Divider } from '@/components/ui/Divider';
import { isMultiLocation } from '@/lib/website';
import { Briefcase, Users, TrendingUp, ArrowRight } from 'lucide-react';

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

const CareersSection = async () => {
  const [multiLocation, locations] = await Promise.all([
    isMultiLocation(),
    getLocations()
  ]);

  const benefits = [
    {
      icon: Users,
      title: 'Great Team',
      description: 'Work alongside dedicated professionals'
    },
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      description: 'Advance your career with ongoing training'
    },
    {
      icon: Briefcase,
      title: 'Competitive Benefits',
      description: 'Comprehensive compensation packages'
    }
  ];

  // Build dynamic heading with city names
  const cityNames = locations.map(loc => loc.city);
  const headingText = multiLocation && cityNames.length > 0
    ? `Insurance Careers in ${cityNames.slice(0, 3).join(', ')}${cityNames.length > 3 ? ' & More' : ''}`
    : 'Join Our Team';

  return (
    <section
      className="py-20 lg:py-28 relative"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Divider position="top" />

      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Briefcase size={20} style={{ color: 'var(--color-accent)' }} />
            <span
              className="text-sm uppercase tracking-wider font-semibold"
              style={{ color: 'var(--color-accent)' }}
            >
              Careers
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {headingText}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Start your career in insurance with a team that values growth, integrity, and client success.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="rounded-xl p-6 md:p-8 text-center border transition-all duration-200 hover:-translate-y-2 hover:shadow-lg"
                style={{ 
                  backgroundColor: 'var(--color-background)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  <Icon size={28} style={{ color: 'var(--color-accent-foreground)' }} />
                </div>
                <h3
                  className="text-lg font-heading font-semibold mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {multiLocation && locations.length > 0 ? (
          // Multi-location: Show location links
          <div className="text-center">
            <p
              className="text-lg mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We&apos;re hiring at the following locations:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {locations.map((location) => (
                <Link
                  key={location.id}
                  href={`/locations/${location.location_slug}/apply`}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-full border font-semibold transition-all hover:-translate-y-1 hover:shadow-md"
                  style={{
                    borderColor: 'var(--color-accent)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {location.city}, {location.state}
                  <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // Single-location: Show single apply button
          <div className="text-center">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 py-4 px-8 rounded-full font-semibold transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-accent-foreground)',
              }}
            >
              View Open Positions
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CareersSection;
