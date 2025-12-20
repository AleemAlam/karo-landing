import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import PainPointsSection from "@/components/PainPointsSection";
import CTASection from "@/components/CTASection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CreatorSection from "@/components/CreatorSection";
import FoundersEditionSection from "@/components/FoundersEditionSection";
import ProgramDetailsSection from "@/components/ProgramDetailsSection";
import PricingCTASection from "@/components/PricingCTASection";
import LimitedSpotsSection from "@/components/LimitedSpotsSection";
import FAQSection from "@/components/FAQSection";
import MigraineCostCalculator from "@/components/MigraineCostCalculator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <StatsSection />
      <PainPointsSection />
      <CTASection />
      <HowItWorksSection />
      <CreatorSection />
      <FoundersEditionSection />
      <ProgramDetailsSection />
      <PricingCTASection />
      <LimitedSpotsSection />
      <FAQSection />
      <MigraineCostCalculator />
      <Footer />
    </div>
  );
}
