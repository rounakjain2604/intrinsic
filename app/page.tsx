import { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Process from "@/components/landing/Process";
import ChapterPreview from "@/components/landing/ChapterPreview";
import Manifesto from "@/components/landing/Manifesto";
import PricingSection from "@/components/landing/PricingSection";
import EmailCapture from "@/components/landing/EmailCapture";

export const metadata: Metadata = {
  title: "Intrinsic — CFA Level 2 Visual Notes",
  description:
    "Visual study notes that make complex CFA Level 2 concepts click. Hand-drawn diagrams, intuitive explanations, and a premium learning experience.",
};

export default function Home() {
  return (
    <main className="overflow-x-hidden selection:bg-[#E8694A]/20 selection:text-[#2D2A26]">
      <Hero />
      <Features />
      <Process />
      <ChapterPreview />
      <Manifesto />
      <PricingSection />
      <EmailCapture />
    </main>
  );
}
