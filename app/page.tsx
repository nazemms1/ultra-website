import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersSection from '@/components/PartnersSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#121212' }}>
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <CTASection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}
