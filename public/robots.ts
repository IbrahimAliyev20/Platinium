import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_BASE_URL || 'https://platinium-17.az';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/private/',
        '/auth/',
        '/?',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}