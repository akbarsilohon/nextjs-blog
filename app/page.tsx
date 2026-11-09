import { getSiteConfig } from '@/src/libs/sites';
import { checkPostsExists, getPostsLimit, getPostsByCategory } from '@/src/libs/posts';
import Slider from '@/src/home/Slider';
import '../style/home.css';

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
  const hasPosts = checkPostsExists();
  const dataSlider = getPostsLimit(6);
  return (
    <>
      { hasPosts
        ?
        <Slider dataSlider={dataSlider} />
        :
        <div className="nothingPosts">
          <span className="emptyIcon">
            <i className="fa-regular fa-pen-to-square"></i>
          </span>
          <h1 className="emptyTitle">Empty Blog Post</h1>
          <p className="emptyText">Post empty, visit this blog another time.</p>
        </div>
      }
    </>
  );
}