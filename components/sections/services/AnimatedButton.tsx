"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

/**
 * Glassmorphic dark pill. On hover a cyan highlight overlay slides in from the
 * far left (0%) and fills exactly 80% of the button width, leaving the right
 * 20% dark.
 */
export default function AnimatedButton({
  label = "View All Services",
  href = "#services",
  className,
}: AnimatedButtonProps) {
  return (
    <motion.a
      href={href}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
        "border border-white/15 bg-white/[0.03] px-9 py-[14px] backdrop-blur-md",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        className
      )}
    >
      {/* left-anchored highlight overlay — slides 0% -> 80% of button width */}
      <motion.span
        aria-hidden
        variants={{
          rest: { width: "0%", opacity: 0 },
          hover: { width: "80%", opacity: 1 },
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-y-0 left-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(13,241,217,0.32) 0%, rgba(13,241,217,0.14) 70%, rgba(13,241,217,0) 100%)",
        }}
      />

      <span className="relative z-10 text-[13px] font-semibold uppercase tracking-[0.16em] text-white">
        {label}
      </span>
    </motion.a>
  );
}
