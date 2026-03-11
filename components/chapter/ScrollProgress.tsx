"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
    const progressRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let ticking = false;

        function handleScroll() {
            if (ticking) return;

            ticking = true;
            requestAnimationFrame(() => {
                const progressBar = progressRef.current;
                if (!progressBar) {
                    ticking = false;
                    return;
                }

                const scrollTop = window.scrollY;
                const docHeight =
                    document.documentElement.scrollHeight - window.innerHeight;
                const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

                progressBar.style.width = `${progress}%`;
                ticking = false;
            });
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
            <div
                ref={progressRef}
                className="h-full w-0 bg-[#c8a96e] transition-[width] duration-100 ease-out"
            />
        </div>
    );
}
