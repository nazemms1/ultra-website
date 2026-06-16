"use client";

import { ArrowUpRight } from "lucide-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ACCENT = "#0DF1D9";
const BG = "#060E10";

const projects = [
  {
    category: "Fintech",
    title: "CyberBank API",
    description:
      "High-throughput secure transaction rails scaling up to 10k requests per second with microsecond latencies.",
    tags: ["Next.js", "Go", "Redis", "gRPC"],
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "Artificial Intelligence",
    title: "NeuralSearch Engine",
    description:
      "Enterprise search solution processing multi-modal vectors using vector database storage and real-time inference.",
    tags: ["Python", "PostgreSQL", "FastAPI", "PyTorch"],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "Cloud Services",
    title: "QuantumCRM SaaS",
    description:
      "A completely real-time customer data management suite featuring interactive visualization tools and offline support.",
    tags: ["React", "TypeScript", "Node.js", "WebSockets"],
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Portfolio() {
  return (
    <Box
      component="section"
      id="portfolio"
      sx={{ position: "relative", py: 12, px: 3, bgcolor: BG }}
    >
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          top: "50%",
          left: 0,
          width: 400,
          height: 400,
          bgcolor: "rgba(13,241,217,0.03)",
          borderRadius: "50%",
          filter: "blur(90px)",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1280, mx: "auto" }}>
        <Grid
          container
          spacing={4}
          sx={{
            mb: 8,
            alignItems: { md: "flex-end" },
            justifyContent: "space-between",
          }}
        >
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.5,
                mb: 2,
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: ACCENT,
                bgcolor: "rgba(13,241,217,0.1)",
                border: "1px solid rgba(13,241,217,0.2)",
              }}
            >
              Featured Case Studies
            </Box>
            <Typography
              component="h2"
              sx={{
                fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
                fontSize: { xs: "1.875rem", md: "3rem" },
                letterSpacing: "0.02em",
                lineHeight: 1.2,
                textTransform: "uppercase",
                color: "#ffffff",
              }}
            >
              OUR{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg, #0DF1D9 0%, #7ffff4 40%, #0DF1D9 60%, #0a9e8f 100%)",
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  animation: "shimmer 3s linear infinite",
                  "@keyframes shimmer": {
                    "0%": { backgroundPosition: "-200% center" },
                    "100%": { backgroundPosition: "200% center" },
                  },
                }}
              >
                PORTFOLIO
              </Box>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography
              sx={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "18px",
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                maxWidth: 448,
              }}
            >
              Explore how we implement modern technologies to solve complex
              infrastructure and design problems.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid key={project.title} size={{ xs: 12, md: 6, lg: 4 }}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        borderRadius: "16px",
        bgcolor: "#0B1820",
        border: "1px solid rgba(13,241,217,0.12)",
        transition: "all 0.3s",
        "&:hover": {
          borderColor: "rgba(13,241,217,0.4)",
          boxShadow: "0 0 35px rgba(13,241,217,0.12)",
          "& img": { transform: "scale(1.05)", opacity: 0.9 },
          "& .portfolio-arrow": { opacity: 1, transform: "translate(2px, -2px)" },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: { xs: 192, md: 224 },
          overflow: "hidden",
          bgcolor: "#0f172a",
          borderBottom: "1px solid rgba(13,241,217,0.1)",
        }}
      >
        <Box
          component="img"
          src={project.image}
          alt={project.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.75,
            transition: "all 0.5s",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #060E10, transparent)",
            opacity: 0.8,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            px: 1.5,
            py: 0.5,
            borderRadius: "9999px",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: ACCENT,
            bgcolor: "rgba(6,14,16,0.8)",
            border: "1px solid rgba(13,241,217,0.3)",
          }}
        >
          {project.category}
        </Box>
      </Box>

      <Box sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
            <Typography
              component="h3"
              sx={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#ffffff",
              }}
            >
              {project.title}
            </Typography>
            <Box
              className="portfolio-arrow"
              sx={{ opacity: 0, transition: "all 0.3s", display: "flex" }}
            >
              <ArrowUpRight size={20} color={ACCENT} />
            </Box>
          </Box>
          <Typography
            sx={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "14px",
              lineHeight: 1.625,
              color: "#9ca3af",
              mb: 3,
            }}
          >
            {project.description}
          </Typography>
        </Box>

        <Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {project.tags.map((tag) => (
              <Box
                key={tag}
                sx={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  px: 1,
                  py: 0.25,
                  borderRadius: "4px",
                  bgcolor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#d1d5db",
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>
          <Button
            fullWidth
            sx={{
              borderRadius: "9999px",
              border: "1px solid rgba(13,241,217,0.4)",
              bgcolor: "transparent",
              color: "#ffffff",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              py: 1,
              "&:hover": {
                borderColor: ACCENT,
                color: ACCENT,
                bgcolor: "transparent",
                boxShadow: "0 0 15px rgba(13,241,217,0.25)",
              },
            }}
          >
            View Case Study
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
