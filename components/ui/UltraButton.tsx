'use client';

import { forwardRef } from 'react';
import { glassPill } from '@/lib/glass';

interface UltraButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass';
  children: React.ReactNode;
  href?: string;
}

const styles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7.74px',
    height: '49.97px',
    paddingTop: '15.48px',
    paddingBottom: '15.48px',
    paddingLeft: '30.97px',
    paddingRight: '30.97px',
    borderRadius: '100px',
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 600,
    fontSize: '14px',
    letterSpacing: '0.7px',
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.25s ease',
    whiteSpace: 'nowrap' as const,
    boxSizing: 'border-box' as const,
  },
  primary: {
    background: '#0DF1D9',
    color: '#060E10',
    boxShadow: '0px 0px 23.23px 0px #01B1B180',
  },
  primaryHover: {
    boxShadow: '0px 0px 36px 0px #01B1B1CC',
    transform: 'translateY(-1px)',
  },
  glass: {
    ...glassPill({ tint: 0.06, borderColor: '#FFFFFF1A' }),
    color: '#ffffff',
  },
  glassHover: {
    border: '0.77px solid rgba(13,241,217,0.5)',
    color: '#0DF1D9',
    background: 'rgba(13,241,217,0.06)',
    transform: 'translateY(-1px)',
  },
};

const UltraButton = forwardRef<HTMLButtonElement, UltraButtonProps>(
  ({ variant = 'primary', children, href, style, ...props }, ref) => {
    const variantStyle = variant === 'primary' ? styles.primary : styles.glass;
    const hoverStyle = variant === 'primary' ? styles.primaryHover : styles.glassHover;

    const combinedStyle = { ...styles.base, ...variantStyle, ...style };

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      Object.assign((e.currentTarget as HTMLElement).style, hoverStyle);
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      Object.assign((e.currentTarget as HTMLElement).style, variantStyle);
      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
    };

    if (href) {
      return (
        <a
          href={href}
          style={combinedStyle as React.CSSProperties}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        style={combinedStyle as React.CSSProperties}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </button>
    );
  }
);

UltraButton.displayName = 'UltraButton';

export default UltraButton;
