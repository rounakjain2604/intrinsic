"use client";

import { useState, useEffect } from "react";

export interface TOCHeading {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    headings: TOCHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Find the first heading that is intersecting
                const visible = entries.find((e) => e.isIntersecting);
                if (visible?.target?.id) {
                    setActiveId(visible.target.id);
                }
            },
            { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
        );

        headings.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    function handleClick(id: string) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    if (headings.length === 0) return null;

    return (
        <nav
            aria-label="Table of contents"
            className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4"
        >
            <p className="font-[family-name:var(--font-sans)] text-xs font-semibold text-[#A09890] uppercase tracking-widest mb-4">
                In This Chapter
            </p>
            <ul className="space-y-1">
                {headings.map(({ id, text, level }) => (
                    <li key={id}>
                        <button
                            onClick={() => handleClick(id)}
                            className={`
                                block w-full text-left py-1.5 text-sm transition-colors duration-200
                                font-[family-name:var(--font-sans)]
                                ${level === 3 ? "pl-4" : "pl-0"}
                                ${activeId === id
                                    ? "text-[#E8694A] font-semibold"
                                    : "text-[#6B6560] hover:text-[#2D2A26]"
                                }
                            `}
                        >
                            {text}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
