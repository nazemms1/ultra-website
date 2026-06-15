import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <main style={{ background: '#060E10', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
    </main>
  );
}
