// components/LazyImage.jsx
'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function LazyImage({ src, alt, className, width, height, priority = false }) {
    const [isLoaded, setIsLoaded] = useState(priority);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef(null);

    useEffect(() => {
        if (priority) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '-100px 0px',
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [priority]);

    return (
        <div ref={imgRef} className="imageWrapper">
            {!isLoaded && (
                <div className="imagePlaceholder">
                    <i className="fa-regular fa-image"></i>
                </div>
            )}

            {isInView && (
                <Image
                    className={className}
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    priority={priority}
                    onLoad={() => setIsLoaded(true)}
                />
            )}
        </div>
    );
}