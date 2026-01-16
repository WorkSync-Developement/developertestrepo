import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { isMultiLocation, getAllWebsites } from '@/lib/website';
import { Car, Home, Briefcase, Heart, Shield } from 'lucide-react';

interface PolicyPage {
  id: string;
  title: string;
  slug: string;
  content_summary?: string;
  policy_type?: string;
}

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
}

async function getPolicies(): Promise<PolicyPage[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from('client_policy_pages')
    .select('id, title, slug, content_summary, policy_type')
    .eq('client_id', clientId)
    .eq('published', true)
    .order('created_at', { ascending: true })
    .limit(4);

  if (error) {
    console.error('Error fetching policies:', error);
    return [];
  }

  return data || [];
}

// Icon and color mapping for insurance types
const insuranceConfig: Record<string, { icon: React.ElementType; bgColor: string; iconBg: string }> = {
  auto: { icon: Car, bgColor: '#1e3a5f', iconBg: '#d4a853' },
  car: { icon: Car, bgColor: '#1e3a5f', iconBg: '#d4a853' },
  vehicle: { icon: Car, bgColor: '#1e3a5f', iconBg: '#d4a853' },
  home: { icon: Home, bgColor: '#d4a853', iconBg: '#1e3a5f' },
  homeowner: { icon: Home, bgColor: '#d4a853', iconBg: '#1e3a5f' },
  property: { icon: Home, bgColor: '#d4a853', iconBg: '#1e3a5f' },
  business: { icon: Briefcase, bgColor: '#5a8f9a', iconBg: '#1e3a5f' },
  commercial: { icon: Briefcase, bgColor: '#5a8f9a', iconBg: '#1e3a5f' },
  life: { icon: Heart, bgColor: '#7a9e7e', iconBg: '#1e3a5f' },
  health: { icon: Heart, bgColor: '#7a9e7e', iconBg: '#1e3a5f' },
};

function getInsuranceConfig(title: string) {
  const lowerTitle = title.toLowerCase();
  for (const [key, config] of Object.entries(insuranceConfig)) {
    if (lowerTitle.includes(key)) return config;
  }
  return { icon: Shield, bgColor: '#1e3a5f', iconBg: '#d4a853' };
}

const LocationPoliciesSection = async () => {
  const [multiLocation, locations, policies] = await Promise.all([
    isMultiLocation(),
    getAllWebsites(),
    getPolicies(),
  ]);

  if (multiLocation && locations && locations.length > 0) {
    return <LocationsGrid locations={locations} />;
  }

  if (!policies || policies.length === 0) {
    return null;
  }

  return <PoliciesCards policies={policies} />;
};

function LocationsGrid({ locations }: { locations: Location[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1e3a5f' }}>
            Our Locations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <Link
              key={location.id}
              href={`/locations/${location.location_slug}`}
              className="block p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 text-center"
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
                {location.location_name}
              </h3>
              <p className="text-sm" style={{ color: '#5a6a7a' }}>
                {location.city}, {location.state}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PoliciesCards({ policies }: { policies: PolicyPage[] }) {
  // Ensure we have exactly 4 cards for the layout
  const displayPolicies = policies.slice(0, 4);
  
  // Fallback cards if we don't have enough policies
  const fallbackCards = [
    { title: 'Auto Insurance', summary: 'Coverage that keeps you and your vehicle protected', slug: 'auto' },
    { title: 'Home Insurance', summary: 'Safeguard your most valuable asset and everything in it', slug: 'home' },
    { title: 'Business Insurance', summary: 'Customized plans to protect your business and employees', slug: 'business' },
    { title: 'Life Insurance', summary: "Ensure your family's future is secure", slug: 'life' },
  ];

  const cards = displayPolicies.length >= 4 
    ? displayPolicies 
    : fallbackCards.map((fb, idx) => displayPolicies[idx] || { 
        id: fb.slug, 
        title: fb.title, 
        slug: fb.slug, 
        content_summary: fb.summary,
        policy_type: 'Personal Insurance'
      });

  return (
    <section className="py-8 relative" style={{ backgroundColor: '#f8f6f3' }}>
      {/* Curved top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 60V30C240 50 480 60 720 60C960 60 1200 50 1440 30V60H0Z" fill="#f8f6f3"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 -mt-20 relative z-10">
          {cards.map((policy, idx) => {
            const config = getInsuranceConfig(policy.title);
            const Icon = config.icon;
            const policyTypeSlug = policy.policy_type
              ? policy.policy_type.toLowerCase().replace(/\s+/g, '-')
              : 'personal-insurance';

            return (
              <Link
                key={policy.id || idx}
                href={`/policies/${policyTypeSlug}/${policy.slug}`}
                className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Icon Header */}
                <div 
                  className="py-6 flex justify-center"
                  style={{ backgroundColor: config.bgColor }}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: config.iconBg }}
                  >
                    <Icon size={32} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#1e3a5f' }}>
                    {policy.title.replace(' Insurance', '').replace(' insurance', '')} Insurance
                  </h3>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: '#5a6a7a' }}>
                    {policy.content_summary || 'Comprehensive coverage tailored to your needs.'}
                  </p>
                  <span 
                    className="text-sm font-semibold inline-flex items-center gap-1 transition-colors duration-200"
                    style={{ color: '#d4a853' }}
                  >
                    Learn More →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LocationPoliciesSection;
