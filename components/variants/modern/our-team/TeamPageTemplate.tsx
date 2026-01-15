import { ReactNode } from 'react';
import { getClientData } from '@/lib/client';

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

interface TeamPageTemplateProps {
  children: ReactNode;
  heroSection: {
    heading: string;
    subheading?: string;
  };
}

export default async function TeamPageTemplate({
  children,
  heroSection,
}: TeamPageTemplateProps) {
  const clientData = await getClientData();

  // Format city: capitalize first letter, lowercase rest, handle null/undefined
  const clientCity = clientData?.city 
    ? clientData.city.charAt(0).toUpperCase() + clientData.city.slice(1).toLowerCase()
    : 'your city';

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 py-4 max-w-screen-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge>
                Our Team
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">{heroSection.heading}</span>
            </h1>
            <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            {heroSection.subheading ? (
              <p className="text-lg md:text-xl lg:text-2xl text-theme-body max-w-3xl mx-auto leading-relaxed">
                {heroSection.subheading}
              </p>
            ) : (
              <p className="text-lg md:text-xl lg:text-2xl text-theme-body max-w-3xl mx-auto leading-relaxed">
                Dedicated insurance professionals serving {clientCity} and the surrounding area.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Standard Introduction for team page */}
      <div className="py-16 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge>
                Our Dedicated Team
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">Experienced Insurance </span>
              <span className="text-primary">Professionals</span>
            </h2>
            <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-lg md:text-xl text-theme-body max-w-3xl mx-auto leading-relaxed">
              Get to know the faces behind {clientData?.agency_name || ''}. Our team of experienced
              professionals is dedicated to providing personalized insurance solutions for
              {clientCity ? ` ${clientCity}` : ''} and the surrounding area.
            </p>
          </div>
        </div>
      </div>

      {/* Team Content */}
      <div className="pb-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </main>
  );
}
