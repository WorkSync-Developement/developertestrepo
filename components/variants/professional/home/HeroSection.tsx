import { supabase } from "@/lib/supabase";
import HeroCTAButton from "@/components/home-page/HeroCTAButton";
interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
}

async function isMultiLocation(): Promise<boolean> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return false;

  const { data } = await supabase
    .from("client_websites")
    .select("multi_location")
    .eq("client_id", clientId)
    .single();

  return data?.multi_location || false;
}

async function getLocations(): Promise<Location[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from("client_locations")
    .select("id, location_name, city, state, location_slug")
    .eq("client_id", clientId)
    .order("location_name");

  if (error || !data) return [];
  return data;
}
interface HeroContent {
  title?: { content: string; color?: string };
  subtitle?: { content: string; color?: string };
  description?: { content: string; color?: string };
  background_image?: {
    type: "image" | "video";
    url: string;
  };
  cta?: {
    text: string;
    url: string;
  };
  overlay?: { color: string | null; opacity: number };
}

interface HeroSectionProps {
  heroContent?: HeroContent | null;
}

async function getHeroSection(): Promise<HeroContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from("client_home_page")
    .select("hero_section")
    .eq("client_id", clientId)
    .single();

  if (error || !data) return null;
  return data.hero_section;
}

export default async function HeroSection({
  heroContent: propsHeroContent,
}: HeroSectionProps = {}): Promise<React.JSX.Element | null> {
  const heroContent = propsHeroContent || (await getHeroSection());

  if (!heroContent) return null;

  const multiLocation = await isMultiLocation();
  const locations = await getLocations();

  const { title, subtitle, description, background_image, overlay } =
    heroContent;

  return (
    <section className="relative min-h-screen flex items-end pb-16 lg:pb-24 overflow-hidden">
      {/* Background Media */}
      {background_image?.type === "video" && background_image.url && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={background_image.url} type="video/mp4" />
        </video>
      )}
      {background_image?.type === "image" && background_image.url && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${background_image.url})` }}
        />
      )}

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlay.color || "var(--color-primary, #004080)",
            opacity: overlay.opacity || 0.5,
          }}
        />
      )}

      {/* Gradient Overlay for Text Contrast */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-left">
        <div className="max-w-2xl">
          {title?.content && (
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
              style={{
                color: "var(--color-primary-foreground, #ffffff)",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              {title.content}
            </h1>
          )}

          {description?.content && (
            <p
              className="text-lg md:text-xl mb-8 leading-relaxed max-w-xl"
              style={{
                color:
                  description.color ||
                  "var(--color-primary-foreground, #ffffff)",
                fontFamily: "var(--font-body, sans-serif)",
              }}
            >
              {description.content}
            </p>
          )}

          {/* CTA Button */}
          <div>
            <HeroCTAButton
              isMultiLocation={multiLocation}
              locations={locations}
            />
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      {/* <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 md:h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C300,80 600,80 900,40 C1050,20 1150,0 1200,0 L1200,120 L0,120 Z"
            fill="var(--color-background, #FAF3E0)"
          />
        </svg>
      </div> */}
    </section>
  );
}
