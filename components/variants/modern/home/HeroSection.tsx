import { isMultiLocation, getAllWebsites } from '@/lib/website';
import { Star, CheckCircle2, Users } from 'lucide-react';
import HeroCTAButton from './HeroCTAButton';

export async function Hero() {
  const [multiLocation, locations] = await Promise.all([
    isMultiLocation(),
    getAllWebsites()
  ]);

  const locationData = locations?.map(loc => ({
    id: loc.id,
    location_name: `${loc.city}, ${loc.state}`,
    city: loc.city,
    state: loc.state,
    location_slug: loc.location_slug,
  })) || [];

  return (
    <section className="relative min-h-[600px] bg-gradient-to-b from-primary/10 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Subtitle Badge */}
          {/* <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-2 border border-secondary/20">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span className="text-sm font-medium">Trusted Georgia Insurance</span>
          </div> */}

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-theme-text leading-tight max-w-3xl">
            Protecting What <span className="text-primary">Matters Most</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-theme-body max-w-2xl leading-relaxed">
            Your trusted insurance partner serving communities across Georgia with personalized coverage for home, auto,
            and business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <HeroCTAButton 
              isMultiLocation={multiLocation}
              locations={locationData}
            />
            {/* <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary text-primary"
            >
              Get a Quote
            </Button> */}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-12">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <span className="text-sm text-theme-body font-medium">5-Star Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm text-theme-body font-medium">Family Owned</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-theme-body font-medium">Local Experts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 bg-modern-primary-5"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 bg-modern-primary-5"></div>
    </section>
  )
}

// Default export for backward compatibility
export default Hero
