interface CalloutProps {
    type: "exam-tip" | "key-concept" | "warning";
    children: React.ReactNode;
}

const calloutStyles = {
    "exam-tip": {
        border: "border-[#E8694A]",
        bg: "bg-[#E8694A]/[0.06]",
        label: "Exam Tip",
        labelColor: "text-[#E8694A]",
    },
    "key-concept": {
        border: "border-[#5B9E6F]",
        bg: "bg-[#5B9E6F]/[0.06]",
        label: "Key Concept",
        labelColor: "text-[#5B9E6F]",
    },
    warning: {
        border: "border-[#D4882A]",
        bg: "bg-[#D4882A]/[0.06]",
        label: "Watch Out",
        labelColor: "text-[#D4882A]",
    },
};

export default function Callout({ type, children }: CalloutProps) {
    const style = calloutStyles[type];

    return (
        <div
            className={`border-l-4 ${style.border} ${style.bg} rounded-r-xl p-5 my-6`}
        >
            <p
                className={`font-[family-name:var(--font-sans)] text-xs font-semibold ${style.labelColor} mb-1 uppercase tracking-wide`}
            >
                {style.label}
            </p>
            <div className="font-[family-name:var(--font-sans)] text-[#2D2A26] text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
}
