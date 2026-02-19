import Link from "next/link";

const navLinks = [
  { label: "Chapters", href: "/chapters" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full h-16 bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-[#2D2A26]/8">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Left — Logo */}
        <Link
          href="/"
          className="font-serif text-xl font-bold text-[#2D2A26] tracking-tight"
        >
          Intrinsic
        </Link>

        {/* Center — Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-[#6B6560] hover:text-[#2D2A26] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right — Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="font-sans text-sm text-[#6B6560] hover:text-[#2D2A26] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="font-sans text-sm font-medium bg-[#E8694A] text-[#FAF8F5] px-4 py-2 rounded-lg hover:bg-[#D45E40] transition-colors shadow-[0_2px_8px_rgba(232,105,74,0.20)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
