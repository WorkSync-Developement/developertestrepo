import React from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';

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
  locationSlug
}: LocationCareersSectionProps) {
  // Don't render if no data or explicitly hidden
  if (!careersSection || careersSection.show_section === false) {
    return null;
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="bg-primary/5 rounded-3xl p-8 md:p-12 lg:p-16 text-center border border-primary/10">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-primary">
            {careersSection.heading || `Join Our Team in ${locationName}`}
          </h2>
          
          <p className="text-lg md:text-xl text-theme-body max-w-2xl mx-auto mb-10">
            {careersSection.description || "We are always looking for talented individuals to join our growing agency. Check out our current openings."}
          </p>
          
          <Link 
            href={`/locations/${locationSlug}/apply`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            {careersSection.button_text || "View Open Positions"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
