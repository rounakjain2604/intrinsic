import React from "react";

interface WorkedExampleProps {
    title: string;
    children: React.ReactNode;
}

export default function WorkedExample({ title, children }: WorkedExampleProps) {
    return (
        <div className="my-8 rounded-2xl border border-[#c8a96e]/30 bg-gradient-to-br from-[#faf8f4] to-[#f5f1ea] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            {/* Header */}
            <div className="bg-[#c8a96e]/10 border-b border-[#c8a96e]/20 px-6 py-3">
                <p className="font-['Candara','Calibri','Georgia',serif] text-sm font-semibold text-[#8b7340] uppercase tracking-wide">
                    {title}
                </p>
            </div>

            {/* Steps */}
            <div className="px-6 py-5 space-y-3 font-['Candara','Calibri','Georgia',serif] text-[#1e1e1e] text-[15px] leading-relaxed">
                {children}
            </div>
        </div>
    );
}
