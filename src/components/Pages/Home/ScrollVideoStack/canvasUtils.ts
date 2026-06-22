export type FrameSize = {
  width: number
  height: number
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

export function waitForVideoFrame(video: HTMLVideoElement): Promise<void> {
  return new Promise(resolve => {
    if (
      'requestVideoFrameCallback' in video &&
      typeof video.requestVideoFrameCallback === 'function'
    ) {
      video.requestVideoFrameCallback(() => resolve())
      return
    }

    const onSeeked = () => resolve()
    if (video.seeking) {
      video.addEventListener('seeked', onSeeked, { once: true })
      return
    }

    video.addEventListener('seeked', onSeeked, { once: true })
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

  const ctx = scratch.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas 2D context unavailable')
  }

  ctx.drawImage(video, 0, 0, size.width, size.height)
  return createImageBitmap(scratch)
}

export function drawCoverFrame(
  ctx: CanvasRenderingContext2D,
  bitmap: ImageBitmap,
  canvasWidth: number,
  canvasHeight: number,
) {
  const imgRatio = bitmap.width / bitmap.height
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

  ctx.drawImage(bitmap, offsetX, offsetY, drawWidth, drawHeight)
}

export function drawCrossfadedFrames(
  ctx: CanvasRenderingContext2D,
  frames: ImageBitmap[],
  progress: number,
  canvasWidth: number,
  canvasHeight: number,
) {
  if (frames.length === 0) return

  const lastIndex = frames.length - 1
  const scaled = progress * lastIndex
  const indexA = Math.min(Math.floor(scaled), lastIndex)
  const indexB = Math.min(indexA + 1, lastIndex)
  const blend = scaled - indexA

  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  const frameA = frames[indexA]
  if (!frameA) return

  ctx.globalAlpha = 1 - blend
  drawCoverFrame(ctx, frameA, canvasWidth, canvasHeight)

  if (blend > 0 && indexB !== indexA) {
    const frameB = frames[indexB]
    if (frameB) {
      ctx.globalAlpha = blend
      drawCoverFrame(ctx, frameB, canvasWidth, canvasHeight)
    }
  }

  ctx.globalAlpha = 1
}
