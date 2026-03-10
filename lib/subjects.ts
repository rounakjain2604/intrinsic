/** ─── CFA Level 2 — 10 Subject Areas & Learning Modules ─── */

export interface LearningModule {
    title: string;
    slug: string;
}

export interface Subject {
    id: number;
    name: string;
    shortName: string;
    color: string;
    icon: string; // identifier used by <SubjectIcon />
    modules: LearningModule[];
}

export const SUBJECTS: Subject[] = [
    {
        id: 1,
        name: "Ethics and Professional Standards",
        shortName: "Ethics",
        color: "#4A7FC1",
        icon: "ethics",
        modules: [
            { title: "Code of Ethics and Standards of Professional Conduct", slug: "ethics" },
        ],
    },
    {
        id: 2,
        name: "Quantitative Methods",
        shortName: "Quant",
        color: "#7B6BAE",
        icon: "quantitative-methods",
        modules: [
            { title: "Multiple Regression", slug: "quantitative-methods-regression" },
            { title: "Time-Series Analysis", slug: "quantitative-methods-time-series" },
            { title: "Machine Learning", slug: "quantitative-methods-ml" },
        ],
    },
    {
        id: 3,
        name: "Economics",
        shortName: "Econ",
        color: "#5B9E6F",
        icon: "economics",
        modules: [
            { title: "Currency Exchange Rates", slug: "economics-currency" },
            { title: "Economic Growth and the Investment Decision", slug: "economics-growth" },
        ],
    },
    {
        id: 4,
        name: "Financial Statement Analysis",
        shortName: "FSA",
        color: "#D4882A",
        icon: "financial-statement-analysis",
        modules: [
            { title: "Intercorporate Investments", slug: "financial-statement-analysis" },
            { title: "Employee Compensation", slug: "fsa-employee-compensation" },
            { title: "Multinational Operations", slug: "fsa-multinational-operations" },
            { title: "Analysis of Financial Institutions", slug: "fsa-financial-institutions" },
            { title: "Evaluating Financial Reporting Quality", slug: "fsa-reporting-quality" },
        ],
    },
    {
        id: 5,
        name: "Corporate Issuers",
        shortName: "Corp",
        color: "#C94F3A",
        icon: "corporate-issuers",
        modules: [
            { title: "Analysis of Dividends and Share Repurchases", slug: "corporate-issuers-dividends" },
            { title: "ESG Considerations in Investment Analysis", slug: "corporate-issuers-esg" },
            { title: "Mergers and Acquisitions", slug: "corporate-issuers-ma" },
        ],
    },
    {
        id: 6,
        name: "Equity Valuation",
        shortName: "Equity",
        color: "#E8694A",
        icon: "equity-valuation",
        modules: [
            { title: "Equity Valuation: Applications and Processes", slug: "equity-valuation-apps" },
            { title: "Discounted Dividend Valuation", slug: "equity-valuation-ddm" },
            { title: "Free Cash Flow Valuation", slug: "equity-valuation-fcf" },
            { title: "Market-Based Valuation: Price and Enterprise Value Multiples", slug: "equity-valuation-multiples" },
            { title: "Residual Income Valuation", slug: "equity-valuation-residual" },
            { title: "Private Company Valuation", slug: "equity-valuation-private" },
        ],
    },
    {
        id: 7,
        name: "Fixed Income",
        shortName: "FI",
        color: "#4A7FC1",
        icon: "fixed-income",
        modules: [
            { title: "The Term Structure and Interest Rate Dynamics", slug: "fixed-income-term-structure" },
            { title: "The Arbitrage-Free Valuation Framework", slug: "fixed-income-arb-free" },
            { title: "Valuation and Analysis of Bonds with Embedded Options", slug: "fixed-income-embedded-options" },
            { title: "Credit Analysis Models", slug: "fixed-income-credit" },
        ],
    },
    {
        id: 8,
        name: "Derivatives",
        shortName: "Deriv",
        color: "#7B6BAE",
        icon: "derivatives",
        modules: [
            { title: "Pricing and Valuation of Forward Commitments", slug: "derivatives-forwards" },
            { title: "Valuation of Contingent Claims", slug: "derivatives-options" },
        ],
    },
    {
        id: 9,
        name: "Alternative Investments",
        shortName: "Alts",
        color: "#D4882A",
        icon: "alternative-investments",
        modules: [
            { title: "Private Capital, Real Estate, Infrastructure, Natural Resources, and Hedge Funds", slug: "alternative-investments" },
        ],
    },
    {
        id: 10,
        name: "Portfolio Management",
        shortName: "PM",
        color: "#5B9E6F",
        icon: "portfolio-management",
        modules: [
            { title: "Exchange-Traded Funds: Mechanics and Applications", slug: "portfolio-management-etf" },
            { title: "Using Multifactor Models", slug: "portfolio-management-multifactor" },
            { title: "Measuring and Managing Market Risk", slug: "portfolio-management-risk" },
            { title: "Economics and Investment Markets", slug: "portfolio-management-economics" },
            { title: "Analysis of Active Portfolio Management", slug: "portfolio-management-active" },
        ],
    },
];

/** Flat list of every learning-module slug across all subjects. */
export const ALL_MODULE_SLUGS = SUBJECTS.flatMap((s) =>
    s.modules.map((m) => m.slug)
);
