'use client'

import { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react'
import ShimmerText from '@/components/shared/ShimmerText'
import { SERVICES, BASE_OFFERINGS } from './data'
import StepLabel from './StepLabel'
import SectionDivider from './SectionDivider'
import ServiceCard from './ServiceCard'
import ScrollArrow from './ScrollArrow'
import OfferingCheckbox from './OfferingCheckbox'
import RadioOption from './RadioOption'
import FieldLabel from './FieldLabel'
import InputField from './InputField'

export default function ContactSection() {
  const theme = useTheme()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [offerings, setOfferings] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [sector, setSector] = useState('')
  const [consultationType, setConsultationType] = useState<'online' | 'onsite'>('online')
  const [region, setRegion] = useState<'syria' | 'uae'>('syria')
  const [address, setAddress] = useState('')
  const captchaDone = false

  const activeService = SERVICES.find(s => s.id === selectedService)
  const availableOfferings = activeService ? activeService.offerings : BASE_OFFERINGS

  const handleServiceSelect = (id: string) => {
    setSelectedService(id)
    setOfferings([])
  }

  const toggleOffering = (label: string) => {
    setOfferings(prev =>
      prev.includes(label) ? prev.filter(o => o !== label) : [...prev, label],
    )
  }

  const scrollServices = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -180 : 180, behavior: 'smooth' })
  }

  const canSubmit = captchaDone && !!selectedService && !!email

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        position: 'relative',
        py: { xs: 10, md: 14 },
        px: { xs: '20px', md: '40px', lg: '80px' },
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {/* Background glows */}
      <Box
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          filter: 'blur(140px)',
        }}
      />
      <Box
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          filter: 'blur(100px)',
        }}
      />

      <Box
        sx={{
          maxWidth: 1280,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 600px' },
          gap: { xs: '48px', md: '60px' },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Left column ─────────────────────────────────────────────────────── */}
        <Box>
          {/* Eyebrow */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              px: '12px',
              py: '5px',
              mb: '24px',
              borderRadius: '9999px',
              fontSize: '10px',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'primary.main',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
            }}
          >
            Get in touch
          </Box>

          {/* Headline */}
          <Typography
            component="h2"
            sx={{
              fontFamily: "'Ethnocentric Rg', sans-serif",
              fontSize: { xs: '42px', md: '56px' },
              lineHeight: 1.0,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'text.primary',
              mb: '20px',
            }}
          >
            IGNITE
            <br />
            YOUR{' '}
            <ShimmerText>VISION</ShimmerText>
          </Typography>

          {/* Body */}
          <Typography
            sx={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '13px',
              color: 'text.secondary',
              lineHeight: 1.75,
              letterSpacing: '0.03em',
              mb: '40px',
            }}
          >
            Tell us where you&apos;re headed. Whether it&apos;s high-performance VPS
            architecture, striking UI/UX, or next-gen mobile experiences — we&apos;re
            the launch crew.
          </Typography>

          {/* Captcha placeholder */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              px: '14px',
              py: '11px',
              borderRadius: '8px',
              border: `1px solid ${alpha(theme.palette.text.primary as string, 0.12)}`,
              bgcolor: theme.palette.background.elevated,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <Box
              sx={{
                width: 17,
                height: 17,
                borderRadius: '4px',
                border: `1.5px solid ${alpha(theme.palette.text.primary as string, 0.25)}`,
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.05em',
                color: alpha(theme.palette.text.secondary as string, 0.7),
              }}
            >
              I am not a robot
            </Typography>
          </Box>
        </Box>

        {/* ── Right column — Form ──────────────────────────────────────────────── */}
        <Box>
          {/* 01 — Service type */}
          <StepLabel num="01" label="Select Service Type" />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ScrollArrow direction="left" onClick={() => scrollServices('left')} />
            <Box
              ref={scrollRef}
              sx={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                flex: 1,
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {SERVICES.map(s => (
                <ServiceCard
                  key={s.id}
                  service={s}
                  selected={selectedService === s.id}
                  onSelect={() => handleServiceSelect(s.id)}
                />
              ))}
            </Box>
            <ScrollArrow direction="right" onClick={() => scrollServices('right')} />
          </Box>

          <SectionDivider />

          {/* 02 — Additional offerings */}
          <StepLabel num="02" label="Additional Offerings" />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {availableOfferings.map(o => (
              <OfferingCheckbox
                key={o}
                label={o}
                checked={offerings.includes(o)}
                onChange={() => toggleOffering(o)}
              />
            ))}
          </Box>

          <SectionDivider />

          {/* 03 — Your details */}
          <StepLabel num="03" label="Your Details" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: '14px',
              }}
            >
              <Box>
                <FieldLabel>Email Address *</FieldLabel>
                <InputField
                  placeholder="hello@company.com"
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={setEmail}
                />
              </Box>
              <Box>
                <FieldLabel>Phone Number *</FieldLabel>
                <InputField
                  placeholder="+1 (555) 000-0000"
                  icon={Phone}
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                />
              </Box>
            </Box>
            <Box>
              <FieldLabel>Specialty or Sector</FieldLabel>
              <InputField
                placeholder="e.g. Fintech, Healthcare, E-commerce..."
                value={sector}
                onChange={setSector}
              />
            </Box>
          </Box>

          <SectionDivider />

          {/* 04 — Consultation setup */}
          <StepLabel num="04" label="Consultation Setup" />
          <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', mb: '20px' }}>
            <RadioOption
              label="Online Consultation"
              checked={consultationType === 'online'}
              onChange={() => setConsultationType('online')}
            />
            <RadioOption
              label="On-site Consultation"
              checked={consultationType === 'onsite'}
              onChange={() => setConsultationType('onsite')}
            />
          </Box>

          {consultationType === 'onsite' && (
            <Box
              sx={{
                borderRadius: '12px',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                bgcolor: alpha(theme.palette.primary.main, 0.04),
                p: '20px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                mb: '4px',
              }}
            >
              <Box>
                <FieldLabel>Select Region — Restricted to Syria</FieldLabel>
                <Box sx={{ display: 'flex', gap: '10px', mt: '10px' }}>
                  <RadioOption
                    label="Syria"
                    checked={region === 'syria'}
                    onChange={() => setRegion('syria')}
                  />
                  <RadioOption
                    label="UAE"
                    checked={region === 'uae'}
                    onChange={() => setRegion('uae')}
                  />
                </Box>
              </Box>
              <Box>
                <FieldLabel>Location Address *</FieldLabel>
                <InputField
                  placeholder="Enter your address..."
                  icon={MapPin}
                  value={address}
                  onChange={setAddress}
                />
              </Box>
            </Box>
          )}

          <SectionDivider />

          {/* Submit */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Box
              component="button"
              disabled={!canSubmit}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                px: '30px',
                py: '13px',
                borderRadius: '9999px',
                border: 'none',
                cursor: canSubmit ? 'pointer' : 'default',
                bgcolor: canSubmit
                  ? theme.palette.primary.main
                  : alpha(theme.palette.text.primary as string, 0.07),
                color: canSubmit
                  ? '#060E10'
                  : alpha(theme.palette.text.primary as string, 0.2),
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                transition: 'all 0.25s',
                boxShadow: canSubmit
                  ? `0 0 28px ${alpha(theme.palette.primary.main, 0.4)}`
                  : 'none',
                '&:hover:not(:disabled)': {
                  bgcolor: theme.palette.primary.light,
                  boxShadow: `0 0 40px ${alpha(theme.palette.primary.main, 0.6)}`,
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Submit
              <ArrowRight size={15} strokeWidth={2.5} />
            </Box>

            {!captchaDone && (
              <Typography
                sx={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '11px',
                  color: alpha(theme.palette.text.secondary as string, 0.45),
                  letterSpacing: '0.04em',
                }}
              >
                Complete the verification in order to submit.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
