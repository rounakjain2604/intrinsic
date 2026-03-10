import ChapterLayout from "./ChapterLayout";
import MarkAsMastered from "./MarkAsMastered";
import type { Chapter, TOCHeading } from "@/lib/types";

interface ChapterReaderProps {
    chapter: Chapter;
    content: React.ReactNode;
    userId: string | null;
    isCompleted: boolean;
    headings: TOCHeading[];
}

export default function ChapterReader({
    chapter,
    content,
    userId,
    isCompleted,
    headings,
}: ChapterReaderProps) {
    const header = (
        <header className="mb-10">
            <span className="font-['Candara','Calibri','Georgia',serif] text-xs text-[#A09890] uppercase tracking-widest font-medium">
                {chapter.is_free
                    ? "Free Chapter"
                    : chapter.price_tier === "premium"
                        ? "Premium Chapter"
                        : "Standard Chapter"}
            </span>
            <h1 className="font-['Candara','Calibri','Georgia',serif] text-4xl font-bold text-[#1e1e1e] mt-2 mb-3 leading-tight">
                {chapter.title}
            </h1>
            {chapter.description && (
                <p className="font-['Candara','Calibri','Georgia',serif] text-base text-[#6B6560] leading-relaxed">
                    {chapter.description}
                </p>
            )}
            <hr className="border-t border-[#2D2A26]/[0.08] mt-8" />
        </header>
    );

    const footer = userId ? (
        <div className="mt-16 pt-8 border-t border-[#2D2A26]/[0.08] flex justify-center">
            <MarkAsMastered
                chapterId={chapter.id}
                initialCompleted={isCompleted}
            />
        </div>
    ) : null;

    return (
        <ChapterLayout
            header={header}
            content={content}
            footer={footer}
            headings={headings}
        />
    );
}
