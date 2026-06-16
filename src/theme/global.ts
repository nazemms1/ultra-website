import { css, keyframes } from '@emotion/react'

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const faqGlowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 16px 2px var(--ultra-palette-primary-mainChannel, 13 241 217 / 0.25); }
  50% { box-shadow: 0 0 32px 8px var(--ultra-palette-primary-mainChannel, 13 241 217 / 0.5); }
`

const GlobalStyles = () => css`
  @font-face {
    font-family: 'Ethnocentric Rg';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('https://fonts.cdnfonts.com/s/14882/Ethnocentric Rg.otf') format('opentype');
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

  :root {
    height: 100%;
  }

  html {
    background-color: var(--ultra-palette-background-default);
  }

  * {
    box-sizing: border-box;
  }

  body {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    direction: inherit;
    margin: 0 !important;
    font-family: 'Rajdhani', sans-serif;
    background-color: var(--ultra-palette-background-default);
    color: var(--ultra-palette-text-primary);
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

  .ultra-faq-card-hover {
    animation: ${faqGlowPulse} 1.8s ease-in-out infinite;
  }
`

export default GlobalStyles
