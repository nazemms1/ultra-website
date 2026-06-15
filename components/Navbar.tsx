'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About us', href: '#about' },
  { label: 'Our services', href: '#services' },
  { label: 'Our projects', href: '#projects' },
  { label: 'About', href: '#team' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      {/* ── Single unified pill ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '1318px',
          height: '68px',
          borderRadius: '50px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0px 4px 30px 0px rgba(0,0,0,0.1)',
          background: 'rgba(8,20,24,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '24px',
          paddingRight: '24px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Column 1 — Logo (fixed width, aligns left) */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
          <Link
            href="/"
            aria-label="Ultra Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <ellipse cx="18" cy="16" rx="10" ry="11" stroke="#0DF1D9" strokeWidth="1.6" />
              <line x1="18" y1="5" x2="18" y2="2" stroke="#0DF1D9" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="18" cy="1.5" r="1.2" fill="#0DF1D9" />
              <circle cx="14.5" cy="15" r="2.2" fill="#0DF1D9" opacity="0.9" />
              <circle cx="21.5" cy="15" r="2.2" fill="#0DF1D9" opacity="0.9" />
              <circle cx="15.2" cy="14.2" r="0.7" fill="#fff" />
              <circle cx="22.2" cy="14.2" r="0.7" fill="#fff" />
              <path d="M14.5 19.5 Q18 22 21.5 19.5" stroke="#0DF1D9" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <path d="M8 14 Q6.5 16 8 18" stroke="#0DF1D9" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M28 14 Q29.5 16 28 18" stroke="#0DF1D9" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontFamily: 'Ethnocentric, Rajdhani, sans-serif',
                fontWeight: 400,
                fontSize: '22px',
                letterSpacing: '2px',
                color: '#ffffff',
                lineHeight: 1,
              }}
            >
              LTRA
            </span>
          </Link>
        </div>

        {/* Column 2 — Nav links (flex:1, centered) — hidden on mobile */}
        <div
          style={{
            flex: '1 1 0',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>

        {/* Column 3 — CTA + mobile toggle (fixed width, aligns right) */}
        <div
          style={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginLeft: 'auto',
          }}
        >
          <Link
            href="#contact"
            className="hidden md:inline-flex"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0DF1D9',
              color: '#060E10',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              padding: '10px 28px',
              borderRadius: '50px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'box-shadow 0.25s ease, transform 0.25s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = '0 0 22px rgba(13,241,217,0.5)';
              el.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = 'none';
              el.style.transform = 'translateY(0)';
            }}
          >
            Contact Us
          </Link>

          <button
            className="flex md:hidden"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(13,241,217,0.1)',
              border: '1px solid rgba(13,241,217,0.25)',
              cursor: 'pointer',
            }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={17} color="#0DF1D9" /> : <Menu size={17} color="#0DF1D9" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          style={{
            marginTop: '10px',
            width: '100%',
            maxWidth: '1318px',
            borderRadius: '24px',
            background: 'rgba(8,20,24,0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            boxSizing: 'border-box',
          }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 500,
                fontSize: '15px',
                letterSpacing: '0.5px',
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                padding: '13px 0',
                borderBottom: i < navLinks.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                display: 'block',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0DF1D9',
              color: '#060E10',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              padding: '10px 28px',
              borderRadius: '50px',
              textDecoration: 'none',
              marginTop: '16px',
              alignSelf: 'flex-start',
              width: 'fit-content',
            }}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'Rajdhani, sans-serif',
        fontWeight: 500,
        fontSize: '15px',
        letterSpacing: '0.4px',
        color: 'rgba(255,255,255,0.8)',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = '#0DF1D9';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)';
      }}
    >
      {label}
    </Link>
  );
}
