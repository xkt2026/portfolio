"use client";

import { useState } from "react";

import { SITE } from "./data";
import { BlurCycle, WipeUnderline } from "./primitives";

interface InquiryButtonProps {
  readonly copied: boolean;
  readonly onCopy: () => void;
  readonly className?: string;
  readonly align?: "start" | "end";
}

/**
 * `.framer-1m5rw5x-container` — the copy-to-clipboard button (top bar shows
 * `SITE.email`; on the live site that was `hello@huyml.co`).
 *
 * Framer gives it three stacked label states in one cell: `For inquiries` at rest,
 * `Click to copy` while hovered, and `Copied` (in `#ff4949`) for a beat after the
 * click — each swap travelling through `blur(8px)`. The address below carries the
 * two-bar wipe underline that runs in from the left on hover.
 */
export default function InquiryButton({
  copied,
  onCopy,
  className,
  align = "start",
}: InquiryButtonProps) {
  const [hovered, setHovered] = useState(false);
  const active = copied ? 2 : hovered ? 1 : 0;

  return (
    <button
      type="button"
      aria-label={`${SITE.copyLabel} ${SITE.email}`}
      onClick={onCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`hu-text flex cursor-pointer flex-col gap-0.5 ${
        align === "end" ? "items-end text-right" : "items-start text-left"
      } ${className ?? ""}`}
    >
      <BlurCycle
        states={[SITE.inquiriesLabel, SITE.copyLabel, SITE.copiedLabel]}
        active={active}
        colors={["rgb(122,122,122)", "rgb(122,122,122)", "rgb(255,73,73)"]}
      />
      <span className="inline-flex flex-col gap-0.5">
        <span className="block">{SITE.email}</span>
        <WipeUnderline active={hovered} />
      </span>
    </button>
  );
}
