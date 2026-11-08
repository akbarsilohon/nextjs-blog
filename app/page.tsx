import { getSiteConfig } from '@/src/libs/sites';

export async function generateMetadata(){
  const config = getSiteConfig();
  const baseUrl = config.baseUrl;
  return {
    title: `${config.siteName} ${config.sparator} ${config.tagline}`,
    description: config.homeDesc,
    alternates: {
      canonical: baseUrl,
    },

    openGraph: {
      title: `${config.siteName} ${config.sparator} ${config.tagline}`,
      description: config.homeDesc,
      url: baseUrl,
      siteName: config.siteName,
      images: [
        {
          url: `${baseUrl + config.ogImage}`,
          width: 1200,
          height: 630,
          alt: config.siteName,
        },
      ],
      locale: `${config.locale}`,
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: `${config.siteName} ${config.sparator} ${config.tagline}`,
      description: config.homeDesc,
      images: [`${baseUrl + config.ogImage}`],
    },
  }
}

export default function Home() {
  return (
    <h1>Halo</h1>
  );
}