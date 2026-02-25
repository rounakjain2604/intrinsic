"use client";

import { useState } from "react";

interface MarkAsMasteredProps {
    chapterId: string;
    initialCompleted: boolean;
}

export default function MarkAsMastered({
    chapterId,
    initialCompleted,
}: MarkAsMasteredProps) {
    const [completed, setCompleted] = useState(initialCompleted);
    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(false);

    async function handleToggle() {
        if (loading) return;
        setLoading(true);

        // Optimistic update
        const prev = completed;
        setCompleted(!prev);
        setAnimating(true);

        try {
            const res = await fetch("/api/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chapterId }),
            });

            if (!res.ok) {
                // Revert on failure
                setCompleted(prev);
            } else {
                const data = await res.json();
                setCompleted(data.completed);
            }
        } catch {
            setCompleted(prev);
        } finally {
            setLoading(false);
            setTimeout(() => setAnimating(false), 400);
        }
    }

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`
        inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
        transition-all duration-300 ease-out
        ${animating ? "scale-105" : "scale-100"}
        ${completed
                    ? "bg-[#5B9E6F] text-[#FAF8F5] shadow-[0_2px_8px_rgba(91,158,111,0.25)] hover:bg-[#4E8A60]"
                    : "border border-[#5B9E6F] text-[#5B9E6F] hover:bg-[#5B9E6F]/8"
                }
        disabled:opacity-60 disabled:cursor-not-allowed
        font-[family-name:var(--font-sans)]
      `}
        >
            {completed ? (
                <>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`transition-transform duration-300 ${animating ? "scale-125" : "scale-100"
                            }`}
                    >
                        <circle
                            cx="8"
                            cy="8"
                            r="6.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="currentColor"
                            fillOpacity="0.15"
                        />
                        <path
                            d="M5 8l2 2 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Mastered
                </>
            ) : (
                "Mark Chapter as Mastered"
            )}
        </button>
    );
}
