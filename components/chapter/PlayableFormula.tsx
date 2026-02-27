"use client";

import { useState, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────
interface InputConfig {
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    unit?: string;
}

interface OutputValue {
    label: string;
    value: string;
}

interface PlayableFormulaProps {
    formulaName: string;
    inputs: InputConfig[];
    calculateOutput: (values: Record<string, number>) => OutputValue[];
    className?: string;
}

export default function PlayableFormula({
    formulaName,
    inputs,
    calculateOutput,
    className = "",
}: PlayableFormulaProps) {
    // Initialize values from defaults
    const [values, setValues] = useState<Record<string, number>>(() => {
        const initial: Record<string, number> = {};
        inputs.forEach((input) => {
            initial[input.label] = input.defaultValue;
        });
        return initial;
    });

    const handleChange = useCallback(
        (label: string, val: number) => {
            setValues((prev) => ({ ...prev, [label]: val }));
        },
        []
    );

    const outputs = calculateOutput(values);

    return (
        <div
            className={`bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl p-6 shadow-[0_2px_12px_rgba(45,42,38,0.06)] ${className}`}
        >
            {/* Title */}
            <h4 className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[#2D2A26] uppercase tracking-wide mb-6">
                {formulaName}
            </h4>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Slider Controls */}
                <div className="flex-1 space-y-5">
                    {inputs.map((input) => (
                        <div key={input.label}>
                            <div className="flex items-center justify-between mb-2">
                                <label className="font-[family-name:var(--font-sans)] text-xs text-[#6B6560]">
                                    {input.label}
                                </label>
                                <span className="font-[family-name:var(--font-mono)] text-sm text-[#E8694A] font-semibold">
                                    {values[input.label]?.toFixed(
                                        input.step < 1
                                            ? String(input.step).split(".")[1]
                                                  ?.length ?? 2
                                            : 0
                                    )}
                                    {input.unit ?? ""}
                                </span>
                            </div>
                            <input
                                type="range"
                                min={input.min}
                                max={input.max}
                                step={input.step}
                                value={values[input.label] ?? input.defaultValue}
                                onChange={(e) =>
                                    handleChange(
                                        input.label,
                                        parseFloat(e.target.value)
                                    )
                                }
                                className="w-full h-2 rounded-full appearance-none cursor-pointer
                                    bg-[#EDE8DF]
                                    [&::-webkit-slider-thumb]:appearance-none
                                    [&::-webkit-slider-thumb]:w-4
                                    [&::-webkit-slider-thumb]:h-4
                                    [&::-webkit-slider-thumb]:rounded-full
                                    [&::-webkit-slider-thumb]:bg-[#E8694A]
                                    [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(232,105,74,0.3)]
                                    [&::-webkit-slider-thumb]:cursor-pointer
                                    [&::-moz-range-thumb]:w-4
                                    [&::-moz-range-thumb]:h-4
                                    [&::-moz-range-thumb]:rounded-full
                                    [&::-moz-range-thumb]:bg-[#E8694A]
                                    [&::-moz-range-thumb]:border-0
                                    [&::-moz-range-thumb]:cursor-pointer"
                            />
                        </div>
                    ))}
                </div>

                {/* Output Display */}
                <div className="flex-1 flex flex-col justify-center space-y-4">
                    {outputs.map((output) => (
                        <div
                            key={output.label}
                            className="bg-[#FFFDF9] border border-[#2D2A26]/8 rounded-xl p-4"
                        >
                            <span className="font-[family-name:var(--font-sans)] text-xs text-[#6B6560] uppercase tracking-wide">
                                {output.label}
                            </span>
                            <p className="font-[family-name:var(--font-mono)] text-xl font-bold text-[#2D2A26] mt-1">
                                {output.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
