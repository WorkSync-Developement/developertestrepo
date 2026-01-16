import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface PolicyPage {
  id: string;
  title: string;
  slug: string;
  content_summary: string;
}

interface LocationFeaturedPoliciesProps {
  locationId: string;
  locationSlug: string;
}

async function getFeaturedPolicies(locationId: string): Promise<PolicyPage[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from('client_policy_pages')
    .select('id, title, slug, content_summary')
    .eq('client_id', clientId)
    .eq('published', true)
    .limit(6);

  if (error) return [];
  return data || [];
}

export default async function LocationFeaturedPolicies({
  locationId,
  locationSlug,
}: LocationFeaturedPoliciesProps) {
  const policies = await getFeaturedPolicies(locationId);
  if (!policies || policies.length === 0) return null;

  return (
    <section className="py-32 border-t" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-text-muted)', borderWidth: '1px', opacity: 0.2 }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <p className="text-xs uppercase tracking-widest font-light" style={{ color: 'var(--color-text-muted)' }}>
              Our Services
            </p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ color: 'var(--color-text-primary)' }}>
              Insurance Policies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policies.map((policy) => (
              <Link
                key={policy.id}
                href={`/locations/${locationSlug}/policies/${policy.slug}`}
                className="p-8 border transition-opacity hover:opacity-60"
                style={{ borderColor: 'var(--color-text-muted)', borderWidth: '1px' }}
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-light" style={{ color: 'var(--color-text-primary)' }}>
                    {policy.title}
                  </h3>
                  <p className="text-sm font-light line-clamp-3" style={{ color: 'var(--color-text-body)' }}>
                    {policy.content_summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
