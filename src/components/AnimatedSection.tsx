import React, { ReactNode, forwardRef } from 'react'; // Import forwardRef

interface AnimatedSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  // Remove onVisibilityChange as parent handles observation now
}

// Use forwardRef to allow passing refs
const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(({ 
  children, 
  id, 
  className = "", 
  delay = 0 
}, ref) => { // Accept ref as the second argument

  // Remove internal intersection observer logic
  // The animation state will now depend on whether the parent component
  // applies a specific class or style based on its own observer.
  // For simplicity, let's assume it always starts visible for now,
  // or we need a different mechanism (like parent passing visibility state).
  // Let's keep the transition classes but remove the isIntersecting logic for now.
  // A better approach might be to pass the isIntersecting state as a prop.
  // Let's modify HeroSection later if needed. For now, just forward the ref.

  return (
    <section
      id={id}
      ref={ref} // Pass the forwarded ref here
      className={`transition-all duration-1000 opacity-100 translate-y-0 ${className}`} // Simplified animation classes for now
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
});

// Add display name for better debugging
AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;
