"use client";

import { WHEEL } from "./data";

/** Cards are stacked on a fixed 250px pitch and pivot around the canvas centre. */
const STEP = 250;
const CARD_WIDTH = 337;

/**
 * Shortest signed distance from `active` to `index` on a looping track, so the
 * cards behind the first one sit *above* the centre instead of piling up in a
 * column. Rolling from the last card back to the first is then a single-step
 * slide — the same move as any other step — rather than a 1750px rewind.
 */
function offsetOf(index: number, active: number, count: number): number {
  const raw = (((index - active) % count) + count) % count;
  return raw > count / 2 ? raw - count : raw;
}

interface ProjectWheelProps {
  readonly active: number;
  readonly visible: boolean;
  readonly onSelect: (index: number) => void;
  /** Opens the case study behind a card that carries a `slug`. */
  readonly onOpen: (index: number) => void;
}

/**
 * The right-hand rail.
 *
 * Every card lives at `left: 50%; top: 50%` and is pushed down by
 * `translate(-50%, calc(-50% + index × 250px))`, so the active entry always lands
 * dead centre while the neighbours dim to 24% and shrink back to 250px.
 * The three-swatch palette rides the canvas edge, 20px in from the right.
 *
 * Clicking a card obeys the wheel: an off-centre card slides to the middle, while
 * the centred card — already the destination — opens its case study when it has one.
 */
export default function ProjectWheel({ active, visible, onSelect, onOpen }: ProjectWheelProps) {
  const count = Math.max(WHEEL.length, 1);

  return (
    <div className="pointer-events-none absolute inset-0 z-8" aria-hidden={false}>
      <div
        className="pointer-events-none absolute top-0 bottom-0 right-[91px] w-[337px] transition-opacity duration-700"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {WHEEL.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={`${i}-${item.title}`}
              type="button"
              onClick={() => (isActive && item.slug ? onOpen(i) : onSelect(i))}
              aria-label={isActive && item.slug ? `打开 ${item.title} 案例详情` : undefined}
              tabIndex={visible ? 0 : -1}
              className={`absolute top-1/2 left-1/2 block text-center transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                visible ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
              }`}
              style={{
                width: CARD_WIDTH,
                transform: `translate(-50%, calc(-50% + ${offsetOf(i, active, count) * STEP}px))`,
                opacity: isActive ? 1 : 0.24,
                zIndex: isActive ? 2 : 1,
              }}
            >
              {/*
                Tag and title carry their own line breaks (English above Chinese), so
                the two presets are relaxed from their Framer single-line defaults:
                `white-space: pre-line` keeps the `\n` in the data while every other
                card renders exactly as before.
              */}
              <span className="hu-wheel-tag block whitespace-pre-line">{item.tag}</span>
              <span
                className="hu-wheel-title mt-[18px] block whitespace-pre-line transition-[font-size] duration-500"
                style={{ fontSize: isActive ? 24 : 16 }}
              >
                {item.title}
              </span>
              <span
                className="mx-auto mt-[18px] block h-px bg-[rgb(30,30,30)] transition-[width] duration-500"
                style={{ width: isActive ? 12 : 8 }}
              />
            </button>
          );
        })}
      </div>

      {/* the palette of the active project, welded to the canvas edge */}
      <div
        className="pointer-events-none absolute top-1/2 right-5 flex -translate-y-1/2 flex-col gap-[3px] transition-opacity duration-700"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {WHEEL[active].colors.map((color) => (
          <span
            key={color}
            className="block size-[15px]"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
