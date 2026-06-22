#!/usr/bin/env node
/**
 * Extract every frame from bg-video.webm as transparent WebP masks (no background).
 *
 * Usage: pnpm video:frames
 *
 * Env overrides:
 *   VIDEO_FRAME_QUALITY=92
 *   VIDEO_FRAME_WIDTH=1280
 *   VIDEO_COLORKEY_SIM=0.18   — black removal sensitivity (0–1)
 *   VIDEO_COLORKEY_BLEND=0.06 — edge softness (0–1)
 */

import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const input = path.join(root, 'public/videos/bg-video.webm')
const outputDir = path.join(root, 'public/videos/frames')
const padLength = 6

/** WebP quality 0–100 */
const QUALITY = clampInt(process.env.VIDEO_FRAME_QUALITY ?? 95, 40, 100) // 90

/** Output width in px */
const WIDTH = clampInt(process.env.VIDEO_FRAME_WIDTH ?? 1280, 320, 1920) // 1200

/** Remove near-black pixels so only the mask artwork remains. */
const COLORKEY_SIM = clampFloat(process.env.VIDEO_COLORKEY_SIM ?? 0.18, 0.01, 0.5)
const COLORKEY_BLEND = clampFloat(process.env.VIDEO_COLORKEY_BLEND ?? 0.06, 0.01, 0.3)

function clampInt(value, min, max) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return min
  return Math.min(max, Math.max(min, Math.round(parsed)))
}

function clampFloat(value, min, max) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return min
  return Math.min(max, Math.max(min, parsed))
}

function resolveFfmpegPath() {
  let bundledPath = require('ffmpeg-static')

  if (typeof bundledPath === 'string' && !fs.existsSync(bundledPath)) {
    console.log('ffmpeg binary missing — running ffmpeg-static install…')
    const installScript = path.join(path.dirname(bundledPath), 'install.js')
    const install = spawnSync(process.execPath, [installScript], { stdio: 'inherit' })
    if (install.status !== 0) {
      process.exit(install.status ?? 1)
    }
    bundledPath = require('ffmpeg-static')
  }

  if (typeof bundledPath === 'string' && fs.existsSync(bundledPath)) {
    return bundledPath
  }

  const probe = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' })
  if (!probe.error && probe.status === 0) {
    return 'ffmpeg'
  }

  console.error('ffmpeg binary not found.')
  console.error('Run: pnpm install && pnpm video:frames')
  process.exit(1)
}

function clearOldFrames() {
  fs.mkdirSync(outputDir, { recursive: true })

  for (const file of fs.readdirSync(outputDir)) {
    if (/^frame-\d+\.webp$/u.test(file)) {
      fs.unlinkSync(path.join(outputDir, file))
    }
  }
}

function countExtractedFrames() {
  return fs
    .readdirSync(outputDir)
    .filter(file => /^frame-\d+\.webp$/u.test(file))
    .sort((a, b) => {
      const ai = Number(a.match(/^frame-(\d+)\.webp$/u)?.[1] ?? 0)
      const bi = Number(b.match(/^frame-(\d+)\.webp$/u)?.[1] ?? 0)
      return ai - bi
    })
}

function buildVideoFilter() {
  return [
    `scale=${WIDTH}:-2:flags=lanczos`,
    'setsar=1',
    'format=rgba',
    `colorkey=0x000000:${COLORKEY_SIM}:${COLORKEY_BLEND}`,
  ].join(',')
}

function runFfmpeg() {
  const ffmpegPath = resolveFfmpegPath()

  if (!fs.existsSync(input)) {
    console.error(`Missing input video: ${input}`)
    process.exit(1)
  }

  clearOldFrames()

  const outputPattern = path.join(outputDir, `frame-%0${padLength}d.webp`)
  const args = [
    '-y',
    '-i',
    input,
    '-an',
    '-map',
    '0:v:0',
    '-start_number',
    '0',
    '-vf',
    buildVideoFilter(),
    '-fps_mode',
    'passthrough',
    '-c:v',
    'libwebp',
    '-lossless',
    '0',
    '-quality',
    String(QUALITY),
    '-preset',
    'picture',
    outputPattern,
  ]

  console.log(
    `Extracting mask frames (quality=${QUALITY}, width=${WIDTH}px, colorkey sim=${COLORKEY_SIM})…`,
  )
  console.log(`Binary: ${ffmpegPath}`)

  const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }

  const files = countExtractedFrames()
  const frameCount = files.length

  if (frameCount === 0) {
    console.error('No frames were extracted.')
    process.exit(1)
  }

  const manifest = {
    frameCount,
    basePath: '/videos/frames',
    indexStart: 0,
    padLength,
    hasAlpha: true,
    width: WIDTH,
    height: Math.round(WIDTH * (9 / 16)),
    quality: QUALITY,
    colorkeySim: COLORKEY_SIM,
    colorkeyBlend: COLORKEY_BLEND,
  }

  fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`Done — ${frameCount} transparent mask frames + manifest.json`)
}

runFfmpeg()
