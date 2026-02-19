type BadgeVariant = "free" | "premium" | "locked" | "standard";

interface BadgeProps {
  variant: BadgeVariant;
}

const variantStyles: Record<
  BadgeVariant,
  { className: string; label: string }
> = {
  free: {
    className:
      "text-[#5B9E6F] bg-[#5B9E6F]/10 border border-[#5B9E6F]/25",
    label: "FREE",
  },
  premium: {
    className:
      "text-[#D4882A] bg-[#D4882A]/10 border border-[#D4882A]/25",
    label: "PREMIUM · $14.99",
  },
  standard: {
    className:
      "text-[#4A7FC1] bg-[#4A7FC1]/10 border border-[#4A7FC1]/25",
    label: "$9.99",
  },
  locked: {
    className:
      "text-[#A09890] bg-[#2D2A26]/5 border border-[#2D2A26]/10",
    label: "LOCKED",
  },
};

export default function Badge({ variant }: BadgeProps) {
  const { className, label } = variantStyles[variant];

  return (
    <span
      className={`inline-block font-[family-name:var(--font-sans)] text-xs font-semibold rounded-full px-3 py-1 ${className}`}
    >
      {label}
    </span>
  );
}
