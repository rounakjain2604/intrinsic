"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const maturities = [0.25, 0.5, 1, 2, 3, 5, 7, 10, 20, 30];
const normalYields = [3.2, 3.4, 3.8, 4.0, 4.1, 4.3, 4.5, 4.7, 4.9, 5.0];
const invertedYields = [5.5, 5.4, 5.2, 5.0, 4.8, 4.5, 4.3, 4.1, 3.9, 3.8];
const flatYields = [4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2];

const data = maturities.map((m, i) => ({
    maturity: m,
    Normal: normalYields[i],
    Inverted: invertedYields[i],
    Flat: flatYields[i],
}));

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        name: string;
        value: number;
        color: string;
    }>;
    label?: number;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload || !payload.length) return null;

    return (
        <div
            className="rounded-xl border border-[#2D2A26]/12 px-4 py-3 shadow-sm"
            style={{
                backgroundColor: "#F5F1EA",
                fontFamily: "DM Sans, sans-serif",
            }}
        >
            <p
                className="text-xs font-medium mb-2"
                style={{ color: "#2D2A26" }}
            >
                Maturity: {label}yr
            </p>
            {payload.map((entry) => (
                <p
                    key={entry.name}
                    className="text-xs"
                    style={{ color: entry.color }}
                >
                    {entry.name}: {entry.value.toFixed(2)}%
                </p>
            ))}
        </div>
    );
}

export default function YieldCurveChart({
    className = "",
}: {
    className?: string;
}) {
    return (
        <div className={`w-full h-[300px] ${className}`}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                >
                    <CartesianGrid
                        stroke="rgba(45,42,38,0.08)"
                        strokeDasharray="3 3"
                    />
                    <XAxis
                        dataKey="maturity"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fill: "#A09890",
                            fontSize: 11,
                            fontFamily: "DM Mono, monospace",
                        }}
                        label={{
                            value: "Maturity (years)",
                            position: "insideBottomRight",
                            offset: -5,
                            style: {
                                fill: "#A09890",
                                fontSize: 10,
                                fontFamily: "DM Sans, sans-serif",
                            },
                        }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fill: "#A09890",
                            fontSize: 11,
                            fontFamily: "DM Mono, monospace",
                        }}
                        domain={[3, 6]}
                        tickFormatter={(v: number) => `${v}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{
                            fontFamily: "DM Sans, sans-serif",
                            fontSize: 13,
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Normal"
                        stroke="#E8694A"
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1000}
                    />
                    <Line
                        type="monotone"
                        dataKey="Inverted"
                        stroke="#4A7FC1"
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1000}
                    />
                    <Line
                        type="monotone"
                        dataKey="Flat"
                        stroke="#D4882A"
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1000}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
