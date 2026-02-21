import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2D2A26] pt-16 pb-10 px-6 dark-section-noise">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-block mb-4">
              <span className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[#FAF8F5] tracking-tight">
                Intrinsic
              </span>
            </Link>
            <p className="font-[family-name:var(--font-sans)] text-sm leading-relaxed" style={{ color: "rgba(250,248,245,0.55)" }}>
              Visual study notes that make complex CFA Level 2 concepts click. See the market clearly.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "rgba(250,248,245,0.4)" }}>
                Explore
              </h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#chapters" className="font-[family-name:var(--font-sans)] text-sm transition-colors" style={{ color: "rgba(250,248,245,0.6)" }}>
                    Chapters
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="font-[family-name:var(--font-sans)] text-sm transition-colors" style={{ color: "rgba(250,248,245,0.6)" }}>
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "rgba(250,248,245,0.4)" }}>
                Legal
              </h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="#privacy" className="font-[family-name:var(--font-sans)] text-sm transition-colors" style={{ color: "rgba(250,248,245,0.6)" }}>
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#terms" className="font-[family-name:var(--font-sans)] text-sm transition-colors" style={{ color: "rgba(250,248,245,0.6)" }}>
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Coral divider */}
        <div className="border-t border-[#E8694A]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-[family-name:var(--font-sans)] text-xs" style={{ color: "rgba(250,248,245,0.35)" }}>
            &copy; {new Date().getFullYear()} Intrinsic Education. All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-sans)] text-xs text-center md:text-right max-w-md" style={{ color: "rgba(250,248,245,0.35)" }}>
            Not affiliated with or endorsed by CFA Institute. CFA&reg; is a registered trademark owned by CFA Institute.
          </p>
        </div>
      </div>
    </footer>
  );
}
