import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import ModernJobApplicationForm from '@/components/variants/modern/apply/JobApplicationForm';

interface ApplyPageProps {
  heroSection: {
    title: string;
    description: string;
  };
  formSection: {
    title: string;
    description: string;
  };
  formFields: any;
  formTitle: string;
  successMessage: string;
  locationId: string;
  locationName: string;
  formattedPhone: string;
  normalizedPhone: string;
  slug: string;
}

export default function ModernApplyPage({
  heroSection,
  formSection,
  formFields,
  formTitle,
  successMessage,
  locationId,
  locationName,
  formattedPhone,
  normalizedPhone,
  slug,
}: ApplyPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 py-4 max-w-screen-2xl relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">{heroSection.title}</span>
            </h1>
            <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-lg md:text-xl lg:text-2xl text-center max-w-3xl mx-auto text-theme-body leading-relaxed">
              {heroSection.description.split('\n').map((line: string, index: React.Key) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                <span className="text-theme-text">{formSection.title}</span>
              </h2>
              <div className="h-1 w-24 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
              <p className="text-lg text-theme-body leading-relaxed">{formSection.description}</p>
            </div>
            <ModernJobApplicationForm
              formFields={formFields}
              formTitle={formTitle}
              successMessage={successMessage}
              locationId={locationId}
            />
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              <span className="text-theme-text">Questions About Working With Us?</span>
            </h2>
            <div className="h-1 w-24 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-theme-body mb-8 text-lg leading-relaxed">
              We&apos;d love to hear from you! Feel free to reach out if you have any questions
              about career opportunities at {locationName}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${normalizedPhone}`}
                className="inline-flex items-center gap-2 font-bold py-4 px-8 rounded-full transition-all bg-gradient-modern-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Phone size={18} />
                Call {formattedPhone}
              </a>
              <a
                href={`/locations/${slug}/contact`}
                className="inline-flex items-center gap-2 font-bold py-4 px-8 rounded-full border-2 border-primary text-primary hover:bg-modern-primary-5 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Contact Us
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
