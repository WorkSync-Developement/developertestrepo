import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, User, Shield, Heart } from 'lucide-react';
import { getTeamMembers } from 'lib/team';
import { getClientData } from '@/lib/client';
import { getWebsiteData } from '@/lib/website';
import { getBusinessInfo } from '@/lib/business-info';
import { getClientPrimaryLocation } from '@/lib/utils';

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
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Team Members Grid */}
        {teamMembers?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">

            {teamMembers.map((member, index) => (
              <Link 
                key={index}
                href={`${basePath}/${member.slug}`}
                className="group block h-full"
              >
                <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                  <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                    <Image 
                      src={member.imagePath || "/Images/team/placeholder.jpg"} 
                      alt={member.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={95}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          View Profile <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col bg-background">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium text-sm uppercase tracking-wider mb-4">
                      {member.position}
                    </p>
                    <p className="text-muted-foreground mb-6 flex-grow line-clamp-3 text-sm leading-relaxed">
                      {member.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-border flex items-center text-sm font-semibold text-foreground/80 group-hover:text-primary transition-colors">
                      Learn More <ArrowRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-3xl">
            <User className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-xl font-medium text-muted-foreground">No team members found currently.</p>
          </div>
        )}

        {/* Team Values Section */}
        <div className="mt-24 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Why Work With Us?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our team is dedicated to providing you with the best insurance experience possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <User className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Personal Attention</h3>
              <p className="text-muted-foreground leading-relaxed">
                We take the time to understand your unique needs and concerns, treating you like a person, not a policy number.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Expert Guidance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our experienced team provides knowledgeable advice to help you make informed decisions about your protection.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Dedicated Service</h3>
              <p className="text-muted-foreground leading-relaxed">
                We&apos;re here for you with responsive support when you need us most, advocating for you every step of the way.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 mb-8 relative overflow-hidden rounded-3xl bg-primary text-primary-foreground px-6 py-16 sm:px-12 sm:py-20 text-center shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
              Ready to Work with Our Team?
            </h3>
            <p className="text-primary-foreground/90 mb-10 text-lg leading-relaxed max-w-2xl mx-auto">
              Contact our team of dedicated insurance professionals today for personalized service and solutions tailored to your life.
            </p>
            <Link href={basePath.includes('/locations/') ? `${basePath.split('/our-team')[0]}/contact` : '/contact'}>
              <button className="bg-background text-foreground hover:bg-background/90 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Contact Us Today
              </button>
            </Link>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonSchema) }}
      />
    </>
  );
}
