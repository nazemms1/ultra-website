'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react'
import ShimmerText from '@/components/shared/ShimmerText'
import { glowOrb } from '@/lib/theme/surfaces'
import { SERVICES, BASE_OFFERINGS } from './data'
import type { ConsultationType, Region } from './types'
import StepLabel from './StepLabel'
import SectionDivider from './SectionDivider'
import ServiceCarousel from './ServiceCarousel'
import OfferingCheckbox from './OfferingCheckbox'
import RadioOption from './RadioOption'
import FieldLabel from './FieldLabel'
import InputField from './InputField'
import CaptchaBox from './CaptchaBox'
import ContactSubmitButton from './ContactSubmitButton'

/** Clears fixed navbar (68px) + top padding when the left column pins on scroll */
const STICKY_TOP_OFFSET = '100px'

export default function ContactSection() {
  const theme = useTheme()

  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [offerings, setOfferings] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [sector, setSector] = useState('')
  const [consultationType, setConsultationType] = useState<ConsultationType>('online')
  const [region, setRegion] = useState<Region>('syria')
  const [address, setAddress] = useState('')
  const [captchaDone, setCaptchaDone] = useState(false)

  const activeService = SERVICES.find(s => s.id === selectedService)
  const availableOfferings = activeService ? activeService.offerings : BASE_OFFERINGS

  const handleServiceSelect = (id: string) => {
    setSelectedService(id)
    setOfferings([])
  }

  const toggleOffering = (label: string) => {
    setOfferings(prev => (prev.includes(label) ? prev.filter(o => o !== label) : [...prev, label]))
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
        overflow: 'visible',
      }}
    >
      <Box
        aria-hidden
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          overflow: 'visible',
        }}
      >
        <Box
          sx={{
            ...glowOrb(theme, 0.04),
            top: '20%',
            right: '5%',
            width: 600,
            height: 600,
            filter: 'blur(140px)',
          }}
        />
        <Box
          sx={{
            ...glowOrb(theme, 0.03),
            bottom: '10%',
            left: '5%',
            width: 400,
            height: 400,
            filter: 'blur(100px)',
          }}
        />
      </Box>

      <Box
        sx={{
          maxWidth: 1280,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'stretch',
          gap: { xs: '48px', md: '60px' },
          position: 'relative',
          zIndex: 1,
          overflow: 'visible',
        }}
      >
        {/* Left column — tall track; inner block pins while the form scrolls */}
        <Box
          sx={{
            flex: { lg: '1 1 0' },
            minWidth: 0,
            overflow: 'visible',
          }}
        >
          <Box
            sx={{
              position: { xs: 'static', lg: 'sticky' },
              top: STICKY_TOP_OFFSET,
              height: 'fit-content',
              overflow: 'visible',
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'primary.main',
                mb: '20px',
              }}
            >
              Get in touch
            </Typography>

          <Typography
            component="h2"
            sx={{
              fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
              fontSize: { xs: '32px', sm: '42px', md: '56px' },
              lineHeight: 1.05,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'text.primary',
              mb: '20px',
            }}
          >
            IGNITE YOUR <ShimmerText>VISION</ShimmerText>
          </Typography>

            <Typography
              sx={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '16px',
                color: 'text.secondary',
                lineHeight: 1.75,
                letterSpacing: '0.03em',
                mb: '40px',
                maxWidth: 480,
              }}
            >
              Tell us where you&apos;re headed. Whether it&apos;s high-performance VPS architecture,
              striking UI/UX, or next-gen mobile experiences — we&apos;re the launch crew.
            </Typography>

            <CaptchaBox checked={captchaDone} onToggle={() => setCaptchaDone(prev => !prev)} />
          </Box>
        </Box>

        {/* Right column — scrollable form (drives section height) */}
        <Box
          component="form"
          onSubmit={e => e.preventDefault()}
          sx={{
            flex: { lg: '0 0 600px' },
            width: { xs: '100%', lg: 600 },
            minWidth: 0,
            overflow: 'visible',
          }}
        >
          <StepLabel imageSrc="/images/contact/step-01.svg" label="Select Service Type" />
          <ServiceCarousel
            services={SERVICES}
            selectedService={selectedService}
            onSelect={handleServiceSelect}
          />

          <SectionDivider />

          <StepLabel imageSrc="/images/contact/step-02.svg" label="Additional Offerings" />
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

          <StepLabel imageSrc="/images/contact/step-03.svg" label="Your Details" />
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
                icon={Briefcase}
                value={sector}
                onChange={setSector}
              />
            </Box>
          </Box>

          <SectionDivider />

          <StepLabel imageSrc="/images/contact/step-04.svg" label="Consultation Setup" />
          <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', mb: '20px' }}>
            <RadioOption
              name="consultation-type"
              label="Online Consultation"
              checked={consultationType === 'online'}
              onChange={() => setConsultationType('online')}
            />
            <RadioOption
              name="consultation-type"
              label="On-site Consultation"
              checked={consultationType === 'onsite'}
              onChange={() => {
                setConsultationType('onsite')
                setRegion('syria')
              }}
            />
          </Box>

          {consultationType === 'online' && (
            <Box
              sx={{
                borderRadius: '12px',
                border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                bgcolor: alpha(theme.palette.common.white, 0.03),
                p: '20px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                mb: '4px',
              }}
            >
              <Box>
                <FieldLabel>Select Region</FieldLabel>
                <Box sx={{ display: 'flex', gap: '10px', mt: '10px', flexWrap: 'wrap' }}>
                  <RadioOption
                    name="region"
                    label="syria"
                    checked={region === 'syria'}
                    onChange={() => setRegion('syria')}
                  />
                  <RadioOption
                    name="region"
                    label="UAE"
                    checked={region === 'uae'}
                    onChange={() => setRegion('uae')}
                  />
                </Box>
              </Box>
            </Box>
          )}

          {consultationType === 'onsite' && (
            <Box
              sx={{
                borderRadius: '12px',
                border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                bgcolor: alpha(theme.palette.common.white, 0.03),
                p: '20px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                mb: '4px',
              }}
            >
              <Box>
                <FieldLabel>Select Region — Restricted to Syria</FieldLabel>
                <Box sx={{ display: 'flex', gap: '10px', mt: '10px', flexWrap: 'wrap' }}>
                  <RadioOption
                    name="onsite-region"
                    label="syria"
                    checked={region === 'syria'}
                    onChange={() => setRegion('syria')}
                  />
                  <RadioOption
                    name="onsite-region"
                    label="UAE"
                    checked={region === 'uae'}
                    onChange={() => setRegion('uae')}
                    disabled
                  />
                </Box>
              </Box>
              <Box>
                <FieldLabel>Location Address *</FieldLabel>
                <InputField
                  placeholder="Type your location"
                  icon={MapPin}
                  value={address}
                  onChange={setAddress}
                />
              </Box>
            </Box>
          )}

          <SectionDivider />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <ContactSubmitButton disabled={!canSubmit} />
            {!captchaDone && (
              <Typography
                sx={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '21px',
                  color: 'rgba(255, 255, 255, 0.40)',
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
