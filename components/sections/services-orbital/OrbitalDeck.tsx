"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import OrbitalCard, { CARD_H, CARD_W } from "./OrbitalCard";
import { SERVICES, type ServiceItem } from "./data";

/** Deck coordinate system (scaled responsively by the parent). */
const DECK = 600;
const CENTER = DECK / 2;
const R_DOT = 134; // radius of the dot ring
const R_CARD = 250; // radius the card centers ride on

/** Brand emblem (node from the Figma central graphic). */
const EMBLEM_PATH_A =
  "M8.9231 14.8325C9.48125 19.1045 12.5182 34.5605 18.9041 32.5765C26.2257 30.3845 28.5076 17.6325 29.2299 11.0725C29.7716 7.39251 35.1889 7.92051 34.9591 11.6485C34.7457 12.8325 34.4338 14.0005 34.1218 15.1685C32.1355 22.4005 27.9494 33.8405 19.2653 35.2005C10.3513 36.4325 9.13649 20.8165 8.9231 14.8325Z";
const EMBLEM_PATH_B =
  "M25.4876 18.7845C26.3084 14.3205 27.5068 2.92848 21.3835 1.80848C13.159 0.784479 6.72394 10.0485 3.4243 16.3205C2.98106 17.1845 1.88118 17.5365 0.994708 17.1045C0.0425729 16.6245 -0.28575 15.4725 0.272399 14.5925C4.55701 7.76045 12.486 -1.67952 21.7447 0.256478C28.9185 2.19248 26.8829 13.5205 25.4876 18.7845Z";

interface OrbitalDeckProps {
  /** Baseline counter-clockwise speed in degrees / second. */
  baseSpeed?: number;
  /** Called with a service index on hover, or null when the hover ends. */
  onActivate: (index: number | null) => void;
}

