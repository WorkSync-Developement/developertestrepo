# Removed Features - Service Bold Variant

This file documents hardcoded content that was removed to make the variant fully database-driven. These can be re-added later if needed.

---

## HeroSection - Trust Indicators

Previously hardcoded trust indicators at the bottom of the hero:

```tsx
const trustIndicators = [
  'Licensed & Insured',
  'Local Expertise',
  'Top-Rated Service',
];

// Rendered as:
<div className="inline-flex flex-wrap gap-4 p-4 rounded-lg backdrop-blur-sm border border-white/20">
  {trustIndicators.map((indicator, idx) => (
    <div key={idx} className="flex items-center gap-2">
      <CheckCircle size={18} style={{ color: colors.accent }} />
      <span className="text-white text-sm">{indicator}</span>
    </div>
  ))}
</div>
```

---

## ServicesSection - Default Services

Previously hardcoded fallback services when no policies exist in database:

```tsx
const defaultServices: ServiceItem[] = [
  {
    id: 'auto',
    icon: 'car',
    title: 'Auto Insurance',
    slug: 'auto-insurance',
    description: 'Comprehensive auto coverage including collision, liability, and uninsured motorist protection for complete peace of mind on the road.',
    details: [
      'Collision & comprehensive coverage',
      'Liability protection',
      'Uninsured motorist coverage',
      'Roadside assistance options',
    ],
  },
  {
    id: 'home',
    icon: 'home',
    title: 'Home Insurance',
    slug: 'home-insurance',
    description: 'Protect your most valuable asset with coverage for your home, personal property, and liability protection for your family.',
    details: [
      'Dwelling & structure coverage',
      'Personal property protection',
      'Liability coverage',
      'Additional living expenses',
    ],
  },
  {
    id: 'business',
    icon: 'briefcase',
    title: 'Business Insurance',
    slug: 'business-insurance',
    description: 'Customized commercial insurance solutions to protect your business, employees, and assets from unexpected risks.',
    details: [
      'General liability coverage',
      'Property insurance',
      'Workers compensation',
      'Professional liability',
    ],
  },
  {
    id: 'life',
    icon: 'heart',
    title: 'Life Insurance',
    slug: 'life-insurance',
    description: 'Secure your family\'s financial future with term, whole, and universal life insurance options tailored to your needs.',
    details: [
      'Term life policies',
      'Whole life coverage',
      'Universal life options',
      'Family protection plans',
    ],
  },
  {
    id: 'umbrella',
    icon: 'umbrella',
    title: 'Umbrella Insurance',
    slug: 'umbrella-insurance',
    description: 'Extra liability protection that goes beyond your standard policies to safeguard your assets and future earnings.',
    details: [
      'Extended liability limits',
      'Asset protection',
      'Legal defense coverage',
      'Worldwide coverage',
    ],
  },
  {
    id: 'specialty',
    icon: 'shield',
    title: 'Specialty Insurance',
    slug: 'specialty-insurance',
    description: 'Specialized coverage for unique needs including flood, earthquake, recreational vehicles, and valuable collections.',
    details: [
      'Flood insurance',
      'Earthquake coverage',
      'RV & boat insurance',
      'Valuable items coverage',
    ],
  },
];
```

Also removed hardcoded service detail bullets:
```tsx
details: [
  'Personalized coverage options',
  'Competitive rates',
  'Expert guidance',
  '24/7 claims support',
],
```

---

## WhyChooseUsSection - All Content

This entire section was hardcoded. Consider creating a `client_home_page.why_choose_us_section` JSON field.

### Benefits Array
```tsx
const benefits = [
  {
    icon: Award,
    title: 'Industry Experience',
    description: 'Over 15 years of professional insurance expertise serving our community',
  },
  {
    icon: ThumbsUp,
    title: 'Local Expertise',
    description: 'Deep understanding of local needs and personalized coverage solutions',
  },
  {
    icon: Clock,
    title: 'Dedicated Service',
    description: 'Consistent, responsive support with 98% client satisfaction rating',
  },
  {
    icon: Heart,
    title: 'Quality Assurance',
    description: 'Award-winning service with hundreds of successful policy placements',
  },
];
```

