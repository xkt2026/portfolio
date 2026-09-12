"use client";

import { SITE } from "./data";

/**
 * `.framer-18wj2kn` — the scroll cue welded to the bottom-right corner of the
 * viewport at `right: 16px; bottom: 16px`.
 */
export default function ScrollHint() {
  return (
    <div className="pointer-events-none absolute right-4 bottom-4 z-3 flex items-center gap-2.5 mix-blend-difference">
      <span className="hu-text">{SITE.scrollLabel}</span>
      <svg width="9" height="11" viewBox="0 0 9 11" fill="none" aria-hidden>
        <path
          d="M4.5 0.5v9M1 6.5l3.5 4 3.5-4"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
