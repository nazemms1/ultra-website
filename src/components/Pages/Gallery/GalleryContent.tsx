'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme, alpha } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import { glassSurface } from '@/lib/theme/surfaces'

// Type definitions matching the API responses
interface ImageDetails {
  name: string
  file_name: string
  mime_type: string
  human_readable_size: string
  url: string
}

interface GalleryImageItem {
  order: number
  is_active: boolean
  image: ImageDetails
}

interface GalleryGroupItem {
  id: number
  order: number
  title: string
}

interface GalleryData {
  title: string
  subtitle: string
  description: string
  video?: {
    name: string
    file_name: string
    mime_type: string
    url: string
  }
  items: GalleryGroupItem[]
}

interface GalleryGroupImagesResponse {
  data: GalleryImageItem[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }
}

interface GalleryContentProps {
  galleryData: GalleryData
  initialImagesMap: Record<number, GalleryGroupImagesResponse>
  locale: string
}

const CornerBrackets = () => {
  const borderSize = '12px'
  const borderThickness = '2px'
  const borderColor = '#0DF1D9'
  const insetDist = '12px'

  return (
    <>
      {/* Top Left */}
      <Box
        className="corner-bracket bracket-tl"
        sx={{
          position: 'absolute',
          top: insetDist,
          left: insetDist,
          width: borderSize,
          height: borderSize,
          borderTop: `${borderThickness} solid ${borderColor}`,
          borderLeft: `${borderThickness} solid ${borderColor}`,
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      {/* Top Right */}
      <Box
        className="corner-bracket bracket-tr"
        sx={{
          position: 'absolute',
          top: insetDist,
          right: insetDist,
          width: borderSize,
          height: borderSize,
          borderTop: `${borderThickness} solid ${borderColor}`,
          borderRight: `${borderThickness} solid ${borderColor}`,
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      {/* Bottom Left */}
      <Box
        className="corner-bracket bracket-bl"
        sx={{
          position: 'absolute',
          bottom: insetDist,
          left: insetDist,
          width: borderSize,
          height: borderSize,
          borderBottom: `${borderThickness} solid ${borderColor}`,
          borderLeft: `${borderThickness} solid ${borderColor}`,
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      {/* Bottom Right */}
      <Box
        className="corner-bracket bracket-br"
        sx={{
          position: 'absolute',
          bottom: insetDist,
          right: insetDist,
          width: borderSize,
          height: borderSize,
          borderBottom: `${borderThickness} solid ${borderColor}`,
          borderRight: `${borderThickness} solid ${borderColor}`,
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </>
  )
}

export default function GalleryContent({
  galleryData,
  initialImagesMap,
  locale,
}: GalleryContentProps) {
  const theme = useTheme()
  const isRtl = locale === 'ar'

  // Image and pagination state per group item ID
  const [imagesMap, setImagesMap] =
    useState<Record<number, GalleryGroupImagesResponse>>(initialImagesMap)
  const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({})

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxGroupImages, setLightboxGroupImages] = useState<GalleryImageItem[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Fetch images page client-side
  const handlePageChange = async (itemId: number, page: number) => {
    setLoadingMap(prev => ({ ...prev, [itemId]: true }))
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000'
      const url = `${baseUrl}/api/gallery-items/${itemId}/images?page=${page}`

      const res = await fetch(url, {
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const json = await res.json()
        setImagesMap(prev => ({ ...prev, [itemId]: json.data }))
      }
    } catch (e) {
      console.error('Failed to fetch gallery images page', e)
    } finally {
      setLoadingMap(prev => ({ ...prev, [itemId]: false }))
    }
  }

  // Open lightbox
  const openLightbox = (groupImages: GalleryImageItem[], index: number) => {
    setLightboxGroupImages(groupImages)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Lightbox navigation
  const prevImage = () => {
    setLightboxIndex(prev => (prev === 0 ? lightboxGroupImages.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setLightboxIndex(prev => (prev === lightboxGroupImages.length - 1 ? 0 : prev + 1))
  }

  // Render crop-framed image cards
  const renderCard = (
    item: GalleryImageItem,
    idx: number,
    groupImages: GalleryImageItem[],
    sxProps?: any,
  ) => {
    return (
      <Box
        onClick={() => openLightbox(groupImages, idx)}
        sx={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'visible',
          cursor: 'pointer',
          aspectRatio: { xs: '4/3', sm: 'auto' },
          width: '100%',
          height: { xs: 'auto', sm: '100%' },
          minHeight: 'auto',
          display: 'flex',
          '&:hover .corner-bracket': {
            borderColor: '#0DF1D9',
            boxShadow: '0 0 12px #0DF1D9',
          },
          '&:hover .bracket-tl': { transform: 'translate(-5px, -5px)' },
          '&:hover .bracket-tr': { transform: 'translate(5px, -5px)' },
          '&:hover .bracket-bl': { transform: 'translate(-5px, 5px)' },
          '&:hover .bracket-br': { transform: 'translate(5px, 5px)' },
          '&:hover img': {
            transform: 'scale(1.04)',
            filter: 'brightness(1.08)',
          },
          ...sxProps,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '14px',
            overflow: 'hidden',
            border: '1px solid rgba(13, 241, 217, 0.12)',
            transition: 'border-color 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(13, 241, 217, 0.45)',
            },
          }}
        >
          <Box
            component="img"
            src={item.image.url}
            alt={item.image.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
            }}
          />
        </Box>
        <CornerBrackets />
      </Box>
    )
  }

  // Dynamic image grids based on count
  const renderImageGrid = (itemId: number, images: GalleryImageItem[]) => {
    const count = images.length
    if (count === 0) {
      return (
        <Box sx={{ py: 6, textAlign: 'center' }}>
          <Typography sx={{ color: 'text.secondary', fontFamily: '"Rajdhani", sans-serif' }}>
            {isRtl ? 'لا توجد صور متوفرة في هذا القسم.' : 'No images available in this section.'}
          </Typography>
        </Box>
      )
    }

    if (count === 1) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          {renderCard(images[0], 0, images, {
            height: { xs: 'auto', md: '500px' },
            width: { xs: '100%', md: '621.5px' },
          })}
        </Box>
      )
    }

    if (count === 2) {
      return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1.5fr 1fr', md: '2.08fr 1fr' },
            gridTemplateRows: { xs: 'auto', md: '500px' },
            gap: 3,
            alignItems: 'start',
          }}
        >
          {renderCard(images[0], 0, images, { height: { xs: 'auto', md: '500px' } })}
          {renderCard(images[1], 1, images, { height: { xs: 'auto', md: '238px' } })}
        </Box>
      )
    }

    if (count === 3) {
      return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1.5fr 1fr', md: '2.08fr 1fr' },
            gridTemplateRows: { xs: 'auto', sm: 'repeat(2, 180px)', md: 'repeat(2, 238px)' },
            columnGap: 3,
            rowGap: '22px',
          }}
        >
          {renderCard(images[0], 0, images, {
            gridColumn: { xs: 'span 1', sm: '1' },
            gridRow: { xs: 'span 1', sm: '1 / span 2' },
          })}
          {renderCard(images[1], 1, images, {
            gridColumn: { xs: 'span 1', sm: '2' },
            gridRow: { xs: 'span 1', sm: '1' },
          })}
          {renderCard(images[2], 2, images, {
            gridColumn: { xs: 'span 1', sm: '2' },
            gridRow: { xs: 'span 1', sm: '2' },
          })}
        </Box>
      )
    }

    // Classic 4-Image Grid matching the screenshot
    if (count === 4) {
      return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1.5fr 1fr 1fr', md: '2.08fr 1fr 1fr' },
            gridTemplateRows: { xs: 'auto', sm: 'repeat(2, 180px)', md: '238px 238px' },
            columnGap: 3,
            rowGap: '22px',
          }}
        >
          {renderCard(images[0], 0, images, {
            gridColumn: { xs: 'span 1', sm: '1' },
            gridRow: { xs: 'span 1', sm: '1 / span 2' },
          })}
          {renderCard(images[1], 1, images, {
            gridColumn: { xs: 'span 1', sm: '2' },
            gridRow: { xs: 'span 1', sm: '1' },
          })}
          {renderCard(images[2], 2, images, {
            gridColumn: { xs: 'span 1', sm: '2' },
            gridRow: { xs: 'span 1', sm: '2' },
          })}
          {renderCard(images[3], 3, images, {
            gridColumn: { xs: 'span 1', sm: '3' },
            gridRow: { xs: 'span 1', sm: '1 / span 2' },
            height: { xs: 'auto', sm: '100%', md: '498px' },
          })}
        </Box>
      )
    }

    // Grid for > 4 images
    const topFour = images.slice(0, 4)
    const nextThree = images.slice(4, 7)
    const lastThree = images.slice(7, 10)

    return (
      <Stack spacing="22px">
        {/* Row 1: Top 4 Classic Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1.5fr 1fr 1fr', md: '2.08fr 1fr 1fr' },
            gridTemplateRows: { xs: 'auto', sm: 'repeat(2, 180px)', md: '238px 238px' },
            columnGap: 3,
            rowGap: '22px',
          }}
        >
          {renderCard(topFour[0], 0, images, {
            gridColumn: { xs: 'span 1', sm: '1' },
            gridRow: { xs: 'span 1', sm: '1 / span 2' },
          })}
          {renderCard(topFour[1], 1, images, {
            gridColumn: { xs: 'span 1', sm: '2' },
            gridRow: { xs: 'span 1', sm: '1' },
          })}
          {renderCard(topFour[2], 2, images, {
            gridColumn: { xs: 'span 1', sm: '2' },
            gridRow: { xs: 'span 1', sm: '2' },
          })}
          {renderCard(topFour[3], 3, images, {
            gridColumn: { xs: 'span 1', sm: '3' },
            gridRow: { xs: 'span 1', sm: '1 / span 2' },
            height: { xs: 'auto', sm: '100%', md: '498px' },
          })}
        </Box>

        {/* Row 2: Images 5, 6, 7 */}
        {nextThree.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1.5fr 1fr 1fr', md: '2.08fr 1fr 1fr' },
              gridTemplateRows: { xs: 'auto', md: '238px' },
              columnGap: 3,
              rowGap: '22px',
            }}
          >
            {nextThree[0] && renderCard(nextThree[0], 4, images)}
            {nextThree[1] && renderCard(nextThree[1], 5, images)}
            {nextThree[2] && renderCard(nextThree[2], 6, images)}
          </Box>
        )}

        {/* Row 3: Images 8, 9, 10 */}
        {lastThree.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1.5fr', md: '1fr 1fr 2.08fr' },
              gridTemplateRows: { xs: 'auto', md: '238px' },
              columnGap: 3,
              rowGap: '22px',
            }}
          >
            {lastThree[0] && renderCard(lastThree[0], 7, images)}
            {lastThree[1] && renderCard(lastThree[1], 8, images)}
            {lastThree[2] && renderCard(lastThree[2], 9, images)}
          </Box>
        )}

        {/* Remaining Images (if any) */}
        {images.length > 10 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 3,
            }}
          >
            {images
              .slice(10)
              .map((item, index) =>
                renderCard(item, index + 10, images, { height: { xs: '200px', sm: '280px' } }),
              )}
          </Box>
        )}
      </Stack>
    )
  }

  // Render pagination buttons
  const renderPagination = (itemId: number, response: GalleryGroupImagesResponse) => {
    const meta = response.meta
    if (!meta || meta.last_page <= 1) return null

    const currentPage = meta.current_page
    const lastPage = meta.last_page

    // Create array of page numbers
    const pages: number[] = []
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i)
    }

    return (
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          mt: 5,
        }}
      >
        {/* Prev Page Button */}
        <Box
          component="button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(itemId, currentPage - 1)}
          sx={{
            background: 'none',
            border: 'none',
            p: 0,
            // cursor: currentPage === 1 ? 'default' : 'pointer',
            opacity: currentPage === 1 ? 0.35 : 1,
            display: 'flex',
            ...glassSurface,
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s ease',
            '&:disabled': {
              opacity: 0.35,
              cursor: 'default',
            },
          }}
        >
          <Box
            component="img"
            src="/icons/ArrowWrapper.svg"
            alt="Previous"
            sx={{
              width: '41px',
              height: '41px',
              display: 'block',
              transform: isRtl ? 'rotate(180deg)' : 'none',
            }}
          />
        </Box>

        {/* Page Numbers */}
        {pages.map(page => {
          const isActive = page === currentPage
          if (isActive) {
            return (
              <Box
                key={page}
                sx={{
                  display: 'inline-flex',
                  width: 40,
                  height: 40,
                  p: '10px',
                  background: 'rgba(13, 241, 217, 0.10)',
                  borderRadius: '50%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'default',
                }}
              >
                <Typography
                  sx={{
                    color: '#0DF1D9',
                    fontSize: '18px',
                    fontFamily: '"Rajdhani", sans-serif',
                    fontWeight: '600',
                    lineHeight: 1,
                  }}
                >
                  {page}
                </Typography>
              </Box>
            )
          }

          return (
            <Box
              key={page}
              onClick={() => handlePageChange(itemId, page)}
              sx={{
                display: 'inline-flex',
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(13, 241, 217, 0.05)',
                },
              }}
            >
              <Typography
                sx={{
                  color: '#0DF1D9',
                  fontSize: '18px',
                  fontFamily: '"Rajdhani", sans-serif',
                  fontWeight: '600',
                  lineHeight: 1,
                }}
              >
                {page}
              </Typography>
            </Box>
          )
        })}

        {/* Next Page Button */}
        <Box
          component="button"
          disabled={currentPage === lastPage}
          onClick={() => handlePageChange(itemId, currentPage + 1)}
          sx={{
            background: 'none',
            border: 'none',
            p: 0,
            cursor: currentPage === lastPage ? 'default' : 'pointer',
            opacity: currentPage === lastPage ? 0.35 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s ease',
            '&:disabled': {
              opacity: 0.35,
              cursor: 'default',
            },
          }}
        >
          <Box
            component="img"
            src="/icons/ArrowWrapper2.svg"
            alt="Next"
            sx={{
              width: '41px',
              height: '41px',
              display: 'block',
              transform: isRtl ? 'rotate(180deg)' : 'none',
            }}
          />
        </Box>
      </Stack>
    )
  }

  const items = galleryData.items || []

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 'max(80px, calc((100vw - 1920px) / 2 + 160px))' },

        position: 'relative',
        zIndex: 1,
      }}
    >
      <Stack spacing={10} sx={{ maxWidth: 1480, mx: 'auto' }}>
        {items.map((item, index) => {
          const groupImagesResponse = imagesMap[item.id]
          const groupImages = groupImagesResponse?.data || []
          const isLoading = loadingMap[item.id]

          return (
            <Box key={item.id} component="section" sx={{ position: 'relative' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 4,
                  justifyContent: 'flex-start',
                }}
              >
                <Typography
                  sx={{
                    color: 'primary.main',
                    fontFamily: '"Rajdhani", sans-serif',
                    fontSize: { xs: '13px', md: '15px' },
                    fontWeight: 500,
                    letterSpacing: '3px',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Box
                  sx={{
                    width: 32,
                    height: '1px',
                    bgcolor: 'rgba(13, 241, 217, 0.35)',
                  }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    color: '#FAFAFA',
                    fontFamily: "'Nulshock', 'Almarai', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: '18px', sm: '22px', md: '28px' },
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.title}
                </Typography>
              </Box>

              {/* Image Grid with Loading Overlay */}
              <Box sx={{ position: 'relative', minHeight: '180px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={groupImagesResponse?.meta?.current_page || 1}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    {renderImageGrid(item.id, groupImages)}
                  </motion.div>
                </AnimatePresence>

                {/* Loading overlay */}
                {isLoading && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'rgba(8, 10, 10, 0.7)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                      borderRadius: '8px',
                    }}
                  >
                    <CircularProgress color="primary" />
                  </Box>
                )}
              </Box>

              {/* Group Pagination */}
              {groupImagesResponse && renderPagination(item.id, groupImagesResponse)}
            </Box>
          )
        })}
      </Stack>

      {/* Lightbox Modal */}
      <Modal
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(8, 10, 10, 0.95)',
          backdropFilter: 'blur(12px)',
          zIndex: 99999,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{
              position: 'absolute',
              top: 24,
              right: 24,
              color: '#FAFAFA',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(13, 241, 217, 0.1)',
                color: 'primary.main',
                borderColor: 'primary.main',
              },
            }}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>

          {/* Prev button */}
          {lightboxGroupImages.length > 1 && (
            <IconButton
              onClick={prevImage}
              sx={{
                position: 'absolute',
                left: { xs: 16, md: 32 },
                color: '#FAFAFA',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(13, 241, 217, 0.1)',
                  color: 'primary.main',
                  borderColor: 'primary.main',
                },
              }}
            >
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
          )}

          {/* Active Image with slide animation */}
          <Box
            sx={{
              maxWidth: '85vw',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {lightboxGroupImages.length > 0 && (
              <>
                <Box
                  component="img"
                  src={lightboxGroupImages[lightboxIndex].image.url}
                  alt={lightboxGroupImages[lightboxIndex].image.name}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                    border: '1px solid rgba(13, 241, 217, 0.25)',
                    borderRadius: '4px',
                    boxShadow: '0 0 30px rgba(13, 241, 217, 0.15)',
                  }}
                />
                {/* Image info & index counter */}
                <Typography
                  sx={{
                    mt: 2,
                    color: 'text.secondary',
                    fontFamily: '"Rajdhani", sans-serif',
                    fontSize: '15px',
                    letterSpacing: '1px',
                  }}
                >
                  {lightboxIndex + 1} / {lightboxGroupImages.length}
                </Typography>
              </>
            )}
          </Box>

          {/* Next button */}
          {lightboxGroupImages.length > 1 && (
            <IconButton
              onClick={nextImage}
              sx={{
                position: 'absolute',
                right: { xs: 16, md: 32 },
                color: '#FAFAFA',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(13, 241, 217, 0.1)',
                  color: 'primary.main',
                  borderColor: 'primary.main',
                },
              }}
            >
              <ChevronRightIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
      </Modal>
    </Box>
  )
}
