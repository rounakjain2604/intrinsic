"use client";

/**
 * Hand-drawn-style SVG icons for each of the 10 CFA Level 2 subject areas.
 * These use the brand's crayon palette and sketch filter aesthetic.
 */

interface IconProps {
    size?: number;
    color?: string;
    className?: string;
}

/* ─── 1. Ethics — scales of justice ─── */
export function EthicsIcon({ size = 40, color = "#4A7FC1", className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            <line x1="20" y1="6" x2="20" y2="34" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="14" x2="32" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 14 L5 24 Q8 28 11 24 L8 14Z" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.08" strokeLinejoin="round" />
            <path d="M32 14 L29 24 Q32 28 35 24 L32 14Z" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.08" strokeLinejoin="round" />
            <line x1="15" y1="34" x2="25" y2="34" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

/* ─── 2. Quantitative Methods — bell curve / regression ─── */
export function QuantIcon({ size = 40, color = "#7B6BAE", className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            <path d="M4 32 Q10 32 14 28 Q18 20 20 14 Q22 20 26 28 Q30 32 36 32"
                stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.06" strokeLinecap="round" />
            <line x1="4" y1="32" x2="36" y2="32" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
            <line x1="20" y1="10" x2="20" y2="32" stroke={color} strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.3" />
            <circle cx="20" cy="14" r="2" fill={color} fillOpacity="0.5" />
        </svg>
    );
}

/* ─── 3. Economics — supply/demand cross ─── */
export function EconIcon({ size = 40, color = "#5B9E6F", className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            <line x1="6" y1="34" x2="6" y2="6" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="6" y1="34" x2="36" y2="34" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
            {/* Demand curve - downward sloping */}
            <path d="M8 10 Q18 18 34 30" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Supply curve - upward sloping */}
            <path d="M8 30 Q18 22 34 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="4 2" />
            <circle cx="20" cy="20" r="2.5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />
        </svg>
    );
}

/* ─── 4. Financial Statement Analysis — balance sheet bars ─── */
export function FSAIcon({ size = 40, color = "#D4882A", className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            {/* Three stacked horizontal bars representing financial statements */}
            <rect x="6" y="8" width="28" height="6" rx="1.5" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.08" />
            <rect x="6" y="17" width="22" height="6" rx="1.5" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.12" />
            <rect x="6" y="26" width="16" height="6" rx="1.5" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.18" />
            {/* Connector line on right */}
            <line x1="36" y1="11" x2="36" y2="29" stroke={color} strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" />
            <text x="36" y="36" textAnchor="middle" fill={color} fontSize="6" fontFamily="var(--font-mono)" fontWeight="500" opacity="0.6">Σ</text>
        </svg>
    );
}

/* ─── 5. Corporate Issuers — building/dividend flow ─── */
export function CorpIcon({ size = 40, color = "#C94F3A", className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            {/* Building shape */}
            <rect x="12" y="10" width="16" height="22" rx="1" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.06" />
            <rect x="16" y="14" width="3" height="3" rx="0.5" fill={color} fillOpacity="0.2" />
            <rect x="21" y="14" width="3" height="3" rx="0.5" fill={color} fillOpacity="0.2" />
            <rect x="16" y="20" width="3" height="3" rx="0.5" fill={color} fillOpacity="0.2" />
            <rect x="21" y="20" width="3" height="3" rx="0.5" fill={color} fillOpacity="0.2" />
            {/* Door */}
            <rect x="18" y="27" width="4" height="5" rx="0.5" fill={color} fillOpacity="0.15" />
            {/* Dividend arrow coming out */}
            <path d="M32 18 L36 18 M34 16 L36 18 L34 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="36" y="14" textAnchor="middle" fill={color} fontSize="5" fontFamily="var(--font-mono)" opacity="0.5">$</text>
        </svg>
    );
}

/* ─── 6. Equity Valuation — DCF tree ─── */
export function EquityIcon({ size = 40, color = "#E8694A", className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            {/* Top: value box */}
            <rect x="13" y="4" width="14" height="8" rx="2" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.1" />
            <text x="20" y="10" textAnchor="middle" fill={color} fontSize="5" fontFamily="var(--font-mono)" fontWeight="600">V₀</text>
            {/* Branching lines */}
            <line x1="20" y1="12" x2="10" y2="20" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="20" y1="12" x2="20" y2="20" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="20" y1="12" x2="30" y2="20" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
            {/* Cash flow boxes */}
            <rect x="5" y="20" width="10" height="7" rx="1.5" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.06" />
            <text x="10" y="25" textAnchor="middle" fill={color} fontSize="4.5" fontFamily="var(--font-mono)">CF₁</text>
            <rect x="15" y="20" width="10" height="7" rx="1.5" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.06" />
            <text x="20" y="25" textAnchor="middle" fill={color} fontSize="4.5" fontFamily="var(--font-mono)">CF₂</text>
            <rect x="25" y="20" width="10" height="7" rx="1.5" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.06" />
            <text x="30" y="25" textAnchor="middle" fill={color} fontSize="4.5" fontFamily="var(--font-mono)">CF₃</text>
            {/* Terminal value */}
            <line x1="20" y1="27" x2="20" y2="31" stroke={color} strokeWidth="1" strokeDasharray="2 1" strokeOpacity="0.3" />
            <rect x="11" y="31" width="18" height="6" rx="1.5" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.12" />
            <text x="20" y="36" textAnchor="middle" fill={color} fontSize="4.5" fontFamily="var(--font-mono)" fontWeight="500">TV</text>
        </svg>
    );
}

/* ─── 7. Fixed Income — yield curve ─── */
export function FixedIncomeIcon({ size = 40, color = "#4A7FC1", className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            <line x1="6" y1="34" x2="6" y2="6" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="6" y1="34" x2="36" y2="34" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
            {/* Yield curve - upward sloping, flattening */}
            <path d="M8 28 Q14 20 22 16 Q30 13 36 12" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Shaded area under curve */}
            <path d="M8 28 Q14 20 22 16 Q30 13 36 12 L36 34 L8 34 Z" fill={color} fillOpacity="0.06" />
            {/* Rate dots */}
            <circle cx="12" cy="24" r="1.5" fill={color} fillOpacity="0.5" />
            <circle cx="22" cy="16" r="1.5" fill={color} fillOpacity="0.5" />
            <circle cx="34" cy="12.5" r="1.5" fill={color} fillOpacity="0.5" />
        </svg>
    );
}

