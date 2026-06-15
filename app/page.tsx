import HeroSection from "@/components/HeroSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import ServicesOrbital from "@/components/sections/services-orbital/ServicesOrbital";
import Methodologies from "@/components/sections/methodologies/Methodologies";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen pb-12">
      <HeroSection />
      <PartnersSection />
      <ServicesOrbital />
      <Methodologies />
      <CTASection />
      <FAQSection />
    </main>
  );
}
