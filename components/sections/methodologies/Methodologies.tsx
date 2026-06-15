"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import PhaseCard, { PhaseCardContent } from "./PhaseCard";
import Timeline from "./Timeline";
import { PHASES } from "./data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Methodologies() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Light spring keeps the carousel buttery without lagging the scrollbar.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
    restDelta: 0.0005,
  });

  // Smoothly scroll the window so a phase becomes the centred/active card.
  const seekToPhase = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const scrollable = el.offsetHeight - window.innerHeight;
    const target = trackTop + (index / (PHASES.length - 1)) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  // Reduced motion: skip the scroll-jacking track and stack cards statically.
  if (reduce) {
    return (
      <section id="methodologies" className="relative overflow-hidden px-6 py-24">
        <Header />
        <div className="mx-auto mt-14 flex max-w-[860px] flex-col gap-8">
          {PHASES.map((phase) => (
            <PhaseCardContent key={phase.number} phase={phase} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="methodologies"
      ref={trackRef}
      className="relative h-[500vh]"
      aria-label="How we turn ideas into reality"
    >
      {/* Sticky viewport — natively locks while the 500vh track scrolls past. */}
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* Ambient glows. */}
        <div className="pointer-events-none absolute -left-24 top-24 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(1,177,177,0.18)_0%,transparent_65%)] blur-[20px]" />
        <div className="pointer-events-none absolute right-0 top-28 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(13,241,217,0.14)_0%,transparent_65%)] blur-[40px]" />

        <div className="relative z-10 shrink-0 pt-16 sm:pt-20">
          <Header />
        </div>

        {/* Carousel deck. */}
        <div className="relative z-10 flex-1">
          <motion.div
            className="absolute inset-0 [perspective:1400px] [transform-style:preserve-3d]"
            initial={{ opacity: 0, x: 180 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {PHASES.map((phase, i) => (
              <PhaseCard
                key={phase.number}
                phase={phase}
                index={i}
                total={PHASES.length}
                progress={progress}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom timeline. */}
        <div className="relative z-10 shrink-0 px-6 pb-8 sm:px-10">
          <Timeline
            labels={PHASES.map((p) => p.title)}
            progress={progress}
            onSeek={seekToPhase}
          />
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="px-6 text-center">
      <p className="font-rajdhani text-sm tracking-[0.5em] text-accent">
        Our methodologies
      </p>
      <h2 className="mx-auto mt-4 max-w-4xl font-ethnocentric text-3xl uppercase leading-[1.2] tracking-wide text-white sm:text-4xl lg:text-[2.7rem]">
        How we turn ideas into <span className="text-accent">reality</span>
      </h2>
    </div>
  );
}
