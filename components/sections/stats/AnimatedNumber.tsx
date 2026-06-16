"use client";

import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import MotionNumber from "./MotionNumber";
import { SMOOTH_EASE, statNumberSx } from "./constants";

type AnimatedNumberProps = {
  value: number;
  suffix: string;
  active: boolean;
  duration: number;
  delay: number;
};

export default function AnimatedNumber({
  value,
  suffix,
  active,
  duration,
  delay,
}: AnimatedNumberProps) {
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString(),
  );

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      count.set(value);
      return;
    }

    count.set(0);
    const controls = animate(count, value, {
      duration,
      delay,
      ease: SMOOTH_EASE,
    });
    return () => controls.stop();
  }, [active, count, delay, duration, reduce, value]);

  if (reduce) {
    return (
      <Typography component="span" sx={statNumberSx}>
        {value}
        {suffix}
      </Typography>
    );
  }

  return (
    <Typography component={motion.span} sx={statNumberSx}>
      <MotionNumber value={display} />
      {suffix}
    </Typography>
  );
}
