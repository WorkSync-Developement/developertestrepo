import React from 'react';
import { getClientData } from '@/lib/client';
import { getWebsiteData } from '@/lib/website';
import StickyHeaderCTA from './StickyHeaderCTA';

const StickyHeaderCTAWrapper = async () => {
  const [clientData, websiteData] = await Promise.all([
    getClientData(),
    getWebsiteData(),
  ]);

  const phone = websiteData?.phone || clientData?.phone;

  return <StickyHeaderCTA phone={phone} />;
};

export default StickyHeaderCTAWrapper;
