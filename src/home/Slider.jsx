'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

function urlize(str) {
    if (!str) return '';
    return String(str)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export default function Slider({ dataSlider }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const length = dataSlider?.length || 0;
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        if (length > 1) {
            resetTimeout();
            timeoutRef.current = setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1));
            }, 10000);

            return () => {
                resetTimeout();
            };
        }
    }, [currentIndex, length]);

    if (!dataSlider || length === 0) return null;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? length - 1 : prevIndex - 1));
    };

    return (
        <section className="sliderSection">
            <button className={`slide_nav prev ${length <= 1 ? 'disabled' : ''}`} onClick={prevSlide}disabled={length <= 1}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="sliderContainer">
                { dataSlider.map((post, index) => {
                    const isActive = index === currentIndex;
                    const catUrl = urlize(post.category);
                    return (
                        <div key={index} className={`sliderItem ${isActive ? 'active' : ''}`}>
                            <Link href={`/post/${post.slug}`} className="slideThumb">
                                { post.thumbnail && (
                                    <Image src={post.thumbnail} alt={post.title || 'Slider image'} width={800} height={400} priority={index === 0} loading={index === 0 ? 'eager' : 'lazy'}/>
                                )}
                            </Link>
                            <div className="slideAssets">
                                <div className="slideMetas">
                                    <Link href={`/category/${catUrl}`} className="slideBadge">
                                        <i className="fa-solid fa-tag"></i>
                                        {post.category}
                                    </Link>
                                    <span className="slideSparator">
                                        <i className="fa-solid fa-angle-right"></i>
                                    </span>
                                    <time dateTime={post.date} className="slideTime">
                                        <i className="fa-regular fa-calendar-days"></i>{" "}
                                        {post.date ? post.date.substring(0, 10) : ''}
                                    </time>
                                </div>

                                <Link href={`/post/${post.slug}`} className="sliderTitleLink">
                                    <h2 className="slideTitle">{post.title}</h2>
                                </Link>

                                <p className="slideDesc">
                                    {post.description} ...
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className={`slide_nav next ${length <= 1 ? 'disabled' : ''}`} onClick={nextSlide} disabled={length <= 1}>
                <i className="fa-solid fa-angle-right"></i>
            </button>

            <div className="sliderDots">
                {dataSlider.map((_, index) => (
                    <button key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(index)}aria-label={`Go to slide ${index + 1}`} />
                ))}
            </div>
        </section>
    );
}