'use client';

import { useEffect, useState, useRef } from 'react';

interface UseScrollSpyOptions {
  sections: string[];
  rootMargin?: string;
  threshold?: number;
}

export const useScrollSpy = ({
  sections,
  rootMargin = '-20% 0px -60% 0px',
  threshold = 0.1
}: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin,
      threshold,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // Process entries in reverse order to prioritize lower sections
      for (let i = entries.length - 1; i >= 0; i--) {
        const entry = entries[i];
        
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          break; // Stop at the first intersecting section (from bottom)
        }
      }
    }, options);

    // Observe all sections
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    // Set initial active section (usually the first one)
    if (sections.length > 0 && !activeSection) {
      setActiveSection(sections[0]);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections, rootMargin, threshold]);

  return activeSection;
};
