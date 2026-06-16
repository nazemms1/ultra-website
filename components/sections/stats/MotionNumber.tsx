"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import Box from "@mui/material/Box";

/** Plain span so digits inherit parent font-size (Typography resets to body1). */
export default function MotionNumber({
  value,
}: {
  value: MotionValue<string>;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribe = value.on("change", (latest) => {
      if (ref.current) ref.current.textContent = latest;
    });
    return unsubscribe;
  }, [value]);

  return (
    <Box component="span" ref={ref}>
      0
    </Box>
  );
}
