'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { Briefcase, Mail, MapPin, Phone, Server, Palette, Smartphone } from 'lucide-react'
import ShimmerText from '@/components/shared/ShimmerText'
import { glowOrb } from '@/lib/theme/surfaces'
import { SERVICES, BASE_OFFERINGS } from './data'
import type { ConsultationType, Service } from './types'
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

export default function ContactSection({ data }: { data?: any }) {
  const theme = useTheme()
  const t = useTranslations('Contact')

  const hasApiData = !!data

  const highlightKeywords = (text: string) => {
    if (!text) return ''
    const parts = text.split(/(ultra|الترا)/gi)
    return parts.map((part, index) => {
      const lower = part.toLowerCase()
      if (lower === 'ultra' || part === 'الترا') {
        return (
          <Box component="span" key={index} sx={{ color: 'primary.main' }}>
            {part}
          </Box>
        )
      }
      return part
    })
  }

  const formatHeadingText = (text: string) => {
    if (!text) return ''
    const words = text.trim().split(/\s+/)
    if (words.length === 0) return ''

    const highlightWords = (str: string) => {
      const parts = str.split(/(ultrawares|ultra|الترا)/gi)
      return parts.map((part, index) => {
        const lower = part.toLowerCase()
        if (lower === 'ultra' || lower === 'ultrawares' || part === 'الترا') {
          return (
            <Box component="span" key={index} sx={{ color: 'primary.main' }}>
              {part}
            </Box>
          )
        }
        return part
      })
    }

    if (words.length === 1) {
      return <ShimmerText>{words[0]}</ShimmerText>
    }

    const lastWord = words.pop() || ''
    const prefix = words.join(' ')

    return (
      <>
        {highlightWords(prefix)} <ShimmerText>{lastWord}</ShimmerText>
      </>
    )
  }

  // Captcha configuration
  const isCaptchaShown = hasApiData ? !!data.header?.is_captcha_shown : true

  // Header configs
  const categoryLabel = hasApiData ? data.header?.title || 'Get in touch' : 'Get in touch'
  const mainTitle = hasApiData
    ? data.header?.subtitle || 'IGNITE YOUR VISION'
    : 'IGNITE YOUR VISION'
  const descriptionText = hasApiData
    ? data.header?.description
    : "Tell us where you're headed. Whether it's high-performance VPS architecture, striking UI/UX, or next-gen mobile experiences — we're the launch crew."

  // Consultation setups
  const isOnlineShown = hasApiData ? !!data.consultation?.setup?.is_online_consultation_shown : true
  const isOnsiteShown = hasApiData ? !!data.consultation?.setup?.is_onsite_consultation_shown : true
  const addressPlaceholder = hasApiData
    ? data.consultation?.setup?.onsite_location_address || t('locationPlaceholder')
    : t('locationPlaceholder')

  // Regions list
  const onlineRegionsList = hasApiData
    ? data.consultation?.online_regions || []
    : [
        { id: 'syria', title: 'syria' },
        { id: 'uae', title: 'UAE' },
      ]

  // States
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedSubServices, setSelectedSubServices] = useState<any[]>([])
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [sector, setSector] = useState('')
  const [consultationType, setConsultationType] = useState<ConsultationType>('online')
  const [region, setRegion] = useState<string>('')
  const [address, setAddress] = useState('')
  const [captchaDone, setCaptchaDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null)

  // Sync default consultation type and region when API data loads
  useEffect(() => {
    if (hasApiData) {
      if (isOnlineShown) {
        setConsultationType('online')
      } else if (isOnsiteShown) {
        setConsultationType('onsite')
      }
      if (onlineRegionsList.length > 0) {
        setRegion(String(onlineRegionsList[0].id))
      }
    } else {
      setRegion('syria')
    }
  }, [data, isOnlineShown, isOnsiteShown])

  // Dynamic services resolving
  const getServiceIcon = (id: string, title: string) => {
    const text = (id + ' ' + title).toLowerCase()
    if (
      text.includes('vps') ||
      text.includes('host') ||
      text.includes('infra') ||
      text.includes('server')
    )
      return Server
    if (
      text.includes('design') ||
      text.includes('ui') ||
      text.includes('ux') ||
      text.includes('art') ||
      text.includes('palette')
    )
      return Palette
    if (
      text.includes('mobile') ||
      text.includes('app') ||
      text.includes('phone') ||
      text.includes('android') ||
      text.includes('ios')
    )
      return Smartphone
    return Briefcase
  }

  const apiServices = data?.services || []
  const processedServices: Service[] = hasApiData
    ? apiServices.map((item: any) => ({
        id: String(item.id || item.title),
        title: item.title,
        subtitle: item.description || item.subtitle || '',
        icon: item.icon || getServiceIcon(String(item.id || ''), item.title || ''),
        sub_services: item.sub_services || [],
      }))
    : SERVICES

  const activeService = processedServices.find(s => s.id === selectedService)
  const availableOfferings = activeService
    ? (activeService.sub_services || activeService.offerings || []).map((o: any) => {
        if (typeof o === 'string') {
          return { id: o, title: o }
        }
        return { id: o.id, title: o.title }
      })
    : []

  const handleServiceSelect = (id: string) => {
    setSelectedService(id)
    setSelectedSubServices([])
  }

  const toggleOffering = (offeringId: any) => {
    setSelectedSubServices(prev =>
      prev.includes(offeringId) ? prev.filter(id => id !== offeringId) : [...prev, offeringId],
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || submitting) return

    setSubmitting(true)
    setSubmitSuccess(null)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000'
    console.log('Contact Form Base URL:', baseUrl)
    const url = `${baseUrl}/api/contact-us-request`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          service_ids: !isNaN(Number(selectedService)) ? [Number(selectedService)] : [],
          sub_service_ids: selectedSubServices.map(id => (!isNaN(Number(id)) ? Number(id) : id)),
          email,
          phone,
          specialty: sector,
          consultation_type: consultationType,
          consultation_region_id: !isNaN(Number(region)) ? Number(region) : null,
          ...(consultationType === 'onsite' ? { address } : {}),
        }),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setEmail('')
        setPhone('')
        setSector('')
        setAddress('')
        setSelectedService(null)
        setSelectedSubServices([])
        setCaptchaDone(false)
      } else {
        setSubmitSuccess(false)
      }
    } catch (err) {
      console.error('Error submitting contact request', err)
      setSubmitSuccess(false)
    } finally {
      setSubmitting(false)
    }
  }

  const canSubmit = (!isCaptchaShown || captchaDone) && !!selectedService && !!email && !submitting

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        position: 'relative',
        py: { xs: 10, md: 14 },
        px: { xs: '20px', md: 'max(80px, calc((100vw - 1920px) / 2 + 160px))' },
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '180px',
          background:
            theme.direction === 'rtl'
              ? 'linear-gradient(to bottom, #121212 100%, rgba(18,18,18,0) 100%)'
              : 'linear-gradient(to bottom, #121212 0%, rgba(18,18,18,0) 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background:
            theme.direction === 'rtl'
              ? 'linear-gradient(to top, #121212 100%, rgba(18,18,18,0) 100%)'
              : 'linear-gradient(to top, #121212 0%, rgba(18,18,18,0) 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        },
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
          maxWidth: '100%',
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
              {highlightKeywords(categoryLabel)}
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
              {formatHeadingText(mainTitle)}
            </Typography>

            {descriptionText && (
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
                {highlightKeywords(descriptionText)}
              </Typography>
            )}

            {isCaptchaShown && (
              <CaptchaBox
                checked={captchaDone}
                onToggle={() => setCaptchaDone(prev => !prev)}
                label={t('captchaLabel')}
              />
            )}
          </Box>
        </Box>

        {/* Right column — scrollable form (drives section height) */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flex: { lg: '0 0 600px' },
            width: { xs: '100%', lg: 600 },
            minWidth: 0,
            overflow: 'visible',
          }}
        >
          <StepLabel imageSrc="/images/contact/step-01.svg" label={t('step1')} />
          <ServiceCarousel
            services={processedServices}
            selectedService={selectedService}
            onSelect={handleServiceSelect}
          />

          <SectionDivider />

          <StepLabel imageSrc="/images/contact/step-02.svg" label={t('step2')} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {availableOfferings.map(o => (
              <OfferingCheckbox
                key={o.id}
                label={o.title}
                checked={selectedSubServices.includes(o.id)}
                onChange={() => toggleOffering(o.id)}
              />
            ))}
          </Box>

          <SectionDivider />

          <StepLabel imageSrc="/images/contact/step-03.svg" label={t('step3')} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: '14px',
              }}
            >
              <Box>
                <FieldLabel>{t('emailLabel')}</FieldLabel>
                <InputField
                  placeholder={t('emailPlaceholder')}
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={setEmail}
                />
              </Box>
              <Box>
                <FieldLabel>{t('phoneLabel')}</FieldLabel>
                <InputField
                  placeholder={t('phonePlaceholder')}
                  icon={Phone}
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                />
              </Box>
            </Box>
            <Box>
              <FieldLabel>{t('sectorLabel')}</FieldLabel>
              <InputField
                placeholder={t('sectorPlaceholder')}
                icon={Briefcase}
                value={sector}
                onChange={setSector}
              />
            </Box>
          </Box>

          {(isOnlineShown || isOnsiteShown) && (
            <>
              <SectionDivider />
              <StepLabel imageSrc="/images/contact/step-04.svg" label={t('step4')} />
              {isOnlineShown && isOnsiteShown && (
                <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', mb: '20px' }}>
                  <RadioOption
                    name="consultation-type"
                    label={t('onlineConsultation')}
                    checked={consultationType === 'online'}
                    onChange={() => setConsultationType('online')}
                  />
                  <RadioOption
                    name="consultation-type"
                    label={t('onsiteConsultation')}
                    checked={consultationType === 'onsite'}
                    onChange={() => {
                      setConsultationType('onsite')
                      if (hasApiData) {
                        setRegion(String(onlineRegionsList[0]?.id || ''))
                      } else {
                        setRegion('syria')
                      }
                    }}
                  />
                </Box>
              )}

              {consultationType === 'online' && isOnlineShown && (
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
                  {onlineRegionsList.length > 0 && (
                    <Box>
                      <FieldLabel>{t('selectRegion')}</FieldLabel>
                      <Box sx={{ display: 'flex', gap: '10px', mt: '10px', flexWrap: 'wrap' }}>
                        {onlineRegionsList.map((reg: any) => (
                          <RadioOption
                            key={reg.id}
                            name="region"
                            label={reg.title}
                            checked={region === String(reg.id)}
                            onChange={() => setRegion(String(reg.id))}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              )}

              {consultationType === 'onsite' && isOnsiteShown && (
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
                    <FieldLabel>{t('selectRegion')}</FieldLabel>
                    <Box sx={{ display: 'flex', gap: '10px', mt: '10px', flexWrap: 'wrap' }}>
                      {onlineRegionsList.map((reg: any) => {
                        const titleLower = String(reg.title || reg.id).toLowerCase()
                        const isSyria = titleLower.includes('syria') || titleLower.includes('سوريا')
                        return (
                          <RadioOption
                            key={reg.id}
                            name="onsite-region"
                            label={reg.title}
                            checked={region === String(reg.id)}
                            onChange={() => setRegion(String(reg.id))}
                            disabled={!isSyria}
                          />
                        )
                      })}
                    </Box>
                  </Box>
                  <Box>
                    <FieldLabel>{t('locationLabel')}</FieldLabel>
                    <InputField
                      placeholder={addressPlaceholder}
                      icon={MapPin}
                      value={address}
                      onChange={setAddress}
                    />
                  </Box>
                </Box>
              )}
            </>
          )}

          <SectionDivider />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <ContactSubmitButton disabled={!canSubmit} label={t('submitButton')} />
            {submitSuccess === true && (
              <Typography sx={{ color: 'success.main', mt: 1 }}>{t('successMessage')}</Typography>
            )}
            {submitSuccess === false && (
              <Typography sx={{ color: 'error.main', mt: 1 }}>{t('errorMessage')}</Typography>
            )}
            {!captchaDone && isCaptchaShown && (
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '21px',
                  color: 'rgba(255, 255, 255, 0.40)',
                  letterSpacing: '0.04em',
                }}
              >
                {t('captchaHint')}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
