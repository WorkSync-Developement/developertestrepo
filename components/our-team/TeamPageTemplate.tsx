import { ReactNode } from 'react';
import { Users } from 'lucide-react';
import { getClientData } from '@/lib/client';
import { Divider } from '@/components/ui/Divider';

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
  const heroSubheading =
    heroSection.subheading ||
    `Dedicated insurance professionals serving ${clientCity} and the surrounding area.`;
  return (
    <main className="flex-grow bg-background">
      {/* Hero Section */}
      <section className="w-full py-20 sm:py-24 relative overflow-hidden bg-background">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium bg-secondary/10 text-secondary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            <span>Our Team</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 tracking-tight">
            {heroSection.heading}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {heroSubheading}
          </p>
        </div>
      </section>

      {/* Standard Introduction for team page */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4 shadow-sm">
              <Users size={16} className="text-primary" />
              <span>Our Dedicated Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 relative">
              Experienced Insurance Professionals
              <div className="h-1 w-24 bg-accent/60 rounded mx-auto mt-3"></div>
            </h2>
            <p className="text-theme-body text-lg max-w-3xl mx-auto leading-relaxed mb-6">
              Get to know the faces behind {clientData?.agency_name || ''}. Our team of experienced
              professionals is dedicated to providing personalized insurance solutions for
              {clientCity ? ` ${clientCity}` : ''} and the surrounding area.
            </p>
          </div>
        </div>
      </div>

      {/* Team Content */}
      <div className="pb-16 bg-white">
        {children}
      </div>
    </main>
  );
}