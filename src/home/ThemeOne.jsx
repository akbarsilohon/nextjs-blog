import LazyImage from "@/src/components/LazyImage";
import Link from "next/link";

export default function ThemeOne({ category }){
    const categoryName = category && category.length > 0 ? category[0].category : 'Theme One';
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');

    return(
        <>
            {category && category.length > 0 && (
                <section className="themeOne">
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

                    <div className="themeOneLoop">
                        {category.map((post, index) => {
                            if(index === 0){
                                return (
                                    <article key={index} className="themeOne_featured">
                                        <Link href={`/post/${post.slug}`} className="oneFeatured_link">
                                            <LazyImage
                                                className="oneFeatured_Thumbnail"
                                                src={post.thumbnail}
                                                alt={post.title}
                                                width={800}
                                                height={400}
                                                priority={false}
                                            />
                                        </Link>
                                        <div className="oneFeatured_Asset">
                                            <time dateTime={post.date} className="oneFeatured_Time">
                                                <i className="fa-regular fa-calendar-days"></i>{" "}
                                                {post.date ? post.date.substring(0, 10) : ''}
                                            </time>
                                            <Link href={`/post/${post.slug}`} className="oneFeature_Heading">
                                                <h2>{post.title}</h2>
                                            </Link>
                                            <p className="oneFeatured_Desc">
                                                {post.description} ...
                                            </p>
                                        </div>
                                    </article>
                                );
                            }
                            return null;
                        })}

                        {category.length > 1 && (
                            <div className="themOneMore">
                                {category.map((post, index) => {
                                    if(index > 0){
                                        return (
                                            <article key={index} className="themeOne_Child">
                                                <Link href={`/post/${post.slug}`} className="oneChild_link">
                                                    <LazyImage 
                                                        className="oneChild_thumb"
                                                        src={post.thumbnail}
                                                        alt={post.title}
                                                        width={800}
                                                        height={400}
                                                        priority={false}
                                                    />
                                                </Link>
                                                <div className="oneChild_asset">
                                                    <time dateTime={post.date} className="oneChild_time">
                                                        <i className="fa-regular fa-calendar-days"></i>{" "}
                                                        {post.date ? post.date.substring(0, 10) : ''}
                                                    </time>
                                                    <Link href={`/post/${post.slug}`} className="oneChild_title">
                                                        <h3>{post.title}</h3>
                                                    </Link>
                                                </div>
                                            </article>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}