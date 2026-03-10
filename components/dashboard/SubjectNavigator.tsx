"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SUBJECTS, type Subject } from "@/lib/subjects";
import SubjectIcon from "./SubjectIcons";

interface ModuleStatus {
    slug: string;
    hasContent: boolean;
    isCompleted: boolean;
    accessState: "free" | "purchased" | "locked" | "coming-soon";
}

interface SubjectNavigatorProps {
    moduleStatuses: Record<string, ModuleStatus>;
}

export default function SubjectNavigator({ moduleStatuses }: SubjectNavigatorProps) {
    const [activeSubjectId, setActiveSubjectId] = useState<number | null>(null);

    return (
        <div className="space-y-3">
            {/* Subject pills row */}
            <div className="flex flex-wrap gap-2 mb-6">
                {SUBJECTS.map((subject) => {
                    const isActive = activeSubjectId === subject.id;
                    const moduleCount = subject.modules.length;
                    const completedCount = subject.modules.filter(
                        (m) => moduleStatuses[m.slug]?.isCompleted
                    ).length;
                    const allDone = completedCount === moduleCount && moduleCount > 0;

                    return (
                        <button
                            key={subject.id}
                            onClick={() =>
                                setActiveSubjectId(isActive ? null : subject.id)
                            }
                            className={`
                                group relative flex items-center gap-2 px-4 py-2.5 rounded-xl
                                font-[family-name:var(--font-sans)] text-sm font-medium
                                border transition-all duration-200 cursor-pointer
                                ${isActive
                                    ? "border-[var(--active-color)] bg-[var(--active-color)]/8 text-[#2D2A26] shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                                    : "border-[#2D2A26]/10 bg-[#F5F1EA] text-[#6B6560] hover:border-[#2D2A26]/20 hover:text-[#2D2A26]"
                                }
                            `}
                            style={
                                {
                                    "--active-color": subject.color,
                                } as React.CSSProperties
                            }
                        >
                            <SubjectIcon
                                icon={subject.icon}
                                size={22}
                                color={isActive ? subject.color : "#6B6560"}
                            />
                            <span className="hidden sm:inline">{subject.shortName}</span>
                            <span className="sm:hidden">{subject.shortName}</span>

                            {/* Module count badge */}
                            <span
                                className={`
                                    text-[10px] font-semibold px-1.5 py-0.5 rounded-md
                                    font-[family-name:var(--font-mono)]
                                    ${allDone
                                        ? "bg-[#5B9E6F]/15 text-[#5B9E6F]"
                                        : isActive
                                            ? "bg-[var(--active-color)]/15 text-[var(--active-color)]"
                                            : "bg-[#2D2A26]/5 text-[#A09890]"
                                    }
                                `}
                                style={
                                    {
                                        "--active-color": subject.color,
                                    } as React.CSSProperties
                                }
                            >
                                {completedCount}/{moduleCount}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Expanded Learning Modules panel */}
            <AnimatePresence mode="wait">
                {activeSubjectId !== null && (
                    <SubjectPanel
                        subject={SUBJECTS.find((s) => s.id === activeSubjectId)!}
                        moduleStatuses={moduleStatuses}
                        onClose={() => setActiveSubjectId(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Expanded panel showing the learning modules for one subject ─── */
function SubjectPanel({
    subject,
    moduleStatuses,
    onClose,
}: {
    subject: Subject;
    moduleStatuses: Record<string, ModuleStatus>;
    onClose: () => void;
}) {
    return (
        <motion.div
            key={subject.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
        >
            <div
                className="rounded-2xl border p-6 mb-4"
                style={{
                    borderColor: `${subject.color}30`,
                    background: `linear-gradient(135deg, ${subject.color}04, ${subject.color}08)`,
                }}
            >
                {/* Panel header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <SubjectIcon icon={subject.icon} size={28} color={subject.color} />
                        <div>
                            <h3 className="font-[family-name:var(--font-serif)] text-lg font-semibold text-[#2D2A26]">
                                {subject.name}
                            </h3>
                            <p className="font-[family-name:var(--font-sans)] text-xs text-[#A09890]">
                                {subject.modules.length} Learning Module{subject.modules.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-[#2D2A26]/5 transition-colors text-[#A09890] hover:text-[#2D2A26]"
                        aria-label="Close panel"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Module list */}
                <div className="space-y-2">
                    {subject.modules.map((mod, idx) => {
                        const status = moduleStatuses[mod.slug];
                        const hasContent = status?.hasContent ?? false;
                        const isCompleted = status?.isCompleted ?? false;

                        return (
                            <motion.div
                                key={mod.slug}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.3 }}
                            >
                                {hasContent ? (
                                    <Link
                                        href={`/chapters/${mod.slug}`}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[#2D2A26]/6 hover:border-[#2D2A26]/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all group"
                                    >
                                        <ModuleIndicator
                                            index={idx + 1}
                                            isCompleted={isCompleted}
                                            color={subject.color}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <span className="font-[family-name:var(--font-sans)] text-sm font-medium text-[#2D2A26] group-hover:text-[var(--link-color)] transition-colors line-clamp-1"
                                                style={{ "--link-color": subject.color } as React.CSSProperties}
                                            >
                                                {mod.title}
                                            </span>
                                        </div>
                                        <span className="font-[family-name:var(--font-mono)] text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#5B9E6F]/10 text-[#5B9E6F] flex-shrink-0">
                                            Free
                                        </span>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#A09890] group-hover:text-[#2D2A26] transition-colors flex-shrink-0">
                                            <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/30 border border-[#2D2A26]/4 opacity-60">
                                        <ModuleIndicator
                                            index={idx + 1}
                                            isCompleted={false}
                                            color={subject.color}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <span className="font-[family-name:var(--font-sans)] text-sm text-[#A09890] line-clamp-1">
                                                {mod.title}
                                            </span>
                                        </div>
                                        <span className="font-[family-name:var(--font-mono)] text-[10px] text-[#A09890] bg-[#2D2A26]/5 px-2 py-0.5 rounded-md flex-shrink-0">
                                            Coming Soon
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Numbered circle with completion checkmark ─── */
function ModuleIndicator({
    index,
    isCompleted,
    color,
}: {
    index: number;
    isCompleted: boolean;
    color: string;
}) {
    if (isCompleted) {
        return (
            <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#5B9E6F18" }}
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3.5 7L6 9.5L10.5 4.5" stroke="#5B9E6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        );
    }

    return (
        <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border"
            style={{ borderColor: `${color}30` }}
        >
            <span
                className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                style={{ color }}
            >
                {index}
            </span>
        </div>
    );
}
