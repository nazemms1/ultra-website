"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OrbitalDeck from "./OrbitalDeck";
import ViewAllButton from "./ViewAllButton";
import { DEFAULT_SERVICE_INDEX, SERVICES } from "./data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ServicesOrbital() {
  // null === nothing hovered → fall back to the default service.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = SERVICES[activeIndex ?? DEFAULT_SERVICE_INDEX];

  return (
    <section
      id="services"
      className="relative overflow-hidden px-6 py-24 lg:py-32"
    >
      {/* Ambient teal glow anchored to the orbital side. */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full bg-accent/5 blur-[150px]" />

      <div className="relative z-10 mx-auto grid max-w-[1340px] items-center gap-12 px-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
        {/* ---- Left column: enters from the left ---- */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-xl"
        >
          <p className="mb-6 font-rajdhani text-sm font-normal uppercase tracking-[0.5em] text-accent">
            What we do
          </p>

          <h2 className="font-ethnocentric text-[2.1rem] uppercase leading-[1.18] tracking-wide text-white sm:text-[2.6rem] lg:text-[2.85rem]">
            Services built for <span className="text-accent">ultra</span>{" "}
            outcomes
          </h2>

          {/* Active service: title + long description (swaps on hover). */}
          <div className="mt-10 flex gap-5">
            <div className="relative mt-2 hidden w-[10px] shrink-0 sm:block">
              <span className="absolute left-1/2 top-0 h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(13,241,217,0.7)]" />
              <span className="absolute bottom-0 left-1/2 top-[10px] w-[3px] -translate-x-1/2 bg-gradient-to-b from-accent via-accent/40 to-transparent" />
            </div>

            <div className="min-h-[230px] sm:min-h-[210px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <h3 className="mb-3 text-xl font-medium normal-case tracking-normal text-white">
                    {active.title}
                  </h3>
                  <p className="text-justify text-[15px] font-normal normal-case leading-relaxed tracking-normal text-white/55">
                    {active.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-[9px]">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-[5px] text-xs font-normal text-white/60"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-10">
            <ViewAllButton />
          </div>
        </motion.div>

        {/* ---- Right column: orbital system, enters from the right ---- */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="flex h-[360px] items-center justify-center sm:h-[460px] lg:h-[600px]"
        >
          <div className="origin-center scale-[0.56] sm:scale-[0.74] lg:scale-90 xl:scale-100">
            <OrbitalDeck onActivate={setActiveIndex} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
