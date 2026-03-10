"use client";

import { useState, useEffect } from "react";
import type { TOCHeading } from "@/lib/types";

interface TableOfContentsProps {
    headings: TOCHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
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
            <p className="font-['Candara','Calibri','Georgia',serif] text-xs font-semibold text-[#A09890] uppercase tracking-widest mb-4">
                In This Chapter
            </p>
            <ul className="space-y-2">
                {headings.map(({ id, text, level }) => (
                    <li key={id}>
                        <button
                            onClick={() => handleClick(id)}
                            className={`
                                block w-full text-left py-2 text-sm transition-all duration-200
                                font-['Candara','Calibri','Georgia',serif]
                                ${level === 3 ? "pl-5" : "pl-3"}
                                ${activeId === id
                                    ? "border-l-4 border-[#c8a96e] text-[#1e1e1e] font-bold bg-[#c8a96e]/[0.05] -ml-px"
                                    : "border-l-4 border-transparent text-[#6B6560] hover:text-[#1e1e1e] hover:border-[#c8a96e]/30"
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
