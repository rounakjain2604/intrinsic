interface FormulaBlockProps {
    label: string;
    children: React.ReactNode;
}

export default function FormulaBlock({ label, children }: FormulaBlockProps) {
    return (
        <div className="bg-[#EDE8DF] rounded-2xl p-6 my-6 border border-[#2D2A26]/[0.08] overflow-x-auto">
            <p className="font-[family-name:var(--font-sans)] text-xs font-semibold text-[#A09890] uppercase tracking-wide mb-3">
                {label}
            </p>
            <div className="font-[family-name:var(--font-mono)] text-[#2D2A26] text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
}
