"use client";

import { motion } from "framer-motion";

/**
 * Shared motion primitives.
 *
 * Every value below is lifted from the live Framer runtime: the easing is the
 * `cubic-bezier(.16, 1, .3, 1)` the whole site uses, the `blur(8px)` crossfade is
 * how Framer swaps text states (`opacity` + `filter` on stacked grid cells), and
 * the two-bar wipe is `.framer-1m5rw5x`'s underline.
 */
export const EASE = [0.16, 1, 0.3, 1] as const;

interface ArrowLongProps {
  readonly className?: string;
}

/** `.framer-1yekge` / `.framer-1wtdw0e` — the 14×5 long right arrow. */
export function ArrowLong({ className }: ArrowLongProps) {
  return (
    <svg
      width="14.7"
      height="5.25"
      viewBox="0 0 14 5"
      fill="none"
      aria-hidden
      className={className}
      style={{ overflow: "visible" }}
    >
      <path d="M0 2.5h13" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M9.9 2.5 13.4 0.35v4.3z" fill="currentColor" />
    </svg>
  );
}

interface XIconProps {
  readonly className?: string;
}

/** `e-remove 1` — the 12×12 cross that closes both pop-up cards. */
export function XIcon({ className }: XIconProps) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path
        d="M1 1l10 10M11 1L1 11"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface BlurCycleProps {
  readonly states: readonly string[];
  readonly active: number;
  readonly colors?: readonly string[];
  readonly className?: string;
}

/**
 * Framer stacks every state of a label in one grid cell (`inline-grid` +
 * `grid-area: 1 / 1`) and crossfades them with `opacity` and `filter: blur(8px)`,
 * so the outgoing copy dissolves while the incoming one snaps into focus.
 */
export function BlurCycle({ states, active, colors, className }: BlurCycleProps) {
  return (
    <span className={className ? `hu-blur-stack ${className}` : "hu-blur-stack"}>
      {states.map((state, index) => (
        <motion.span
          key={state}
          aria-hidden={index !== active}
          className="block"
          style={colors ? { color: colors[index] } : undefined}
          initial={false}
          animate={{
            opacity: index === active ? 1 : 0,
            filter: index === active ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {state}
        </motion.span>
      ))}
    </span>
  );
}

interface WipeUnderlineProps {
  readonly active: boolean;
}

/**
 * The underline under the top-bar email: two 1px bars pinned 2px outside the box.
 * At rest bar A covers it and bar B waits off to the left; on hover they trade
 * places, so the rule wipes out to the right and back in from the left.
 */
export function WipeUnderline({ active }: WipeUnderlineProps) {
  const transition = { duration: 0.55, ease: EASE };
  return (
    <span className="hu-wipe" aria-hidden>
      <motion.span initial={false} animate={{ x: active ? "101%" : "0%" }} transition={transition} />
      <motion.span
        initial={false}
        animate={{ x: active ? "0%" : "-101%" }}
        transition={transition}
      />
    </span>
  );
}
