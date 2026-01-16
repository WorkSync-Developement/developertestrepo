import React from 'react';
import { supabase } from '@/lib/supabase';
import ServicesSection from './ServicesSection';

interface PolicyPage {
  id: string;
  title: string;
  slug: string;
  content_summary?: string;
  policy_type?: string;
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
    .limit(6);

  if (error) {
    console.error('Error fetching policies:', error);
    return [];
  }

  return data || [];
}

// Map policy titles to icon names
function getIconForPolicy(title: string): string {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('auto') || lowerTitle.includes('car') || lowerTitle.includes('vehicle')) return 'car';
  if (lowerTitle.includes('home') || lowerTitle.includes('homeowner') || lowerTitle.includes('property')) return 'home';
  if (lowerTitle.includes('business') || lowerTitle.includes('commercial')) return 'briefcase';
  if (lowerTitle.includes('life') || lowerTitle.includes('health')) return 'heart';
  if (lowerTitle.includes('umbrella')) return 'umbrella';
  return 'shield';
}

const ServicesSectionWrapper = async () => {
  const policies = await getPolicies();

  // Transform policies to service items format - only use database data
  const services = policies
    .filter(policy => policy.content_summary) // Only include policies with descriptions
    .map((policy) => ({
      id: policy.id,
      title: policy.title,
      slug: policy.slug,
      description: policy.content_summary!,
      icon: getIconForPolicy(policy.title),
      details: [], // No hardcoded details
    }));

  return <ServicesSection services={services.length > 0 ? services : undefined} />;
};

export default ServicesSectionWrapper;
