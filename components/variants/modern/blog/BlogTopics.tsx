'use client'

import Image from 'next/image';
import { Tag, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

export default function BlogTopics({ topics, basePath = '/blog' }: { topics: any[]; basePath?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 10;

  // Calculate pagination
  const indexOfLastTopic = currentPage * topicsPerPage;
  const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
  const currentTopics = topics.slice(indexOfFirstTopic, indexOfLastTopic);
  const totalPages = Math.ceil(topics.length / topicsPerPage);

  // Change page handler
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
      
      <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
        <div className="flex flex-wrap justify-center gap-8">
          {currentTopics.map((topic: any) => (
            <Link
              key={topic.id}
              href={`${basePath}/${topic.slug}`}
              className="block group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] xl:w-[calc(25%-1.5rem)] max-w-sm"
            >
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 hover:border-primary hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full relative">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
                
                <div className="w-full aspect-square bg-gray-200 relative overflow-hidden">
                  {/* Use Next.js Image component for optimized loading if topic.image_url exists */}
                  {topic.image_url ? (
                    <Image
                      src={topic.image_url}
                      alt={topic.name}
                      width={1024}
                      height={1024}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      priority={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5">
                      <div className="text-center">
                        <Tag className="h-12 w-12 mx-auto mb-2 text-primary" />
                        <span className="text-sm text-theme-body">{topic.name}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow relative z-10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-secondary-foreground bg-secondary px-3 py-1 rounded-full font-medium">
                      Insurance
                    </span>
                    <div className="text-sm text-theme-body flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{topic.postCount} {topic.postCount === 1 ? 'Article' : 'Articles'}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-heading font-bold text-theme-text mb-3 group-hover:text-primary transition-colors">
                    {topic.name}
                  </h2>
                  <p className="text-theme-body leading-relaxed mb-4 flex-grow text-sm">
                    {topic.description}
                  </p>
                  <div className="flex justify-end items-center mt-auto">
                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                      View Articles
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* If no topics are available */}
          {currentTopics.length === 0 && (
            <div className="w-full py-16 text-center">
              <p className="text-xl text-theme-body">No blog topics available at this time. Please check back soon.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-modern-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
                aria-label="Previous page"
              >
                &laquo;
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    currentPage === index + 1
                      ? 'bg-gradient-modern-primary text-white shadow-lg'
                      : 'bg-white text-primary hover:bg-modern-primary-5 border-2 border-gray-200 hover:border-primary'
                  }`}
                  aria-label={`Page ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-modern-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
                aria-label="Next page"
              >
                &raquo;
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  )
}
