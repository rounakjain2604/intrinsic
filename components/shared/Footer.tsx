import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#EDE8DF] pt-16 pb-10 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-block mb-4">
              <span className="font-[family-name:var(--font-sans)] text-xl font-bold tracking-tighter text-[#2D2A26]">
                INTRINSIC
              </span>
            </Link>
            <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-sm leading-relaxed">
              Visual study notes that make complex CFA Level 2 concepts click.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="font-[family-name:var(--font-mono)] text-xs font-medium text-[#2D2A26] uppercase tracking-widest mb-4">
                Explore
              </h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#chapters" className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560] hover:text-[#2D2A26] transition-colors">
                    Chapters
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560] hover:text-[#2D2A26] transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#subscribe" className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560] hover:text-[#2D2A26] transition-colors">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-mono)] text-xs font-medium text-[#2D2A26] uppercase tracking-widest mb-4">
                Legal
              </h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="#privacy" className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560] hover:text-[#2D2A26] transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#terms" className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560] hover:text-[#2D2A26] transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2D2A26]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-[family-name:var(--font-sans)] text-xs text-[#A09890]">
            &copy; {new Date().getFullYear()} Intrinsic Education. All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-sans)] text-xs text-[#A09890] text-center md:text-right max-w-md">
            Not affiliated with or endorsed by CFA Institute. CFA&reg; is a registered trademark owned by CFA Institute.
          </p>
        </div>
      </div>
    </footer>
  );
}
