'use client';

import { useState } from "react";
import Link from "next/link";
import LazyImage from "@/src/components/LazyImage";
import { loadMorePostsAction } from "@/src/libs/actions";

function urlize(str) {
    if (!str) return '';
    return String(str)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Tambahkan parameter category di sini
export default function BlogListClient({ initialPosts, category = null }) {
    const [posts, setPosts] = useState(initialPosts);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMore = async () => {
        setLoading(true);
        try {
            const nextPage = page + 1;
            // Kirim category kalau ada (untuk halaman kategori)
            const newPosts = await loadMorePostsAction(nextPage, category);

            if (!newPosts || newPosts.length === 0) {
                setHasMore(false);
            } else {
                setPosts(prev => [...prev, ...newPosts]);
                setPage(nextPage);
            }

        } catch (error) {
            console.error("Gagal memuat pos tambahan:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="blogListContainer">
            <div className="blog_header">
                <span className="blog_heading">
                    {category ? `${category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}` : 'Blog Posts'}
                </span>
            </div>

            <div className="blogs_art">
                {posts.map((post, index) => (
                    <article key={index} className="blogCard">
                        <Link href={`/post/${post.slug}`} className="blogThumbLink">
                            <LazyImage
                                className="blogThumb"
                                src={post.thumbnail}
                                alt={post.title}
                                width={800}
                                height={400}
                                priority={false}
                            />
                        </Link>
                        <div className="blogContent">
                            <div className="blogFlex">
                                { category ? (
                                    <time dateTime={post.date} className="blogTime">
                                        <i className="fa-regular fa-calendar-days"></i>{" "}
                                        {post.date ? post.date.substring(0, 10) : ''}
                                    </time>
                                ) : (
                                    <>
                                        <Link href={`/category/${urlize(post.category)}`} className="blogCat">
                                            <i className="fa-solid fa-tag"></i>
                                            {post.category}
                                        </Link>
                                        <span className="blogSparator">
                                            <i className="fa-solid fa-angle-right"></i>
                                        </span>
                                        <time dateTime={post.date} className="blogTime">
                                            <i className="fa-regular fa-calendar-days"></i>{" "}
                                            {post.date ? post.date.substring(0, 10) : ''}
                                        </time>
                                    </>
                                )}
                            </div>
                            <Link href={`/post/${post.slug}`} className="blogTitleLink">
                                <h2>{post.title}</h2>
                            </Link>
                            <p className="blogDesc">
                                {post.description}
                            </p>
                        </div>
                    </article>
                ))}
            </div>

            {hasMore && (
                <div className="loadMoreWrapper">
                    <button onClick={handleLoadMore} disabled={loading} className="loadMoreButton">
                        {loading ? 'Memuat...' : 'Load More'}
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </button>
                </div>
            )}
        </div>
    );
}