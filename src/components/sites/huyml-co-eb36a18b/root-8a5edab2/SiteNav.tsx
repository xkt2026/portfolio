"use client";

import { SITE } from "./data";

interface SiteNavProps {
  readonly copied: boolean;
  readonly onCopyEmail: () => void;
  readonly onOpenMenu: () => void;
}

/**
 * `.framer-n2xgl8-container` — the fixed top bar.
 *
 * Framer pins it with `height: 0` and lets the flex row overflow, so the whole
 * cluster rides on the very top edge of the viewport. Everything inside is
 * `mix-blend-mode: difference` white, which reads as ink on the light canvas.
 *
 * The live site also wedged two clusters between `Menu` and the address — the
 * `Audio On / Off` sound toggle and the `Working globally` / `HCMC, 15:26` clock.
 * Both are deliberately gone, so the bar is back down to its two ends.
 */
export default function SiteNav({ copied, onCopyEmail, onOpenMenu }: SiteNavProps) {
  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-9 h-0 mix-blend-difference">
      <div className="hu-nav-cluster flex items-start justify-end gap-x-14 px-5 pt-5">
        <button
          type="button"
          onClick={onOpenMenu}
          className="hu-text hu-text-quiet pointer-events-auto transition-colors duration-300 hover:text-white"
        >
          {SITE.menuLabel}
        </button>

        <button
          type="button"
          onClick={onCopyEmail}
          className="hu-text pointer-events-auto text-left"
          aria-label={`${SITE.inquiriesLabel}: ${SITE.email}`}
        >
          <span className="hu-text-quiet block">
            {copied ? SITE.copiedLabel : SITE.inquiriesLabel}
          </span>
          <span className="block">{SITE.email}</span>
        </button>
      </div>
    </nav>
  );
}
