// Layout Components
export { default as Header } from "./layout/Header";
export { default as Footer } from "./layout/Footer";

// Home Page Components
export { default as HeroSection } from "./home/HeroSection";
export { default as IntroSection } from "./home/IntroSection";
export { default as LocationPoliciesSection } from "./home/LocationPoliciesSection";
export { default as Testimonials } from "./home/Testimonials";
export { default as HomeCTA } from "./home/HomeCTA";
export { default as FAQPreview } from "./home/FAQPreview";
export { default as CareersSection } from "./home/CareersSection";

// Policy Components - Removed PolicyPageTemplate export to avoid styled-jsx client-only import issues
// Import directly from ./policies/PolicyPageTemplate when needed

// Location Components
export { default as LocationFeaturedPolicies } from "./location/LocationFeaturedPolicies";
