import React from 'react';
import { supabase } from '@/lib/supabase';
import ModernFAQSection from './ModernFAQSection';

interface QuestionItem {
  question: string;
  answer: string;
}

interface CommonQuestionsContent {
  tagline?: { content: string };
  subtitle?: { content: string };
  description?: { content: string };
  questions?: {
    type?: string;
    items?: QuestionItem[];
  };
}

async function getCommonQuestionsSection(): Promise<CommonQuestionsContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from('client_home_page')
    .select('common_questions_section')
    .eq('client_id', clientId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching common questions section:', error);
    return null;
  }

  return data?.common_questions_section || null;
}

export default async function ModernFAQSectionWrapper() {
  const content = await getCommonQuestionsSection();

  if (!content || !content.questions?.items || content.questions.items.length === 0) {
    return null;
  }

  return (
    <ModernFAQSection
      faqs={content.questions.items}
      title={content.subtitle?.content || "Frequently Asked Questions"}
      description={content.description?.content || "Find answers to common questions about our insurance services."}
      tagline={content.tagline?.content || "Got Questions?"}
    />
  );
}
