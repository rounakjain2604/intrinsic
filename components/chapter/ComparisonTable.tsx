import React from "react";

interface ComparisonTableProps {
    children: React.ReactNode;
}

export default function ComparisonTable({ children }: ComparisonTableProps) {
    return (
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
    );
}

interface ComparisonColumnProps {
    title: string;
    children: React.ReactNode;
}

export function ComparisonColumn({ title, children }: ComparisonColumnProps) {
    return (
        <div className="rounded-2xl border border-[#c8a96e]/25 bg-[#faf8f4] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="bg-[#c8a96e]/10 border-b border-[#c8a96e]/20 px-5 py-3">
                <p className="font-['Candara','Calibri','Georgia',serif] text-sm font-semibold text-[#8b7340] uppercase tracking-wide">
                    {title}
                </p>
            </div>
            <div className="px-5 py-4 space-y-2 font-['Candara','Calibri','Georgia',serif] text-[#1e1e1e] text-[15px] leading-relaxed">
                {children}
            </div>
        </div>
    );
}