### Credentials Array
```tsx
const credentials = [
  {
    icon: Medal,
    title: 'Licensed Agents',
    description: 'State-licensed insurance professionals',
  },
  {
    icon: FileCheck,
    title: 'Fully Insured',
    description: 'E&O coverage for your protection',
  },
  {
    icon: User,
    title: 'Certified Advisors',
    description: 'Industry-certified insurance specialists',
  },
  {
    icon: Briefcase,
    title: 'Multi-Carrier Access',
    description: 'Access to top-rated insurance carriers',
  },
];
```

### Commitment Points
```tsx
const commitmentPoints = [
  { icon: Leaf, text: 'Personalized coverage plans tailored to your unique needs' },
  { icon: Shield, text: 'Fully licensed and insured professionals you can trust' },
  { icon: Droplet, text: 'Competitive rates with comprehensive protection options' },
];
```

---

## GallerySection - Default Gallery Items

The GallerySection component is kept but disconnected from the home page. Default items were:

```tsx
const defaultGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Family Protection',
    category: 'Life Insurance',
    imageUrl: '/Images/placeholders/gallery-1.jpg',
    location: 'Local Family',
  },
  {
    id: '2',
    title: 'Home Coverage',
    category: 'Home Insurance',
    imageUrl: '/Images/placeholders/gallery-2.jpg',
    location: 'Residential',
  },
  {
    id: '3',
    title: 'Business Solutions',
    category: 'Commercial Insurance',
    imageUrl: '/Images/placeholders/gallery-3.jpg',
    location: 'Local Business',
  },
  {
    id: '4',
    title: 'Auto Protection',
    category: 'Auto Insurance',
    imageUrl: '/Images/placeholders/gallery-4.jpg',
    location: 'Vehicle Coverage',
  },
  {
    id: '5',
    title: 'Community Support',
    category: 'Community',
    imageUrl: '/Images/placeholders/gallery-5.jpg',
    location: 'Local Events',
  },
  {
    id: '6',
    title: 'Team Excellence',
    category: 'Our Team',
    imageUrl: '/Images/placeholders/gallery-6.jpg',
    location: 'Agency Team',
  },
];
```

---

## TestimonialsSection - Default Testimonials

```tsx
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'They made finding the right insurance coverage so easy. Professional, knowledgeable, and truly care about their clients.',
    name: 'Sarah M.',
    title: 'Homeowner',
    location: 'Local Resident',
    rating: 5,
  },
  {
    id: '2',
    quote: 'Excellent service from start to finish. They found us better coverage at a lower rate than we were paying before.',
    name: 'Michael R.',
    title: 'Business Owner',
    location: 'Small Business',
    rating: 5,
  },
  {
    id: '3',
    quote: 'When we had a claim, they were there every step of the way. That\'s when you really see the value of a good agent.',
    name: 'Jennifer L.',
    title: 'Family Client',
    location: 'Auto & Home',
    rating: 5,
  },
];
```

---

## ContactCTA - Hardcoded Text

```tsx
// Section headings
<p>Get In Touch</p>
<h2>Ready to Get Protected?</h2>
<p>Contact us today for a free, no-obligation consultation...</p>

// CTA card text
<h3>Get a Free Quote</h3>
<p>No spam, no pressure. Just honest advice from local insurance experts...</p>
<p>Available Monday - Friday, 9am - 5pm</p>
```

---

## Footer - Credentials Strip

```tsx
const credentials = [
  { icon: Shield, text: 'Licensed & Insured' },
  { icon: Award, text: 'Top Rated Agency' },
  { icon: Clock, text: '24/7 Claims Support' },
  { icon: CheckCircle, text: 'Trusted Since 2010' },
];
```

---

## How to Re-enable

1. **Trust Indicators**: Add to `client_home_page.hero_section.trust_indicators[]`
2. **Default Services**: Keep as fallback or create seed data in `client_policy_pages`
3. **WhyChooseUs**: Add `client_home_page.why_choose_us_section` JSON field
4. **Gallery**: Create `client_gallery` table or `client_home_page.gallery_section`
5. **Testimonials**: Ensure `client_home_page.testimonials_section.testimonials[]` has data
6. **ContactCTA Text**: Add to `client_home_page.cta_section`
7. **Footer Credentials**: Use existing `client_badges` table
