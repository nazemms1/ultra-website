"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useVelocity,
  useSpring,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import ServiceCard, {
  CARD_H,
  CARD_W,
  type ServiceCardData,
} from "./ServiceCard";

interface OrbitalTrackProps {
  cards: ServiceCardData[];
}

/** Figma node 891:11762 ("13") geometry. */
const SIZE_W = 717;
const SIZE_H = 647;
const CENTER = { x: 468, y: 326 };
const RING_RADIUS = 118;
const OUTER_RING_RADIUS = 169;

/** Card coordinates are from the MCP-generated absolute inset values. */
const CARD_POSITIONS = [
  { x: 342, y: 24 },
  { x: 352, y: 463 },
  { x: 66, y: 355 },
  { x: 62, y: 162 },
];

/** Dot coordinates from the Figma vector insets in node 891:11762. */
const DOTS = [
  { x: 462, y: 203 },
  { x: 462, y: 436 },
  { x: 367, y: 253 },
  { x: 366, y: 382 },
];

const CONNECTORS = [
  { from: DOTS[0], to: { x: 448, y: 176 } },
  { from: DOTS[1], to: { x: 447, y: 463 } },
  { from: DOTS[2], to: { x: 318, y: 230 } },
  { from: DOTS[3], to: { x: 318, y: 400 } },
];

const BASE_DEG_PER_SEC = 5; // baseline counter-clockwise speed

export default function OrbitalTrack({ cards }: OrbitalTrackProps) {
  const prefersReduced = useReducedMotion();
  const pausedRef = useRef(false);

  // Single source of truth for the orbit angle. Driven imperatively each
  // frame so there are no per-frame React re-renders.
  const rotation = useMotionValue(0);
  // Cards counter-rotate by the exact opposite so text stays upright.
  const counterRotation = useTransform(rotation, (r) => -r);

  // Scroll velocity → smoothed → feeds a temporary speed boost.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });

  useAnimationFrame((_, delta) => {
    if (prefersReduced || pausedRef.current) return;
    const dt = delta / 1000;
    const boost = Math.min(Math.abs(smoothVelocity.get()), 3000) * 0.02;
    // Negative rotate === counter-clockwise in CSS.
    rotation.set(rotation.get() - (BASE_DEG_PER_SEC + boost) * dt);
  });

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  return (
    <div
      className="relative shrink-0"
      style={{ width: SIZE_W, height: SIZE_H }}
      aria-label="Orbiting services"
    >
      {/* ---- Static central graphic (does not orbit) ---- */}
      <OrbitalCenter />

      {/* ---- Rotating track: dots, connectors and cards ---- */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotate: rotation,
          transformOrigin: `${CENTER.x}px ${CENTER.y}px`,
        }}
      >
        <svg
          className="absolute inset-0 overflow-visible"
          width={SIZE_W}
          height={SIZE_H}
          viewBox={`0 0 ${SIZE_W} ${SIZE_H}`}
          fill="none"
          aria-hidden
        >
          {CONNECTORS.map((connector, i) => (
            <line
              key={`connector-${i}`}
              x1={connector.from.x}
              y1={connector.from.y}
              x2={connector.to.x}
              y2={connector.to.y}
              stroke="url(#connectorStroke)"
              strokeWidth="1"
            />
          ))}
          <defs>
            <linearGradient
              id="connectorStroke"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop stopColor="#0DF1D9" stopOpacity="0.5" />
              <stop offset="1" stopColor="#0DF1D9" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {DOTS.map((dot, i) => (
          <Dot key={`dot-${i}`} x={dot.x} y={dot.y} />
        ))}

        {CARD_POSITIONS.map((position, i) => {
          const card = cards[i % cards.length];
          return (
            <div key={`${position.x}-${position.y}`}>
              <div
                className="absolute"
                style={{
                  left: position.x,
                  top: position.y,
                  width: CARD_W,
                  height: CARD_H,
                }}
              >
                {/* counter-rotation keeps the card upright as the track spins */}
                <motion.div
                  style={{
                    rotate: counterRotation,
                    transformOrigin: `${CARD_W / 2}px ${CARD_H / 2}px`,
                  }}
                >
                  <ServiceCard
                    title={card.title}
                    description={card.description}
                    onHoverStart={pause}
                    onHoverEnd={resume}
                  />
                </motion.div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function Dot({ x, y }: { x: number; y: number }) {
  return (
    <span
      aria-hidden
      className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-accent"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        boxShadow: "0 0 10px 2px rgba(13,241,217,0.7)",
      }}
    />
  );
}

/** Stationary central disc: concentric rings, glow and the brand emblem. */
function OrbitalCenter() {
  return (
    <div
      className="absolute"
      style={{
        left: CENTER.x,
        top: CENTER.y,
        width: OUTER_RING_RADIUS * 2,
        height: OUTER_RING_RADIUS * 2,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* ambient core glow */}
      <div
        className="absolute inset-[26px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(13,241,217,0.22) 0%, rgba(13,241,217,0.06) 50%, rgba(6,14,16,0) 78%)",
        }}
      />
      {/* outer ring */}
      <div className="absolute inset-0 rounded-full border border-accent/15" />
      {/* mid ring */}
      <div className="absolute inset-[51px] rounded-full border border-accent/10" />
      {/* inner disc + crisp ring */}
      <div
        className="absolute rounded-full border border-accent shadow-[inset_0_0_30px_rgba(13,241,217,0.12)]"
        style={{
          inset: OUTER_RING_RADIUS - RING_RADIUS,
        }}
      />
      {/* emblem */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="64"
          height="66"
          viewBox="0 0 35 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_18px_rgba(13,241,217,0.65)]"
        >
          <path
            d="M8.9231 14.8325C9.48125 19.1045 12.5182 34.5605 18.9041 32.5765C26.2257 30.3845 28.5076 17.6325 29.2299 11.0725C29.7716 7.39251 35.1889 7.92051 34.9591 11.6485C34.7457 12.8325 34.4338 14.0005 34.1218 15.1685C32.1355 22.4005 27.9494 33.8405 19.2653 35.2005C10.3513 36.4325 9.13649 20.8165 8.9231 14.8325Z"
            fill="#0DF1D9"
          />
          <path
            d="M25.4876 18.7845C26.3084 14.3205 27.5068 2.92848 21.3835 1.80848C13.159 0.784479 6.72394 10.0485 3.4243 16.3205C2.98106 17.1845 1.88118 17.5365 0.994708 17.1045C0.0425729 16.6245 -0.28575 15.4725 0.272399 14.5925C4.55701 7.76045 12.486 -1.67952 21.7447 0.256478C28.9185 2.19248 26.8829 13.5205 25.4876 18.7845Z"
            fill="#CBCBCB"
          />
        </svg>
      </div>
    </div>
  );
}
