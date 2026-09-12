"use client";

import { SITE } from "./data";

interface WorkCounterProps {
  readonly index: number;
  /** Card count — the `/08` total is derived so it can never drift from `WHEEL`. */
  readonly totalCount: number;
  readonly visible: boolean;
  /**
   * The wheel now loops forever (01 ⇄ 08), so the archive rail is no longer reached
   * by scrolling off the last card. `View the full archive` in the bottom-left
   * cluster is the visible way in; the caption row stays a plain label.
   */
  readonly archiveOpen: boolean;
  readonly onToggleArchive: () => void;
  readonly onOpenContact: () => void;
  readonly onOpenCredits: () => void;
}

/**
 * `.framer-1e0z5mv` — the 194px band welded to the bottom of the canvas.
 *
 * The counter cell (`.framer-1pmjs2o`) spans four columns and is self-aligned to
 * the end of the row; its caption row pairs `Selected work` with the `/08` total —
 * derived from the card count, so it always agrees with `WHEEL` — and the 180px
 * tabular index sits directly beneath it inside a 10px gap.
 *
 * `View the full archive` joins the bottom-left cluster because the wheel loops:
 * the live site reached the rail by scrolling past the last card, and there is no
 * longer an end to scroll past.
 */
export default function WorkCounter({
  index,
  totalCount,
  visible,
  archiveOpen,
  onToggleArchive,
  onOpenContact,
  onOpenCredits,
}: WorkCounterProps) {
  const current = String(index + 1).padStart(2, "0");
  const total = `/${String(totalCount).padStart(2, "0")}`;

  return (
    <section
      aria-label="Work counter"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-5 grid h-[194px] grid-cols-[repeat(16,minmax(50px,1fr))] gap-x-7 px-5 pb-5 mix-blend-difference"
    >
      <div
        className="col-span-2 col-start-1 flex flex-col items-start self-end gap-1 transition-opacity duration-700"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <button
          type="button"
          onClick={onOpenContact}
          className="hu-text pointer-events-auto block cursor-pointer transition-opacity duration-300 hover:opacity-50"
        >
          {SITE.contactTitle}
        </button>
        <button
          type="button"
          onClick={onOpenCredits}
          className="hu-text hu-text-quiet pointer-events-auto block cursor-pointer transition-opacity duration-300 hover:text-white"
        >
          {SITE.creditsTitle}
        </button>
        <button
          type="button"
          onClick={onToggleArchive}
          aria-pressed={archiveOpen}
          className={`hu-text hu-text-quiet block transition-opacity duration-300 ${
            visible
              ? "pointer-events-auto cursor-pointer hover:text-white"
              : "pointer-events-none"
          }`}
        >
          {SITE.archiveLabel}
        </button>
      </div>

      <div
        className="col-span-4 col-start-3 flex flex-col items-start self-end justify-self-center gap-2.5 transition-opacity duration-700"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <p className="hu-text flex w-full items-center pb-3">
          <span className="block">{SITE.selectedLabel}</span>
          <span className="block pl-[30px]">{total}</span>
        </p>
        <p className="hu-counter">{current}</p>
      </div>
    </section>
  );
}
