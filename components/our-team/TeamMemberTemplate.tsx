import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, ArrowLeft, CheckCircle2, Award } from 'lucide-react';
import { Divider } from '@/components/ui/Divider';

interface TeamMemberTemplateProps {
  children?: ReactNode;
  teamMember: {
    name: string;
    position: string;
    excerpt: string;
    imagePath: string;
    email?: string;
    phone?: string;
    specialties?: string[];
    hide_email_in_website?: boolean;
  };
  basePath?: string;
}

export default function TeamMemberTemplate({
  children,
  teamMember,
  basePath = '/our-team',
}: TeamMemberTemplateProps) {
  return (
    <main className="flex-grow bg-background">
      {/* Navigation Breadcrumb - Floating/Minimal */}
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-screen-xl">
          <Link 
            href={basePath} 
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-3 group-hover:bg-primary/10 transition-colors">
              <ArrowLeft size={16} className="text-secondary group-hover:text-primary transition-colors" />
            </div>
            <span>Back to Team</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-screen-xl py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar - Image & Contact Info */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-8">
              {/* Profile Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border shadow-lg">
                <Image
                  src={teamMember.imagePath || "/Images/team/placeholder.jpg"}
                  alt={teamMember.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 400px"
                  quality={95}
                  priority
                />
              </div>

              {/* Contact Information Card */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-heading font-bold text-foreground mb-4 pb-2 border-b border-border">
                  Contact Info
                </h3>
                <div className="flex flex-col space-y-4">
                  {(teamMember.email || teamMember.phone) ? (
                    <>
                      {teamMember.email && (
                        <div className="group">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                          <a
                            href={`mailto:${teamMember.email}`}
                            className="flex items-center text-foreground hover:text-primary transition-colors font-medium break-all"
                          >
                            <Mail size={16} className="mr-2 text-primary shrink-0" />
                            {teamMember.hide_email_in_website ? 'Email Hidden' : teamMember.email}
                          </a>
                        </div>
                      )}
                      {teamMember.phone && (
                        <div className="group">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
                          <a
                            href={`tel:${teamMember.phone}`}
                            className="flex items-center text-foreground hover:text-primary transition-colors font-medium"
                          >
                            <Phone size={16} className="mr-2 text-primary shrink-0" />
                            {teamMember.phone}
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-muted-foreground text-sm">Contact details available upon request.</p>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                   <Link
                    href={basePath.includes('/locations/') ? `${basePath.split('/our-team')[0]}/contact` : '/contact'}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg text-center block transition-all shadow-md hover:shadow-lg"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* Header */}
            <div className="mb-10 pb-8 border-b border-border">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4">
                {teamMember.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-medium text-lg">
                  {teamMember.position}
                </span>
                {teamMember.specialties && teamMember.specialties.length > 0 && (
                  <span className="text-muted-foreground flex items-center">
                    <Award className="w-5 h-5 mr-2 text-muted-foreground" />
                    {teamMember.specialties.length} Areas of Expertise
                  </span>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="prose prose-lg prose-slate max-w-none mb-12">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center">
                About {teamMember.name.split(' ')[0]}
              </h2>
              <div className="text-muted-foreground leading-relaxed">
                {children}
              </div>
            </div>

            {/* Specialties Grid */}
            {teamMember.specialties && teamMember.specialties.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Areas of Expertise
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {teamMember.specialties.map((specialty, i) => (
                    <div
                      key={i}
                      className="flex items-center p-4 bg-muted/30 rounded-xl border border-border/50 hover:border-primary/20 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-4 shadow-sm text-primary">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="font-medium text-foreground">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quote / Highlight (Optional based on excerpt) */}
            {teamMember.excerpt && (
               <div className="bg-primary/5 border-l-4 border-primary p-8 rounded-r-xl my-8">
                 <p className="text-xl font-medium text-foreground italic">
                   &quot;{teamMember.excerpt}&quot;
                 </p>
               </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}