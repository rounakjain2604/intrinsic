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
    <main className="overflow-x-hidden">
      <Hero />

      <hr className="border-t border-[#2D2A26]/6 max-w-5xl mx-auto" />

      <div className="py-24">
        <ChapterPreview />
      </div>

      <hr className="border-t border-[#2D2A26]/6 max-w-5xl mx-auto" />

      <div className="py-24">
        <PricingSection />
      </div>

      <hr className="border-t border-[#2D2A26]/6 max-w-5xl mx-auto" />

      <div className="py-24 bg-[#F5F1EA]">
        <EmailCapture />
      </div>
    </main>
  );
}
