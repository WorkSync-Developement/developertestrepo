import React from 'react';
import { Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import ModernContactForm from '@/components/variants/modern/contact/ContactForm';

interface ContactPageProps {
  clientId: string;
  locationId: string;
  location: any;
  formattedPhone: string;
  smsPhone: string | null;
  smsMessage: string;
  showBusinessHours: boolean;
  businessHours: any;
  mapSrc: string;
  mapTitle: string;
}

export default function ModernContactPage({
  clientId,
  locationId,
  location,
  formattedPhone,
  smsPhone,
  smsMessage,
  showBusinessHours,
  businessHours,
  mapSrc,
  mapTitle,
}: ContactPageProps) {
  return (
    <main className="flex-grow">
      {/* Contact Page Hero */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 py-4 max-w-screen-2xl relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">Contact </span>
              <span className="text-primary">Us</span>
            </h1>
            <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-lg md:text-xl lg:text-2xl text-center max-w-3xl mx-auto text-theme-body leading-relaxed">
              We&apos;re here to answer your questions and provide the support you need
            </p>
          </div>
        </div>
      </section>

      {/* Quick Text for Quote CTA */}
      {formattedPhone && (
        <section className="py-16 relative w-full overflow-hidden bg-gradient-modern-section">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
          
          <div className="container mx-auto px-4 max-w-screen-xl text-center relative z-10">
            <div className="bg-white rounded-2xl p-8 md:p-10 max-w-2xl mx-auto shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-modern-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MessageSquare className="text-white h-8 w-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-theme-text mb-4">
                  Get a Quick Quote via Text!
                </h2>
                <div className="h-1 w-16 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
                <p className="text-theme-body text-lg mb-8 leading-relaxed">
                  For the fastest service, text us your insurance questions. We&apos;ll respond quickly with personalized quotes and answers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <a
                    href={`sms:${smsPhone || formattedPhone}?body=${encodeURIComponent(smsMessage)}`}
                    className="inline-flex items-center gap-3 font-bold py-4 px-8 rounded-full transition-all bg-gradient-modern-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                  >
                    <MessageSquare className="h-6 w-6" />
                    Text Us: {formattedPhone}
                  </a>
                  <span className="text-theme-body font-medium">Most convenient option!</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Form and Information */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ModernContactForm clientId={clientId} locationId={locationId} />

            {/* Contact Information */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-theme-text mb-2">Our Contact Information</h2>
                <div className="h-1 w-16 rounded mb-8 bg-gradient-modern-primary-secondary"></div>
                
                <div className="space-y-10">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-modern-primary flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">
                      <MapPin className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-theme-text mb-3">Office Location</h3>
                      <p className="text-theme-body text-lg">{location?.address_line_1 || ''}</p>
                      {location?.address_line_2 && (
                        <p className="text-theme-body text-lg">{location.address_line_2}</p>
                      )}
                      <p className="text-theme-body text-lg">
                        {location?.city || ''}, {location?.state || ''} {location?.zip || ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-modern-primary flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">
                      <Phone className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-theme-text mb-3">Phone Number</h3>
                      <p className="text-theme-body text-xl font-semibold">{formattedPhone || ''}</p>
                    </div>
                  </div>
                  {showBusinessHours && businessHours && (
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-modern-primary flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">
                        <Clock className="text-white h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-theme-text mb-3">Business Hours</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-lg">
                          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                            const hours = (businessHours as any)[day];
                            if (!hours) return null;
                            return (
                              <React.Fragment key={day}>
                                <p className="text-theme-body font-semibold capitalize">{day}:</p>
                                <p className="text-theme-body">
                                  {hours.closed ? 'Closed' : `${hours.open}-${hours.close}`}
                                </p>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              <span className="text-theme-text">Find Us on the </span>
              <span className="text-primary">Map</span>
            </h2>
            <div className="h-1 w-24 rounded mx-auto bg-gradient-modern-primary-secondary"></div>
          </div>
          <div className="h-[500px] bg-white rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
            {/* Updated Google Maps embed with location-specific address */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={mapTitle}
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
