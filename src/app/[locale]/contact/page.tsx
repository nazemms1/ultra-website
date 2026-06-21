'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { Theme } from '@mui/material/styles'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import PageHero, { ShimmerText } from '@/components/shared/PageHero'
import UltraButton from '@/components/shared/UltraButton'
import FAQSection from '@/components/Pages/Home/Faqs'
import { glassSurface } from '@/lib/theme/surfaces'
import { siteConfig } from '@/config'

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 60, damping: 12 },
  },
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: (theme: Theme) => alpha(theme.palette.background.elevated, 0.8),
    borderRadius: 3,
    '& fieldset': { borderColor: 'background.divider' },
    '&:hover fieldset': { borderColor: 'primary.main' },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
      boxShadow: (theme: Theme) => `0 0 15px ${alpha(theme.palette.primary.main, 0.15)}`,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'text.tertiary',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontSize: '0.6875rem',
  },
}

function ContactInfoRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  const theme = useTheme()

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Box
        sx={{
          p: 1.5,
          borderRadius: 3,
          color: 'primary.main',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
        }}
      >
        {icon}
      </Box>
      <Stack spacing={0.5}>
        <Typography variant="overline" color="text.tertiary">
          {title}
        </Typography>
        {children}
      </Stack>
    </Stack>
  )
}

export default function ContactPage() {
  const theme = useTheme()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    window.setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title={
          <>
            LET&apos;S BUILD SOMETHING <ShimmerText>ULTRA</ShimmerText>
          </>
        }
        subtitle="Contact us now to talk about your product, users, and how we can scale your systems."
      />

      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 3, lg: 5 }, pb: 12 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack
              component={motion.div}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h3" color="primary.main" sx={{ textTransform: 'uppercase' }}>
                  Contact Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reach out through any channel or use the form. Our technical team responds within
                  24 hours.
                </Typography>
              </Stack>

              <ContactInfoRow icon={<EmailOutlinedIcon />} title="Email">
                <Typography
                  component="a"
                  href={`mailto:${siteConfig.contactEmail}`}
                  sx={{
                    color: 'text.primary',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {siteConfig.contactEmail}
                </Typography>
              </ContactInfoRow>

              <ContactInfoRow icon={<PlaceOutlinedIcon />} title="Syria Office">
                <Typography variant="body1">Damascus, Syria</Typography>
              </ContactInfoRow>

              <ContactInfoRow icon={<PlaceOutlinedIcon />} title="UAE Office">
                <Typography variant="body1">Dubai, United Arab Emirates</Typography>
              </ContactInfoRow>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <Box
              component={motion.div}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              sx={{
                position: 'relative',
                p: { xs: 3, md: 5 },
                ...glassSurface(theme, { radius: 22 }),
              }}
            >
              <Typography variant="h4" sx={{ mb: 3, textTransform: 'uppercase' }}>
                Send a Message
              </Typography>

              {submitted ? (
                <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center', py: 6 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'primary.main',
                      border: 2,
                      borderColor: 'primary.main',
                      boxShadow: t => `0 0 20px ${alpha(t.palette.primary.main, 0.3)}`,
                    }}
                  >
                    <SendOutlinedIcon />
                  </Box>
                  <Typography variant="h6">Message Sent!</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thank you. We will get back to you shortly.
                  </Typography>
                </Stack>
              ) : (
                <Stack component="form" spacing={3} onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                        sx={fieldSx}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                        sx={fieldSx}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    required
                    sx={fieldSx}
                  />
                  <TextField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    required
                    multiline
                    minRows={5}
                    sx={fieldSx}
                  />
                  <UltraButton type="submit" variant="primary">
                    Send Message
                  </UltraButton>
                </Stack>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <FAQSection />
    </>
  )
}
