/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://webhostpro.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap-index.xml'],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/private', '/*.json$'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/private'],
      },
    ],
    additionalSitemaps: [
      'https://webhostpro.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Páginas principales con alta prioridad
    const highPriorityPages = ['/', '/servicios', '/contacto'];
    const isHighPriority = highPriorityPages.includes(path);
    
    return {
      loc: path,
      changefreq: isHighPriority ? 'daily' : 'weekly',
      priority: isHighPriority ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    }
  },
};
