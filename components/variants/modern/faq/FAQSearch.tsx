'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

export default function FAQSearch({ items }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ categoryId: string, faqIndex: number, question: string }>>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const results: Array<{ categoryId: string, faqIndex: number, question: string }> = [];

    items.forEach(category => {
      category.faqs.forEach((faq, index) => {
        if (
          faq.question.toLowerCase().includes(term) ||
          faq.answer.toLowerCase().includes(term)
        ) {
          results.push({
            categoryId: category.id,
            faqIndex: index,
            question: faq.question
          });
        }
      });
    });

    setSearchResults(results);
  };

  return (
    <section className="py-12 relative w-full overflow-hidden bg-gradient-modern-section">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
      
      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full py-4 px-5 pl-14 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white shadow-lg"
          />
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
            <Search className="text-primary" size={20} />
          </div>
        </div>

        {/* Search results */}
        {searchResults.length > 0 && (
          <div className="mt-4 bg-white p-6 rounded-xl shadow-xl border-2 border-gray-100 animate-fade-in">
            <h3 className="font-bold text-theme-text mb-3 text-lg">Search Results:</h3>
            <ul className="divide-y divide-gray-200">
              {searchResults.map((result, idx) => (
                <li key={idx} className="py-3">
                  <button
                    onClick={() => {
                      document.getElementById(result.categoryId)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-left w-full text-primary hover:text-secondary transition-colors font-medium"
                  >
                    {result.question}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
