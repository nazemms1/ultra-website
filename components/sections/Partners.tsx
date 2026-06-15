'use client';

const partners = [
  { name: 'NEXUS LABS', logo: 'NEXUS' },
  { name: 'APEX CORP', logo: 'APEX' },
  { name: 'QUANTUM DATA', logo: 'QUANTUM' },
  { name: 'CYBER CORE', logo: 'CYBER' },
  { name: 'VERTEX INC', logo: 'VERTEX' },
  { name: 'OCTANE DIGITAL', logo: 'OCTANE' },
];

export default function Partners() {
  return (
    <section id="partners" className="relative py-16 px-6 bg-[#060E10]/95 border-b border-[#0DF1D9]/10">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[2.5px] text-[#0DF1D9] uppercase mb-2">
            TRUSTED BY THE BEST IN TECH
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="h-20 rounded-xl bg-white/5 border border-white/5 hover:border-[#0DF1D9]/20 hover:bg-[#0DF1D9]/5 hover:shadow-[0_0_15px_rgba(13,241,217,0.05)] transition-all duration-300 flex items-center justify-center group"
            >
              <span className="font-ethnocentric text-sm text-gray-500 group-hover:text-[#0DF1D9] group-hover:scale-105 transition-all duration-300 tracking-wider">
                {partner.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
