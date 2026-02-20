import { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Manifesto from "@/components/landing/Manifesto";
import Process from "@/components/landing/Process";
import PricingSection from "@/components/landing/PricingSection";

export const metadata: Metadata = {
  title: "Intrinsic — The Biological Protocol",
  description: "Advanced biological optimization for the high-performing few.",
};

export default function Home() {
  return (
    <main className="overflow-x-hidden selection:bg-[#E8694A]/20 selection:text-[#2D2A26] bg-[#FAF8F5]">
      <div className="relative">
        <Hero />
      </div>

      <Features />
      <Manifesto />
      <Process />

      <div className="relative z-20 pb-0 overflow-hidden bg-white">
        <PricingSection />
      </div>
    </main>
  );
}
