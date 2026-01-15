import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, CheckCircle2, Heart, Shield } from 'lucide-react';
import { getTeamMembers } from 'lib/team';
import { getClientData } from '@/lib/client';
import { getWebsiteData } from '@/lib/website';
import { getBusinessInfo } from '@/lib/business-info';
import { getClientPrimaryLocation } from '@/lib/utils';

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

interface TeamMembersProps {
  locationId?: string | null;
  basePath?: string;
}

export default async function TeamMembers({ locationId, basePath = '/our-team' }: TeamMembersProps = {} as TeamMembersProps) {
  // If no locationId provided, use primary location
  const resolvedLocationId = locationId ?? (await getClientPrimaryLocation())?.id;
  const [teamMembers, clientData, websiteData, businessInfo] = await Promise.all([
    getTeamMembers(resolvedLocationId),
    getClientData(),
    getWebsiteData(),
    getBusinessInfo(),
  ]);

  const canonicalUrl = clientData?.client_website?.canonical_url || '';
  const pageUrl = canonicalUrl ? `${canonicalUrl}${basePath}` : basePath;
  const agencyName = clientData?.agency_name || 'Our Team';
  const location = websiteData?.client_locations;

  const ldJsonSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `${agencyName} Team`,
    description: businessInfo.about_short || `Meet the dedicated insurance professionals at ${agencyName}.`,
    url: pageUrl,
    mainEntity: {
      '@type': 'ProfessionalService',
      name: agencyName,
      url: canonicalUrl || '',
      address: {
        '@type': 'PostalAddress',
        streetAddress: location?.address_line_1 || clientData?.address || '',
        addressLocality: location?.city || clientData?.city || '',
        addressRegion: location?.state || clientData?.state || '',
        postalCode: location?.zip || clientData?.zip || '',
        addressCountry: 'US',
      },
    },
  };

  return (
    <>
      <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
        {/* Team Members Grid */}
        {teamMembers?.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <Link 
                key={index}
                href={`${basePath}/${member.slug}`}
                className="group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-sm transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
                  
                  {/* Image */}
                  <div className="relative w-full h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-modern-primary-5 to-transparent z-10"></div>
                    <Image 
                      src={member.imagePath || "/Images/team/placeholder.jpg"} 
                      alt={member.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={95}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col relative z-10">
                    <h3 className="text-xl font-heading font-bold text-theme-text mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold mb-4">
                      {member.position}
                    </p>
                    <div className="h-1 w-12 rounded mb-4 bg-gradient-modern-primary-secondary"></div>
                    <p className="text-theme-body mb-6 flex-grow line-clamp-3 leading-relaxed">
                      {member.excerpt}
                    </p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center gap-2 font-medium text-primary group-hover:gap-3 transition-all">
                        Learn More
                        <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                  
                  {/* CheckCircle badge */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-theme-body text-lg">No team members found</p>
          </div>
        )}

        {/* Team Values Section */}
        <div className="mt-16 mb-12 bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-6">
                <Badge>
                  Our Commitment
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                <span className="text-theme-text">Our Commitment </span>
                <span className="text-primary">To You</span>
              </h2>
              <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 rounded-full bg-gradient-modern-primary flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-theme-text mb-3">Personal Attention</h3>
                <p className="text-theme-body leading-relaxed">We take the time to understand your unique needs and concerns.</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 rounded-full bg-gradient-modern-primary flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-theme-text mb-3">Expert Guidance</h3>
                <p className="text-theme-body leading-relaxed">Our experienced team provides knowledgeable advice for informed decisions.</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 rounded-full bg-gradient-modern-primary flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-theme-text mb-3">Dedicated Service</h3>
                <p className="text-theme-body leading-relaxed">We&apos;re here for you with responsive support when you need us most.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-modern-cta rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-white"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-white"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Work with Our Team?
            </h3>
            <div className="h-1 w-24 rounded mx-auto mb-6 bg-white/30"></div>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Contact our team of dedicated insurance professionals today for personalized service and solutions.
            </p>
            <Link href={basePath.includes('/locations/') ? `${basePath.split('/our-team')[0]}/contact` : '/contact'}>
              <span className="inline-flex items-center gap-2 font-bold py-4 px-10 rounded-full text-base transition-all bg-white text-primary hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Contact Us Today
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonSchema) }}
      />
    </>
  );
}
