import { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import ManifestoBand from "@/components/landing/ManifestoBand";
import Features from "@/components/landing/Features";
import ChapterProtocol from "@/components/landing/ChapterProtocol";
import PricingSection from "@/components/landing/PricingSection";
import ProofStrip from "@/components/landing/ProofStrip";

export const metadata: Metadata = {
  title: "Intrinsic — CFA Level 2 Visual Notes",
  description:
    "Visual study notes that make complex CFA Level 2 concepts click. Hand-drawn diagrams, intuitive explanations, and a premium learning experience.",
};

export default function Home() {
  return (
    <main className="overflow-clip selection:bg-[#E8694A]/20 selection:text-[#2D2A26]">
      <Hero />
      <ManifestoBand />
      <Features />
      <ChapterProtocol />
      <PricingSection />
      <ProofStrip />
    </main>
  );
}
