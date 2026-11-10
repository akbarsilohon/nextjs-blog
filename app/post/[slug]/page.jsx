import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getSiteConfig } from '@/src/libs/sites';
import { getPostBySlug } from '@/src/libs/posts';
import LazyImage from '@/src/components/LazyImage';
import Link from 'next/link';
import Image from 'next/image';
import '@/style/single.css';

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = decodeURIComponent(resolvedParams.slug);
    const post = getPostBySlug(slug);
    const config = getSiteConfig();
    const baseUrl = config.baseUrl;

    if (!post) {
        return {
            title: `Artikel Tidak Ditemukan ${config.separator || '-'} ${config.siteName}`,
        };
    }

    return {
        title: `${post.title} ${config.separator || '-'} ${config.siteName}`,
        description: post.description || post.summary || '',
        alternates: {
            canonical: `${baseUrl}/post/${resolvedParams.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            url: `${baseUrl}/post/${resolvedParams.slug}`,
            type: 'article',
            images: post.thumbnail ? [{ url: post.thumbnail }] : [],
        },
    };
}

export default function PostPage({ params }) {
    return (
        <Suspense fallback={<SinglePostSuspense />}>
            <PostContent params={params} />
        </Suspense>
    );
}

async function PostContent({ params }) {
    const resolvedParams = await params;
    const slug = decodeURIComponent(resolvedParams.slug);
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <section className="singleUs_sidebar">
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
                            <Link href="/blog" className="breahome">
                                <span className="brd_text">Blog</span>
                            </Link>
                            <span className="brd_sparator">
                                <i className="fa-solid fa-angle-right"></i>
                            </span>
                            <Link href={`/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`} className="breahome active">
                                <span className="brd_text">{post.category}</span>
                            </Link>
                        </div>
                        <h2 className="single_title">{post.title}</h2>
                        {  post.thumbnail && (
                            <div className="singleThumbnail">
                                <Image
                                    src={post.thumbnail}
                                    alt={post.title}
                                    width={800}
                                    height={400}
                                    loading='eager'
                                />
                            </div>
                        )}
                    </div>
                    <div className="postContent"
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                    />
                </article>
            </div>
            <div className="single_sidebar">
                <div className="singleAds">
                    Your Ads Here
                </div>
            </div>
        </section>
    );
}

async function SinglePostSuspense() {
    return (
        <section className="singleUs_sidebar">
            <div className="suspense_main">
                <div className="suspanse_breadc">
                    <span className="suspanse_chile suspanse"></span>
                    <span className="suspanse_sparator suspanse"></span>
                    <span className="suspanse_chile suspanse"></span>
                    <span className="suspanse_sparator suspanse"></span>
                    <span className="suspanse_chile suspanse"></span>
                </div>
                <span className="suspanse_title">
                    <span className="suspanse suspanse_tfull"></span>
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
        </section>
    );
}