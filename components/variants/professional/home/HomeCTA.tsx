import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import { isMultiLocation } from "@/lib/website";

interface CTASectionStyles {
  gradient?: {
    startColor?: string | null;
    endColor?: string | null;
    direction?: string;
  };
  card?: {
    backgroundMode?: "transparent" | "solid";
    backgroundColor?: string | null;
    backgroundOpacity?: number;
    borderColor?: string | null;
    hoverBackgroundColor?: string | null;
  };
  typography?: {
    headingColor?: string | null;
    bodyColor?: string | null;
  };
  iconContainer?: {
    backgroundColor?: string | null;
    backgroundOpacity?: number;
  };
  button?: {
    backgroundColor?: string | null;
    textColor?: string | null;
    hoverBackgroundColor?: string | null;
  };
}

interface CTAContent {
  subtitle?: { content: string } | string;
  title?: { content: string } | string;
  description?: { content: string } | string;
  styles?: CTASectionStyles;
  button_text?: string;
  button_link?: string;
}

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
  phone_number?: string;
}

interface HomeCTAProps {
  ctaContent?: CTAContent | null;
  forceSingleMode?: boolean;
}

const GRADIENT_MAP: Record<string, string> = {
  "to-r": "to right",
  "to-l": "to left",
  "to-t": "to top",
  "to-b": "to bottom",
  "to-br": "to bottom right",
  "to-bl": "to bottom left",
  "to-tr": "to top right",
  "to-tl": "to top left",
};

async function getCTAContent(): Promise<CTAContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data, error } = await supabase
    .from("client_home_page")
    .select("cta_section")
    .eq("client_id", clientId)
    .single();

  if (error || !data) return null;
  return data.cta_section;
}

async function getLocations(): Promise<Location[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from("client_locations")
    .select("id, location_name, city, state, location_slug")
    .eq("client_id", clientId)
    // Added is_active check to match HomeCTA behavior
    .eq("is_active", true)
    .order("location_name");

  if (error || !data) return [];
  return data;
}

export default async function HomeCTA({ ctaContent: propsCtaContent, forceSingleMode = false }: HomeCTAProps = {}): Promise<React.JSX.Element | null> {
  const ctaContent = propsCtaContent || await getCTAContent();
  const multiLocation = await isMultiLocation();
  const locations = await getLocations();

  const getContent = (item: any) =>
    typeof item === "string" ? item : item?.content;

  const rawSubtitle = getContent(ctaContent?.subtitle);
  const rawTitle = getContent(ctaContent?.title);

  const subtitle = rawSubtitle;
  const title = rawTitle || rawSubtitle;
  const description = getContent(ctaContent?.description);
  const styles = ctaContent?.styles;
  const buttonText = ctaContent?.button_text || "Get Started Today";
  const buttonLink = ctaContent?.button_link || "/contact";

  // Build dynamic styles based on new schema
  const gradientDirection =
    GRADIENT_MAP[styles?.gradient?.direction || "to-r"] || "to right";
  const gradientStart =
    styles?.gradient?.startColor || "var(--color-primary, #004080)";
  const gradientEnd =
    styles?.gradient?.endColor || "var(--color-primary, #004080)";

  const backgroundStyle: React.CSSProperties = {
    background: `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`,
  };

  const hasLocations = !forceSingleMode && multiLocation && locations.length > 0;

  // Render Logic

  if (hasLocations) {
    return (
      <section className="py-16 md:py-24 relative" style={backgroundStyle}>
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            {/* If both title and subtitle exist, treat subtitle as small tag and title as main heading */}
            {rawTitle && subtitle ? (
              <>
                <p
                  className="text-lg md:text-xl mb-2 opacity-90 font-light"
                  style={{
                    color: "var(--color-primary-foreground, #ffffff)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {subtitle}
                </p>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"
                  style={{
                    color: "var(--color-primary-foreground, #ffffff)",
                    fontFamily: "'Clash Display', sans-serif",
                  }}
                >
                  {rawTitle}
                </h2>
              </>
            ) : (
              // If only one is present, use title (or subtitle as title fallback) as main heading
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"
                style={{
                  color: "var(--color-primary-foreground, #ffffff)",
                  fontFamily: "'Clash Display', sans-serif",
                }}
              >
                {title}
              </h2>
            )}

            {description && (
              <p
                className="text-lg max-w-2xl mx-auto opacity-90 font-light"
                style={{
                  color: "var(--color-primary-foreground, #ffffff)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/locations/${location.location_slug}/contact`}
                className="group"
              >
                <div
                  className="p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  style={{
                    backgroundColor: "var(--color-background-alt, #ffffff)",
                  }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="p-2 rounded-full"
                      style={{
                        backgroundColor: "var(--color-secondary, #A7D8DE)",
                      }}
                    >
                      <MapPin
                        size={24}
                        style={{
                          color: "var(--color-secondary-foreground, #004080)",
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl font-semibold mb-1"
                        style={{
                          color: "var(--color-text-primary, #004080)",
                          fontFamily: "'Clash Display', sans-serif",
                        }}
                      >
                        {location.location_name}
                      </h3>
                      <p
                        className="text-sm font-light"
                        style={{
                          color: "var(--color-text-muted, #6B7280)",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {location.city}, {location.state}
                      </p>
                    </div>
                  </div>

                  {location.phone_number && (
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <Phone
                        size={16}
                        style={{ color: "var(--color-accent, #F76C5E)" }}
                      />
                      <span
                        style={{ color: "var(--color-text-body, #5C4B51)" }}
                      >
                        {location.phone_number}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                    <span style={{ color: "var(--color-accent, #F76C5E)" }}>
                      Contact This Office
                    </span>
                    <ArrowRight
                      size={16}
                      style={{ color: "var(--color-accent, #F76C5E)" }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  } else {
    // Single-location mode or no locations found
    return (
      <section className="py-20 md:py-28 relative" style={backgroundStyle}>
        <div className="container mx-auto px-4 text-center">
          {rawTitle && subtitle ? (
            <>
              <p
                className="text-lg md:text-xl mb-4 opacity-90 font-light"
                style={{
                  color: "var(--color-primary-foreground, #ffffff)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {subtitle}
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
                style={{
                  color: "var(--color-primary-foreground, #ffffff)",
                  fontFamily: "var(--font-heading, sans-serif)",
                }}
              >
                {rawTitle}
              </h2>
            </>
          ) : (
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
              style={{
                color: "var(--color-primary-foreground, #ffffff)",
                fontFamily: "var(--font-heading, sans-serif)",
              }}
            >
              {title}
            </h2>
          )}

          {description && (
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90 font-light"
              style={{
                color: "var(--color-primary-foreground, #ffffff)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {description}
            </p>
          )}

          <Link
            href={buttonLink}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor:
                "var(--cta-bg-color, var(--color-accent, #F76C5E))",
              color: "var(--color-accent-foreground, #ffffff)",
            }}
          >
            {buttonText}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    );
  }
}
