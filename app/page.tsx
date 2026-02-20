import { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import ChapterPreview from "@/components/landing/ChapterPreview";
import PricingSection from "@/components/landing/PricingSection";
import EmailCapture from "@/components/landing/EmailCapture";

export const metadata: Metadata = {
  title: "Intrinsic — CFA Level 2 Visual Notes",
  description: "Visual CFA Level 2 study notes with hand-drawn diagrams. 5 chapters free forever.",
};

export default function Home() {
  return (
    <main className="overflow-x-hidden selection:bg-[#E8694A]/20 selection:text-[#2D2A26]">
      <div className="relative">
        <Hero />
      </div>

      <div className="relative z-10 bg-gradient-to-b from-[#FAF8F5] to-white/50 pb-20 md:pb-32">
        <ChapterPreview />
      </div>

      <div className="relative z-20 bg-white shadow-[0_-20px_40px_rgba(45,42,38,0.02)] rounded-t-[3rem] pb-20 md:pb-32 overflow-hidden">
        <PricingSection />
      </div>

      <div className="relative z-30 pb-32 -mt-10">
        <EmailCapture />
      </div>
    </main>
  );
}
