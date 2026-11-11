import { notFound } from 'next/navigation';
import { getSiteConfig } from '@/src/libs/sites';
import { getPostsByPage } from '@/src/libs/posts';
import BlogListClient from '@/src/components/BlogListClient';
import '../../style/blog.css';

export async function generateMetadata(){
    const config = getSiteConfig();
    const baseUrl = config.baseUrl;
    return {
        title: `Blog posts ${config.sparator} ${config.siteName}`,
        description: config.homeDesc,
        alternates: {
            canonical: `${baseUrl}/blog`,
        },
    }
}

export default function BlogPage(){
    const initialPosts = getPostsByPage(10, 0);

    return (
        <section className="blogPostWith_Sidebar">
            {initialPosts && initialPosts.length > 0 ? (
                <BlogListClient initialPosts={initialPosts} />
            ) : (
                <p>Empty.</p>
            )}
            <div className="blogSidebar">
                <div className="blogAdsStiky">
                    Your Adsense
                </div>
            </div>
        </section>
    );
}