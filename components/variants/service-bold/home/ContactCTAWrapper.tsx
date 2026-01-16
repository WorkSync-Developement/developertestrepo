import React from 'react';
import { getClientData } from '@/lib/client';
import { getWebsiteData } from '@/lib/website';
import ContactCTA from './ContactCTA';

const ContactCTAWrapper = async () => {
  const [clientData, websiteData] = await Promise.all([
    getClientData(),
    getWebsiteData(),
  ]);

  const phone = websiteData?.phone || clientData?.phone;
  const email = (clientData as { email?: string })?.email;
  const address = clientData?.address;
  const city = clientData?.city;
  const state = clientData?.state;

  return (
    <ContactCTA
      phone={phone}
      email={email}
      address={address}
      city={city}
      state={state}
    />
  );
};

export default ContactCTAWrapper;
