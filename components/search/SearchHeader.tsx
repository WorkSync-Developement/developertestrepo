'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SearchHeader () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchHeaderContent />
    </Suspense>
  );
}

function SearchHeaderContent () {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  return (
    <header>
      <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4 tracking-tight">
        {searchQuery ? `Search results for "${searchQuery}"` : 'Search our site'}
      </h1>
    </header>
  );
};