import LazyImage from "@/src/components/LazyImage";
import Link from "next/link";

export default function ThemeThree({category}){
    const categoryName = category && category.length > 0 ? category[0].category : 'Theme Two';
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');

    return(
        <>
            {category && category.length > 0 && (
                <section className="themeThree">
                    <div className="sectionHeader">
                        <div className="sectionHeading">
                            <span className="sectionName">
                                { categoryName }
                            </span>
                        </div>
                        <Link href={`/category/${categorySlug}`} className="sectionMore">
                            Load more
                            <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                    <div className="themeTwo_featured">
                        {category.map((post, index) => (
                            <article key={index} className="themeTwo_art">
                                <Link href={`/post/${post.slug}`} className="twoFeatured_link">
                                    <LazyImage
                                        className="twoFeatured_Thumbnail"
                                        src={post.thumbnail}
                                        alt={post.title}
                                        width={800}
                                        height={400}
                                        priority={false}
                                    />
                                </Link>
                                <Link href={`/post/${post.slug}`} className="twoFeatured_title">
                                    <h2>{post.title}</h2>
                                </Link>
                                <p className="twoFeatured_desc">
                                    {post.description} ...
                                </p>
                                <time dateTime={post.date} className="twoFeatured_time">
                                    <i className="fa-regular fa-calendar-days"></i>{" "}
                                    {post.date ? post.date.substring(0, 10) : ''}
                                </time>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}