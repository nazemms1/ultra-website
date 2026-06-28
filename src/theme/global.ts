import { css, keyframes } from '@emotion/react'

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const faqShimmerSweep = keyframes`
  0%   { transform: translateX(-160%) skewX(-18deg); opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { transform: translateX(360%) skewX(-18deg); opacity: 0; }
`

const GlobalStyles = () => css`
  @font-face {
    font-family: 'Ethnocentric Rg';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/Ethnocentric-Regular.otf') format('opentype');
  }

  @font-face {
    font-family: 'Nulshock';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/Nulshock Bd.otf') format('opentype');
  }

  ::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 4px;
    background: var(--ultra-palette-background-default);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: color-mix(in srgb, var(--ultra-palette-primary-main) 30%, transparent);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: color-mix(in srgb, var(--ultra-palette-primary-main) 50%, transparent);
  }

  html {
    margin: 0;
    padding: 0;
    background-color: var(--ultra-palette-background-default);
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    direction: inherit;
    font-family: 'Rajdhani', sans-serif;
    background-color: var(--ultra-palette-background-default);
    color: var(--ultra-palette-text-primary);
  }

  /* ─── Arabic / RTL overrides ─────────────────────────────────────────────── */

  /* 1. Arabic font — prevents browser fallback with mismatched vertical metrics */
  [dir='rtl'] body {
    font-family: var(--font-arabic, 'Noto Sans Arabic'), sans-serif;
  }

  /* 2. Clip horizontal overflow at the html level only — avoids breaking
        minHeight / flex on section and main elements.                         */
  html[dir='rtl'] {
    overflow-x: hidden;
  }

  /* 3. Headings: remove Latin letter-spacing, keep natural Arabic line-height  */
  [dir='rtl'] h1,
  [dir='rtl'] h2,
  [dir='rtl'] h3,
  [dir='rtl'] h4,
  [dir='rtl'] h5,
  [dir='rtl'] h6 {
    letter-spacing: 0;
    line-height: 1.4;
  }

  /* 4. Body text: normalise line-height to match LTR section proportions       */
  [dir='rtl'] p,
  [dir='rtl'] span,
  [dir='rtl'] li,
  [dir='rtl'] label {
    line-height: 1.65;
  }

  /* 5. Buttons: remove uppercase + wide letter-spacing (Latin-only styles)     */
  [dir='rtl'] button,
  [dir='rtl'] .MuiButton-root,
  [dir='rtl'] .MuiButtonBase-root {
    letter-spacing: 0.02em;
    text-transform: none;
  }

  .ultra-shimmer-text {
    background: linear-gradient(
      90deg,
      var(--ultra-palette-primary-main) 0%,
      var(--ultra-palette-primary-lighter) 40%,
      var(--ultra-palette-primary-main) 60%,
      var(--ultra-palette-primary-dark) 100%
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 3s linear infinite;
  }

  /* FAQ card — steady Figma hover glow + one-shot diagonal shimmer sweep */
  .ultra-faq-card {
    transition:
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.35s ease,
      box-shadow 0.35s ease;
  }

  .ultra-faq-card .ultra-faq-card__sheen {
    position: absolute;
    top: -40%;
    bottom: -40%;
    left: 0;
    width: 38%;
    pointer-events: none;
    z-index: 2;
    opacity: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      color-mix(in srgb, var(--ultra-palette-primary-light) 22%, transparent) 48%,
      color-mix(in srgb, var(--ultra-palette-primary-lighter) 42%, transparent) 50%,
      color-mix(in srgb, var(--ultra-palette-primary-light) 22%, transparent) 52%,
      transparent 100%
    );
    filter: blur(6px);
  }

  .ultra-faq-card:hover {
    transform: translateY(-6px) scale(1.01);
    border-color: color-mix(in srgb, var(--ultra-palette-primary-main) 55%, transparent);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--ultra-palette-primary-main) 35%, transparent),
      0 18px 40px -12px rgba(0, 0, 0, 0.55),
      0 0 26px 0 color-mix(in srgb, var(--ultra-palette-primary-main) 28%, transparent),
      0 0 60px -6px color-mix(in srgb, var(--ultra-palette-primary-main) 20%, transparent),
      inset 1px 1px 0 0 rgba(255, 255, 255, 0.2),
      inset -1px -1px 0 0 color-mix(in srgb, var(--ultra-palette-primary-main) 14%, transparent);
  }

  .ultra-faq-card:hover .ultra-faq-card__sheen {
    animation: ${faqShimmerSweep} 1.5s ease-out;
  }
`

export default GlobalStyles
