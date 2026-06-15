"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ViewAllButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

/**
 * Outline pill. On hover an internal fill layer sweeps in from the left edge
 * (left: 0) and stops at ~80% of the button width — a deliberate partial fill
 * rather than a full block.
 */
export default function ViewAllButton({
  label = "View all services",
  href = "#services",
  className,
}: ViewAllButtonProps) {
  return (
    <motion.a
      href={href}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
        "border border-white/20 bg-transparent px-8 py-[15px] backdrop-blur-sm",
        "transition-[border-color,box-shadow] duration-300 hover:border-white/35",
        "hover:shadow-[0_0_28px_rgba(13,241,217,0.18)]",
        className
      )}
    >
      {/* Left-anchored partial fill: 0% -> 80% of the button width. */}
      <motion.span
        aria-hidden
        variants={{
          rest: { width: "0%", opacity: 0 },
          hover: { width: "80%", opacity: 1 },
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-y-0 left-0 z-0 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(13,241,217,0.30) 0%, rgba(13,241,217,0.12) 65%, rgba(13,241,217,0) 100%)",
        }}
      />

      <span className="relative z-10 text-[15px] font-semibold uppercase tracking-[1px] text-white">
        {label}
      </span>
    </motion.a>
  );
}
