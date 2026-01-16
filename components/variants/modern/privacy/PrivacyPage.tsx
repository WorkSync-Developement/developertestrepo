import React from 'react';
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

interface PrivacyPageProps {
  locationName: string;
  agencyName: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export default function ModernPrivacyPage({
  locationName,
  agencyName,
  email,
  phone,
  address,
  city,
  state,
  zip,
}: PrivacyPageProps) {
  const sections = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Information We Collect',
      content: (
        <>
          <p className="mb-4">
            {agencyName} collects information you provide directly to us, such as when you
            request a quote, fill out a contact form, or communicate with us. This may include:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              'Name and contact information (email address, phone number, mailing address)',
              'Insurance-related information necessary to provide quotes and services',
              'Any other information you choose to provide',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gradient-modern-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-theme-body">{item}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'How We Use Your Information',
      content: (
        <>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="space-y-3 mb-4">
            {[
              'Provide, maintain, and improve our insurance services',
              'Process and complete transactions and send related information',
              'Respond to your comments, questions, and requests',
              'Communicate with you about products, services, and events',
              'Comply with legal obligations and protect our rights',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gradient-modern-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-theme-body">{item}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Information Sharing',
      content: (
        <p>
          We do not sell, trade, or otherwise transfer your personal information to outside
          parties except as necessary to provide our insurance services (such as sharing with
          insurance carriers to obtain quotes), comply with the law, or protect our rights.
        </p>
      ),
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Data Security',
      content: (
        <p>
          We implement appropriate security measures to protect your personal information
          against unauthorized access, alteration, disclosure, or destruction. However, no
          method of transmission over the Internet or electronic storage is 100% secure.
        </p>
      ),
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Cookies and Tracking',
      content: (
        <p>
          Our website may use cookies and similar tracking technologies to enhance your
          experience. You can set your browser to refuse cookies, but some features of our
          site may not function properly.
        </p>
      ),
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Third-Party Links',
      content: (
        <p>
          Our website may contain links to third-party websites. We are not responsible for
          the privacy practices or content of these external sites. We encourage you to read
          the privacy policies of any third-party sites you visit.
        </p>
      ),
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Your Rights',
      content: (
        <p>
          You may request access to, correction of, or deletion of your personal information
          by contacting us. We will respond to your request within a reasonable timeframe.
        </p>
      ),
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Changes to This Policy',
      content: (
        <p>
          We may update this privacy policy from time to time. We will notify you of any
          changes by posting the new policy on this page with an updated revision date.
        </p>
      ),
    },
  ];

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 py-4 max-w-screen-2xl relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-modern-primary mb-6 shadow-xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-center">
            <span className="text-theme-text">Privacy </span>
            <span className="text-primary">Policy</span>
          </h1>
          <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
          <p className="text-theme-body text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect
            your information at <span className="font-semibold text-primary">{locationName}</span>.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
          {/* Last Updated Badge */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-modern-primary text-white shadow-lg">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-semibold">
                Last Updated:{' '}
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-gray-100 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
            
            <div className="relative z-10 space-y-12">
              {sections.map((section, idx) => (
                <div
                  key={idx}
                  className="border-b border-gray-100 last:border-0 pb-8 last:pb-0"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-modern-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white">
                        {section.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                        <span className="text-theme-text">{section.title}</span>
                      </h2>
                      <div className="h-1 w-16 rounded mb-4 bg-gradient-modern-primary-secondary"></div>
                    </div>
                  </div>
                  <div className="ml-16 text-theme-body text-lg leading-relaxed">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-gray-100 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-modern-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                    <span className="text-theme-text">Contact </span>
                    <span className="text-primary">Us</span>
                  </h2>
                  <div className="h-1 w-16 rounded mb-6 bg-gradient-modern-primary-secondary"></div>
                </div>
              </div>
              <p className="text-theme-body text-lg mb-6 ml-16">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="ml-16 bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5 rounded-xl p-6 border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-theme-text mb-1">{locationName}</p>
                      {address && <p className="text-theme-body">{address}</p>}
                      {(city || state || zip) && (
                        <p className="text-theme-body">
                          {city}
                          {city && state ? ', ' : ''}
                          {state} {zip}
                        </p>
                      )}
                    </div>
                  </div>
                  {email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-theme-body">
                          Email:{' '}
                          <Link
                            href={`mailto:${email}`}
                            className="text-primary hover:text-secondary font-semibold transition-colors"
                          >
                            {email}
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                  {phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-theme-body">
                          Phone:{' '}
                          <Link
                            href={`tel:${phone.replace(/\D/g, '')}`}
                            className="text-primary hover:text-secondary font-semibold transition-colors"
                          >
                            {phone}
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
