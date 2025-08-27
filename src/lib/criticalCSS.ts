'use client';

// Critical CSS extraction and optimization utilities

interface CriticalCSSConfig {
  viewport: {
    width: number;
    height: number;
  };
  inlineThreshold: number; // bytes
  deferNonCritical: boolean;
  minify: boolean;
}

const defaultConfig: CriticalCSSConfig = {
  viewport: {
    width: 1200,
    height: 800
  },
  inlineThreshold: 14000, // 14KB - HTTP/2 push limit
  deferNonCritical: true,
  minify: true
};

// Critical CSS rules for above-the-fold content
const criticalSelectors = [
  // Layout and structure
  'html', 'body', '*', '*::before', '*::after',
  '.container', '.max-w-', '.mx-auto', '.px-', '.py-',
  
  // Header and navigation (always visible)
  'header', 'nav', '.header', '.navigation',
  '.fixed', '.sticky', '.top-0', '.z-50',
  
  // Hero section (above the fold)
  '.hero', '.hero-section', '.banner',
  '.text-', '.font-', '.leading-', '.tracking-',
  
  // Critical animations and transitions
  '.transition', '.duration-', '.ease-',
  '.transform', '.translate-', '.scale-', '.rotate-',
  
  // Grid and flexbox (layout critical)
  '.flex', '.grid', '.items-', '.justify-', '.gap-',
  '.w-', '.h-', '.min-h-', '.max-h-',
  
  // Background and colors (visual critical)
  '.bg-', '.text-', '.border-',
  '.gradient-', '.from-', '.to-', '.via-',
  
  // Typography (content critical)
  '.text-', '.font-', '.leading-', '.tracking-',
  'h1', 'h2', 'h3', 'p', 'span',
  
  // Buttons and interactive elements (UX critical)
  'button', '.btn', '.button',
  '.hover\\:', '.focus\\:', '.active\\:',
  
  // Loading and skeleton states
  '.animate-pulse', '.animate-spin', '.animate-bounce',
  '.skeleton', '.loading'
];

// Non-critical CSS that can be deferred
const nonCriticalSelectors = [
  // Complex animations
  '.animate-', '@keyframes',
  
  // Print styles
  '@media print',
  
  // Large screen specific styles
  '@media (min-width: 1536px)',
  
  // Dark mode (can be loaded after)
  '.dark\\:',
  
  // Complex interactions
  '.group-hover\\:', '.peer-',
  
  // Third-party components
  '.swiper', '.carousel', '.modal',
  
  // Non-essential decorations
  '.decoration-', '.underline-offset-',
  '.shadow-2xl', '.shadow-inner',
  
  // Complex gradients and effects
  '.backdrop-', '.filter', '.blur-', '.brightness-'
];

// Extract critical CSS from stylesheet
export const extractCriticalCSS = (cssText: string, config: CriticalCSSConfig = defaultConfig): string => {
  const lines = cssText.split('\n');
  const criticalLines: string[] = [];
  let inCriticalRule = false;
  let braceCount = 0;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('/*')) {
      continue;
    }
    
    // Check if line contains critical selector
    const isCritical = criticalSelectors.some(selector => {
      return trimmedLine.includes(selector) || 
             trimmedLine.match(new RegExp(selector.replace(/\\\\/g, ''), 'i'));
    });
    
    // Check if line contains non-critical selector
    const isNonCritical = nonCriticalSelectors.some(selector => {
      return trimmedLine.includes(selector) || 
             trimmedLine.match(new RegExp(selector.replace(/\\\\/g, ''), 'i'));
    });
    
    // Start of a rule
    if (trimmedLine.includes('{')) {
      braceCount += (trimmedLine.match(/{/g) || []).length;
      if (isCritical && !isNonCritical) {
        inCriticalRule = true;
        criticalLines.push(line);
      }
    }
    // End of a rule
    else if (trimmedLine.includes('}')) {
      braceCount -= (trimmedLine.match(/}/g) || []).length;
      if (inCriticalRule) {
        criticalLines.push(line);
      }
      if (braceCount <= 0) {
        inCriticalRule = false;
        braceCount = 0;
      }
    }
    // Inside a rule
    else if (inCriticalRule) {
      criticalLines.push(line);
    }
    // Standalone critical declarations (like CSS variables)
    else if (isCritical && !isNonCritical) {
      criticalLines.push(line);
    }
  }
  
  let criticalCSS = criticalLines.join('\n');
  
  if (config.minify) {
    criticalCSS = minifyCSS(criticalCSS);
  }
  
  return criticalCSS;
};

