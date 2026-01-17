import React from 'react';
import Link from 'next/link';

interface InsuranceCTAProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  agencyName?: string;
}

export default function InsuranceCTA({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  agencyName,
}: InsuranceCTAProps) {
  const descriptionWithAgency = agencyName ? description.replace(/\{agency_name\}/g, agencyName) : description;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="relative overflow-hidden bg-card rounded-2xl border border-border shadow-lg px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute -top-20 -left-10 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                {title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                {descriptionWithAgency}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-end gap-3 lg:gap-4">
              <Link
                href={primaryButtonHref}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
              >
                {primaryButtonText}
              </Link>
              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-border text-foreground bg-transparent hover:border-primary/60 hover:text-primary hover:bg-primary/5 font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
              >
                {secondaryButtonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}