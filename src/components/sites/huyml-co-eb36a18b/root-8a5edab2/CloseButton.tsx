"use client";

import { SITE } from "./data";
import { XIcon } from "./primitives";

interface CloseButtonProps {
  readonly onClose: () => void;
  readonly className?: string;
}

/**
 * `.framer-10k85n6` — `Close` plus the 12px cross, absolutely placed at
 * `bottom: 40px; right: 40px` inside whichever card is open. It inherits its
 * colour from the card, so it reads white on the dark sheet and ink on the
 * grey credits card without a second variant.
 */
export default function CloseButton({ onClose, className }: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClose}
      className={`hu-text flex cursor-pointer items-center gap-2 transition-opacity duration-300 hover:opacity-60 ${
        className ?? ""
      }`}
    >
      <span className="block">{SITE.closeLabel}</span>
      <XIcon className="block shrink-0" />
    </button>
  );
}
