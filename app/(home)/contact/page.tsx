import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import HomeCTA from '@/components/variants/professional/home/HomeCTA';
import { getClientData } from '@/lib/client';
import { getClientPrimaryLocation } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our team for any questions or support.',
};

export default async function ContactPage() {
  const clientData = await getClientData();
  const primaryLocation = await getClientPrimaryLocation();
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  
  if (!clientData || !primaryLocation || !clientId) {
    return null; 
  }

  return (
    <div className="contact-page pt-8">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
             <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-primary">Contact Us</h1>
             <p className="text-xl text-theme-body max-w-2xl mx-auto">
               We're here to help. Send us a message and we'll reply as soon as possible.
             </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <ContactForm 
              clientId={clientId} 
              locationId={primaryLocation.id}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
