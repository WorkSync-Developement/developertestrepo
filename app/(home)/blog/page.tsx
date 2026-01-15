import React from 'react';
import { Metadata } from 'next';
import BlogTopics from '@/components/blog/BlogTopics';
import { getAllTopics } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Our Blog',
  description: 'Read the latest insights, tips, and news from our insurance experts.',
};

export default async function BlogPage() {
  const topics = await getAllTopics();

  return (
    <div className="blog-page pt-8">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-heading font-bold mb-4 text-center">Our Blog</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Latest insights and insurance tips</p>
        <BlogTopics topics={topics} />
      </div>
    </div>
  );
}
