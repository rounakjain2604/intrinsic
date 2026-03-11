"use client";

import { useState } from "react";
import TableOfContents from "./TableOfContents";
import ScrollProgress from "./ScrollProgress";
import { useSidebar } from "./useSidebar";
import type { TOCHeading } from "@/lib/types";

interface ChapterLayoutProps {
    header: React.ReactNode;
    content: React.ReactNode;
    footer: React.ReactNode | null;
    headings: TOCHeading[];
}

export default function ChapterLayout({
    header,
    content,
    footer,
    headings,
}: ChapterLayoutProps) {
    const { collapsed, toggle } = useSidebar();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <ScrollProgress />

            <section className="min-h-screen px-4 pb-20 pt-28 lg:px-8">
                <div className="mx-auto w-full max-w-[1680px]">
                    <div className="flex gap-0 lg:gap-12 relative">
                        {/* ── Mobile overlay backdrop ── */}
                        {mobileOpen && (
                            <div
                                className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                                onClick={() => setMobileOpen(false)}
                            />
                        )}

                        {/* ── Sidebar ── */}
                        <aside
                            className={`
                                /* Mobile: slide-over drawer */
                                fixed top-0 left-0 h-full z-50 bg-[#faf8f4]
                                transform transition-transform duration-300 ease-in-out
                                ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                                w-72 pt-28 px-4 pb-8

                                /* Desktop: inline collapsible */
                                lg:relative lg:transform-none lg:translate-x-0 lg:z-auto
                                lg:pt-0 lg:px-0 lg:pb-0 lg:bg-transparent
                                lg:block lg:flex-shrink-0
                                lg:transition-all lg:duration-300 lg:ease-in-out
                                ${collapsed ? "lg:w-12" : "lg:w-72 xl:w-80"}
                            `}
                            style={{
                                boxShadow: "2px 0 12px rgba(0,0,0,0.06)",
                            }}
                        >
                            {/* Collapse toggle — desktop only */}
                            <button
                                onClick={toggle}
                                className="hidden lg:flex items-center justify-center w-7 h-7 rounded-full border border-[#c8a96e]/40 bg-[#faf8f4] text-[#c8a96e] hover:bg-[#c8a96e]/10 transition-colors duration-200 absolute -right-3.5 top-6 z-10 shadow-sm cursor-pointer"
                                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                            >
                                <span className="text-xs font-bold leading-none">
                                    {collapsed ? "›" : "‹"}
                                </span>
                            </button>

                            {/* Close button — mobile only */}
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="lg:hidden absolute top-6 right-4 text-[#6B6560] hover:text-[#1e1e1e] text-xl cursor-pointer"
                                aria-label="Close sidebar"
                            >
                                ✕
                            </button>

                            {/* TOC content */}
                            <div
                                className={`
                                    transition-opacity duration-300 ease-in-out
                                    ${collapsed ? "lg:opacity-0 lg:pointer-events-none" : "lg:opacity-100"}
                                `}
                            >
                                <TableOfContents headings={headings} />
                            </div>
                        </aside>

                        {/* ── Mobile menu button ── */}
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden fixed bottom-6 left-6 z-30 w-12 h-12 rounded-full bg-[#c8a96e] text-white shadow-lg flex items-center justify-center hover:bg-[#a8894e] transition-colors duration-200 cursor-pointer"
                            aria-label="Open table of contents"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </button>

                        {/* ── Main reading column ── */}
                        <article className="min-w-0 flex-1 max-w-none">
                            {header}

                            {content && (
                                <div className="prose-intrinsic w-full space-y-6 font-[family-name:var(--font-sans)] text-[#1e1e1e] leading-[1.8]">
                                    {content}
                                </div>
                            )}

                            {footer}
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}
