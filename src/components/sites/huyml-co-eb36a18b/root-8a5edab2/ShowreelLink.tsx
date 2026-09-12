"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { SITE } from "./data";
import { EASE } from "./primitives";

interface ShowreelLinkProps {
  readonly className?: string;
  /** Fired on click so a host sheet (the menu overlay) can dismiss itself. */
  readonly onNavigate?: () => void;
}

/**
 * `Variant 3` of the header button component — now the home link carrying `ALL`.
 *
 * The live site used this slot for its `'25 showreel` and pointed it at the reel;
 * the clone ships `ALL` and routes it to `/`, so it is an internal `Link` and no
 * longer opens a new tab.
 */
export default function ShowreelLink({ className, onNavigate }: ShowreelLinkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/"
      onClick={onNavigate}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`hu-text flex cursor-pointer items-center gap-2 ${className ?? ""}`}
    >
      <span className="-m-1.5 inline-block p-1.5">{SITE.showreelLabel}</span>
      <motion.span
        className="block shrink-0"
        initial={false}
        animate={{ scale: hovered ? 1.18 : 1, rotate: hovered ? 0 : -9 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M2.6 1.05a1.05 1.05 0 0 1 1.6-.9l6.3 4.05a1.05 1.05 0 0 1 0 1.8L4.2 10.05a1.05 1.05 0 0 1-1.6-.9V1.05Z"
            fill="currentColor"
          />
        </svg>
      </motion.span>
    </Link>
  );
}
