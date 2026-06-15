import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";
import ServicesOrbital from "@/components/sections/services-orbital/ServicesOrbital";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen">
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <ServicesOrbital />
      <CTASection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}
