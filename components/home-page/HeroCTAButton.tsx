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
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-brand text-white font-semibold shadow-lg hover:shadow-xl hover:bg-brand/90 transition-all duration-300"
        >
          Find a Location
        </button>
      ) : (
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-brand text-white font-semibold shadow-lg hover:shadow-xl hover:bg-brand/90 transition-all duration-300"
        >
          Find a Location
        </Link>
      )}
      
      <Link
        href="/contact"
        className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#d4af37] text-white font-bold shadow-lg hover:shadow-xl hover:bg-[#d4af37]/90 transition-all duration-300"
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
