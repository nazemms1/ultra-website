'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#060E10' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(13,241,217,0.055)' stroke-width='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Radial glow — right side */}
      <div
        className="glow-orb animate-pulse-glow"
        style={{
          width: '700px',
          height: '600px',
          top: '-10%',
          right: '-10%',
          background: 'radial-gradient(ellipse, rgba(13,241,217,0.13) 0%, transparent 70%)',
        }}
      />

      {/* Subtle bottom-left glow */}
      <div
        className="glow-orb"
        style={{
          width: '400px',
          height: '400px',
          bottom: '5%',
          left: '-8%',
          background: 'radial-gradient(ellipse, rgba(13,241,217,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Main hero content */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 w-full pt-[72px]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-72px)]">
            {/* Left — Text content */}
            <div className="flex flex-col justify-center py-16 lg:py-0 animate-fade-up">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 mb-8 w-fit">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[1px] uppercase"
                  style={{
                    background: 'rgba(13,241,217,0.08)',
                    border: '1px solid rgba(13,241,217,0.28)',
                    fontFamily: 'Rajdhani, sans-serif',
                    color: '#0DF1D9',
                  }}
                >
                  <Zap size={12} fill="#0DF1D9" className="flex-shrink-0" />
                  Cutting-Edge Technology Solutions
                </div>
              </div>

              {/* Main heading */}
              <h1
                className="leading-[1.12] tracking-[0.6px] mb-6"
                style={{
                  fontFamily: 'Ethnocentric, Rajdhani, sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(32px, 4.5vw, 58px)',
                  lineHeight: '1.12',
                  letterSpacing: '0.6px',
                  color: '#ffffff',
                }}
              >
                WITH{' '}
                <span className="text-shimmer">ULTRAWARES</span>
                <br />
                COMES ULTRA
                <br />
                SOLUTIONS
              </h1>

              {/* Sub-headline */}
              <p
                className="mb-10 max-w-[480px]"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 400,
                  fontSize: '15px',
                  lineHeight: '24px',
                  letterSpacing: '0.4px',
                  color: 'rgba(255,255,255,0.55)',
                  textTransform: 'none',
                }}
              >
                Ultrawares provides cutting-edge solutions for businesses wanting to
                optimize their operations and gain a competitive edge in an
                increasingly digital world.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link href="#services" className="btn-accent">
                  Explore Services
                </Link>
                <Link href="#contact" className="btn-ghost flex items-center gap-2">
                  Get In Touch
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-10 mt-14 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {[
                  { value: '120+', label: 'Projects Delivered' },
                  { value: '45+', label: 'Team Members' },
                  { value: '8+', label: 'Years Experience' },
                  { value: '99%', label: 'Client Satisfaction' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span
                      style={{
                        fontFamily: 'Ethnocentric, Rajdhani, sans-serif',
                        fontWeight: 400,
                        fontSize: '26px',
                        color: '#0DF1D9',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '11px',
                        letterSpacing: '0.8px',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Visual placeholder */}
            <div className="relative flex items-center justify-center lg:justify-end py-12 lg:py-0">
              {/* Outer glow ring */}
              <div
                className="animate-pulse-glow absolute rounded-full"
                style={{
                  width: '420px',
                  height: '420px',
                  background: 'radial-gradient(ellipse, rgba(13,241,217,0.07) 0%, transparent 70%)',
                }}
              />

              {/* Central card — main visual placeholder */}
              <div
                className="relative animate-float z-10"
                style={{
                  width: 'clamp(280px, 38vw, 440px)',
                  height: 'clamp(280px, 38vw, 440px)',
                }}
              >
                {/* Main hexagonal / card shape */}
                <div
                  className="w-full h-full rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(11,24,32,0.95) 0%, rgba(6,14,16,0.98) 100%)',
                    border: '1px solid rgba(13,241,217,0.22)',
                    boxShadow: '0 0 60px rgba(13,241,217,0.08), inset 0 1px 0 rgba(13,241,217,0.12)',
                  }}
                >
                  {/* Grid inside */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-40"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath d='M 30 0 L 0 0 0 30' fill='none' stroke='rgba(13,241,217,0.15)' stroke-width='0.8'/%3E%3C/svg%3E\")",
                    }}
                  />

                  {/* Central icon composition */}
                  <div className="relative flex flex-col items-center gap-6 z-10">
                    {/* Floating chips / circuit nodes */}
                    <CircuitNode size="lg" />

                    <div className="flex items-center gap-6">
                      <CircuitNode size="sm" delay="1.5s" />
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center"
                        style={{
                          background: 'rgba(13,241,217,0.12)',
                          border: '1px solid rgba(13,241,217,0.35)',
                          boxShadow: '0 0 24px rgba(13,241,217,0.2)',
                        }}
                      >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <path d="M16 2L2 8V16C2 23.18 8.18 29.56 16 31C23.82 29.56 30 23.18 30 16V8L16 2Z" stroke="#0DF1D9" strokeWidth="1.5" fill="rgba(13,241,217,0.1)" />
                          <path d="M11 16L14.5 19.5L21 12" stroke="#0DF1D9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <CircuitNode size="sm" delay="2.5s" />
                    </div>

                    <CircuitNode size="md" delay="1s" />

                    {/* Label */}
                    <div
                      className="px-5 py-2 rounded-full"
                      style={{
                        background: 'rgba(13,241,217,0.08)',
                        border: '1px solid rgba(13,241,217,0.2)',
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '11px',
                        letterSpacing: '1.2px',
                        textTransform: 'uppercase',
                        color: '#0DF1D9',
                      }}
                    >
                      Ultra Technology
                    </div>
                  </div>
                </div>

                {/* Floating accent cards */}
                <div
                  className="absolute -top-5 -right-5 px-4 py-3 rounded-xl animate-float-slow"
                  style={{
                    background: 'rgba(11,24,32,0.95)',
                    border: '1px solid rgba(13,241,217,0.25)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '10px', letterSpacing: '0.8px', textTransform: 'uppercase', color: '#0DF1D9' }}>Performance</div>
                  <div style={{ fontFamily: 'Ethnocentric, sans-serif', fontSize: '20px', color: '#fff', lineHeight: 1.2 }}>99%</div>
                </div>

                <div
                  className="absolute -bottom-5 -left-5 px-4 py-3 rounded-xl animate-float"
                  style={{
                    animationDelay: '2s',
                    background: 'rgba(11,24,32,0.95)',
                    border: '1px solid rgba(13,241,217,0.25)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '10px', letterSpacing: '0.8px', textTransform: 'uppercase', color: '#0DF1D9' }}>Projects</div>
                  <div style={{ fontFamily: 'Ethnocentric, sans-serif', fontSize: '20px', color: '#fff', lineHeight: 1.2 }}>120+</div>
                </div>

                {/* Corner accent lines */}
                <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-px bg-[#0DF1D9] opacity-60" />
                  <div className="absolute top-0 left-0 h-full w-px bg-[#0DF1D9] opacity-60" />
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                  <div className="absolute top-0 right-0 w-full h-px bg-[#0DF1D9] opacity-60" />
                  <div className="absolute top-0 right-0 h-full w-px bg-[#0DF1D9] opacity-60" />
                </div>
                <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-full h-px bg-[#0DF1D9] opacity-60" />
                  <div className="absolute bottom-0 left-0 h-full w-px bg-[#0DF1D9] opacity-60" />
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-full h-px bg-[#0DF1D9] opacity-60" />
                  <div className="absolute bottom-0 right-0 h-full w-px bg-[#0DF1D9] opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="relative flex justify-center pb-8">
        <div className="flex flex-col items-center gap-2 opacity-40">
          <span
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '10px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[#0DF1D9] to-transparent" />
        </div>
      </div>
    </section>
  );
}

function CircuitNode({ size = 'md', delay = '0s' }: { size?: 'sm' | 'md' | 'lg'; delay?: string }) {
  const dims = { sm: 28, md: 40, lg: 52 };
  const d = dims[size];
  return (
    <div
      className="rounded-md flex items-center justify-center animate-float"
      style={{
        width: d,
        height: d,
        animationDelay: delay,
        background: 'rgba(13,241,217,0.07)',
        border: '1px solid rgba(13,241,217,0.2)',
      }}
    >
      <div
        style={{
          width: d * 0.4,
          height: d * 0.4,
          borderRadius: '3px',
          background: 'rgba(13,241,217,0.35)',
        }}
      />
    </div>
  );
}
