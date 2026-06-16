"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AnimatePresence, motion } from "framer-motion";
import OrbitalDeck from "./OrbitalDeck";
import ViewAllButton from "./ViewAllButton";
import { DEFAULT_SERVICE_INDEX, SERVICES } from "./data";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#0DF1D9";

export default function ServicesOrbital() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = SERVICES[activeIndex ?? DEFAULT_SERVICE_INDEX];

  return (
    <Box
      component="section"
      id="services"
      sx={{
        position: "relative",
        overflow: "hidden",
        px: 3,
        py: { xs: 12, lg: 16 },
      }}
    >
      <Box
        aria-hidden
        sx={{
          pointerEvents: "none",
          position: "absolute",
          right: 0,
          top: "50%",
          width: 640,
          height: 640,
          transform: "translateY(-50%)",
          borderRadius: "50%",
          bgcolor: "rgba(13,241,217,0.05)",
          filter: "blur(150px)",
        }}
      />

      <Grid
        container
        spacing={{ xs: 6, lg: 4 }}
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1340,
          mx: "auto",
          px: 1,
          alignItems: "center",
        }}
      >
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            sx={{ maxWidth: 576 }}
          >
            <Typography
              sx={{
                mb: 3,
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "0.5em",
                color: ACCENT,
              }}
            >
              What we do
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
                fontSize: { xs: "2.1rem", sm: "2.6rem", lg: "2.85rem" },
                textTransform: "uppercase",
                lineHeight: 1.18,
                letterSpacing: "0.02em",
                color: "#ffffff",
              }}
            >
              Services built for{" "}
              <Box component="span" sx={{ color: ACCENT }}>
                ultra
              </Box>{" "}
              outcomes
            </Typography>

            <Box sx={{ mt: 5, display: "flex", gap: 2.5 }}>
              <Box
                sx={{
                  position: "relative",
                  mt: 1,
                  display: { xs: "none", sm: "block" },
                  width: "10px",
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    width: 10,
                    height: 10,
                    transform: "translateX(-50%)",
                    borderRadius: "50%",
                    bgcolor: ACCENT,
                    boxShadow: "0 0 10px 2px rgba(13,241,217,0.7)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    top: "10px",
                    width: "3px",
                    transform: "translateX(-50%)",
                    background:
                      "linear-gradient(to bottom, #0DF1D9, rgba(13,241,217,0.4), transparent)",
                  }}
                />
              </Box>

              <Box sx={{ minHeight: { xs: 230, sm: 210 } }}>
                <AnimatePresence mode="wait">
                  <Box
                    component={motion.div}
                    key={active.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <Typography
                      component="h3"
                      sx={{
                        mb: 1.5,
                        fontSize: "20px",
                        fontWeight: 500,
                        textTransform: "none",
                        letterSpacing: 0,
                        color: "#ffffff",
                      }}
                    >
                      {active.title}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "justify",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: 1.625,
                        letterSpacing: 0,
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {active.description}
                    </Typography>

                    <Box sx={{ mt: 2.5, display: "flex", flexWrap: "wrap", gap: "9px" }}>
                      {active.tags.map((tag) => (
                        <Box
                          key={tag}
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            borderRadius: "9999px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            px: 1.5,
                            py: "5px",
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "rgba(255,255,255,0.6)",
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: ACCENT,
                            }}
                          />
                          {tag}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </AnimatePresence>
              </Box>
            </Box>

            <Box sx={{ mt: 5 }}>
              <ViewAllButton />
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            sx={{
              display: "flex",
              height: { xs: 360, sm: 460, lg: 600 },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                transformOrigin: "center",
                transform: {
                  xs: "scale(0.56)",
                  sm: "scale(0.74)",
                  lg: "scale(0.9)",
                  xl: "scale(1)",
                },
              }}
            >
              <OrbitalDeck onActivate={setActiveIndex} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