// Minify CSS by removing unnecessary whitespace and comments
export const minifyCSS = (css: string): string => {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove unnecessary whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around special characters
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons
    .replace(/;}/g, '}')
    // Remove leading/trailing whitespace
    .trim();
};

// Generate critical CSS for specific components
export const generateComponentCriticalCSS = (componentName: string): string => {
  const componentStyles: Record<string, string> = {
    header: `
      .header { position: fixed; top: 0; width: 100%; z-index: 50; }
      .header-backdrop { backdrop-filter: blur(10px); }
      .nav-link { transition: color 0.2s ease; }
    `,
    hero: `
      .hero-section { min-height: 100vh; display: flex; align-items: center; }
      .hero-title { font-size: clamp(2rem, 5vw, 4rem); font-weight: 700; }
      .hero-subtitle { font-size: clamp(1rem, 2.5vw, 1.5rem); opacity: 0.8; }
      .gradient-text { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    `,
    layout: `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    `,
    animations: `
      .fade-in { animation: fadeIn 0.6s ease-out; }
      .slide-up { animation: slideUp 0.8s ease-out; }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    `
  };
  
  return minifyCSS(componentStyles[componentName] || '');
};

// Create inline critical CSS
export const createInlineCriticalCSS = (criticalCSS: string): string => {
  return `<style data-critical="true">${criticalCSS}</style>`;
};

// Create deferred CSS loading
export const createDeferredCSSLoader = (href: string, media: string = 'all'): string => {
  return `
    <link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${href}"></noscript>
  `;
};

// CSS loading strategy
export class CSSLoadingStrategy {
  private criticalCSS: string = '';
  private deferredCSS: string[] = [];
  
  constructor(private config: CriticalCSSConfig = defaultConfig) {}
  
  addCriticalCSS(css: string): void {
    this.criticalCSS += css;
  }
  
  addDeferredCSS(href: string): void {
    this.deferredCSS.push(href);
  }
  
  generateHTML(): string {
    const criticalSize = new Blob([this.criticalCSS]).size;
    let html = '';
    
    // Inline critical CSS if under threshold
    if (criticalSize <= this.config.inlineThreshold) {
      html += createInlineCriticalCSS(this.criticalCSS);
    } else {
      // Split critical CSS into chunks
      const chunks = this.splitCSSIntoChunks(this.criticalCSS, this.config.inlineThreshold);
      html += createInlineCriticalCSS(chunks[0]);
      
      // Load remaining chunks as deferred
      for (let i = 1; i < chunks.length; i++) {
        this.deferredCSS.push(`data:text/css;base64,${btoa(chunks[i])}`);
      }
    }
    
    // Add deferred CSS loading
    if (this.config.deferNonCritical) {
      for (const href of this.deferredCSS) {
        html += createDeferredCSSLoader(href);
      }
    }
    
    return html;
  }
  
  private splitCSSIntoChunks(css: string, chunkSize: number): string[] {
    const chunks: string[] = [];
    let currentChunk = '';
    const lines = css.split('\n');
    
    for (const line of lines) {
      if (new Blob([currentChunk + line]).size > chunkSize && currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = line;
      } else {
        currentChunk += line + '\n';
      }
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks;
  }
}

// React hook for critical CSS loading
export const useCriticalCSS = (componentName?: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Load non-critical CSS after component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const criticalCSS = componentName ? generateComponentCriticalCSS(componentName) : '';
  
  return {
    criticalCSS,
    isLoaded,
    shouldLoadDeferred: isLoaded
  };
};

export default {
  extractCriticalCSS,
  minifyCSS,
  generateComponentCriticalCSS,
  createInlineCriticalCSS,
  createDeferredCSSLoader,
  CSSLoadingStrategy,
  useCriticalCSS
};