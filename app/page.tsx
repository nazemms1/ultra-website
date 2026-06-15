import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesOrbital from "@/components/sections/services-orbital/ServicesOrbital";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <ServicesOrbital />
    </main>
  );
}
