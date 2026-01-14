import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

interface Policy {
  id: string;
  policy_name: string;
  policy_slug: string;
  content_summary?: string;
}

interface LocationFeaturedPoliciesProps {
  policies?: Policy[];
  locationId: string;
  locationSlug: string;
  title?: string;
  description?: string;
}

export default function LocationFeaturedPolicies(
  props: LocationFeaturedPoliciesProps
): React.JSX.Element {
  const { policies, locationSlug, title, description } = props;

  if ((!policies || policies.length === 0) && !title && !description) {
    return <></>;
  }

  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--color-background-alt, #ffffff)" }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              color: "var(--color-text-primary, #004080)",
              fontFamily: "'Clash Display', sans-serif",
            }}
          >
            {title || "Our Insurance Policies"}
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{
              color: "var(--color-text-body, #5C4B51)",
              fontFamily: "var(--font-body, sans-serif)",
            }}
          >
            {description || "Comprehensive coverage options to protect what matters most"}
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policies?.map((policy) => (
            <Link
              key={policy.id}
              href={`/locations/${locationSlug}/policies/${policy.policy_slug}`}
              className="group"
            >
              <div
                className="h-full p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                style={{
                  backgroundColor: "var(--color-background, #FAF3E0)",
                  border: "2px solid var(--divider-color, #A7D8DE)",
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--color-secondary, #A7D8DE)",
                      }}
                    >
                      <FileText
                        size={32}
                        style={{
                          color: "var(--color-accent-foreground, #ffffff)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl font-bold mb-4 group-hover:underline"
                    style={{
                      color: "var(--color-text-primary, #004080)",
                      fontFamily: "'Clash Display', sans-serif",
                    }}
                  >
                    {policy.policy_name}
                  </h3>

                  {/* Summary */}
                  {policy.content_summary && (
                    <p
                      className="text-base mb-6 flex-grow line-clamp-3"
                      style={{
                        color: "var(--color-text-body, #5C4B51)",
                        fontFamily: "var(--font-body, sans-serif)",
                      }}
                    >
                      {policy.content_summary}
                    </p>
                  )}

                  {/* CTA Link */}
                  <div className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                    <span style={{ color: "var(--color-accent, #F76C5E)" }}>
                      Learn More
                    </span>
                    <ArrowRight
                      size={18}
                      style={{ color: "var(--color-accent, #F76C5E)" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
