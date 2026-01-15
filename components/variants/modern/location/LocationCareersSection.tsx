import React from 'react';
import Link from 'next/link';
import { Briefcase, ArrowRight, Users, CheckCircle2 } from 'lucide-react';

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

interface CareersSection {
  heading?: string;
  description?: string;
  button_text?: string;
  show_section?: boolean;
}

interface LocationCareersSectionProps {
  careersSection: CareersSection | null;
  locationName: string;
  locationSlug: string;
  city: string;
  state: string;
}

export default function LocationCareersSection({ 
  careersSection, 
  locationName, 
  locationSlug,
  city, 
  state 
}: LocationCareersSectionProps): React.ReactElement | null {
  // Don't render if no data
  if (!careersSection) {
    return null;
  }

  const heading = careersSection.heading || `Insurance Careers in ${city}`;
  const description = careersSection.description || 'Start your career in insurance with us.';
  const buttonText = careersSection.button_text || 'Apply Now';

  return (
    <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
      
      <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge>
              Join Our Team
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="text-theme-text">{heading}</span>
          </h2>
          <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
          <p className="text-lg md:text-xl text-theme-body max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href={`/locations/${locationSlug}/apply`}
            className="block w-full max-w-md transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col h-full relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
              
              {/* Icon */}
              <div className="relative z-10 flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-modern-primary flex items-center justify-center">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h3 className="relative z-10 text-2xl font-heading font-bold mb-4 text-center text-theme-text">
                {locationName}
              </h3>
              
              <div className="relative z-10 h-1 w-16 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
              
              <div className="relative z-10 flex items-center justify-center gap-2 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <p className="text-center text-theme-body">
                  {city}, {state}
                </p>
              </div>
              
              <div className="relative z-10 text-center mt-auto">
                <span className="inline-flex items-center gap-2 font-bold py-3 px-8 rounded-full text-base transition-all bg-gradient-modern-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  {buttonText}
                  <ArrowRight size={18} />
                </span>
              </div>
              
              {/* CheckCircle badge */}
              <div className="absolute bottom-4 right-4 z-10">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
