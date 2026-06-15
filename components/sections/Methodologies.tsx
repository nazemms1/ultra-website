'use client';

const methodologies = [
  {
    step: '01',
    title: 'Discovery & Architecture',
    subtitle: 'Deep Analysis & Infrastructure Planning',
    description: 'We audit your existing flows, define goals, and blueprint a scalable infrastructure layout before writing a single line of code.',
  },
  {
    step: '02',
    title: 'Agile Implementation',
    subtitle: 'Rapid Iteration & Component Creation',
    description: 'We build with clean design systems, components, and automated cycles to ensure you see progress in real time.',
  },
  {
    step: '03',
    title: 'Hardening & Security',
    subtitle: 'Audit, Speed Tuning & Testing',
    description: 'Rigorous optimization, load testing, and security scans ensure your application remains impenetrable and performant under load.',
  },
  {
    step: '04',
    title: 'Launch & Expansion',
    subtitle: 'Continuous Deployment & Scaling',
    description: 'We deploy to edge locations globally, setting up automated monitoring, analytics, and auto-scaling mechanisms.',
  },
];

export default function Methodologies() {
  return (
    <section id="methodologies" className="relative py-24 px-6 bg-[#060E10]/95 border-t border-b border-[#0DF1D9]/10">
      {/* Background neon orb */}
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#0DF1D9]/3 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#0DF1D9] bg-[#0DF1D9]/10 border border-[#0DF1D9]/20 uppercase mb-4">
            How We Work
          </div>
          <h2 className="text-3xl md:text-5xl font-ethnocentric mb-6 tracking-wide leading-tight">
            OUR <span className="text-shimmer">METHODOLOGY</span>
          </h2>
          <p className="text-gray-400 font-rajdhani text-lg uppercase tracking-wider">
            A reliable process engineered for velocity and flawless execution.
          </p>
        </div>

        {/* Steps container */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {methodologies.map((item, index) => (
            <div key={index} className="relative flex flex-col group">
              {/* Step indicator */}
              <div className="flex items-center mb-6">
                <div className="font-ethnocentric text-4xl md:text-5xl text-[#0DF1D9]/10 group-hover:text-[#0DF1D9]/35 group-hover:scale-105 duration-300 select-none">
                  {item.step}
                </div>
                <div className="h-px bg-gradient-to-r from-[#0DF1D9]/30 to-transparent flex-1 ml-4 hidden lg:block" />
              </div>

              {/* Step Card Content */}
              <div className="card-surface p-6 flex-1 hover:border-[#0DF1D9]/30 transition-all duration-300">
                <h4 className="text-xs font-semibold tracking-widest text-[#0DF1D9] uppercase mb-2">
                  {item.subtitle}
                </h4>
                <h3 className="text-xl font-bold font-rajdhani text-white uppercase tracking-wider mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 font-rajdhani text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
