import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { isMultiLocation } from '@/lib/website';
import { Briefcase, Users, TrendingUp, Heart } from 'lucide-react';

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

export default async function CareersSection() {
  const [multiLocation, locations] = await Promise.all([
    isMultiLocation(),
    getLocations(),
  ]);

  const benefits = [
    {
      icon: Users,
      title: 'Great Team',
      description: 'Work with passionate professionals',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Opportunities for advancement',
    },
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Flexible schedules and benefits',
    },
    {
      icon: Briefcase,
      title: 'Competitive Pay',
      description: 'Industry-leading compensation',
    },
  ];

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-5"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6 animate-fade-in">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-secondary-foreground)',
            }}
          >
            Join Our Team
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Build Your Career With Us
          </h2>
          <p className="text-lg md:text-xl" style={{ color: 'var(--color-text-body)' }}>
            We're always looking for talented individuals to join our growing team
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="text-center space-y-4 animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  <Icon size={36} style={{ color: 'var(--color-accent-foreground)' }} />
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {benefit.title}
                </h3>
                <p className="text-base" style={{ color: 'var(--color-text-body)' }}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Cards */}
        {multiLocation && locations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {locations.map((location, index) => (
              <Link
                key={location.id}
                href={`/locations/${location.location_slug}/apply`}
                className="group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className="h-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 p-8 space-y-4 border-2"
                  style={{
                    backgroundColor: 'var(--color-background-alt)',
                    borderColor: 'var(--color-secondary)',
                  }}
                >
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {location.location_name}
                  </h3>
                  <p className="text-lg" style={{ color: 'var(--color-text-body)' }}>
                    {location.city}, {location.state}
                  </p>
                  <button
                    className="w-full mt-4 px-6 py-3 rounded-xl font-semibold transition-colors"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-accent-foreground)',
                    }}
                  >
                    Apply in {location.city}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center max-w-2xl mx-auto">
            <div
              className="rounded-2xl shadow-xl p-12 space-y-6 border-2"
              style={{
                backgroundColor: 'var(--color-background-alt)',
                borderColor: 'var(--color-accent)',
              }}
            >
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                <Briefcase size={48} style={{ color: 'var(--color-accent-foreground)' }} />
              </div>
              <h3
                className="text-3xl font-bold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Ready to Join Us?
              </h3>
              <p className="text-lg" style={{ color: 'var(--color-text-body)' }}>
                Explore our current openings and start your application today
              </p>
              <Link
                href="/apply"
                className="inline-block px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-accent-foreground)',
                }}
              >
                View Open Positions
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
