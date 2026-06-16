"use client";

import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 60, damping: 12 },
  },
};

const values = [
  {
    title: "INNOVATION",
    description:
      "We continuously push the boundaries of digital engineering, delivering ahead-of-time solutions to keep you competitive.",
  },
  {
    title: "EXECUTION",
    description:
      "Our methodologies emphasize rapid, precise shipping of products with microsecond performance and bulletproof reliability.",
  },
  {
    title: "PARTNERSHIP",
    description:
      "We act as an extension of your own team, aligning our goals with yours to create long-term shared value.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#121212] min-h-screen text-white pt-[140px] pb-12">
      {/* Background neon glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0DF1D9]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[600px] right-1/4 w-[400px] h-[400px] bg-[#0DF1D9]/3 rounded-full blur-[100px] pointer-events-none" />

      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, lg: "40px" },
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Page Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#0DF1D9] bg-[#0DF1D9]/10 border border-[#0DF1D9]/20 uppercase mb-4">
            Who We Are
          </div>
          <Typography
            variant="h1"
            className="font-ethnocentric text-3xl md:text-5xl uppercase tracking-wide leading-tight"
            sx={{ mb: 3 }}
          >
            BEHIND THE <span className="text-shimmer">ULTRA</span> SOLUTIONS
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxW: "680px",
              mx: "auto",
              color: "rgba(255,255,255,0.6)",
              fontSize: "18px",
              fontFamily: "'Rajdhani', sans-serif",
            }}
          >
            We are a group of specialized engineers, product strategists, and
            designers dedicated to elevating corporate systems to the ultra
            level of responsiveness and throughput.
          </Typography>
        </motion.div>

        {/* Brand Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <motion.div variants={itemVariants} className="space-y-6">
            <Typography
              variant="h3"
              className="font-rajdhani text-2xl font-bold text-[#0DF1D9] tracking-wider uppercase"
            >
              Our Philosophy
            </Typography>
            <Typography className="text-gray-300 font-rajdhani text-lg leading-relaxed normal-case tracking-wide">
              At Ultrawares, we believe that software should not just run; it
              should fly. Every line of code we write and every layout we ship
              is optimized for extreme throughput and efficiency.
            </Typography>
            <Typography className="text-gray-400 font-rajdhani text-base leading-relaxed normal-case tracking-wide">
              We leverage modern architectural paradigms — from high-performance
              microservices and serverless infrastructure to reactive,
              responsive user interfaces. Our solutions eliminate lag, reduce
              overhead, and help operations scale seamlessly.
            </Typography>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative p-8 rounded-[30px] border border-white/10 glass bg-white/[0.02] shadow-2xl"
          >
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#0DF1D9]" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#0DF1D9]" />
            <Typography
              variant="h4"
              className="font-ethnocentric text-lg uppercase text-white mb-4"
            >
              Our Vision
            </Typography>
            <Typography className="text-gray-300 font-rajdhani text-[15px] leading-relaxed normal-case tracking-wide">
              To empower regional and international enterprises with top-tier
              technology infrastructure that turns complex workflows into
              effortless systems. We serve clients across Syria, the UAE, and
              globally, bridging modern engineering practices with local
              business context.
            </Typography>
          </motion.div>
        </div>

        {/* Core Values Cards */}
        <div className="mb-32">
          <Typography
            variant="h2"
            className="font-ethnocentric text-2xl md:text-3xl text-center uppercase tracking-wider mb-16"
          >
            OUR CORE <span className="text-shimmer">VALUES</span>
          </Typography>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <motion.div
                key={v.title}
                variants={itemVariants}
                className="card-surface p-8 group hover:border-[#0DF1D9]/40 hover:shadow-[0_0_35px_rgba(13,241,217,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <Typography
                    variant="h3"
                    className="font-rajdhani text-xl font-bold text-[#0DF1D9] tracking-wider mb-4"
                  >
                    {v.title}
                  </Typography>
                  <Typography className="text-gray-400 font-rajdhani text-sm leading-relaxed normal-case tracking-wide">
                    {v.description}
                  </Typography>
                </div>
                <div className="mt-8 h-1 w-12 bg-white/10 group-hover:bg-[#0DF1D9] transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </Box>

      {/* Partners Section */}
      <PartnersSection />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
