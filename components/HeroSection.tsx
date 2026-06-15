'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
        background: '#060E10',
      }}
    >
      {/* VIDEO BACKGROUND — add your video here later */}
      {/*
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      */}

      {/* Dark overlay over video */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(6,14,16,0.55)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          pt: '72px',
          px: { xs: 3, lg: '40px' },
          maxWidth: '1280px',
          mx: 'auto',
          width: '100%',
        }}
      >
        <Box
          className="animate-fade-up"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            maxWidth: '740px',
          }}
        >
     

          {/* Main heading */}
          <Typography variant="h1" sx={{ mb: '10px' }}>
            WITH{' '}
            <Box component="span" className="text-shimmer">
              ULTRAWARES
            </Box>
            <br />
            COMES ULTRA
            <br />
            SOLUTIONS
          </Typography>

          {/* Sub-headline */}
          <Typography
            variant="body1"
            sx={{ mb: 5, maxWidth: '520px', color: 'rgba(255,255,255,0.6)' }}
          >
            Ultrawares provides cutting-edge solutions for businesses wanting to
            optimize their operations and gain a competitive edge in an
            increasingly digital world.
          </Typography>

          {/* CTA Buttons */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
            <Link href="#services" className="btn-accent">
              Explore Services
            </Link>
            <Link href="#contact" className="btn-ghost flex items-center gap-2">
              Get In Touch
              <ArrowRight size={14} />
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Bottom scroll indicator */}
      <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', pb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, opacity: 0.4 }}>
          <Typography
            variant="overline"
            sx={{ fontSize: '10px', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.5)' }}
          >
            Scroll
          </Typography>
          <Box sx={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, #0DF1D9, transparent)' }} />
        </Box>
      </Box>
    </Box>
  );
}
