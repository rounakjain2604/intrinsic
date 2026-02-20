import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#1A1816] pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-8 mb-20">

                {/* Left Section */}
                <div className="md:w-1/3 flex flex-col border-white/5 relative z-10">
                    <Link href="/" className="mb-6 inline-block">
                        <span className="font-[family-name:var(--font-sans)] text-3xl font-bold tracking-tighter text-[#FAF8F5]">
                            INTRINSIC
                        </span>
                    </Link>
                    <p className="font-[family-name:var(--font-sans)] text-[#FAF8F5]/60 font-light max-w-sm mb-8 leading-relaxed hover:text-[#FAF8F5]/80 transition-colors">
                        The quantitative biology infrastructure for human optimization. We measure, model, and maximize performance.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-[#E8694A] animate-pulse" />
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[#E8694A] uppercase tracking-widest font-semibold drop-shadow-sm">Accepting Applications</span>
                    </div>
                </div>

                {/* Right Section / Links */}
                <div className="md:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 relative z-10">

                    <div className="flex flex-col">
                        <h4 className="font-[family-name:var(--font-mono)] text-xs font-bold text-[#FAF8F5] uppercase tracking-widest mb-6 border-b border-white/10 pb-3">Explore</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="#philosophy" className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors font-light">Philosophy</Link></li>
                            <li><Link href="#protocol" className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors font-light">The Protocol</Link></li>
                            <li><Link href="#membership" className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors font-light">Membership</Link></li>
                            <li><Link href="#science" className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors font-light">Clinical Board</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h4 className="font-[family-name:var(--font-mono)] text-xs font-bold text-[#FAF8F5] uppercase tracking-widest mb-6 border-b border-white/10 pb-3">Company</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="#about" className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors font-light">About Us</Link></li>
                            <li><Link href="#careers" className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors font-light">Careers</Link></li>
                            <li><Link href="#press" className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors font-light">Press Inquiries</Link></li>
                            <li><Link href="#contact" className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors font-light">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col col-span-2 lg:col-span-1">
                        <h4 className="font-[family-name:var(--font-mono)] text-xs font-bold text-[#FAF8F5] uppercase tracking-widest mb-6 border-b border-white/10 pb-3">Sign Up</h4>
                        <p className="text-[#FAF8F5]/60 font-light mb-4 text-sm max-w-xs">Join the private list for quarterly research briefs.</p>
                        <div className="flex p-1 bg-white/5 rounded-full border border-white/10 hover:border-white/20 transition-colors focus-within:border-white/30 focus-within:bg-white/10">
                            <input type="email" placeholder="Email Address" className="bg-transparent text-[#FAF8F5] px-4 py-2 text-sm w-full focus:outline-none placeholder-[#FAF8F5]/30 font-light" />
                            <button className="bg-[#FAF8F5] text-[#1A1816] w-9 h-9 rounded-full flex items-center justify-center shrink-0 hover:bg-[#E8694A] hover:text-white transition-colors" aria-label="Subscribe">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Legal */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <p className="text-[#FAF8F5]/40 text-sm font-light">© {new Date().getFullYear()} Intrinsic Protocol. All rights reserved.</p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    <Link href="#privacy" className="text-[#FAF8F5]/40 hover:text-[#FAF8F5] text-sm transition-colors font-light">Privacy Policy</Link>
                    <Link href="#terms" className="text-[#FAF8F5]/40 hover:text-[#FAF8F5] text-sm transition-colors font-light">Terms of Service</Link>
                    <Link href="#disclaimer" className="text-[#FAF8F5]/40 hover:text-[#FAF8F5] text-sm transition-colors font-light">Medical Disclaimer</Link>
                </div>
            </div>
        </footer>
    );
}
