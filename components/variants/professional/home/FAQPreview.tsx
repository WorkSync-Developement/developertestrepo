import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

interface QuestionItem {
  question: string;
  answer: string;
}

export interface CommonQuestionsContent {
  tagline?: { content: string };
  subtitle?: { content: string };
  description?: { content: string };
  questions?: {
    type?: string;
    items?: QuestionItem[];
  };
  // Handle case where items are directly on the root
  items?: QuestionItem[];
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

async function showFAQPage(): Promise<boolean> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return false;

  const { data } = await supabase
    .from("client_websites")
    .select("features")
    .eq("client_id", clientId)
    .single();

  return data?.features?.show_faq_page || false;
}

interface FAQPreviewProps {
  content?: CommonQuestionsContent | null;
}

export default async function FAQPreview({ content: propsContent }: FAQPreviewProps = {}): Promise<React.JSX.Element | null> {
  let content = propsContent;

  if (!content) {
    const showFAQ = await showFAQPage();
    if (!showFAQ) return null;
    content = await getCommonQuestionsSection();
  }
  
  if (!content) {
     return null;
  }

  const faqs = content.questions?.items || content.items || [];
  const title = content.subtitle?.content || "Frequently Asked Questions";

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column - Title & Image */}
          <div className="space-y-12">
            <h2 
              className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight"
              style={{ 
                color: "#0F2826", // Dark greenish text from image
                fontFamily: "'Clash Display', sans-serif" 
              }}
            >
              {title}
            </h2>
            
            <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3]">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Placeholder for the fluid abstract 3D shape from the design */}
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <img 
                    src="https://framerusercontent.com/images/pCkK2jbAywXEyJHDzebG3Hoxiw.png?scale-down-to=1024&width=1892&height=1292" 
                    alt="FAQ Visual" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="pt-4 lg:pt-8 w-full">
            <Accordion.Root type="single" collapsible className="space-y-0 divide-y divide-gray-100">
              {faqs.map((faq, index) => (
                <Accordion.Item
                  key={index}
                  value={`item-${index}`}
                  className="py-6 first:pt-0"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex items-start justify-between gap-6 w-full text-left py-2">
                      <h3
                        className="text-xl md:text-2xl font-semibold pr-4 flex-1"
                        style={{
                          color: "#0F2826", // Dark green
                          fontFamily: "'Clash Display', sans-serif",
                        }}
                      >
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 pt-1">
                        {/* Open Icon (Plus) */}
                        <div className="block group-data-[state=open]:hidden">
                            <span className="text-2xl text-[#0F2826]">+</span>
                        </div>
                         {/* Close Icon (Minus) */}
                        <div className="hidden group-data-[state=open]:block">
                            <span className="text-2xl text-[#0F2826]">&minus;</span>
                        </div>
                      </div>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="pb-4 pr-12">
                      <p
                        className="text-base md:text-lg leading-relaxed opacity-70 font-light"
                        style={{
                          color: "#0F2826",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>

        </div>
      </div>
    </section>
  );
}
