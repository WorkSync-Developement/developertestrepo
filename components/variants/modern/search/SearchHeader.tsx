'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ModernSearchHeader() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModernSearchHeaderContent />
    </Suspense>
  );
}

function ModernSearchHeaderContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
        <span className="text-theme-text">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Search Our '}
        </span>
        {!searchQuery && <span className="text-primary">Site</span>}
      </h1>
      {!searchQuery && (
        <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
      )}
    </header>
  );
}
