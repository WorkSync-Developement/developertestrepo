'use client';

import { Search, HomeIcon, User, Shield, FileText, FileQuestion, Mail, Tag, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ModernSearchResults() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Simulate search API call with setTimeout
    const timeoutId = setTimeout(() => {
      // Initialize empty results since mock data is removed
      const filteredResults: any[] = [];
      setResults(filteredResults);
      setIsLoading(false);
    }, 500); // Simulate a short delay

    return () => clearTimeout(timeoutId);
  }, [query]);

  if (isLoading) {
    return (
      <div className="my-12 text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
        <p className="text-theme-body text-lg">Searching...</p>
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <div className="my-12 py-20">
        <div className="bg-white rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl border border-gray-100 relative overflow-hidden">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
          
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-modern-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              <span className="text-theme-text">No results </span>
              <span className="text-primary">found</span>
            </h2>
            <div className="h-1 w-16 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-theme-body mb-8 text-lg leading-relaxed">
              We couldn&apos;t find any content matching your search for &ldquo;<span className="font-semibold text-primary">{query}</span>&rdquo;.
            </p>
            <div className="bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5 rounded-xl p-6 border border-gray-100 text-left max-w-md mx-auto">
              <p className="font-semibold text-theme-text mb-4 text-lg">Suggestions:</p>
              <ul className="space-y-3">
                {['Check your spelling', 'Try more general keywords', 'Try different keywords', 'Browse our site using the navigation menu'].map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-modern-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-theme-body">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'home':
        return <HomeIcon className="h-5 w-5" />;
      case 'about':
        return <User className="h-5 w-5" />;
      case 'policies':
        return <Shield className="h-5 w-5" />;
      case 'blog':
        return <FileText className="h-5 w-5" />;
      case 'faq':
        return <FileQuestion className="h-5 w-5" />;
      case 'contact':
        return <Mail className="h-5 w-5" />;
      case 'agents':
        return <User className="h-5 w-5" />;
      default:
        return <Tag className="h-5 w-5" />;
    }
  };

  return (
    <div className="my-12">
      {results.length > 0 && (
        <div className="text-center mb-10">
          <p className="text-theme-body text-lg mb-2">
            Found <span className="font-bold text-primary">{results.length}</span> result{results.length !== 1 ? 's' : ''} for &ldquo;<span className="font-semibold">{query}</span>&rdquo;
          </p>
          <div className="h-1 w-16 rounded mx-auto bg-gradient-modern-primary-secondary"></div>
        </div>
      )}

      <div className="space-y-6">
        {results.map((result: any) => (
          <Link
            key={result.id}
            href={result.url}
            className="block group"
          >
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-modern-primary flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white">
                      {getCategoryIcon(result.category)}
                    </span>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-gradient-modern-primary text-white text-sm font-semibold">
                    {result.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                  {result.title}
                </h2>
                <div className="h-1 w-12 rounded mb-4 bg-gradient-modern-primary-secondary"></div>
                <p className="text-theme-body mb-6 text-lg leading-relaxed">{result.excerpt}</p>
                <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  <span>View {result.type === 'blog' ? 'Article' : 'Page'}</span>
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
