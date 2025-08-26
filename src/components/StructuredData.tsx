'use client';

interface ServiceSchema {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  serviceType: string;
  areaServed: string;
}

interface WebsiteSchema {
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  isPartOf: {
    name: string;
    url: string;
  };
}

export function ServiceStructuredData() {
  const services: ServiceSchema[] = [
    {
      name: "Desarrollo Web Profesional",
      description: "Desarrollo de sitios web modernos con React, Next.js y tecnologías de vanguardia",
      provider: {
        name: "WebHost Pro",
        url: "https://webhostpro.com"
      },
      serviceType: "WebDevelopment",
      areaServed: "México"
    },
    {
      name: "Hosting Optimizado",
      description: "Hosting de alta velocidad con CDN global, SSL gratuito y backups automáticos",
      provider: {
        name: "WebHost Pro", 
        url: "https://webhostpro.com"
      },
      serviceType: "WebHosting",
      areaServed: "Global"
    },
    {
      name: "Diseño UI/UX",
      description: "Diseños atractivos y funcionales que convierten visitantes en clientes",
      provider: {
        name: "WebHost Pro",
        url: "https://webhostpro.com"
      },
      serviceType: "DesignService", 
      areaServed: "México"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "Organization",
      "name": "WebHost Pro",
      "url": "https://webhostpro.com"
    },
    "serviceType": services.map(service => service.serviceType),
    "description": "Servicios profesionales de desarrollo web, hosting y diseño digital",
    "areaServed": "México",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Desarrollo Web",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "serviceType": service.serviceType,
          "provider": service.provider
        },
        "position": index + 1
      }))
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

export function WebsiteStructuredData() {
  const websiteData: WebsiteSchema = {
    url: "https://webhostpro.com",
    name: "WebHost Pro",
    description: "Desarrollo web profesional y hosting optimizado en México",
    inLanguage: "es",
    isPartOf: {
      name: "WebHost Pro",
      url: "https://webhostpro.com"
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": websiteData.url,
    "name": websiteData.name,
    "description": websiteData.description,
    "inLanguage": websiteData.inLanguage,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${websiteData.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://facebook.com/webhostpro",
      "https://twitter.com/webhostpro", 
      "https://linkedin.com/company/webhostpro"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

export function LocalBusinessStructuredData() {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "WebHost Pro",
    "description": "Desarrollo web profesional, hosting optimizado y soluciones digitales integrales",
    "url": "https://webhostpro.com",
    "telephone": "+1-555-123-4567",
    "email": "hola@webhostpro.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MX",
      "addressLocality": "Ciudad de México",
      "addressRegion": "CDMX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.4326",
      "longitude": "-99.1332"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "México"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios Digitales",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desarrollo Web",
            "description": "Sitios web modernos con React y Next.js"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Hosting Web",
            "description": "Hosting optimizado con CDN y SSL"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessData)
      }}
    />
  );
}
