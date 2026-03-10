"use client";

import { useState } from "react";

interface QuizCardProps {
    question: string;
    options: string[];
    answer: string;
    explanation?: string;
}

export default function QuizCard({ question, options, answer, explanation }: QuizCardProps) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="my-6 rounded-2xl border border-[#2D2A26]/10 bg-[#faf8f4] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            {/* Question */}
            <div className="px-6 py-4 border-b border-[#2D2A26]/[0.06]">
                <p className="font-['Candara','Calibri','Georgia',serif] text-[15px] font-semibold text-[#1e1e1e] leading-relaxed">
                    {question}
                </p>
            </div>

            {/* Options */}
            <div className="px-6 py-3 space-y-2">
                {options.map((opt, i) => (
                    <div
                        key={i}
                        className="font-['Candara','Calibri','Georgia',serif] text-[15px] text-[#1e1e1e] leading-relaxed pl-2"
                    >
                        {opt}
                    </div>
                ))}
            </div>

            {/* Toggle */}
            <div className="px-6 py-3 border-t border-[#2D2A26]/[0.06]">
                <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="font-['Candara','Calibri','Georgia',serif] text-sm font-semibold text-[#c8a96e] hover:text-[#a8894e] transition-colors duration-200 cursor-pointer"
                >
                    {showAnswer ? "Hide Answer ▲" : "Show Answer ▼"}
                </button>

                {showAnswer && (
                    <div className="mt-3 pt-3 border-t border-[#c8a96e]/20">
                        <p className="font-['Candara','Calibri','Georgia',serif] text-[15px] text-[#1e1e1e] leading-relaxed">
                            <strong>Answer:</strong> {answer}
                        </p>
                        {explanation && (
                            <p className="mt-2 font-['Candara','Calibri','Georgia',serif] text-sm text-[#6B6560] leading-relaxed">
                                {explanation}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
