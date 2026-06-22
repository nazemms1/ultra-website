import type { FrameSize } from './types'

type CoverSource = CanvasImageSource & {
  width?: number
  height?: number
  naturalWidth?: number
  naturalHeight?: number
  videoWidth?: number
  videoHeight?: number
}

export function computeFrameSize(
  videoWidth: number,
  videoHeight: number,
  maxWidth: number,
): FrameSize {
  if (videoWidth <= 0 || videoHeight <= 0) {
    return { width: maxWidth, height: Math.round(maxWidth * (9 / 16)) }
  }

  if (videoWidth <= maxWidth) {
    return { width: videoWidth, height: videoHeight }
  }

  const scale = maxWidth / videoWidth
  return {
    width: maxWidth,
    height: Math.round(videoHeight * scale),
  }
}

export function getMaskCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d', {
    alpha: true,
    desynchronized: true,
  })

  if (!ctx) {
    throw new Error('Canvas 2D context unavailable')
  }

  return ctx
}

export function getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d', {
    alpha: false,
    desynchronized: true,
  })

  if (!ctx) {
    throw new Error('Canvas 2D context unavailable')
  }

  return ctx
}

export function syncCanvasToViewport(
  canvas: HTMLCanvasElement,
  viewport: HTMLElement,
  dpr: number,
): { width: number; height: number } | null {
  const width = Math.round(viewport.clientWidth * dpr)
  const height = Math.round(viewport.clientHeight * dpr)

  if (width <= 0 || height <= 0) {
    return null
  }

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }

  return { width, height }
}

function getSourceDimensions(source: CoverSource) {
  if (source instanceof HTMLVideoElement) {
    return { width: source.videoWidth, height: source.videoHeight }
  }

  if (source instanceof HTMLImageElement) {
    return { width: source.naturalWidth, height: source.naturalHeight }
  }

  return { width: source.width ?? 0, height: source.height ?? 0 }
}

export function drawCoverFrame(
  ctx: CanvasRenderingContext2D,
  source: CoverSource,
  canvasWidth: number,
  canvasHeight: number,
  options?: { clear?: boolean },
) {
  const { width: sourceWidth, height: sourceHeight } = getSourceDimensions(source)

  if (sourceWidth <= 0 || sourceHeight <= 0) return

  if (options?.clear !== false) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  }

  const imgRatio = sourceWidth / sourceHeight
  const canvasRatio = canvasWidth / canvasHeight

  let drawWidth: number
  let drawHeight: number
  let offsetX: number
  let offsetY: number

  if (imgRatio > canvasRatio) {
    drawHeight = canvasHeight
    drawWidth = canvasHeight * imgRatio
    offsetX = (canvasWidth - drawWidth) / 2
    offsetY = 0
  } else {
    drawWidth = canvasWidth
    drawHeight = canvasWidth / imgRatio
    offsetX = 0
    offsetY = (canvasHeight - drawHeight) / 2
  }

  ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight)
}

export function waitForVideoFrame(video: HTMLVideoElement): Promise<void> {
  return new Promise(resolve => {
    if (
      'requestVideoFrameCallback' in video &&
      typeof video.requestVideoFrameCallback === 'function'
    ) {
      video.requestVideoFrameCallback(() => resolve())
      return
    }

    if (!video.seeking && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      resolve()
      return
    }

    video.addEventListener('seeked', () => resolve(), { once: true })
  })
}

export async function captureVideoFrame(
  video: HTMLVideoElement,
  time: number,
  size: FrameSize,
): Promise<ImageBitmap> {
  video.currentTime = time
  await waitForVideoFrame(video)

  const scratch = document.createElement('canvas')
  scratch.width = size.width
  scratch.height = size.height

  const ctx = getCanvasContext(scratch)
  ctx.drawImage(video, 0, 0, size.width, size.height)

  return createImageBitmap(scratch)
}

export function closeFrameBitmaps(frames: ImageBitmap[]) {
  frames.forEach(frame => frame.close())
}
