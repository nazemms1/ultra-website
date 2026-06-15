'use client';

import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

const usefulLinks = [
  { label: 'About Us', href: '#' },
  { label: 'Our services', href: '#' },
  { label: 'Our projects', href: '#' },
  { label: 'About...', href: '#' },
];

const services = [
  'Business Analysis',
  'Mobile & Web Eng.',
  'UI/UX Design',
  'DevOps & Cloud',
];

const stats = [
  { value: '120+', label: 'Projects Shipped' },
  { value: '45+', label: 'Happy Clients' },
  { value: '8+', label: 'Years of Craft' },
  { value: '99%', label: 'Retention Rate' },
];

const socials = [
  {
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
      </svg>
    ),
  },
];

const sectionTitleSx = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: '11px',
  letterSpacing: '1.5px',
  textTransform: 'uppercase' as const,
  color: '#0DF1D9',
  fontWeight: 600,
  mb: 2,
};

const linkSx = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: '14px',
  letterSpacing: '0.3px',
  color: 'rgba(255,255,255,0.6)',
  textDecoration: 'none',
  transition: 'color 0.2s',
  '&:hover': { color: '#0DF1D9' },
};

export default function FooterSection() {
  return (
    <Box
      component="footer"
      sx={{ position: 'relative', width: '100%', overflow: 'hidden', height: '695px' }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src="/videos/footer.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(6, 14, 16, 0.5)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ maxWidth: '1280px', mx: 'auto', px: 4, pt: 7, pb: 5 }}>

          {/* Main Grid */}
          <Grid container spacing={5}>

            {/* Col 1 — Brand */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Stack spacing={2.5}>
                <Image
                  src="/images/logo/logo-ultra.svg"
                  alt="Ultra"
                  width={100}
                  height={32}
                  priority
                />
                <Typography
                  sx={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '13px',
                    lineHeight: '22px',
                    letterSpacing: '0.3px',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  We provide cutting-edge solutions for businesses seeking to
                  optimize their operations.
                </Typography>

                {/* Social Icons */}
                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                  {socials.map((s, i) => (
                    <Box
                      key={i}
                      component={Link}
                      href={s.href}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'rgba(255,255,255,0.6)',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: '#0DF1D9',
                          color: '#0DF1D9',
                        },
                      }}
                    >
                      {s.icon}
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            {/* Col 2 — Useful Links */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography sx={sectionTitleSx}>Useful Links</Typography>
              <Stack spacing={1.5} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {usefulLinks.map((link) => (
                  <Box key={link.label} component="li">
                    <Box component={Link} href={link.href} sx={linkSx}>
                      {link.label}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Col 3 — Services */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography sx={sectionTitleSx}>Services</Typography>
              <Stack spacing={1.5} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {services.map((s) => (
                  <Typography
                    key={s}
                    component="li"
                    sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '14px',
                      letterSpacing: '0.3px',
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {s}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            {/* Col 4 — Contact (placeholder matching original) */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography sx={sectionTitleSx}>Services</Typography>
              <Stack spacing={1.5} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {services.map((s) => (
                  <Typography
                    key={s}
                    component="li"
                    sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '14px',
                      letterSpacing: '0.3px',
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {s}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>

          {/* Stats Bar */}
          <Box sx={{ mt: 7, display: 'flex', justifyContent: 'center' }}>
            <Box
              className="glass"
              sx={{
                width: '1120px',
                maxWidth: '100%',
                height: '120px',
                position: 'relative',
                borderRadius: '16px',
              }}
            >
              {stats.map((stat, i) => (
                <Stack
                  key={stat.label}
                
                  sx={{
                    width: '278.75px',
                    height: '118px',
                    position: 'absolute',
                    left: `${1 + i * 279.75}px`,
                    top: '1px',
                    py: 3.5,
                      alignItems:"center"  ,  
                    justifyContent:"center"

                  }}
                >
                  {/* Value */}
                  <Box sx={{ position: 'relative' }}>
                    <Typography
                      component="span"
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: '-0.5px',
                        color: '#0DF1D9',
                        fontSize: '36px',
                        fontFamily: "'Ethnocentric Rg', sans-serif",
                        fontWeight: 400,
                        lineHeight: '36px',
                        letterSpacing: '1px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{ visibility: 'hidden', fontSize: '36px', lineHeight: '36px', fontWeight: 400 }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>

                  {/* Label */}
                  <Box sx={{ pt: '7.5px', pb: '0.5px' }}>
                    <Typography
                      component="span"
                      sx={{
                        color: 'rgba(255,255,255,0.50)',
                        fontSize: '12px',
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 400,
                        textTransform: 'uppercase',
                        lineHeight: '18px',
                        letterSpacing: '2px',
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '1280px',
              mx: 'auto',
              px: 4,
              py: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.3px',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              © 2026 Ultrawares. All rights reserved.
            </Typography>

            <Stack direction="row" spacing={3}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Box
                  key={item}
                  component={Link}
                  href="#"
                  sx={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '12px',
                    letterSpacing: '0.3px',
                    color: 'rgba(255,255,255,0.35)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#0DF1D9' },
                  }}
                >
                  {item}
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
