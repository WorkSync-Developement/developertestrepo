'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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

  return (
    <>
      {isMultiLocation ? (
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
        >
          Find a Location
        </button>
      ) : (
        <Link
          href="/contact"
          className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
        >
          Find a Location
        </Link>
      )}
      
      <Link
        href="/contact"
        className="px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition"
      >
        Get a Quote
      </Link>

      {isMultiLocation && (
        <LocationPickerPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          locations={locations}
        />
      )}
    </>
  );
};

export default HeroCTAButton;
