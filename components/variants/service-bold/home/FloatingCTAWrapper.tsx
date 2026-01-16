import React from 'react';
import { getClientData } from '@/lib/client';
import { getWebsiteData } from '@/lib/website';
import FloatingCTA from './FloatingCTA';

const FloatingCTAWrapper = async () => {
  const [clientData, websiteData] = await Promise.all([
    getClientData(),
    getWebsiteData(),
  ]);

  const phone = websiteData?.phone || clientData?.phone;

  return <FloatingCTA phone={phone} />;
};

export default FloatingCTAWrapper;
