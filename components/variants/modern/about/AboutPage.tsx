import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Import all the interfaces from the main page
interface HeroHeading {
  tag: string;
  type: string;
  content: string;
}

interface HeroSubheading {
  type: string;
  content: string;
}

interface HeroSection {
  heading: HeroHeading;
  subheading: HeroSubheading;
}

interface IconBlock {
  url: string;
  type: string;
}

interface ImageBlock {
  alt: string;
  url: string;
  type: string;
}

interface ParagraphBlock {
  type: string;
  content: string;
}

interface IntroDescription {
  type: string;
  paragraphs: {
    paragraph_1?: ParagraphBlock;
    paragraph_2?: ParagraphBlock;
    paragraph_3?: ParagraphBlock;
    [key: string]: ParagraphBlock | undefined;
  };
}

interface IntroSection {
  icon: IconBlock;
  image: ImageBlock;
  heading: HeroHeading;
  description: IntroDescription;
}

interface LegacySection {
  icon: IconBlock;
  heading: HeroHeading;
  description: IntroDescription;
}

interface InsuranceTypeItem {
  link: string;
  name: string;
}

interface InsuranceTypes {
  type: string;
  items: InsuranceTypeItem[];
}

interface PoliciesSection {
  heading: HeroHeading;
  description: ParagraphBlock;
  insurance_note: ParagraphBlock;
  insurance_types: InsuranceTypes;
  introductory_line: ParagraphBlock;
}

interface CommunitySection {
  icon: IconBlock;
  heading: HeroHeading;
  description: IntroDescription;
}

interface ReasonItem {
  icon: string;
  heading: string;
  description: string;
}

interface Reasons {
  type: string;
  items: ReasonItem[];
}

interface LocalKnowledgeSection {
  heading: HeroHeading;
  reasons: Reasons;
  description: IntroDescription;
}

interface ApproachItem {
  text: string;
}

interface Approaches {
  type: string;
  items: ApproachItem[];
}

interface PersonalApproachSection {
  icon: IconBlock;
  note: ParagraphBlock;
  heading: HeroHeading;
  approaches: Approaches;
  description: IntroDescription;
  introductory_line: ParagraphBlock;
}

interface ThankYouSection {
  icon: IconBlock;
  heading: HeroHeading;
  description: IntroDescription;
}

interface CtaBlock {
  url: string;
  type: string;
  content: string;
}

interface CtaSection {
  cta: CtaBlock;
}

interface AboutPageProps {
  heroSection: HeroSection | null;
  introSection: IntroSection | null;
  legacySection: LegacySection | null;
  policiesSection: PoliciesSection | null;
  communitySection: CommunitySection | null;
  localKnowledgeSection: LocalKnowledgeSection | null;
  personalApproachSection: PersonalApproachSection | null;
  thankYouSection: ThankYouSection | null;
  ctaSection: CtaSection | null;
  slug: string;
}

