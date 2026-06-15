'use client';

import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CTASection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Target position (raw mouse)
  const target = useRef({ x: 0, y: 0 });
  // Current interpolated position
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const card = cardRef.current;
      if (!card) { rafId.current = requestAnimationFrame(tick); return; }

      current.current.x = lerp(current.current.x, target.current.x, 0.1);
      current.current.y = lerp(current.current.y, target.current.y, 0.1);

      card.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    target.current = { x: nx * 40, y: ny * 40 };
  };

  const handleMouseLeave = () => {
    target.current = { x: 0, y: 0 };
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        height: '689px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        /* Fade into the section above */
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(to bottom, #121212 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        },
        /* Fade into the section below */
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(to top, #121212 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/videos/colorflow-animation.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(6,14,16,0.45)',
          zIndex: 1,
        }}
      />

      {/* Glass card — moves with mouse parallax offset 40 */}
      <Box
        ref={cardRef}
        sx={{
          position: 'relative',
          zIndex: 3,
          mx: { xs: 3, md: 'auto' },
          width: { xs: '100%', md: '922px' },
          height: { md: '418px' },
          borderRadius: '50px',
          px: { xs: '40px', md: '80px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          willChange: 'transform',
          /* Glass */
          background: 'transparent',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          border: '1px solid rgba(1, 177, 177, 0.30)',
          boxShadow: [
            '0px 57px 80px -20px rgba(0,0,0,0.30)',
            'inset 1px 1px 16px 0px rgba(255,255,255,0.13)',
            'inset -1px -1px 16px 0px rgba(255,255,255,0.05)',
          ].join(', '),
        }}
      >
        {/* Eyebrow */}
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#0DF1D9',
            mb: '10px',
          }}
        >
          Let's build together
        </Typography>

        {/* Headline */}
        <Typography
          sx={{
            fontFamily: "'Ethnocentric Rg', sans-serif",
            fontWeight: 400,
            fontSize: { xs: '28px', md: '40px' },
            lineHeight: 1.1,
            letterSpacing: '1.5px',
            color: '#ffffff',
            mb: '12px',
          }}
        >
          READY TO BUILD SOMETHING{' '}
          <Box component="span" sx={{ color: '#0DF1D9' }}>
            ULTRA?
          </Box>
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 400,
            fontSize: '14px',
            letterSpacing: '0.3px',
            color: 'rgba(255,255,255,0.55)',
            mb: '36px',
            mx: 'auto',
          }}
        >
          Let's talk about your product, your users, and how Ultrawares can help you ship it.
        </Typography>

        {/* CTA Button */}
        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0DF1D9',
            color: '#060E10',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '14px 40px',
            borderRadius: '100px',
            textDecoration: 'none',
            boxShadow: '0px 0px 28px 0px #01B1B180',
            transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0px 0px 40px 0px #01B1B199';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0px 0px 28px 0px #01B1B180';
          }}
        >
          Start a Project
        </a>
      </Box>
    </Box>
  );
}
