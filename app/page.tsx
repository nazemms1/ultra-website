import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersSection from '@/components/PartnersSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import FooterSection from '@/components/FooterSection';
import ServicesOrbital from '@/components/sections/services-orbital/ServicesOrbital';

export default function Home() {
  return (
    <main style={{ background: '#121212', minHeight: '100vh' }}>
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
