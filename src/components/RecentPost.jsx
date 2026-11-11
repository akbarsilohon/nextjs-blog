import { getPostsLimit } from '@/src/libs/posts';
import Link from 'next/link';
import LazyImage from "@/src/components/LazyImage";

export function RenderRecentPosts({ limit = 10 }){
    const posts = getPostsLimit( limit );
    return (
        <div className="recentSidebar">
            <div className="sidebarSection_header">
                <span className="sideTSection">Recent Posts</span>
            </div>
            <div className="recentLoop">
                { posts.map((post, index) => (
                    <article key={index} className="recent_art">
                        <Link href={`/post/${post.slug}`} className="recent_link">
                            <LazyImage
                                className="recent_thumb"
                                src={post.thumbnail}
                                alt={post.title}
                                width={800}
                                height={400}
                                priority={false}
                            />
                        </Link>
                        <div className="recent_content">
                            <time dateTime={post.date} className="rencet_time">
                                <i className="fa-regular fa-calendar-days"></i>{" "}
                                {post.date ? post.date.substring(0, 10) : ''}
                            </time>
                            <Link href={`/post/${post.slug}`} className="recent_title">
                                <h4>{post.title}</h4>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export function SuspenseRencetPost({ limit = 5 }){
    return (
        <div className="recentSidebar">
            <div className="suspanse_breadc">
                <span className="suspanse_chile suspanse"></span>
                <br />
                <br />
            </div>

            <div className="recentLoop">
                { Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="recent_art">
                        <div className="recent_link suspanse"></div>
                        <div className="recent_content">
                            <span className="suspanse_chile suspanse"></span>
                            <br />
                            <span className="suspanse_full suspanse"></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}