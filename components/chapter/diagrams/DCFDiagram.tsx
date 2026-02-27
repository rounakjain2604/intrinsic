"use client";

import { useEffect, useRef, useState } from "react";

interface DCFDiagramProps {
    animated?: boolean;
    className?: string;
}

export default function DCFDiagram({
    animated = true,
    className = "",
}: DCFDiagramProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [isVisible, setIsVisible] = useState(!animated);

    useEffect(() => {
        if (!animated || !svgRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(svgRef.current);
        return () => observer.disconnect();
    }, [animated]);

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 560 380"
            width="100%"
            className={className}
            role="img"
            aria-label="Discounted Cash Flow (DCF) valuation diagram"
        >
            <defs>
                {/* Hand-drawn sketch filter */}
                <filter id="sketch">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.04"
                        numOctaves="5"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="1.5"
                    />
                </filter>

                {/* Arrowhead marker */}
                <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                >
                    <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#2D2A26"
                        fillOpacity="0.5"
                    />
                </marker>
            </defs>

            {/* ─── Row 1: Future Cash Flows ─── */}
            <rect
                x="120"
                y="10"
                width="320"
                height="55"
                rx="8"
                fill="#FFFDF9"
                stroke="#2D2A26"
                strokeWidth="1.5"
                filter="url(#sketch)"
            />
            <text
                x="280"
                y="30"
                textAnchor="middle"
                fill="#2D2A26"
                fontFamily="DM Sans, sans-serif"
                fontSize="13"
                fontWeight="600"
            >
                Future Cash Flows
            </text>

            {/* 5 year boxes */}
            {[0, 1, 2, 3, 4].map((i) => (
                <g key={i}>
                    <rect
                        x={145 + i * 58}
                        y="40"
                        width="44"
                        height="18"
                        rx="4"
                        fill="#EDE8DF"
                        stroke="#2D2A26"
                        strokeWidth="0.8"
                        filter="url(#sketch)"
                    />
                    <text
                        x={167 + i * 58}
                        y="53"
                        textAnchor="middle"
                        fill="#6B6560"
                        fontFamily="DM Mono, monospace"
                        fontSize="10"
                    >
                        Yr {i + 1}
                    </text>
                </g>
            ))}

            {/* ─── Arrow 1: Down with label ─── */}
            <line
                x1="280"
                y1="65"
                x2="280"
                y2="120"
                stroke="#2D2A26"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
                strokeDasharray={isVisible ? "none" : "200"}
                strokeDashoffset={isVisible ? "0" : "200"}
                style={{ transition: "stroke-dashoffset 1s ease 0.2s" }}
            />
            <text
                x="295"
                y="96"
                fill="#6B6560"
                fontFamily="DM Mono, monospace"
                fontSize="11"
            >
                Discount Rate (WACC)
            </text>

            {/* ─── Row 2: PV of Cash Flows ─── */}
            <rect
                x="100"
                y="125"
                width="220"
                height="50"
                rx="8"
                fill="#FFFDF9"
                stroke="#2D2A26"
                strokeWidth="1.5"
                filter="url(#sketch)"
            />
            <text
                x="210"
                y="155"
                textAnchor="middle"
                fill="#2D2A26"
                fontFamily="DM Sans, sans-serif"
                fontSize="13"
                fontWeight="500"
            >
                Present Value of Cash Flows
            </text>

            {/* ─── Plus sign ─── */}
            <text
                x="335"
                y="156"
                textAnchor="middle"
                fill="#E8694A"
                fontFamily="DM Sans, sans-serif"
                fontSize="22"
                fontWeight="700"
            >
                +
            </text>

            {/* ─── Terminal Value box ─── */}
            <rect
                x="355"
                y="125"
                width="150"
                height="50"
                rx="8"
                fill="#FFFDF9"
                stroke="#D4882A"
                strokeWidth="1.5"
                filter="url(#sketch)"
            />
            <text
                x="430"
                y="155"
                textAnchor="middle"
                fill="#2D2A26"
                fontFamily="DM Sans, sans-serif"
                fontSize="13"
                fontWeight="500"
            >
                Terminal Value
            </text>

            {/* ─── Arrow 2: Down from PV ─── */}
            <line
                x1="210"
                y1="175"
                x2="210"
                y2="230"
                stroke="#2D2A26"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
                strokeDasharray={isVisible ? "none" : "200"}
                strokeDashoffset={isVisible ? "0" : "200"}
                style={{ transition: "stroke-dashoffset 1s ease 0.5s" }}
            />

            {/* ─── Arrow 3: Down from TV ─── */}
            <line
                x1="430"
                y1="175"
                x2="430"
                y2="230"
                stroke="#2D2A26"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
                strokeDasharray={isVisible ? "none" : "200"}
                strokeDashoffset={isVisible ? "0" : "200"}
                style={{ transition: "stroke-dashoffset 1s ease 0.5s" }}
            />

            {/* ─── Merge arrows into one ─── */}
            <path
                d="M 210 230 L 210 250 Q 210 260 220 260 L 340 260 Q 350 260 350 250 L 350 230"
                fill="none"
                stroke="#2D2A26"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeDasharray={isVisible ? "none" : "300"}
                strokeDashoffset={isVisible ? "0" : "300"}
                style={{ transition: "stroke-dashoffset 1.2s ease 0.7s" }}
            />

            {/* ─── Arrow 4: Down to result ─── */}
            <line
                x1="280"
                y1="260"
                x2="280"
                y2="295"
                stroke="#2D2A26"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
                strokeDasharray={isVisible ? "none" : "200"}
                strokeDashoffset={isVisible ? "0" : "200"}
                style={{ transition: "stroke-dashoffset 1s ease 0.9s" }}
            />

            {/* ─── Row 3: Enterprise Value (highlighted) ─── */}
            <rect
                x="70"
                y="300"
                width="420"
                height="60"
                rx="10"
                fill="#E8694A"
                fillOpacity="0.10"
                stroke="#E8694A"
                strokeWidth="2"
                filter="url(#sketch)"
            />
            <text
                x="280"
                y="325"
                textAnchor="middle"
                fill="#2D2A26"
                fontFamily="DM Sans, sans-serif"
                fontSize="14"
                fontWeight="600"
            >
                Enterprise Value
            </text>
            <text
                x="280"
                y="348"
                textAnchor="middle"
                fill="#E8694A"
                fontFamily="DM Mono, monospace"
                fontSize="12"
            >
                = PV of FCFs + Terminal Value
            </text>
        </svg>
    );
}
