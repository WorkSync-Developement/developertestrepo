"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
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
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-dark leading-tight max-w-3xl">
            Protecting What <span style={{ color: '#5b7c99' }}>Matters Most</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-text-light max-w-2xl leading-relaxed">
            Your trusted insurance partner serving communities across Georgia with personalized coverage for home, auto,
            and business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="text-white gap-2" style={{ backgroundColor: '#5b7c99' }}>
              Find a Location
              <ArrowRight size={18} />
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="bg-transparent"
              style={{ borderColor: '#5b7c99', color: '#5b7c99' }}
            >
              Get a Quote
            </Button> */}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-12">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-sm text-text-light font-medium">5-Star Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm text-text-light font-medium">Family Owned</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              <span className="text-sm text-text-light font-medium">Local Experts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: 'rgba(91, 124, 153, 0.05)' }}></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2" style={{ backgroundColor: 'rgba(91, 124, 153, 0.05)' }}></div>
    </section>
  )
}

// Default export for backward compatibility
export default Hero
