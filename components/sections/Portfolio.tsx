'use client';

import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    category: 'Fintech',
    title: 'CyberBank API',
    description: 'High-throughput secure transaction rails scaling up to 10k requests per second with microsecond latencies.',
    tags: ['Next.js', 'Go', 'Redis', 'gRPC'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Artificial Intelligence',
    title: 'NeuralSearch Engine',
    description: 'Enterprise search solution processing multi-modal vectors using vector database storage and real-time inference.',
    tags: ['Python', 'PostgreSQL', 'FastAPI', 'PyTorch'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Cloud Services',
    title: 'QuantumCRM SaaS',
    description: 'A completely real-time customer data management suite featuring interactive visualization tools and offline support.',
    tags: ['React', 'TypeScript', 'Node.js', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 px-6 bg-[#060E10]">
      {/* Background neon elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#0DF1D9]/3 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#0DF1D9] bg-[#0DF1D9]/10 border border-[#0DF1D9]/20 uppercase mb-4">
              Featured Case Studies
            </div>
            <h2 className="text-3xl md:text-5xl font-ethnocentric tracking-wide leading-tight uppercase">
              OUR <span className="text-shimmer">PORTFOLIO</span>
            </h2>
          </div>
          <p className="text-gray-400 font-rajdhani text-lg max-w-md mt-4 md:mt-0 uppercase tracking-wider">
            Explore how we implement modern technologies to solve complex infrastructure and design problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card-surface overflow-hidden group hover:border-[#0DF1D9]/40 hover:shadow-[0_0_35px_rgba(13,241,217,0.12)] transition-all duration-300 flex flex-col h-full"
            >
              {/* Project Image Container */}
              <div className="relative h-48 md:h-56 overflow-hidden bg-slate-900 border-b border-[#0DF1D9]/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060E10] to-transparent opacity-80" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] tracking-widest font-semibold text-[#0DF1D9] bg-[#060E10]/80 border border-[#0DF1D9]/30 uppercase">
                  {project.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold font-rajdhani text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                    {project.title}
                    <ArrowUpRight className="w-5 h-5 text-[#0DF1D9] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </h3>
                  <p className="text-gray-400 font-rajdhani text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech tags */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button variant="cyberOutline" size="sm" className="w-full">
                    View Case Study
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
