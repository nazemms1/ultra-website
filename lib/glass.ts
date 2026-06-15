/**
 * Ultra Glass Effect
 *
 * Matches Figma Glass plugin settings:
 *   Light: -45°, 80% — Refraction: 80 — Depth: 20 — Dispersion: 50 — Frost: 4 — Splay: 0
 *
 * Usage:
 *   import { glass } from '@/lib/glass';
 *   <div style={glass()} />                // default
 *   <div style={glass({ tint: 0.08 })} />  // custom tint opacity
 */

export interface GlassOptions {
  /** Background tint opacity 0–1 (default 0.06) */
  tint?: number;
  /** Border color (default #FFFFFF1A) */
  borderColor?: string;
  /** Border radius (default '16px') */
  radius?: string | number;
  /** Extra styles merged in */
  extra?: React.CSSProperties;
}

export function glass(opts: GlassOptions = {}): React.CSSProperties {
  const {
    tint = 0.06,
    borderColor = '#FFFFFF1A',
    radius = '16px',
    extra = {},
  } = opts;

  return {
    /* Fill */
    background: `rgba(255, 255, 255, ${tint})`,

    /* Frost / blur — maps to Frost: 4 → blur(4px), boosted slightly for visibility */
    backdropFilter: 'blur(4px) brightness(1.05)',
    WebkitBackdropFilter: 'blur(4px) brightness(1.05)',

    /* Border — simulates light refraction highlight at -45° */
    border: `1px solid ${borderColor}`,
    borderRadius: typeof radius === 'number' ? `${radius}px` : radius,

    /* Depth + Dispersion → subtle multi-stop inner glow & shadow */
    boxShadow: [
      /* Depth 20 — soft outer shadow */
      '0px 20px 40px 0px rgba(0, 0, 0, 0.25)',
      /* Light at -45° (top-left highlight) opacity 80% */
      'inset 1px 1px 0px 0px rgba(255, 255, 255, 0.18)',
      /* Dispersion 50 — subtle bottom-right counter-light */
      'inset -1px -1px 0px 0px rgba(255, 255, 255, 0.06)',
    ].join(', '),

    ...extra,
  };
}

/** Pill-shaped glass (for buttons) */
export function glassPill(opts: Omit<GlassOptions, 'radius'> = {}): React.CSSProperties {
  return glass({ ...opts, radius: '100px' });
}