/* ─── 8. Derivatives — option payoff kinked line ─── */
export function DerivativesIcon({ size = 40, color = "#7B6BAE", className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            <line x1="4" y1="34" x2="36" y2="34" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
            <line x1="4" y1="4" x2="4" y2="34" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
            {/* Zero line */}
            <line x1="4" y1="20" x2="36" y2="20" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.2" />
            {/* Call payoff */}
            <path d="M6 20 L20 20 L34 8" stroke="#E8694A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Put payoff */}
            <path d="M6 8 L20 20 L34 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Strike line */}
            <line x1="20" y1="18" x2="20" y2="22" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
            <text x="20" y="30" textAnchor="middle" fill={color} fontSize="5" fontFamily="var(--font-mono)" opacity="0.5">K</text>
        </svg>
    );
}

/* ─── 9. Alternative Investments — multi-asset mosaic ─── */
export function AltsIcon({ size = 40, color = "#D4882A", className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            {/* Grid of different asset class boxes */}
            <rect x="4" y="4" width="14" height="14" rx="2" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.12" />
            <text x="11" y="13" textAnchor="middle" fill={color} fontSize="5" fontFamily="var(--font-mono)" fontWeight="500">PE</text>
            <rect x="22" y="4" width="14" height="14" rx="2" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.06" />
            <text x="29" y="13" textAnchor="middle" fill={color} fontSize="5" fontFamily="var(--font-mono)" fontWeight="500">RE</text>
            <rect x="4" y="22" width="14" height="14" rx="2" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.08" />
            <text x="11" y="31" textAnchor="middle" fill={color} fontSize="4.5" fontFamily="var(--font-mono)" fontWeight="500">HF</text>
            <rect x="22" y="22" width="14" height="14" rx="2" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.15" />
            <text x="29" y="31" textAnchor="middle" fill={color} fontSize="4.5" fontFamily="var(--font-mono)" fontWeight="500">Infra</text>
        </svg>
    );
}

/* ─── 10. Portfolio Management — pie chart / allocation ─── */
export function PortfolioIcon({ size = 40, color = "#5B9E6F", className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            {/* Pie chart with three slices */}
            <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.04" />
            {/* Slice lines */}
            <line x1="20" y1="20" x2="20" y2="6" stroke={color} strokeWidth="1.2" />
            <line x1="20" y1="20" x2="32" y2="26" stroke={color} strokeWidth="1.2" />
            <line x1="20" y1="20" x2="10" y2="30" stroke={color} strokeWidth="1.2" />
            {/* Fill slices with different opacities */}
            <path d="M20 6 A14 14 0 0 1 32 26 L20 20 Z" fill={color} fillOpacity="0.12" />
            <path d="M32 26 A14 14 0 0 1 10 30 L20 20 Z" fill={color} fillOpacity="0.06" />
            <path d="M10 30 A14 14 0 0 1 20 6 L20 20 Z" fill={color} fillOpacity="0.18" />
            {/* Center dot */}
            <circle cx="20" cy="20" r="2" fill={color} fillOpacity="0.4" />
        </svg>
    );
}

/** Lookup component by subject icon identifier */
const ICON_MAP: Record<string, React.FC<IconProps>> = {
    "ethics": EthicsIcon,
    "quantitative-methods": QuantIcon,
    "economics": EconIcon,
    "financial-statement-analysis": FSAIcon,
    "corporate-issuers": CorpIcon,
    "equity-valuation": EquityIcon,
    "fixed-income": FixedIncomeIcon,
    "derivatives": DerivativesIcon,
    "alternative-investments": AltsIcon,
    "portfolio-management": PortfolioIcon,
};

export default function SubjectIcon({ icon, ...props }: IconProps & { icon: string }) {
    const Component = ICON_MAP[icon];
    if (!Component) return null;
    return <Component {...props} />;
}
