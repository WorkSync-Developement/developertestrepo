import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Local Badge component for modern variant
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

function Badge({ children, className = '' }: BadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium bg-secondary text-secondary-foreground ${className}`}>
      {children}
    </div>
  );
}

interface PoliciesSection {
  heading?: string;
  subheading?: string;
  featured_policy_ids?: string[];
  show_section?: boolean;
}

interface PolicyPage {
  id: string;
  title: string;
  slug: string;
  icon_url: string | null;
  content_summary: string;
}

interface LocationFeaturedPoliciesProps {
  locationId: string;
  locationSlug: string;
}

// Default policy slugs to show if none selected
const DEFAULT_POLICY_SLUGS = ['home', 'auto', 'condo', 'boat'];

async function getPoliciesSection(locationId: string): Promise<PoliciesSection | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId || !locationId) return null;

  const { data, error } = await supabase
    .from('client_location_page')
    .select('policies_section')
    .eq('client_id', clientId)
    .eq('location_id', locationId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching policies section:', error);
    return null;
  }

  return data?.policies_section || null;
}

async function getFeaturedPolicies(
  locationId: string,
  featuredIds: string[] | undefined
): Promise<PolicyPage[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId || !locationId) return [];

  // If specific policies are selected, fetch those
  if (featuredIds && featuredIds.length > 0) {
    const { data, error } = await supabase
      .from('client_policy_pages')
      .select('id, title, slug, icon_url, content_summary')
      .eq('client_id', clientId)
      .eq('location_id', locationId)
      .in('id', featuredIds)
      .eq('published', true);

    if (error) {
      console.error('Error fetching featured policies:', error);
      return [];
    }

    // Sort by the order in featuredIds
    const sortedData = featuredIds
      .map((id) => data?.find((p) => p.id === id))
      .filter((p): p is PolicyPage => p !== undefined);

    return sortedData;
  }

  // Fallback: fetch policies matching default slugs
  const { data, error } = await supabase
    .from('client_policy_pages')
    .select('id, title, slug, icon_url, content_summary')
    .eq('client_id', clientId)
    .eq('location_id', locationId)
    .eq('published', true);

  if (error) {
    console.error('Error fetching default policies:', error);
    return [];
  }

  // Filter to default slugs and limit to 4
  const defaultPolicies = (data || [])
    .filter((p) =>
      DEFAULT_POLICY_SLUGS.some((defaultSlug) =>
        p.slug.toLowerCase().includes(defaultSlug)
      )
    )
    .slice(0, 4);

  // If no defaults found, return first 4 policies
  if (defaultPolicies.length === 0) {
    return (data || []).slice(0, 4);
  }

  return defaultPolicies;
}

export default async function LocationFeaturedPolicies({
  locationId,
  locationSlug,
}: LocationFeaturedPoliciesProps): Promise<React.ReactElement | null> {
  const policiesSection = await getPoliciesSection(locationId);

  // Don't render if section is explicitly hidden
  if (policiesSection?.show_section === false) {
    return null;
  }

  const policies = await getFeaturedPolicies(locationId, policiesSection?.featured_policy_ids);

  // Don't render if no policies
  if (policies.length === 0) {
    return null;
  }

  const heading = policiesSection?.heading || 'Featured Insurance Policies';
  const subheading =
    policiesSection?.subheading ||
    'Explore coverage options available at this location';

  return (
    <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
      
      <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge>
              Insurance Coverage
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="text-theme-text">{heading.split(' ')[0]}</span>
            {heading.split(' ').slice(1).map((word, idx) => (
              <span key={idx} className={idx === 0 ? ' text-primary' : ''}> {word}</span>
            ))}
          </h2>
          <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
          <p className="text-lg md:text-xl text-theme-body max-w-3xl mx-auto leading-relaxed">
            {subheading}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {policies.map((policy) => {
            const policyUrl = `/locations/${locationSlug}/policies/${policy.slug}`;

            return (
              <Link
                key={policy.id}
                href={policyUrl}
                className="group w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20%-0.96rem)] max-w-xs transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
                  
                  {/* Icon */}
                  {policy.icon_url ? (
                    <div className="relative z-10 flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-modern-primary flex items-center justify-center">
                        <img src={policy.icon_url} alt="" className="h-8 w-8" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-modern-primary flex items-center justify-center">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className="relative z-10 min-h-[3.5rem] flex items-center justify-center mb-4">
                    <h3 className="text-lg font-heading font-bold text-center text-theme-text">
                      {policy.title}
                    </h3>
                  </div>
                  
                  <div className="relative z-10 h-1 w-12 rounded mx-auto mb-4 bg-gradient-modern-primary-secondary"></div>
                  
                  <p className="relative z-10 text-sm mb-4 text-center text-theme-body flex-grow">
                    {policy.content_summary}
                  </p>
                  
                  <div className="relative z-10 text-center mt-auto">
                    <span className="group-hover:gap-3 inline-flex items-center gap-2 font-medium text-primary transition-all">
                      Learn More
                      <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  
                  {/* CheckCircle badge */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/locations/${locationSlug}/policies`}
            className="inline-flex items-center gap-2 font-bold rounded-full py-3 px-8 transition-all bg-gradient-modern-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View All Policies
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
