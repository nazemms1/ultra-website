"use client";

import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import OrbitalTrack from "./services/OrbitalTrack";
import AnimatedButton from "./services/AnimatedButton";
import type { ServiceCardData } from "./services/ServiceCard";

const services: ServiceCardData[] = [
  {
    title: "Mobile & Web Engineering",
    description: "High-performance apps and web platforms built to scale.",
    Icon: Smartphone,
  },
  {
    title: "Mobile & Web Engineering",
    description: "High-performance apps and web platforms built to scale.",
    Icon: Smartphone,
  },
  {
    title: "Mobile & Web Engineering",
    description: "High-performance apps and web platforms built to scale.",
    Icon: Smartphone,
  },
  {
    title: "Mobile & Web Engineering",
    description: "High-performance apps and web platforms built to scale.",
    Icon: Smartphone,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden px-6 py-24 lg:py-32"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-accent/5 blur-[140px]" />

      <div className="relative z-10 mx-auto grid max-w-[1340px] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 px-2">
        {/* ---- Left column: text + CTA (enters from the left) ---- */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-xl"
        >
          <p className="mb-6 font-rajdhani text-xs font-semibold uppercase tracking-[0.45em] text-accent">
            What We Do
          </p>

          <h2 className="font-ethnocentric text-4xl uppercase leading-[1.12] tracking-wide text-white sm:text-5xl lg:text-[3.25rem]">
            Services Built
            <br />
            For <span className="text-accent">Ultra</span>
            <br />
            Outcomes
          </h2>

          <div className="mt-10 flex gap-5">
            {/* cyan rail: solid dot on top, gradient fading to transparent */}
            <div className="relative mt-2 hidden w-[10px] shrink-0 sm:block">
              <span className="absolute left-1/2 top-0 h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(13,241,217,0.7)]" />
              <span className="absolute left-1/2 top-[10px] bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-accent via-accent/40 to-transparent" />
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold normal-case tracking-normal text-white">
                Mobile &amp; Web Engineering
              </h3>
              <p className="text-justify text-[15px] font-normal normal-case leading-relaxed tracking-normal text-white/55">
                We specialize in crafting robust, high-performance applications
                and web platforms that are thoughtfully engineered to evolve
                seamlessly with your business needs. Our solutions emphasize
                seamless scalability and resilience, ensuring your systems
                maintain optimal reliability and responsiveness even as demand
                grows. By integrating intuitive design principles and advanced
                technologies, we create user-friendly experiences that drive
                engagement and efficiency, empowering your business to thrive in
                dynamic markets.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <AnimatedButton label="View All Services" />
          </div>
        </motion.div>

        {/* ---- Right column: orbital system (enters from the right) ---- */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="flex h-[380px] items-center justify-center sm:h-[480px] lg:h-[560px]"
        >
          <div className="origin-center scale-[0.6] sm:scale-[0.82] lg:scale-90 xl:scale-100">
            <OrbitalTrack cards={services} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
