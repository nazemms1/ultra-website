import { css, keyframes } from '@emotion/react'

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const faqShimmerSweep = keyframes`
  0%   { transform: translateX(-160%) skewX(-18deg); opacity: 0; }
  15%  { transform: translateX(-50%) skewX(-18deg); opacity: 1; }
  85%  { transform: translateX(250%) skewX(-18deg); opacity: 1; }
  100% { transform: translateX(360%) skewX(-18deg); opacity: 0; }
`

const GlobalStyles = () => css`
  @font-face {
    font-family: 'Ethnocentric Rg';
    font-style: normal;
    font-weight: 400;
    font-display: optional;
    src: url('/fonts/Ethnocentric-Regular.otf') format('opentype');
  }

  @font-face {
    font-family: 'Nulshock';
    font-style: normal;
    font-weight: 700;
    font-display: optional;
    src: url('/fonts/Nulshock Bd.otf') format('opentype');
  }

  @font-face {
    font-family: 'Almarai';
    font-style: normal;
    font-weight: 700;
    font-display: optional;
    src: url('/fonts/Almarai-Bold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Changa';
    font-style: normal;
    font-weight: 400;
    font-display: optional;
    src: url('/fonts/Changa-Regular.ttf') format('truetype');
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

  @media (min-width: 900px) {
    .desktop-only-video {
      display: block !important;
    }
  }

  html {
    margin: 0;
    padding: 0;
    background-color: var(--ultra-palette-background-default);
    overflow-x: hidden;
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
    overflow-x: hidden;
  }

  /* ─── Arabic / RTL overrides ─────────────────────────────────────────────── */

  /* 1. Arabic font — force Changa on every element in RTL, overriding sx props */
  [dir='rtl'] * {
    font-family: 'Changa', sans-serif !important;
  }


  /* 2. Clip horizontal overflow — on body so it doesn't become a containing
        block for position:absolute children (html overflow-x:hidden does that
        and breaks video layers in RTL pages).                                 */
  body[dir='rtl'],
  html[dir='rtl'] body {
    overflow-x: hidden;
  }

  /* 3. Headings — Almarai Bold, override any inline fontFamily from sx props  */
  [dir='rtl'] h1,
  [dir='rtl'] h2,
  [dir='rtl'] h3,
  [dir='rtl'] h4,
  [dir='rtl'] h5,
  [dir='rtl'] h6,
  [dir='rtl'] .MuiTypography-h1,
  [dir='rtl'] .MuiTypography-h2,
  [dir='rtl'] .MuiTypography-h3,
  [dir='rtl'] .MuiTypography-h4,
  [dir='rtl'] .MuiTypography-h5,
  [dir='rtl'] .MuiTypography-h6 {
    font-family: 'Almarai', sans-serif !important;
    letter-spacing: 0;
    line-height: 1.4;
  }

  /* 4. Body text — Changa Regular, override any inline fontFamily from sx props.
        font-size is intentionally NOT set here — let the RTL theme values and
        sx props control sizing without interference. */
  [dir='rtl'] p,
  [dir='rtl'] span:not(.stat-number, .stat-number span),
  [dir='rtl'] li,
  [dir='rtl'] label,
  [dir='rtl'] button,
  [dir='rtl'] .MuiTypography-body1,
  [dir='rtl'] .MuiTypography-body2,
  [dir='rtl'] .MuiTypography-caption,
  [dir='rtl'] .MuiTypography-overline,
  [dir='rtl'] .MuiTypography-subtitle1,
  [dir='rtl'] .MuiTypography-subtitle2,
  [dir='rtl'] .MuiButton-root,
  [dir='rtl'] .MuiButtonBase-root {
    font-family: 'Changa', sans-serif !important;
    line-height: 1.65;
  }

  /* 6. Remove Latin letter-spacing from all RTL text — Arabic doesn't use tracking */
  [dir='rtl'] * {
    letter-spacing: 0 !important;
  }

  /* 7. Small section labels — clamp font-size so Arabic glyphs are never
        rendered below 15px (Latin labels are typically 11-13px which is
        unreadable in Arabic). max() keeps larger text untouched.
        Note: p and body1 are intentionally excluded so sx-prop font sizes
        (e.g. fontSize: 25 in Hero) are not clamped. */
  [dir='rtl'] .MuiTypography-caption,
  [dir='rtl'] .MuiTypography-overline {
    font-size: max(15px, 1em) !important;
  }

  /* 8. Mobile-only Arabic type scale — Arabic fonts (Changa/Almarai) render
        visually smaller than Latin at the same font-size. On small screens
        bump the root size so every rem-based size scales up together (~6%),
        and give body variants the taller line-height Arabic script needs.
        Scoped to [lang='ar'] / [dir='rtl'] only — the LTR layout is untouched. */
  @media (max-width: 899.95px) {
    html[lang='ar'] {
      font-size: 106.25%;
    }

    [dir='rtl'] .MuiTypography-body1,
    [dir='rtl'] .MuiTypography-body2 {
      line-height: 1.7;
    }
  }

  /* Stat numbers — double selector to beat all RTL overrides above.
     font-size intentionally omitted so the sx prop value is used.   */
  [dir='rtl'] .stat-number.stat-number,
  [dir='rtl'] .stat-number.stat-number * {
    font-family: 'Ethnocentric Rg', sans-serif !important;
    font-size: unset !important;
    line-height: unset !important;
    letter-spacing: 0 !important;
  }

  /* 5. Buttons: remove uppercase + wide letter-spacing (Latin-only styles)     */
  [dir='rtl'] button,
  [dir='rtl'] .MuiButton-root,
  [dir='rtl'] .MuiButtonBase-root {
    letter-spacing: 0.02em;
    text-transform: none;
  }

  .ultra-shimmer-text {
    display: inline-block;
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
    will-change: transform, opacity;
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
