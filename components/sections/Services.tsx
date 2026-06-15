'use client';

import { Shield, Brain, Cpu, Rocket, Smartphone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: <Cpu className="w-8 h-8 text-[#0DF1D9]" />,
    title: 'Cyber Infrastructure',
    description: 'Build enterprise grade cloud architectures and secure servers optimized for speed and automated deployments.',
  },
  {
    icon: <Brain className="w-8 h-8 text-[#0DF1D9]" />,
    title: 'Artificial Intelligence',
    description: 'Deploy custom LLMs, deep learning models, and automated bots tailored specifically to streamline company operations.',
  },
  {
    icon: <Shield className="w-8 h-8 text-[#0DF1D9]" />,
    title: 'Advanced Security',
    description: 'End-to-end security audits, active penetration testing, and compliance setups ensuring total business resilience.',
  },
  {
    icon: <Rocket className="w-8 h-8 text-[#0DF1D9]" />,
    title: 'Web Platforms',
    description: 'Stunning websites built with modern frameworks like Next.js that feature lightning-fast loading speeds and rich animations.',
  },
  {
    icon: <Smartphone className="w-8 h-8 text-[#0DF1D9]" />,
    title: 'Mobile Apps',
    description: 'High-performance cross-platform iOS and Android apps focusing on fluid UX and native hardware integration.',
  },
  {
    icon: <Globe className="w-8 h-8 text-[#0DF1D9]" />,
    title: 'Global Scale',
    description: 'Scale products to millions of active users through robust microservices, real-time sync databases, and global CDNs.',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 overflow-hidden bg-[#060E10]">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#0DF1D9]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#0DF1D9] bg-[#0DF1D9]/10 border border-[#0DF1D9]/20 uppercase mb-4">
            Our Expertise
          </div>
          <h2 className="text-3xl md:text-5xl font-ethnocentric mb-6 tracking-wide leading-tight">
            WHAT WE <span className="text-shimmer">DELIVER</span>
          </h2>
          <p className="text-gray-400 font-rajdhani text-lg uppercase tracking-wider">
            Premium technologies engineered for exceptional digital products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-surface p-8 group hover:border-[#0DF1D9]/40 hover:shadow-[0_0_30px_rgba(13,241,217,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-lg bg-[#0DF1D9]/5 border border-[#0DF1D9]/25 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0DF1D9]/10 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold font-rajdhani text-white tracking-wide uppercase mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 font-rajdhani text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>
              <Button variant="cyberGhost" size="sm" className="w-fit px-0 hover:translate-x-1 duration-300">
                Learn More &rarr;
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
