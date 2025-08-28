import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ServiceStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from '@/components/StructuredData';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebHostPro - Desarrollo Web y Hosting Profesional",
  description: "Desarrollamos sitios web modernos, rápidos y escalables. Desde desarrollo frontend hasta hosting optimizado, transformamos tus ideas en experiencias digitales extraordinarias.",
  keywords: ["desarrollo web", "hosting", "diseño web", "aplicaciones móviles", "SEO", "Next.js", "React", "México"],
  authors: [{ name: "WebHostPro Team" }],
  creator: "WebHostPro",
  publisher: "WebHostPro",
  metadataBase: new URL('https://webhostpro.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "WebHostPro - Desarrollo Web y Hosting Profesional",
    description: "Desarrollamos sitios web modernos, rápidos y escalables. Desde desarrollo frontend hasta hosting optimizado.",
    url: 'https://webhostpro.com',
    siteName: 'WebHostPro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebHostPro - Desarrollo Web Profesional',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "WebHostPro - Desarrollo Web y Hosting Profesional",
    description: "Desarrollamos sitios web modernos, rápidos y escalables.",
    images: ['/og-image.jpg'],
    creator: '@webhostpro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10069f" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "WebHostPro",
              "url": "https://webhostpro.com",
              "logo": "https://webhostpro.com/logo.png",
              "description": "Desarrollo web profesional y hosting optimizado",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "MX",
                "addressLocality": "Ciudad de México"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "hola@webhostpro.com"
              },
              "sameAs": [
                "https://facebook.com/webhostpro",
                "https://twitter.com/webhostpro",
                "https://linkedin.com/company/webhostpro"
              ]
            })
          }}
        />
        <ServiceStructuredData />
        <WebsiteStructuredData />
        <LocalBusinessStructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
