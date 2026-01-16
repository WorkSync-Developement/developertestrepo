import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, ArrowLeft } from 'lucide-react';

interface TeamMemberTemplateProps {
  children?: ReactNode;
  teamMember: {
    name: string;
    position: string;
    excerpt: string;
    imagePath: string;
    email?: string;
    phone?: string;
    specialties?: string[];
    hide_email_in_website?: boolean;
  };
  basePath?: string;
}

export default function ModernTeamMemberTemplate({
  children,
  teamMember,
  basePath = '/our-team',
}: TeamMemberTemplateProps) {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 py-4 max-w-screen-2xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Image */}
            <div className="w-64 h-80 relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
              <Image
                src={teamMember.imagePath || "/Images/team/placeholder.svg"}
                alt={teamMember.name}
                fill
                className="object-cover object-center"
                sizes="256px"
                quality={95}
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-modern-primary-20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Name and Position */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                <span className="text-theme-text">{teamMember.name}</span>
              </h1>
              <div className="h-1 w-24 rounded mx-auto md:mx-0 mb-6 bg-gradient-modern-primary-secondary"></div>
              <p className="text-theme-body text-xl md:text-2xl font-medium">
                {teamMember.position}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Breadcrumb */}
      <div className="bg-white pt-8 pb-4">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <Link 
            href={basePath} 
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors group"
          >
            <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Team</span>
          </Link>
        </div>
      </div>

      {/* Team Member Content */}
      <div className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-10 border border-gray-100 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
            
            <div className="relative z-10">
              {/* Bio Section */}
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  <span className="text-theme-text">About </span>
                  <span className="text-primary">{teamMember.name}</span>
                </h2>
                <div className="h-1 w-16 rounded mb-8 bg-gradient-modern-primary-secondary"></div>
                <div className="prose prose-lg max-w-none text-theme-body text-lg leading-relaxed">
                  {children}
                </div>
              </div>

              {/* Contact Information */}
              {(teamMember.email || teamMember.phone) && (
                <div className="mb-10">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                    <span className="text-theme-text">Contact </span>
                    <span className="text-primary">Information</span>
                  </h3>
                  <div className="h-1 w-16 rounded mb-6 bg-gradient-modern-primary-secondary"></div>
                  <div className="flex flex-col space-y-4">
                    {teamMember.email && (
                      <div className="flex items-center gap-4 bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5 rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-gradient-modern-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Mail size={20} className="text-white" />
                        </div>
                        <a
                          href={`mailto:${teamMember.email}`}
                          className="text-theme-body hover:text-primary transition-colors text-lg font-medium"
                        >
                          {teamMember.hide_email_in_website ? 'Email Hidden' : teamMember.email}
                        </a>
                      </div>
                    )}
                    {teamMember.phone && (
                      <div className="flex items-center gap-4 bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5 rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-gradient-modern-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Phone size={20} className="text-white" />
                        </div>
                        <a
                          href={`tel:${teamMember.phone}`}
                          className="text-theme-body hover:text-primary transition-colors text-lg font-medium"
                        >
                          {teamMember.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Specialties */}
              {teamMember.specialties && teamMember.specialties.length > 0 && (
                <div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                    <span className="text-theme-text">Areas of </span>
                    <span className="text-primary">Expertise</span>
                  </h3>
                  <div className="h-1 w-16 rounded mb-6 bg-gradient-modern-primary-secondary"></div>
                  <div className="flex flex-wrap gap-3">
                    {teamMember.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gradient-modern-primary text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5 rounded-2xl p-8 md:p-12 text-center border border-gray-100 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-10 to-transparent rounded-bl-full"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                <span className="text-theme-text">Have Questions? </span>
                <span className="text-primary">Get in Touch</span>
              </h3>
              <div className="h-1 w-24 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
              <p className="text-theme-body mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Contact {teamMember.name} directly or schedule a consultation to discuss your insurance needs.
              </p>
              <Link
                href={basePath.includes('/locations/') ? `${basePath.split('/our-team')[0]}/contact` : '/contact'}
                className="inline-flex items-center gap-2 font-bold py-4 px-8 rounded-full text-lg transition-all bg-gradient-modern-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Contact {teamMember.name.split(' ')[0]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
