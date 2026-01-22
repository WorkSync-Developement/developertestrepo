import React from 'react';
import { ArrowRight } from 'lucide-react';
import ModernBlogTopics from '@/components/variants/modern/blog/BlogTopics';

interface BlogPageProps {
  topics: any[];
  basePath: string;
  locationCity: string;
  locationState: string;
  agencyName: string;
}

export default function ModernBlogPage({
  topics,
  basePath,
  locationCity,
  locationState,
  agencyName,
}: BlogPageProps) {
  return (
    <main className="flex-grow">
      {/* Blog Hero */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 py-4 max-w-screen-2xl relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-theme-text">{locationCity || ""}{locationState ? ` ${locationState},` : ""} Insurance </span>
              <span className="text-primary">Blog</span>
            </h1>
            <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
            <p className="text-theme-body text-lg md:text-xl lg:text-2xl text-center max-w-3xl mx-auto leading-relaxed">
              Insights, tips, and updates from {agencyName}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Topics */}
      <ModernBlogTopics topics={topics} basePath={basePath} />

      {/* Newsletter Signup */}
      <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
        
        <div className="container mx-auto px-4 max-w-screen-xl text-center relative z-10">
          <div className="bg-white rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl border border-gray-100 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                <span className="text-theme-text">Subscribe to Our </span>
                <span className="text-primary">Newsletter</span>
              </h2>
              <div className="h-1 w-24 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
              <p className="text-theme-body mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                Get the latest insurance tips, industry news, and special offers delivered straight to your inbox.
              </p>
              <form className="max-w-md mx-auto flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 font-bold py-3 px-6 rounded-xl transition-all bg-gradient-modern-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Subscribe
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
