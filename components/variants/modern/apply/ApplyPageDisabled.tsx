export default function ModernApplyPageDisabled() {
  return (
    <div className="min-h-screen bg-gradient-modern-section flex items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 bg-gradient-modern-radial-primary"></div>
      
      <div className="text-center px-4 relative z-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-theme-text mb-4">
          Applications Currently Closed
        </h1>
        <p className="text-lg text-theme-body">
          We are not accepting applications at this time. Please check back later.
        </p>
      </div>
    </div>
  );
}
