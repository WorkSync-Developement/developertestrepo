import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { MapPin, FileText } from "lucide-react";

interface PolicyPage {
  id: string;
  policy_name: string;
  policy_slug: string;
  content_summary: string;
}

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

async function getPolicies(): Promise<PolicyPage[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from("client_policy_pages")
    .select("id, policy_name, policy_slug, content_summary")
    .eq("client_id", clientId)
    .order("policy_name")
    .limit(6);

  if (error || !data) return [];
  return data;
}

async function getSectionSettings() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;

  const { data } = await supabase
    .from("client_theme_settings")
    .select("location_policies_section_settings")
    .eq("client_id", clientId)
    .single();

  return data?.location_policies_section_settings;
}

export default async function LocationPoliciesSection(): Promise<React.JSX.Element | null> {
  const multiLocation = await isMultiLocation();
  const settings = await getSectionSettings();
  const locations = await getLocations();

  if (multiLocation) {
    if (locations.length === 0) return null;

    return (
      <section
        className="py-16 md:py-24"
        style={{
          backgroundColor:
            settings?.section_bg_color ||
            "var(--color-background-alt, #ffffff)",
        }}
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{
                color:
                  settings?.title_color || "var(--color-text-primary, #004080)",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              Our Locations
            </h2>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{
                color:
                  settings?.subtitle_color || "var(--color-text-body, #5C4B51)",
                fontFamily: "var(--font-body, sans-serif)",
              }}
            >
              Visit us at any of our convenient locations to discuss your
              insurance needs
            </p>
          </div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/locations/${location.location_slug}`}
                className="group"
              >
                <div
                  className="h-full p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                  style={{
                    backgroundColor:
                      settings?.card_bg_color ||
                      "var(--color-background, #FAF3E0)",
                    border: `2px solid ${settings?.card_border_color || "var(--divider-color, #A7D8DE)"}`,
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="p-3 rounded-full"
                      style={{
                        backgroundColor:
                          settings?.icon_bg_color ||
                          "var(--color-secondary, #A7D8DE)",
                      }}
                    >
                      <MapPin
                        size={28}
                        style={{
                          color:
                            settings?.icon_color ||
                            "var(--color-secondary-foreground, #004080)",
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-2xl font-bold mb-2 group-hover:underline"
                        style={{
                          color:
                            settings?.card_title_color ||
                            "var(--color-text-primary, #004080)",
                          fontFamily: "'Clash Display', sans-serif",
                        }}
                      >
                        {location.location_name}
                      </h3>
                      <p
                        className="text-lg"
                        style={{
                          color:
                            settings?.card_text_color ||
                            "var(--color-text-body, #5C4B51)",
                        }}
                      >
                        {location.city}, {location.state}
                      </p>
                    </div>
                  </div>
                  <div
                    className="text-sm font-semibold group-hover:underline"
                    style={{
                      color:
                        settings?.link_color || "var(--color-accent, #F76C5E)",
                    }}
                  >
                    View Location →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  } else {
    // Single-location mode: show policies
    const policies = await getPolicies();
    if (policies.length === 0) return null;

    return (
      <section
        className="py-16 md:py-24"
        style={{
          backgroundColor:
            settings?.section_bg_color ||
            "var(--color-background-alt, #ffffff)",
        }}
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{
                color:
                  settings?.title_color || "var(--color-text-primary, #004080)",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              Our Insurance Policies
            </h2>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{
                color:
                  settings?.subtitle_color || "var(--color-text-body, #5C4B51)",
                fontFamily: "var(--font-body, sans-serif)",
              }}
            >
              Comprehensive coverage options tailored to your needs
            </p>
          </div>

          {/* Policy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policies.map((policy) => (
              <Link
                key={policy.id}
                href={`/policies/${policy.policy_slug}`}
                className="group"
              >
                <div
                  className="h-full p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                  style={{
                    backgroundColor:
                      settings?.card_bg_color ||
                      "var(--color-background, #FAF3E0)",
                    border: `2px solid ${settings?.card_border_color || "var(--divider-color, #A7D8DE)"}`,
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="p-3 rounded-full"
                      style={{
                        backgroundColor:
                          settings?.icon_bg_color ||
                          "var(--color-secondary, #A7D8DE)",
                      }}
                    >
                      <FileText
                        size={28}
                        style={{
                          color:
                            settings?.icon_color ||
                            "var(--color-secondary-foreground, #004080)",
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-2xl font-bold mb-2 group-hover:underline"
                        style={{
                          color:
                            settings?.card_title_color ||
                            "var(--color-text-primary, #004080)",
                          fontFamily: "'Clash Display', sans-serif",
                        }}
                      >
                        {policy.policy_name}
                      </h3>
                      <p
                        className="text-sm line-clamp-3"
                        style={{
                          color:
                            settings?.card_text_color ||
                            "var(--color-text-body, #5C4B51)",
                        }}
                      >
                        {policy.content_summary}
                      </p>
                    </div>
                  </div>
                  <div
                    className="text-sm font-semibold group-hover:underline"
                    style={{
                      color:
                        settings?.link_color || "var(--color-accent, #F76C5E)",
                    }}
                  >
                    Learn More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
