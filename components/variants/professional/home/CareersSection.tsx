import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Briefcase,
  Users,
  TrendingUp,
  Target,
  BarChart3,
  Mail,
  ArrowRight,
} from "lucide-react";

export interface CareersContent {
  title?: string;
  subtitle?: string;
  description?: string;
  benefits?: string[];
  items?: {
    title: string;
    description: string;
    icon?: any;
  }[];
}

interface ServiceCard {
  icon: any;
  title: string;
  description: string;
}

async function getCareersContent(): Promise<CareersContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from("client_home_page")
    .select("careers_section")
    .eq("client_id", clientId)
    .single();

  if (error || !data?.careers_section) return null;
  return data.careers_section;
}

async function showCareersPage(): Promise<boolean> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return false;

  const { data } = await supabase
    .from("client_websites")
    .select("features")
    .eq("client_id", clientId)
    .single();

  return data?.features?.show_careers_page || false;
}

interface CareersSectionProps {
  content?: CareersContent | null;
}

export default async function CareersSection({ content: propsContent }: CareersSectionProps = {}): Promise<React.JSX.Element | null> {
  let dbCareersContent = propsContent;

  if (!dbCareersContent) {
    const showCareers = await showCareersPage();
    if (!showCareers) return null;

    dbCareersContent = await getCareersContent();
  }

  // Fallback careers content if no data from database
  const fallbackCareersContent: CareersContent = {
    title: "Comprehensive Services for Your Success",
    subtitle: "OUR SERVICES",
    description:
      "We provide expert guidance and solutions across multiple areas to help you achieve your financial and business goals.",
    benefits: [],
  };

  const careersContent = dbCareersContent || fallbackCareersContent;

  const services: ServiceCard[] = careersContent.items 
  ? careersContent.items.map(item => ({
      icon: item.icon || Briefcase,
      title: item.title,
      description: item.description
    }))
  : [
    {
      icon: Briefcase,
      title: "Wealth Finance",
      description:
        "Guiding individuals and businesses with smart financial planning, investment advice, and long-term wealth strategies.",
    },
    {
      icon: Target,
      title: "Risk Assessment",
      description:
        "Comprehensive analysis of potential risks and strategic mitigation planning.",
    },
    {
      icon: Users,
      title: "Team Strategy",
      description:
        "Building and developing high-performing teams aligned with business objectives.",
    },
    {
      icon: TrendingUp,
      title: "Growth Planning",
      description:
        "Strategic roadmaps for sustainable business expansion and market growth.",
    },
    {
      icon: BarChart3,
      title: "Powerful Analytics",
      description:
        "Data-driven insights to inform decision-making and optimize performance.",
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description:
        "Targeted campaigns that engage customers and drive conversions.",
    },
  ];

  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--color-background-alt, #ffffff)" }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
            style={{
              backgroundColor: "var(--color-secondary, #A7D8DE)",
              color: "var(--color-accent-foreground, #ffffff)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M7 0L8.09 4.26L12 2.82L9.27 6.18L14 7L9.27 7.82L12 11.18L8.09 9.74L7 14L5.91 9.74L2 11.18L4.73 7.82L0 7L4.73 6.18L2 2.82L5.91 4.26L7 0Z" />
            </svg>
            {careersContent?.subtitle || "OUR SERVICES"}
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-3xl mx-auto leading-tight"
            style={{
              color: "var(--color-text-primary, #004080)",
              fontFamily: "'Clash Display', sans-serif",
            }}
          >
            {careersContent?.title ||
              "Driving Growth Through Strategic Excellence"}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{
                backgroundColor: "var(--color-background, #FAF3E0)",
                border: "1px solid var(--divider-color, #A7D8DE)",
              }}
            >
              <div className="mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: "var(--color-secondary, #A7D8DE)",
                  }}
                >
                  <service.icon
                    size={28}
                    style={{ color: "var(--color-accent-foreground, #ffffff)" }}
                  />
                </div>
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  color: "var(--color-text-primary, #004080)",
                  fontFamily: "'Clash Display', sans-serif",
                }}
              >
                {service.title}
              </h3>
              <p
                className="text-sm leading-relaxed opacity-90"
                style={{
                  color: "var(--color-text-body, #5C4B51)",
                  fontFamily: "var(--font-body, sans-serif)",
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor:
                "var(--cta-bg-color, var(--color-accent, #F76C5E))",
              color: "var(--cta-text-color, #ffffff)",
            }}
          >
            {careersContent?.description || "View Open Positions"}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
