import React from 'react';
import { getTemplateVariant } from '@/lib/variants';
import HeaderShell from "components/layout/HeaderShell";
import FooterShell from "components/layout/FooterShell";
import ModernHeaderShell from "@/components/variants/modern/layout/HeaderShell";
import ModernFooterShell from "@/components/variants/modern/layout/FooterShell";
import '@/styles/modern-variant.css';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const variant = await getTemplateVariant();
  
  // Use modern variant shell components if variant is modern
  const HeaderComponent = variant === 'modern' ? ModernHeaderShell : HeaderShell;
  const FooterComponent = variant === 'modern' ? ModernFooterShell : FooterShell;

  return (
    <div className={variant === 'modern' ? 'modern-variant' : ''}>
      <HeaderComponent />
      <main className="flex-grow">
        {children}
      </main>
      <FooterComponent locationSlug={null} />
    </div>
  );
}