export default function ModernAboutPage({
  heroSection,
  introSection,
  legacySection,
  policiesSection,
  communitySection,
  localKnowledgeSection,
  personalApproachSection,
  thankYouSection,
  ctaSection,
  slug,
}: AboutPageProps) {
  const hasAnySection = introSection || legacySection || policiesSection || communitySection || localKnowledgeSection || personalApproachSection || thankYouSection || ctaSection;

  return (
    <main className="flex-grow">
      {/* About Page Hero */}
      {heroSection && (
        <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 bg-gradient-modern-radial-primary"></div>
          
          <div className="container mx-auto px-4 py-4 max-w-screen-2xl relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                <span className="text-theme-text">{heroSection?.heading?.content || ''}</span>
              </h1>
              <div className="h-1 w-32 rounded mx-auto mb-6 bg-gradient-modern-primary-secondary"></div>
              <p className="text-lg md:text-xl lg:text-2xl text-center max-w-3xl mx-auto text-theme-body leading-relaxed">
                {heroSection?.subheading?.content || ''}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      {hasAnySection && (
        <section className="py-20 relative w-full overflow-hidden bg-gradient-modern-section">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
          
          <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-10 border border-gray-100 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
              <div className="relative z-10">
                {/* Icon Header */}
                {introSection && (
                  <>
                    {introSection?.icon?.url && (
                      <div className="flex items-center justify-center mb-8">
                        <div className="w-20 h-20 rounded-full bg-gradient-modern-primary flex items-center justify-center shadow-lg">
                          <Image
                            src={introSection.icon.url || ''}
                            alt=""
                            width={40}
                            height={40}
                            className="m-0"
                          />
                        </div>
                      </div>
                    )}

                    {/* Intro Section */}
                    {introSection?.heading && (
                      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
                        <span className="text-theme-text">{introSection.heading?.content || ''}</span>
                      </h2>
                    )}
                    {introSection?.heading && (
                      <div className="h-1 w-24 rounded mx-auto mb-8 bg-gradient-modern-primary-secondary"></div>
                    )}

                    <div className={introSection?.image?.url ? "grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12" : "mb-12"}>
                      <div>
                        <div className="text-theme-body text-lg leading-relaxed">
                          {introSection?.description?.paragraphs ? Object.keys(introSection.description.paragraphs)
                            .sort()
                            .map((key) => {
                              const paragraph = introSection.description.paragraphs[key];
                              return paragraph ? (
                                <p key={key} className="mb-4 last:mb-0">
                                  {paragraph?.content || ''}
                                </p>
                              ) : null;
                            }) : null}
                        </div>
                      </div>
                      {introSection?.image?.url && (
                        <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-gray-100 h-[400px] relative">
                          <Image
                            src={introSection.image.url || ''}
                            alt={introSection.image?.alt || ''}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Legacy Section */}
                {legacySection && (
                  <div className="bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5 rounded-2xl p-8 mb-12 border border-gray-100 relative overflow-hidden">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-10 to-transparent rounded-bl-full"></div>
                    
                    <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                      {legacySection?.icon?.url && (
                        <div className="w-14 h-14 rounded-full bg-gradient-modern-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Image
                            src={legacySection.icon.url || ''}
                            alt=""
                            width={28}
                            height={28}
                            className="m-0"
                          />
                        </div>
                      )}
                      <div>
                        {legacySection?.heading && (
                          <h3 className="text-2xl md:text-3xl font-heading font-bold text-theme-text mb-4">
                            {legacySection.heading?.content || ''}
                          </h3>
                        )}
                        <div className="text-theme-body text-lg leading-relaxed">
                          {legacySection?.description?.paragraphs ? Object.keys(legacySection.description.paragraphs)
                            .sort()
                            .map((key) => {
                              const paragraph = legacySection.description.paragraphs[key];
                              return paragraph ? (
                                <p key={key} className="mb-4 last:mb-0">
                                  {paragraph?.content || ''}
                                </p>
                              ) : null;
                            }) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Policies Section */}
                {policiesSection && (
                  <>
                    {policiesSection?.heading && (
                      <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center">
                        <span className="text-theme-text">{policiesSection.heading?.content || ''}</span>
                      </h3>
                    )}
                    {policiesSection?.heading && (
                      <div className="h-1 w-24 rounded mx-auto mb-8 bg-gradient-modern-primary-secondary"></div>
                    )}
                    <div className="text-theme-body mb-8 text-center max-w-3xl mx-auto text-lg leading-relaxed">
                      {policiesSection?.description && (
                        <p>
                          {policiesSection.description?.content || ''}
                        </p>
                      )}
                      {policiesSection?.introductory_line && (
                        <p>
                          {policiesSection.introductory_line?.content || ''}
                        </p>
                      )}
                    </div>
                    {policiesSection?.insurance_types?.items && policiesSection.insurance_types.items.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto mb-8">
                        {policiesSection.insurance_types.items.map((item, index) => (
                          <Link key={index} href={`/locations/${slug}/policies/${item?.link || ''}`} className="block group w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-xs">
                            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-primary h-full flex flex-col items-center justify-center relative overflow-hidden">
                              {/* Decorative corner accent */}
                              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
                              
                              <div className="relative z-10">
                                <h3 className="text-xl font-heading font-bold text-theme-text mb-2 group-hover:text-primary transition-colors">{item?.name || ''}</h3>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {policiesSection?.insurance_note && (
                      <div className="text-theme-body mb-12 text-center max-w-3xl mx-auto text-lg">
                        <p>
                          {policiesSection.insurance_note?.content || ''}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* Community Section */}
                {communitySection && (
                  <div className="bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5 rounded-2xl p-8 border border-gray-100 mb-12 relative overflow-hidden">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-10 to-transparent rounded-bl-full"></div>
                    
                    <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                      {communitySection?.icon?.url && (
                        <div className="w-14 h-14 rounded-full bg-gradient-modern-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Image
                            src={communitySection.icon.url || ''}
                            alt=""
                            width={28}
                            height={28}
                            className="m-0"
                          />
                        </div>
                      )}
                      <div>
                        {communitySection?.heading && (
                          <h3 className="text-2xl md:text-3xl font-heading font-bold text-theme-text mb-4">
                            {communitySection.heading?.content || ''}
                          </h3>
                        )}
                        <div className="text-theme-body text-lg leading-relaxed">
                          {communitySection?.description?.paragraphs ? Object.keys(communitySection.description.paragraphs)
                            .sort()
                            .map((key) => {
                              const paragraph = communitySection.description.paragraphs[key];
                              return paragraph ? (
                                <p key={key} className="mb-4 last:mb-0">
                                  {paragraph?.content || ''}
                                </p>
                              ) : null;
                            }) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Local Knowledge Section */}
                {localKnowledgeSection && (
                  <>
                    {localKnowledgeSection?.heading && (
                      <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-center">
                        <span className="text-theme-text">{localKnowledgeSection.heading?.content || ''}</span>
                      </h3>
                    )}
                    {localKnowledgeSection?.heading && (
                      <div className="h-1 w-24 rounded mx-auto mb-8 bg-gradient-modern-primary-secondary"></div>
                    )}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                      <div className="text-theme-body text-lg leading-relaxed">
                        {localKnowledgeSection?.description?.paragraphs ? Object.keys(localKnowledgeSection.description.paragraphs)
                          .sort()
                          .slice(0, 2)
                          .map((key) => {
                            const paragraph = localKnowledgeSection.description.paragraphs[key];
                            return paragraph ? (
                              <p key={key} className="mb-4 last:mb-0">
                                {paragraph?.content || ''}
                              </p>
                            ) : null;
                          }) : null}
                      </div>
                      <div className="flex flex-col space-y-4">
                        {localKnowledgeSection?.reasons?.items && localKnowledgeSection.reasons.items.length > 0 ? localKnowledgeSection.reasons.items.map((reason, index) => (
                          <div key={index} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                            {/* Decorative corner accent */}
                            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
                            
                            {reason?.icon && (
                              <div className="w-10 h-10 rounded-full bg-gradient-modern-primary flex items-center justify-center flex-shrink-0 shadow-md">
                                <Image
                                  src={reason.icon || ''}
                                  alt=""
                                  width={20}
                                  height={20}
                                  className="m-0"
                                />
                              </div>
                            )}
                            <div className="relative z-10 flex-1">
                              <span className="text-theme-text font-semibold text-lg block mb-1">{reason?.heading || ''}</span>
                              <p className="text-theme-body">{reason?.description || ''}</p>
                            </div>
                          </div>
                        )) : null}
                      </div>
                    </div>
                    {localKnowledgeSection?.description?.paragraphs && (
                      <div className="text-theme-body mb-12 text-lg leading-relaxed">
                        {Object.keys(localKnowledgeSection.description.paragraphs)
                          .sort()
                          .slice(2)
                          .map((key) => {
                            const paragraph = localKnowledgeSection.description.paragraphs[key];
                            return paragraph ? (
                              <p key={key} className="mb-4 last:mb-0">
                                {paragraph?.content || ''}
                              </p>
                            ) : null;
                          })}
                      </div>
                    )}
                  </>
                )}

                {/* Personal Approach Section */}
                {personalApproachSection && (
                  <div className="bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5 rounded-2xl p-8 border border-gray-100 mb-12 relative overflow-hidden">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-10 to-transparent rounded-bl-full"></div>
                    
                    <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                      {personalApproachSection?.icon?.url && (
                        <div className="w-14 h-14 rounded-full bg-gradient-modern-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Image
                            src={personalApproachSection.icon.url || ''}
                            alt=""
                            width={28}
                            height={28}
                            className="m-0"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        {personalApproachSection?.heading && (
                          <h3 className="text-2xl md:text-3xl font-heading font-bold text-theme-text mb-4">
                            {personalApproachSection.heading?.content || ''}
                          </h3>
                        )}
                        <div className="text-theme-body text-lg leading-relaxed">
                          {personalApproachSection?.description?.paragraphs ? Object.keys(personalApproachSection.description.paragraphs)
                            .sort()
                            .map((key) => {
                              const paragraph = personalApproachSection.description.paragraphs[key];
                              return paragraph ? (
                                <p key={key} className="mb-4 last:mb-0">
                                  {paragraph?.content || ''}
                                </p>
                              ) : null;
                            }) : null}
                          {personalApproachSection?.introductory_line && (
                            <p className="mb-4">
                              {personalApproachSection.introductory_line?.content || ''}
                            </p>
                          )}
                          {personalApproachSection?.approaches?.items && personalApproachSection.approaches.items.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-4 my-6">
                              {personalApproachSection.approaches.items.map((approach, index) => (
                                <div key={index} className="bg-white rounded-xl p-5 shadow-md text-center border-2 border-gray-100 hover:border-primary hover:shadow-lg transition-all duration-300 min-w-[150px]">
                                  <div className="text-theme-text font-bold text-lg">{approach?.text || ''}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          {personalApproachSection?.note && (
                            <p>
                              {personalApproachSection.note?.content || ''}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Thank You Section */}
                {thankYouSection && (
                  <div className="bg-gradient-to-br from-modern-primary-5 to-modern-secondary-5 rounded-2xl p-8 border border-gray-100 mb-12 relative overflow-hidden">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-10 to-transparent rounded-bl-full"></div>
                    
                    <div className="flex flex-col items-center text-center relative z-10">
                      {thankYouSection?.icon?.url && (
                        <div className="w-16 h-16 rounded-full bg-gradient-modern-primary flex items-center justify-center mb-6 shadow-lg">
                          <Image
                            src={thankYouSection.icon.url || ''}
                            alt=""
                            width={32}
                            height={32}
                            className="m-0"
                          />
                        </div>
                      )}
                      {thankYouSection?.heading && (
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-theme-text mb-4">
                          {thankYouSection.heading?.content || ''}
                        </h3>
                      )}
                      <div className="text-theme-body max-w-3xl mx-auto text-lg leading-relaxed">
                        {thankYouSection?.description?.paragraphs ? Object.keys(thankYouSection.description.paragraphs)
                          .sort()
                          .map((key) => {
                            const paragraph = thankYouSection.description.paragraphs[key];
                            return paragraph ? (
                              <p key={key} className="mb-4 last:mb-0">
                                {paragraph?.content || ''}
                              </p>
                            ) : null;
                          }) : null}
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                {ctaSection?.cta && (
                  <div className="text-center mt-8">
                    <Link href={
                      ctaSection.cta?.url?.includes('/locations/')
                        ? ctaSection.cta.url
                        : ctaSection.cta?.url?.startsWith('/')
                          ? `/locations/${slug}${ctaSection.cta.url}`
                          : ctaSection.cta?.url?.startsWith('http')
                            ? ctaSection.cta.url
                            : `/locations/${slug}/contact`
                    }>
                      <button className="inline-flex items-center gap-2 font-bold py-4 px-8 rounded-full text-lg transition-all bg-gradient-modern-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        {ctaSection.cta?.content || 'Contact Us Today'}
                        <ArrowRight size={18} />
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