export default function OrbitalDeck({
  baseSpeed = 7,
  onActivate,
}: OrbitalDeckProps) {
  const prefersReduced = useReducedMotion();

  // Single source of truth for the orbit. Updated imperatively each frame so
  // the continuous rotation never re-renders React.
  const spin = useMotionValue(0);

  // Hover pause + smoothed speed ramp (so pausing/resuming eases in).
  const pausedRef = useRef(false);
  const speedRef = useRef(baseSpeed);

  // Scroll velocity feeds a temporary speed boost that decays when idle.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });

  useAnimationFrame((_, delta) => {
    if (prefersReduced) return;
    const dt = Math.min(delta, 64) / 1000; // clamp tab-switch spikes

    const boost =
      (Math.min(Math.abs(smoothVelocity.get()), 4000) / 4000) * baseSpeed * 2.5;
    const target = pausedRef.current ? 0 : baseSpeed + boost;

    // Critically-damped-ish lerp toward the target speed for a smooth pause.
    const k = 1 - Math.exp(-dt * 6);
    speedRef.current += (target - speedRef.current) * k;

    // Negative delta === counter-clockwise.
    spin.set(spin.get() - speedRef.current * dt);
  });

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  return (
    <div
      className="relative shrink-0"
      style={
        {
          width: DECK,
          height: DECK,
          ["--orbit-speed" as string]: String(baseSpeed),
        } as React.CSSProperties
      }
      aria-label="Orbiting services"
    >
      {/* Soft teal glow pooling under / behind the orbital system. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 640,
          height: 640,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle at 50% 56%, rgba(13,241,217,0.16) 0%, rgba(13,241,217,0.06) 38%, rgba(6,14,16,0) 70%)",
        }}
      />

      {/* Grounding shadow that seats the deck on the background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[4%] left-1/2 -translate-x-1/2"
        style={{
          width: 470,
          height: 150,
          borderRadius: "9999px",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(10px)",
        }}
      />

      {/* Static concentric rings + brand emblem (do not orbit). */}
      <OrbitalCenter />

      {/* One spoke per service: dot, connector and upright card. */}
      {SERVICES.map((service, i) => (
        <OrbitalSpoke
          key={service.title}
          spin={spin}
          service={service}
          onHoverStart={() => {
            onActivate(i);
            pause();
          }}
          onHoverEnd={() => {
            onActivate(null);
            resume();
          }}
        />
      ))}

      {/* Right-hand shadow zone: cards plunge under this gradient mask. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20"
        style={{
          width: "40%",
          background:
            "linear-gradient(to right, rgba(6,14,16,0) 0%, rgba(6,14,16,0.65) 55%, rgba(6,14,16,0.95) 100%)",
        }}
      />
    </div>
  );
}

interface OrbitalSpokeProps {
  spin: MotionValue<number>;
  service: ServiceItem;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function OrbitalSpoke({
  spin,
  service,
  onHoverStart,
  onHoverEnd,
}: OrbitalSpokeProps) {
  const { baseAngle } = service;

  // Spoke rotates with the orbit; the card counter-rotates to stay upright.
  const spokeRotate = useTransform(spin, (s) => baseAngle + s);
  const cardCounterRotate = useTransform(spin, (s) => -(baseAngle + s));

  // Occlusion: fade + shrink as the card enters the east (0°) shadow zone.
  const cardOpacity = useTransform(spin, (s) => {
    const a = (((baseAngle + s) % 360) + 360) % 360;
    const d = Math.min(a, 360 - a); // angular distance from east
    return clamp((d - 18) / (72 - 18), 0, 1);
  });
  const cardScale = useTransform(cardOpacity, (o) => 0.82 + 0.18 * o);
  const cardPointer = useTransform(cardOpacity, (o) =>
    o < 0.25 ? "none" : "auto"
  );

  return (
    <motion.div
      className="absolute"
      style={{
        left: CENTER,
        top: CENTER,
        width: 0,
        height: 0,
        rotate: spokeRotate,
        transformOrigin: "0px 0px",
      }}
    >
      {/* Dot riding the inner ring (stays visible all the way around). */}
      <span
        aria-hidden
        className="absolute h-2.5 w-2.5 rounded-full bg-[#0DF1D9]"
        style={{
          left: R_DOT,
          top: 0,
          marginLeft: -5,
          marginTop: -5,
          boxShadow: "0 0 10px 2px rgba(13,241,217,0.7)",
        }}
      />

      {/* Connector + card fade together when plunging into shadow. */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ width: 0, height: 0, opacity: cardOpacity }}
      >
        <div
          aria-hidden
          className="absolute"
          style={{
            left: R_DOT,
            top: 0,
            width: R_CARD - R_DOT,
            height: 2,
            marginTop: -1,
            transformOrigin: "left center",
            background:
              "linear-gradient(90deg, rgba(13,241,217,0.55) 0%, rgba(13,241,217,0) 100%)",
          }}
        />

        <motion.div
          className="absolute"
          style={{
            left: R_CARD,
            top: 0,
            width: CARD_W,
            height: CARD_H,
            marginLeft: -CARD_W / 2,
            marginTop: -CARD_H / 2,
            pointerEvents: cardPointer,
          }}
        >
          <motion.div
            style={{
              rotate: cardCounterRotate,
              scale: cardScale,
              transformOrigin: `${CARD_W / 2}px ${CARD_H / 2}px`,
            }}
          >
            <OrbitalCard
              title={service.title}
              description={service.cardDescription}
              Icon={service.Icon}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Stationary central graphic: concentric rings, core glow and brand emblem. */
function OrbitalCenter() {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: CENTER,
        top: CENTER,
        width: 0,
        height: 0,
      }}
    >
      <Ring diameter={320} className="border-accent/10" />
      <Ring diameter={268} className="border-accent/[0.06]" />
      <Ring
        diameter={200}
        className="border-accent/60 shadow-[inset_0_0_30px_rgba(13,241,217,0.14)]"
      />

      {/* Wide ambient halo around the core. */}
      <div
        className="absolute rounded-full"
        style={{
          left: -150,
          top: -150,
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle at 50% 50%, rgba(13,241,217,0.24) 0%, rgba(13,241,217,0.08) 48%, rgba(6,14,16,0) 76%)",
        }}
      />

      {/* Luminous filled core disc inside the crisp cyan ring. */}
      <div
        className="absolute rounded-full"
        style={{
          left: -100,
          top: -100,
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle at 50% 58%, rgba(13,241,217,0.32) 0%, rgba(13,241,217,0.12) 46%, rgba(6,14,16,0) 72%)",
        }}
      />

      {/* Emblem. */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: -40, top: -40, width: 80, height: 80 }}
      >
        <svg
          width="64"
          height="66"
          viewBox="0 0 35 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_18px_rgba(13,241,217,0.65)]"
          aria-hidden
        >
          <path d={EMBLEM_PATH_A} fill="#0DF1D9" />
          <path d={EMBLEM_PATH_B} fill="#CBCBCB" />
        </svg>
      </div>
    </div>
  );
}

function Ring({
  diameter,
  className,
}: {
  diameter: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute rounded-full border ${className ?? ""}`}
      style={{
        left: -diameter / 2,
        top: -diameter / 2,
        width: diameter,
        height: diameter,
      }}
    />
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
