'use client';

import { ArrowRight, Zap } from 'lucide-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UltraButton from '@/components/ui/UltraButton';
// أضفنا استيراد النوع Variants من المكتبة
import { motion, Variants } from 'framer-motion';

 const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

 const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -250, 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      type: 'spring', 
      stiffness: 50, 
      damping: 12, 
    },
  },
};

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#121212',
      }}
    >
      
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
    

       <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'linear-gradient(to top, #121212 0%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

       <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          pt: '160px',
          px: { xs: 3, lg: '40px' },
          maxWidth: '1280px',
          mx: 'auto',
          width: '100%',
        }}
      >
         <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            maxWidth: '740px',
          }}
        >
          
           <motion.div variants={itemVariants}>
            <Typography variant="h1" sx={{ mb: '10px' }}>
              WITH{' '}
              <Box component="span" className="text-shimmer" sx={{ color: '#0DF1D9',fontSize:"50px" }}>
                ULTRAWARES
              </Box>
              <br />
              COMES ULTRA
              <br />
              SOLUTIONS
            </Typography>
          </motion.div>

           <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{ mb: 5, maxWidth: '520px', color: 'rgba(255,255,255,0.6)' }}
            >
              Ultrawares provides cutting-edge solutions for businesses wanting to
              optimize their operations and gain a competitive edge in an
              increasingly digital world.
            </Typography>
          </motion.div>

           <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
              <UltraButton variant="primary" href="#services">
                Explore Services
              </UltraButton>
              <UltraButton variant="glass" href="#contact">
                Get In Touch
                <ArrowRight size={14} />
              </UltraButton>
            </Box>
          </motion.div>

        </Box>
      </Box>
    </Box>
  );
}