import Link from "next/link";

const footerLinks = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" },
];

export function Footer() {
    return (
        <footer className="w-full bg-[#F5F1EA] border-t border-[#2D2A26]/8 py-12">
            <div className="mx-auto max-w-5xl px-6">
                {/* Top row */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="font-serif text-xl font-bold text-[#2D2A26] tracking-tight"
                    >
                        Intrinsic
                    </Link>
                    <div className="flex items-center gap-6">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-sans text-sm text-[#6B6560] hover:text-[#2D2A26] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom row */}
                <div className="mt-8 space-y-1">
                    <p className="font-sans text-xs text-[#A09890]">
                        © 2025 Intrinsic. All rights reserved.
                    </p>
                    <p className="font-sans text-xs text-[#A09890]">
                        Not affiliated with or endorsed by CFA Institute. Content is for
                        educational purposes only and does not guarantee exam results.
                    </p>
                </div>
            </div>
        </footer>
    );
}
