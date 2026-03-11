"use client";

import { useState } from "react";

interface QuizCardProps {
    question: string;
    options?: string[];
    answer?: string;
    correctAnswer?: string;
    explanation?: string;
}

export default function QuizCard({
    question,
    options,
    answer,
    correctAnswer,
    explanation,
}: QuizCardProps) {
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const answerOptions = options ?? [];
    const hasInteractiveOptions = answerOptions.length > 0;
    const resolvedAnswer =
        typeof answer === "string" && answer.trim().length > 0
            ? answer
            : typeof correctAnswer === "string" && correctAnswer.trim().length > 0
              ? correctAnswer
              : "";
    const answerLabel = resolvedAnswer.trim().charAt(0).toUpperCase();
    const selectedLabel = selectedOption?.trim().charAt(0).toUpperCase() ?? null;
    const isCorrect = resolvedAnswer.length > 0 && selectedLabel === answerLabel;

    return (
        <div className="my-6 overflow-hidden rounded-2xl border border-[#2D2A26]/10 bg-[#faf8f4] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="border-b border-[#2D2A26]/[0.06] px-6 py-4">
                <p className="font-[family-name:var(--font-sans)] text-base font-semibold leading-relaxed text-[#1e1e1e] sm:text-[1.05rem]">
                    {question}
                </p>
            </div>

            {hasInteractiveOptions && (
                <div className="space-y-2 px-6 py-3">
                    {answerOptions.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedOption(option)}
                            className={`block w-full rounded-xl border px-4 py-3 text-left font-[family-name:var(--font-sans)] text-[15px] leading-relaxed transition ${
                                selectedOption === option
                                    ? "border-[#E8694A] bg-[#E8694A]/8 text-[#2D2A26]"
                                    : "border-[#2D2A26]/8 bg-white text-[#1e1e1e] hover:border-[#2D2A26]/20"
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}

            <div className="border-t border-[#2D2A26]/[0.06] px-6 py-3">
                {hasInteractiveOptions ? (
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setShowAnswer((current) => !current)}
                            disabled={!selectedOption}
                            className="rounded-xl bg-[#E8694A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#D45E40] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {showAnswer ? "Hide Feedback" : "Check Answer"}
                        </button>
                        {selectedOption && !showAnswer && (
                            <p className="text-sm text-[#6B6560]">
                                Selected:{" "}
                                <span className="font-semibold text-[#2D2A26]">
                                    {selectedOption}
                                </span>
                            </p>
                        )}
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setShowAnswer((current) => !current)}
                        className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[#c8a96e] transition-colors duration-200 hover:text-[#a8894e]"
                    >
                        {showAnswer ? "Hide Answer" : "Show Answer"}
                    </button>
                )}

                {showAnswer && (
                    <div className="mt-3 border-t border-[#c8a96e]/20 pt-3">
                        {hasInteractiveOptions && selectedOption && (
                            <p
                                className={`mb-2 text-sm font-semibold ${
                                    isCorrect ? "text-[#2D6A4F]" : "text-[#B5451B]"
                                }`}
                            >
                                {isCorrect
                                    ? "Correct. You picked the right answer."
                                    : resolvedAnswer
                                      ? `Not quite. You picked ${selectedLabel}, but the correct answer is ${answerLabel}.`
                                      : "The answer key is missing for this question."}
                            </p>
                        )}
                        <p className="font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-[#1e1e1e] sm:text-base">
                            <strong>Answer:</strong> {resolvedAnswer || "Not provided"}
                        </p>
                        {explanation && (
                            <p className="mt-2 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-[#6B6560]">
                                {explanation}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
