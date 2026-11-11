import fs from 'fs';
import path from 'path';
import { getAllPosts, getPostsLimit, getPostsByCategory } from '@/src/libs/posts';
import { getSiteConfig } from '@/src/libs/sites';

export default async function sitemap() {
    const config = getSiteConfig();
    const baseUrl = config.baseUrl;

    const latestPostsForHome = getPostsLimit(1);
    const homeLastMod = latestPostsForHome.length > 0 && latestPostsForHome[0].date 
        ? new Date(latestPostsForHome[0].date) 
        : new Date();

    const homeUrl = [{
        url: baseUrl,
        lastModified: homeLastMod,
        changeFrequency: 'daily',
        priority: 1.0,
    }];

    const pagesDirectory = path.join(process.cwd(), 'pages');
    let webPageUrls = [];
    
    if (fs.existsSync(pagesDirectory)) {
        const pageFiles = fs.readdirSync(pagesDirectory);
        webPageUrls = pageFiles
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const slug = file.replace(/\.md$/, '');
                const filePath = path.join(pagesDirectory, file);
                const stats = fs.statSync(filePath);

                return {
                    url: `${baseUrl}/p/${slug}`,
                    lastModified: new Date(stats.mtime || Date.now()),
                    changeFrequency: 'monthly',
                    priority: 0.5,
                };
            });
    }

    const posts = getAllPosts();
    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/post/${post.slug}`,
        lastModified: new Date(post.date || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];
    const categoryUrls = categories.map((category) => {
        const categorySlug = category
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-');

        const latestPostInCategory = getPostsByCategory(categorySlug, 1, 0);
        const categoryLastMod = latestPostInCategory.length > 0 && latestPostInCategory[0].date
            ? new Date(latestPostInCategory[0].date)
            : new Date();

        return {
            url: `${baseUrl}/category/${encodeURIComponent(categorySlug)}`,
            lastModified: categoryLastMod,
            changeFrequency: 'weekly',
            priority: 0.6,
        };
    });

    return [...homeUrl, ...webPageUrls, ...categoryUrls, ...postUrls];
}