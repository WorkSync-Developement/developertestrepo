'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchBarProps {
  variant?: 'header' | 'fullwidth';
  placeholder?: string;
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  variant = 'header', 
  placeholder = 'Search the site...', 
  onClose 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      if (onClose) onClose();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
      inputRef.current?.blur();
      if (onClose) onClose();
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };
  
  return (
    <form 
      onSubmit={handleSearchSubmit} 
      className={`relative ${variant === 'fullwidth' ? 'w-full' : 'w-full max-w-xs'}`}
    >
      <div
        className={`flex items-center bg-white overflow-hidden transition-all ${
          variant === 'header' 
            ? 'rounded-full border border-modern-primary-30 focus-within:border-primary focus-within:ring-2 focus-within:ring-modern-primary-20 shadow-sm hover:shadow-md' 
            : 'rounded-xl border-2 border-primary focus-within:ring-2 focus-within:ring-modern-primary-20 shadow-lg hover:shadow-xl'
        } ${isFocused ? 'shadow-lg border-primary' : ''}`}
      >
        <div className="pl-4 flex items-center">
          <SearchIcon className={`${variant === 'header' ? 'h-4 w-4' : 'h-5 w-5'} text-primary`} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search"
          className={`w-full py-2 px-3 outline-none text-theme-body bg-transparent ${
            variant === 'fullwidth' ? 'text-lg py-3' : 'text-sm'
          }`}
        />
        
        {searchQuery && (
          <button 
            type="button" 
            onClick={clearSearch}
            aria-label="Clear search"
            className="p-2 text-modern-text-light hover:text-primary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        <button 
          type="submit" 
          aria-label="Search"
          className={`h-auto flex items-center justify-center transition-all ${
            variant === 'header' 
              ? 'p-2 text-primary hover:text-primary/80' 
              : 'px-6 py-4 bg-gradient-modern-primary text-white hover:opacity-90 shadow-md hover:shadow-lg'
          }`}
        >
          {variant === 'fullwidth' ? (
            <span className="font-semibold">Search</span>
          ) : (
            <SearchIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
