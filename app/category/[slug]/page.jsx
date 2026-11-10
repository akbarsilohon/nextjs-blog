import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getSiteConfig } from '@/src/libs/sites';
import { getPostsByCategory } from '@/src/libs/posts';
import BlogListClient from '@/src/components/BlogListClient';
import '@/style/blog.css';

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = decodeURIComponent(resolvedParams.slug);
    const config = getSiteConfig();
    const baseUrl = config.baseUrl;

    const formattedCategory = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Category';

    return {
        title: `${formattedCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ${config.separator || '-'} ${config.siteName}`,
        description: `read all article about ${formattedCategory} on ${config.siteName}.`,
        alternates: {
            canonical: `${baseUrl}/category/${resolvedParams.slug}`,
        },
    }
}

export default function CategoryPage({ params }) {
    return (
        <Suspense fallback={<p>Category Loaded...</p>}>
            <CategoryContent params={params} />
        </Suspense>
    );
}

async function CategoryContent({ params }) {
    const resolvedParams = await params;
    const slug = decodeURIComponent(resolvedParams.slug);
    const initialPosts = getPostsByCategory(slug, 10, 0);
    if (!initialPosts || initialPosts.length === 0) {
        notFound();
    }

    return (
        <section className="blogPostWith_Sidebar">
            <BlogListClient initialPosts={initialPosts} category={slug} />
            <div className="blogSidebar">
                <div className="blogAdsStiky">
                    Your Adsense
                </div>
            </div>
        </section>
    );
}