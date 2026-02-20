"use client";

import { motion } from "framer-motion";

export default function Process() {
  return (
    <section className="py-32 px-6 bg-[#FAF8F5]" id="method">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-[family-name:var(--font-sans)] text-xs text-[#E8694A] font-medium uppercase tracking-[0.2em] mb-4 block">
            How It Works
          </span>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-normal text-[#2D2A26] leading-tight">
            Three stages from concept
            <br />
            to mastery.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8 w-full relative">
          {/* Card 1 */}
          <div className="sticky top-24 w-full h-auto min-h-[60vh] md:h-[65vh] bg-[#FAF8F5] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row gap-12 border border-[#2D2A26]/10 shadow-[0_8px_30px_rgba(45,42,38,0.06)] overflow-hidden">
            {/* Ghost number */}
            <div className="absolute top-8 left-10 font-[family-name:var(--font-mono)] text-8xl text-[#2D2A26]/[0.04] font-bold select-none">
              01
            </div>
            <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
              <span className="font-[family-name:var(--font-sans)] text-xs text-[#E8694A] font-medium uppercase tracking-[0.2em] mb-6">
                Stage 01
              </span>
              <h3 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-normal text-[#2D2A26] mb-6">
                See the concept
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-lg leading-relaxed">
                Read the visual notes. Hand-drawn charts and intuitive explanations build foundational mental models — without the usual brain-drain.
              </p>
            </div>
            <div className="w-full md:w-7/12 relative bg-[#F5F1EA] rounded-2xl overflow-hidden h-64 md:h-auto border border-[#2D2A26]/8 flex items-center justify-center">
              <svg
                className="w-[90%] h-[90%] text-[#4A7FC1]/70"
                viewBox="0 0 500 350"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Forward vs Spot Rates */}
                <circle cx="50" cy="200" r="6" fill="currentColor" />
                <circle cx="180" cy="200" r="6" fill="currentColor" />
                <circle cx="310" cy="200" r="6" fill="currentColor" />
                <circle cx="440" cy="200" r="6" fill="currentColor" />
                <text x="50" y="230" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">Yr 0</text>
                <text x="180" y="230" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">Yr 1</text>
                <text x="310" y="230" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">Yr 2</text>
                <text x="440" y="230" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">Yr 3</text>
                <path d="M50 200 L440 200" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 5" />
                <path d="M50 160 L170 160" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <polygon points="175,160 165,155 165,165" fill="currentColor" />
                <text x="110" y="145" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">S1</text>
                <path d="M50 120 L300 120" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <polygon points="305,120 295,115 295,125" fill="currentColor" />
                <text x="175" y="105" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">S2</text>
                <path d="M50 80 L430 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <polygon points="435,80 425,75 425,85" fill="currentColor" />
                <text x="240" y="65" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">S3</text>
                <path d="M185 245 L300 245" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <polygon points="305,245 295,240 295,250" fill="currentColor" />
                <text x="245" y="270" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">f(1,1)</text>
                <path d="M315 245 L430 245" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <polygon points="435,245 425,240 425,250" fill="currentColor" />
                <text x="375" y="270" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">f(2,1)</text>
                <rect x="50" y="290" width="400" height="40" rx="8" fill="transparent" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <text x="250" y="315" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">(1 + S2)² = (1 + S1) × (1 + f(1,1))</text>
              </svg>
            </div>
          </div>

          {/* Card 2 */}
          <div className="sticky top-32 w-full h-auto min-h-[60vh] md:h-[65vh] bg-[#F5F1EA] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row gap-12 border border-[#2D2A26]/10 shadow-[0_8px_30px_rgba(45,42,38,0.06)] overflow-hidden">
            <div className="absolute top-8 left-10 font-[family-name:var(--font-mono)] text-8xl text-[#2D2A26]/[0.04] font-bold select-none">
              02
            </div>
            <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
              <span className="font-[family-name:var(--font-sans)] text-xs text-[#E8694A] font-medium uppercase tracking-[0.2em] mb-6">
                Stage 02
              </span>
              <h3 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-normal text-[#2D2A26] mb-6">
                Understand the formula
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-lg leading-relaxed">
                Connect the dots. We explicitly link visual logic to the quantitative formulas required for calculation questions on the exam.
              </p>
            </div>
            <div className="w-full md:w-7/12 relative bg-[#EDE8DF] rounded-2xl overflow-hidden h-64 md:h-auto border border-[#2D2A26]/8 flex items-center justify-center">
              <svg
                className="w-[90%] h-[90%] text-[#E8694A]/70 relative z-10"
                viewBox="0 0 500 350"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Binomial Tree */}
                <circle cx="80" cy="175" r="20" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
                <text x="80" y="180" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">r0</text>
                <circle cx="250" cy="100" r="20" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
                <text x="250" y="105" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">r_u</text>
                <circle cx="250" cy="250" r="20" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
                <text x="250" y="255" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">r_d</text>
                <circle cx="420" cy="50" r="20" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
                <text x="420" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">r_uu</text>
                <circle cx="420" cy="175" r="20" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
                <text x="420" y="180" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">r_ud</text>
                <circle cx="420" cy="300" r="20" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
                <text x="420" y="305" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">r_dd</text>
                <path d="M100 165 L230 110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M100 185 L230 240" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M270 90 L400 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M270 110 L400 165" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M270 240 L400 185" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M270 260 L400 290" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <rect x="200" y="155" width="100" height="24" fill="#EDE8DF" />
                <text x="250" y="172" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">r_u = r_d × e^(2σ)</text>
              </svg>
            </div>
          </div>

          {/* Card 3 */}
          <div className="sticky top-40 w-full h-auto min-h-[60vh] md:h-[65vh] bg-[#EDE8DF] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row gap-12 border border-[#2D2A26]/10 shadow-[0_8px_30px_rgba(45,42,38,0.06)] overflow-hidden">
            <div className="absolute top-8 left-10 font-[family-name:var(--font-mono)] text-8xl text-[#2D2A26]/[0.04] font-bold select-none">
              03
            </div>
            <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
              <span className="font-[family-name:var(--font-sans)] text-xs text-[#E8694A] font-medium uppercase tracking-[0.2em] mb-6">
                Stage 03
              </span>
              <h3 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-normal text-[#2D2A26] mb-6">
                Apply with confidence
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-lg leading-relaxed">
                Hit the question bank. Armed with deeper intuition, edge cases make sense — eliminating second-guessing on tough vignettes.
              </p>
            </div>
            <div className="w-full md:w-7/12 relative bg-[#F5F1EA] rounded-2xl overflow-hidden h-64 md:h-auto border border-[#2D2A26]/8 flex items-center justify-center">
              <svg
                className="w-[90%] h-[90%] text-[#5B9E6F]/70"
                viewBox="0 0 500 350"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Currency Swap Cash Flows */}
                <rect x="50" y="40" width="120" height="270" rx="12" fill="transparent" stroke="currentColor" strokeWidth="2" />
                <text x="110" y="70" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold" fontFamily="var(--font-sans)">Party A</text>
                <text x="110" y="90" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">(Pays USD)</text>
                <rect x="330" y="40" width="120" height="270" rx="12" fill="transparent" stroke="currentColor" strokeWidth="2" />
                <text x="390" y="70" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold" fontFamily="var(--font-sans)">Party B</text>
                <text x="390" y="90" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">(Pays EUR)</text>
                <text x="250" y="130" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.6" fontFamily="var(--font-mono)">Initiation</text>
                <path d="M180 140 L320 140" stroke="currentColor" strokeWidth="3" />
                <polygon points="325,140 315,135 315,145" fill="currentColor" />
                <text x="250" y="135" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">€ Principal</text>
                <path d="M320 155 L180 155" stroke="currentColor" strokeWidth="3" />
                <polygon points="175,155 185,150 185,160" fill="currentColor" />
                <text x="250" y="165" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">$ Principal</text>
                <text x="250" y="200" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.6" fontFamily="var(--font-mono)">Periodic Settlement</text>
                <path d="M180 210 L320 210" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <polygon points="325,210 315,207 315,213" fill="currentColor" />
                <text x="250" y="205" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">$ Fixed</text>
                <path d="M320 220 L180 220" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <polygon points="175,220 185,217 185,223" fill="currentColor" />
                <text x="250" y="230" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">€ Fixed</text>
                <text x="250" y="260" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.6" fontFamily="var(--font-mono)">Maturity Re-exchange</text>
                <path d="M180 270 L320 270" stroke="currentColor" strokeWidth="3" />
                <polygon points="325,270 315,265 315,275" fill="currentColor" />
                <text x="250" y="265" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">$ Principal</text>
                <path d="M320 285 L180 285" stroke="currentColor" strokeWidth="3" />
                <polygon points="175,285 185,280 185,290" fill="currentColor" />
                <text x="250" y="295" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">€ Principal</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
