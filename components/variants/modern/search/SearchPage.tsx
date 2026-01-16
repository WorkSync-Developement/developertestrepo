import React, { Suspense } from 'react';
import ModernSearchBar from '@/components/variants/modern/search/SearchBar';
import ModernSearchHeader from '@/components/variants/modern/search/SearchHeader';
import ModernSearchResults from '@/components/variants/modern/search/SearchResults';

export default function ModernSearchPage() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 py-4 max-w-screen-lg relative z-10">
          <ModernSearchHeader />
          <div className="max-w-2xl mx-auto">
            <ModernSearchBar variant="fullwidth" placeholder="Search for insurance information, policies, etc..." />
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 max-w-screen-lg relative z-10">
          <Suspense fallback={
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
              <p className="text-theme-body text-lg">Loading search results...</p>
            </div>
          }>
            <ModernSearchResults />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
