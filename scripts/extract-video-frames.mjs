#!/usr/bin/env node
/**
 * Extract every frame from bg-video.webm with alpha preserved (transparent background).
 *
 * Usage: pnpm video:frames
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
const width = 640
const padLength = 6

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
    `scale=${width}:-2:flags=lanczos,setsar=1,format=rgba`,
    '-fps_mode',
    'passthrough',
    '-c:v',
    'libwebp',
    '-lossless',
    '0',
    '-quality',
    '82',
    '-preset',
    'picture',
    outputPattern,
  ]

  console.log('Extracting all frames with alpha (transparent background)…')
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
    width,
    height: Math.round(width * (9 / 16)),
  }

  fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`Done — ${frameCount} transparent WebP frames + manifest.json`)
}

runFfmpeg()
