import { supabase } from "@/lib/supabase";
import { Check } from "lucide-react";

interface IntroContent {
  image: { url: string };
  overlay_tag?: { text: string; color?: string };
  tagline?: { content: string; color?: string };
  title?: { content: string; color?: string };
  paragraphs?: Array<{
    content: string;
    color?: string;
  }>;
  benefits?: string[];
}

interface IntroSectionProps {
  introContent?: IntroContent | null;
}

async function getIntroSection(): Promise<IntroContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from("client_home_page")
    .select("intro_section")
    .eq("client_id", clientId)
    .single();

  if (error || !data) return null;
  return data.intro_section;
}

export default async function IntroSection({ introContent: propsIntroContent }: IntroSectionProps = {}): Promise<React.JSX.Element | null> {
  const introContent = propsIntroContent || await getIntroSection();

  // Fallback data if no content from database
  const fallbackIntro: IntroContent = {
    image: { url: "/Images/instrosection.png" },
    overlay_tag: {
      text: "#1 In The Industry",
      color: "var(--color-accent, #F76C5E)",
    },
    tagline: { content: "About Us", color: "var(--color-secondary, #A7D8DE)" },
    title: {
      content: "Your Trusted Insurance Partner",
      color: "var(--color-text-primary, #004080)",
    },
    paragraphs: [
      {
        content:
          "We are dedicated to providing comprehensive insurance solutions tailored to your unique needs. With years of experience and a commitment to excellence, we help protect what matters most to you.",
        color: "var(--color-text-body, #5C4B51)",
      },
      {
        content:
          "Our team of expert advisors works closely with you to understand your situation and find the perfect coverage options. We believe in building lasting relationships based on trust and transparency.",
        color: "var(--color-text-body, #5C4B51)",
      },
    ],

  };

  const activeContent = introContent || fallbackIntro;
  const { overlay_tag, tagline, title, paragraphs, benefits } = activeContent;
  
  // Use fallback image if the provided image URL is empty or missing
  const image = activeContent.image?.url ? activeContent.image : fallbackIntro.image;

  const displayBenefits =
    benefits && benefits.length > 0 ? benefits : null;

  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--color-background, #FAF3E0)" }}
    >
      {/* Top Divider */}
      {/* <div
        className="mb-16"
        style={{
          height: "var(--divider-thickness, 4px)",
          backgroundColor: "var(--divider-color, #A7D8DE)",
        }}
      /> */}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              {image?.url && (
                <img
                  src={image.url}
                  alt="About our agency"
                  className="w-full h-auto object-cover"
                  style={{
                    aspectRatio: "var(--intro-section-aspect-ratio, 4/3)",
                  }}
                />
              )}

              {/* Overlay Tag */}
              {overlay_tag?.text && (
                <div className="absolute top-6 left-6">
                  <div
                    className="px-6 py-3 rounded-full font-bold text-sm shadow-lg backdrop-blur-sm"
                    style={{
                      backgroundColor:
                        overlay_tag.color || "var(--color-accent, #F76C5E)",
                      color: "var(--color-accent-foreground, #ffffff)",
                    }}
                  >
                    {overlay_tag.text}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2">
            {tagline?.content && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
                style={{
                  backgroundColor: "var(--color-secondary, #A7D8DE)",
                  color:
                    "var(--color-accent-foreground, #ffffff)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                >
                  <path d="M7 0L8.09 4.26L12 2.82L9.27 6.18L14 7L9.27 7.82L12 11.18L8.09 9.74L7 14L5.91 9.74L2 11.18L4.73 7.82L0 7L4.73 6.18L2 2.82L5.91 4.26L7 0Z" />
                </svg>
                {tagline.content}
              </div>
            )}

            {title?.content && (
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-[1.2]"
                style={{
                  color: title.color || "var(--color-text-primary, #004080)",
                  fontFamily: "'Clash Display', sans-serif",
                }}
              >
                {title.content}
              </h2>
            )}

            {paragraphs && paragraphs.length > 0 && (
              <div className="space-y-4 mb-8">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg leading-relaxed opacity-90"
                    style={{
                      color:
                        paragraph.color || "var(--color-text-body, #5C4B51)",
                      fontFamily: "var(--font-body, sans-serif)",
                    }}
                  >
                    {paragraph.content}
                  </p>
                ))}
              </div>
            )}

            {/* Benefits List */}
            <div className="space-y-4 mt-8">
              {(displayBenefits || []).map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--color-secondary, #A7D8DE)",
                    }}
                  >
                    <Check
                      size={14}
                      strokeWidth={3}
                      style={{
                        color: "var(--color-accent-foreground, #ffffff)",
                      }}
                    />
                  </div>
                  <span
                    className="text-base md:text-lg font-medium"
                    style={{
                      color: "var(--color-text-primary, #004080)",
                      fontFamily: "var(--font-body, sans-serif)",
                    }}
                  >
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
