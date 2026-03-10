interface CalloutProps {
    type: "exam-tip" | "key-concept" | "key" | "warning" | "trap";
    children: React.ReactNode;
}

const calloutStyles = {
    "exam-tip": {
        border: "border-[#c8a96e]",
        bg: "bg-[#c8a96e]/[0.06]",
        label: "Exam Tip",
        labelColor: "text-[#c8a96e]",
    },
    key: {
        border: "border-[#2d6a4f]",
        bg: "bg-[#2d6a4f]/[0.06]",
        label: "Key Concept",
        labelColor: "text-[#2d6a4f]",
    },
    "key-concept": {
        border: "border-[#2d6a4f]",
        bg: "bg-[#2d6a4f]/[0.06]",
        label: "Key Concept",
        labelColor: "text-[#2d6a4f]",
    },
    warning: {
        border: "border-[#b5451b]",
        bg: "bg-[#b5451b]/[0.06]",
        label: "Watch Out",
        labelColor: "text-[#b5451b]",
    },
    trap: {
        border: "border-[#b5451b]",
        bg: "bg-[#b5451b]/[0.06]",
        label: "Exam Trap",
        labelColor: "text-[#b5451b]",
    },
};

export default function Callout({ type, children }: CalloutProps) {
    const style = calloutStyles[type];

    return (
        <div
            className={`border-l-4 ${style.border} ${style.bg} rounded-r-xl p-5 my-6`}
        >
            <p
                className={`font-['Candara','Calibri','Georgia',serif] text-xs font-semibold ${style.labelColor} mb-1 uppercase tracking-wide`}
            >
                {style.label}
            </p>
            <div className="font-['Candara','Calibri','Georgia',serif] text-[#1e1e1e] text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
}
