'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LocationPickerPopup from '@/components/ui/LocationPickerPopup';

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
}

interface HeroCTAButtonProps {
  isMultiLocation: boolean;
  locations: Location[];
}

const HeroCTAButton: React.FC<HeroCTAButtonProps> = ({
  isMultiLocation,
  locations
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (!isMultiLocation) {
    return (
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Contact Us
        <ArrowRight size={18} />
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Find a Location
        <ArrowRight size={18} />
      </button>

      <LocationPickerPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        locations={locations}
      />
    </>
  );
};

export default HeroCTAButton;
