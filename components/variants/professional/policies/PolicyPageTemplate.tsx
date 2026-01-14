"use client";

import Link from "next/link";
import { Phone, ArrowRight, FileText, Calendar } from "lucide-react";

interface PolicyPageTemplateProps {
  policy: {
    policy_name: string;
    policy_slug: string;
    content_summary?: string;
    content_body: string;
    features?: string[];
    faq?: Array<{ question: string; answer: string }>;
    cta_text?: string;
    cta_url?: string;
  };
  relatedPolicies?: Array<{
    policy_name: string;
    policy_slug: string;
    content_summary?: string;
  }>;
  contactInfo?: {
    phone_number?: string;
    email?: string;
  };
  locationSlug?: string;
}

export default function PolicyPageTemplate(
  props: PolicyPageTemplateProps
): React.JSX.Element {
  const { policy, relatedPolicies = [], contactInfo, locationSlug } = props;

  const contactUrl = locationSlug
    ? `/locations/${locationSlug}/contact`
    : "/contact";

  // Get current date for "Last updated"
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: "var(--color-background, #FAF3E0)",
        fontFamily: "var(--font-body, 'Inter', sans-serif)",
      }}
    >
      {/* Hero Section - Simplified with Gradient */}
      <section
        className="py-16 md:py-28 relative overflow-hidden"
        style={{
          backgroundColor: "var(--color-background-alt, #ffffff)",
          borderBottom: "1px solid var(--divider-color, #e2e8f0)",
        }}
      >
        {/* Background decorative element */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom left, var(--color-primary), transparent)",
          }}
        />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex items-center gap-2 mb-8 text-sm font-medium tracking-wide bg-opacity-10 px-4 py-1.5 rounded-full w-fit"
            style={{ 
              backgroundColor: "var(--color-secondary, #64748b)",
              color: "var(--color-accent-foreground, #ffffff)",
            }}
          >
            <Calendar size={14} className="opacity-70" />
            <span className="opacity-90">
              Last updated: {currentDate}
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]"
            style={{
              color: "var(--color-text-primary, #004080)",
              fontFamily: "'Clash Display', var(--font-heading, serif)",
            }}
          >
            {policy.policy_name}
          </h1>

          {policy.content_summary && (
            <p
              className="text-xl md:text-2xl leading-relaxed max-w-3xl"
              style={{
                color: "var(--color-text-body, #5C4B51)",
                opacity: 0.9,
              }}
            >
              {policy.content_summary}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Introduction Section */}
              <div
                className="p-8 md:p-12 rounded-[2rem] shadow-sm ring-1 ring-inset ring-black/5"
                style={{
                  backgroundColor: "#ffffff",
                }}
              >
                <h5
                  className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-8"
                  style={{
                    color: "var(--color-accent, #F76C5E)",
                    fontFamily: "var(--font-body, sans-serif)",
                  }}
                >
                  <span className="w-8 h-[2px] rounded-full" style={{ backgroundColor: "var(--color-accent, #F76C5E)" }}></span>
                  Overview
                </h5>
                <div
                  className="prose prose-lg max-w-none policy-content"
                  style={{
                    color: "var(--color-text-body, #5C4B51)",
                    // fontFamily: "var(--font-body, sans-serif)",
                    fontFamily: "'Clash Display', var(--font-heading, sans-serif)",
                  }}
                  dangerouslySetInnerHTML={{ __html: policy.content_body }}
                />
              </div>

              {/* Features Section */}
              {policy.features && policy.features.length > 0 && (
                <div
                  className="p-8 md:p-12 rounded-[2rem] shadow-sm ring-1 ring-inset ring-black/5 relative overflow-hidden"
                  style={{
                    backgroundColor: "#ffffff",
                  }}
                >
                  <div 
                    className="absolute top-0 left-0 w-2 h-full"
                    style={{ backgroundColor: "var(--color-accent, #F76C5E)" }}
                  />
                  
                  <h5
                    className="text-xl font-bold mb-8 flex items-center gap-3"
                    style={{
                      color: "var(--color-text-primary, #004080)",
                      fontFamily: "'Clash Display', var(--font-heading, serif)",
                    }}
                  >
                    <FileText className="w-6 h-6" style={{ color: "var(--color-accent, #F76C5E)" }} />
                    Key Coverage Features
                  </h5>
                  
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {policy.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div
                          className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: "var(--color-secondary, #A7D8DE)",
                          }}
                        />
                        <span
                          className="text-lg leading-relaxed font-medium"
                          style={{
                            color: "var(--color-text-body, #5C4B51)",
                            fontFamily: "var(--font-body, sans-serif)",
                          }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQ Section */}
              {policy.faq && policy.faq.length > 0 && (
                <div className="py-8">
                  <h3
                    className="text-3xl font-bold mb-10"
                    style={{
                      color: "var(--color-text-primary, #004080)",
                      fontFamily: "'Clash Display', var(--font-heading, serif)",
                    }}
                  >
                    Common Questions
                  </h3>
                  <div className="space-y-6">
                    {policy.faq.map((item, index) => (
                      <div 
                        key={index} 
                        className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ring-1 ring-black/5 hover:ring-black/10"
                      >
                        <h4
                          className="text-xl font-bold mb-4 flex items-start gap-3"
                          style={{
                            color: "var(--color-text-primary, #004080)",
                            fontFamily: "'Clash Display', var(--font-heading, sans-serif)",
                          }}
                        >
                          <span className="opacity-40 text-sm mt-1.5">0{index + 1}</span>
                          {item.question}
                        </h4>
                        <p
                          className="text-lg leading-relaxed pl-8 opacity-90"
                          style={{
                            color: "var(--color-text-body, #5C4B51)",
                            fontFamily: "var(--font-body, sans-serif)",
                          }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* CTA Card */}
                <div
                  className="p-10 rounded-[2rem] shadow-xl relative overflow-hidden group"
                  style={{
                    backgroundColor: "var(--color-primary, #004080)",
                    color: "var(--color-primary-foreground, #ffffff)",
                  }}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 transform transition-transform group-hover:scale-110 duration-700" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-12 -mb-12 transform transition-transform group-hover:scale-110 duration-700 delay-100" />
                  
                  <div className="relative z-10">
                    <h3
                      className="text-2xl font-bold mb-4 leading-tight"
                      style={{ fontFamily: "'Clash Display', var(--font-heading, sans-serif)" }}
                    >
                      Need Personalized Advice?
                    </h3>
                    <p
                      className="mb-8 opacity-90 text-base leading-relaxed"
                      style={{ fontFamily: "var(--font-body, sans-serif)" }}
                    >
                      Our insurance experts are here to help you find the perfect coverage for your needs.
                    </p>

                    <div className="space-y-4">
                      {contactInfo?.phone_number && (
                        <a
                          href={`tel:${contactInfo.phone_number}`}
                          className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl font-bold text-center transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                          style={{
                            backgroundColor:
                              "var(--color-accent, #F76C5E)",
                            color: "var(--color-accent-foreground, #ffffff)",
                          }}
                        >
                          <Phone size={20} />
                          Call Now
                        </a>
                      )}

                      <Link
                        href={contactUrl}
                        className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl font-bold text-center border-2 transition-all duration-300 hover:bg-white/10"
                        style={{
                          borderColor: "rgba(255,255,255,0.3)",
                          color: "#ffffff",
                        }}
                      >
                        Contact Us
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Related Policies */}
                {relatedPolicies && relatedPolicies.length > 0 && (
                  <div
                    className="p-8 rounded-[2rem] ring-1 ring-inset ring-black/5"
                    style={{
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <h3
                      className="text-lg font-bold mb-6 uppercase tracking-wider"
                      style={{
                        color: "var(--color-text-muted, #94a3b8)",
                      }}
                    >
                      Related Policies
                    </h3>
                    <div className="space-y-4">
                      {relatedPolicies.map((relatedPolicy) => {
                        const policyUrl = locationSlug
                          ? `/locations/${locationSlug}/policies/${relatedPolicy.policy_slug}`
                          : `/policies/${relatedPolicy.policy_slug}`;

                        return (
                          <Link
                            key={relatedPolicy.policy_slug}
                            href={policyUrl}
                            className="block group"
                          >
                            <div
                              className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-gray-50 border border-transparent hover:border-gray-100"
                            >
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-white"
                                style={{
                                  backgroundColor:
                                    "var(--color-background, #FAF3E0)",
                                }}
                              >
                                <FileText
                                  size={24}
                                  style={{
                                    color:
                                      "var(--color-accent, #F76C5E)",
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4
                                  className="font-bold text-base group-hover:text-[var(--color-accent)] transition-colors duration-200 truncate"
                                  style={{
                                    color: "var(--color-text-primary, #004080)",
                                    fontFamily: "var(--font-heading, sans-serif)",
                                  }}
                                >
                                  {relatedPolicy.policy_name}
                                </h4>
                                {relatedPolicy.content_summary && (
                                  <p
                                    className="text-xs line-clamp-1 mt-1 opacity-70"
                                    style={{
                                      color: "var(--color-text-body, #5C4B51)",
                                    }}
                                  >
                                    View details
                                  </p>
                                )}
                              </div>
                              <ArrowRight size={16} className="text-gray-300 group-hover:text-[var(--color-accent)] transition-colors" />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .policy-content h1,
        .policy-content h2,
        .policy-content h3,
        .policy-content h4,
        .policy-content h5,
        .policy-content h6 {
          font-family: var(--font-heading, serif);
          color: var(--color-text-primary, #004080);
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          font-weight: 700;
        }

        .policy-content h5 {
          font-size: 1.125rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent, #f76c5e);
          margin-top: 2em;
        }

        .policy-content p {
          margin-bottom: 1.25em;
          line-height: 1.75;
        }

        .policy-content ul,
        .policy-content ol {
          margin: 1.25em 0;
          padding-left: 1.5em;
        }

        .policy-content li {
          margin-bottom: 0.75em;
        }

        .policy-content blockquote {
          border-left: 4px solid var(--color-accent, #f76c5e);
          padding-left: 1.5em;
          margin: 2em 0;
          font-style: italic;
          opacity: 0.9;
        }

        .policy-content a {
          color: var(--color-accent, #f76c5e);
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
