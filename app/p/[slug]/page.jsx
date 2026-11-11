import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getSiteConfig } from '@/src/libs/sites';
import { getWebPageBySlug } from '@/src/libs/pages';
import { RenderRecentPosts, SuspenseRencetPost } from '@/src/components/RecentPost';
import Link from 'next/link';
import Image from 'next/image';
import '@/style/single.css';

export async function generateMetadata({ params }){
    const resolvedParams = await params;
    const slug = decodeURIComponent(resolvedParams.slug);
    const webpage = getWebPageBySlug( slug );
    const config = getSiteConfig();
    const baseUrl = config.baseUrl;

    if (!webpage) {
        return {
            title: `Not Found ${config.sparator || '-'} ${config.siteName}`,
        };
    }

    return {
        title: `${webpage.title} ${config.sparator || '-'} ${config.siteName}`,
        description: webpage.description || webpage.summary || '',
        alternates: {
            canonical: `${baseUrl}/p/${resolvedParams.slug}`,
        },
    }
}

export default function WebPage({ params }){
    return (
        <section className="singleUs_sidebar">
            <Suspense fallback={<WebpageSuspense />}>
                <PageContent params={params} />
            </Suspense>
            <div className="single_sidebar">
                <div className="singleAds">
                    Your Ads Here
                </div>
                <Suspense fallback={<SuspenseRencetPost limit={5} />}>
                    <RenderRecentPosts limit={5} />
                </Suspense>
            </div>
        </section>
    );
}

async function PageContent({ params }){
    const resolvedParams = await params;
    const slug = decodeURIComponent(resolvedParams.slug);
    const webpage = getWebPageBySlug( slug );

    if (!webpage) {
        notFound();
    }

    return (
        <div className="main_single_post">
            <article id={slug} className="single_article">
                <div className="single_header">
                    <div className="single_bread">
                        <Link href="/" className="breahome">
                            <span className="brd_icon">
                                <i className="fa-regular fa-house"></i>
                            </span>
                            <span className="brd_text">Home</span>
                        </Link>
                        <span className="brd_sparator">
                            <i className="fa-solid fa-angle-right"></i>
                        </span>
                        <span className="breahome active">
                            {webpage.title}
                        </span>
                    </div>
                    <h2 className="single_title">{webpage.title}</h2>
                    {  webpage.thumbnail && (
                        <div className="singleThumbnail">
                            <Image
                                src={webpage.thumbnail}
                                alt={webpage.title}
                                width={800}
                                height={400}
                                loading='eager'
                            />
                        </div>
                    )}
                </div>
                <div className="postContent"
                    dangerouslySetInnerHTML={{ __html: webpage.content }} 
                />
            </article>
        </div>
    );
}

async function WebpageSuspense() {
    return (
        <div className="suspense_main">
            <div className="suspanse_breadc">
                <span className="suspanse_chile suspanse"></span>
                <span className="suspanse_sparator suspanse"></span>
                <span className="suspanse_chile suspanse"></span>
                <span className="suspanse_sparator suspanse"></span>
                <span className="suspanse_chile suspanse"></span>
            </div>
            <span className="suspanse_title">
                <span className="suspanse suspanse_t50"></span>
            </span>
            <div className="suspanse_thumb suspanse"></div>
            <div className="suspanse_content">
                <span className="suspanse_full suspanse"></span>
                <span className="suspanse_full suspanse"></span>
                <span className="suspanse_full suspanse"></span>
                <span className="suspanse_40 suspanse"></span>
            </div>
            <div className="suspanse_content">
                <span className="suspanse_full suspanse"></span>
                <span className="suspanse_full suspanse"></span>
                <span className="suspanse_full suspanse"></span>
                <span className="suspanse_40 suspanse"></span>
            </div>
            <div className="suspanse_content">
                <span className="suspanse_full suspanse"></span>
                <span className="suspanse_full suspanse"></span>
                <span className="suspanse_full suspanse"></span>
                <span className="suspanse_40 suspanse"></span>
            </div>
        </div>
    );
}