#!/usr/bin/env node
/**
 * Optimize bg-video.webm with keyframe interval -g 1 (all I-frames)
 * for instant, smooth HTML5 video currentTime seeking during scroll scrubbing.
 *
 * Usage: node scripts/optimize-video.mjs
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
const output = path.join(root, 'public/videos/bg-video-scrub.webm')

function resolveFfmpegPath() {
  const probe = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' })
  if (!probe.error && probe.status === 0) {
    return 'ffmpeg'
  }

  let bundledPath
  try {
    bundledPath = require('ffmpeg-static')
  } catch {
    // ignore
  }

  if (typeof bundledPath === 'string' && fs.existsSync(bundledPath)) {
    return bundledPath
  }

  console.error('ffmpeg binary not found.')
  process.exit(1)
}

function optimizeVideo() {
  if (!fs.existsSync(input)) {
    console.error(`Missing input video: ${input}`)
    process.exit(1)
  }

  const ffmpegPath = resolveFfmpegPath()
  console.log(`Optimizing video for scroll scrubbing using FFmpeg...`)
  console.log(`Input: ${input}`)
  console.log(`Output: ${output}`)

  // -g 1 ensures every single frame is a Keyframe (All-Intra) for instant seeking
  const args = [
    '-y',
    '-i',
    input,
    '-c:v',
    'libvpx-vp9',
    '-pix_fmt',
    'yuva420p',
    '-g',
    '1',
    '-an',
    output,
  ]

  const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' })
  if (result.status !== 0) {
    console.error('FFmpeg optimization failed.')
    process.exit(result.status ?? 1)
  }

  const inputStats = fs.statSync(input)
  const outputStats = fs.statSync(output)

  console.log(`Done!`)
  console.log(`Original size: ${(inputStats.size / (1024 * 1024)).toFixed(2)} MB`)
  console.log(`Optimized size: ${(outputStats.size / (1024 * 1024)).toFixed(2)} MB`)
}

optimizeVideo()
