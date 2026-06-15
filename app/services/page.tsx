'use client';

import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import ServicesOrbital from '@/components/sections/services-orbital/ServicesOrbital';
import Methodologies from '@/components/sections/methodologies/Methodologies';
import CTASection from '@/components/CTASection';

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
    transition: { type: 'spring' as const, stiffness: 60, damping: 12 },
  },
};

export default function ServicesPage() {
  return (
    <main className="bg-[#121212] min-h-screen text-white pt-[140px] pb-12 overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#0DF1D9]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[200px] left-1/4 w-[500px] h-[500px] bg-[#0DF1D9]/3 rounded-full blur-[120px] pointer-events-none" />

      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          maxWidth: '1280px',
          mx: 'auto',
          px: { xs: 3, lg: '40px' },
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#0DF1D9] bg-[#0DF1D9]/10 border border-[#0DF1D9]/20 uppercase mb-4">
            Our Offerings
          </div>
          <h1 className="font-ethnocentric text-3xl md:text-5xl uppercase tracking-wide leading-tight mb-4">
            OUR <span className="text-shimmer">SERVICES</span>
          </h1>
          <p className="max-w-[620px] mx-auto text-gray-400 font-rajdhani text-lg uppercase tracking-wider">
            Explore how we implement modern technologies to build top-tier systems and interfaces.
          </p>
        </motion.div>
      </Box>

      {/* Services Orbital Section */}
      <ServicesOrbital />

      {/* Methodology Section */}
      <Methodologies />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
