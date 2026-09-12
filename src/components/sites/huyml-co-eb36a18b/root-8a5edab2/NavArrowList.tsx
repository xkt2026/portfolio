"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import type { NavItem } from "./data";
import { ArrowLong, EASE } from "./primitives";

interface NavArrowListProps {
  readonly items: readonly NavItem[];
  /** Row pitch — 20px in the top bar (`.framer-1irp2nk`), 33px in the overlay. */
  readonly rowHeight: number;
  readonly linkClass: string;
  readonly gutterClassName?: string;
  readonly onSelect?: (item: NavItem) => void;
}

/**
 * `framer-151iacu` — the nav cluster shared by the top bar and the overlay menu.
 *
 * Framer lays it out as `[24px arrow gutter][column of rows]`. The arrow is
 * absolutely positioned at `top: 0` inside the gutter and translated down by
 * `row × pitch`, so a single arrow glides between rows as you hover.
 */
export default function NavArrowList({
  items,
  rowHeight,
  linkClass,
  gutterClassName,
  onSelect,
}: NavArrowListProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const arrowOffset = (rowHeight - 5.25) / 2;

  return (
    <div className="flex items-start" onMouseLeave={() => setHovered(null)}>
      <span
        aria-hidden
        className={gutterClassName ? `relative block w-6 shrink-0 ${gutterClassName}` : "relative block w-6 shrink-0"}
        style={{ height: rowHeight * items.length }}
      >
        <motion.span
          className="absolute top-0 left-0 block"
          initial={false}
          animate={{
            y: arrowOffset + (hovered ?? 0) * rowHeight,
            opacity: hovered === null ? 0 : 1,
          }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <ArrowLong />
        </motion.span>
      </span>

      <nav className="flex flex-col">
        {items.map((item, index) => (
          <NavRow
            key={item.label}
            item={item}
            index={index}
            active={hovered === index}
            linkClass={linkClass}
            onHover={setHovered}
            onSelect={onSelect}
          />
        ))}
      </nav>
    </div>
  );
}

interface NavRowProps {
  readonly item: NavItem;
  readonly index: number;
  readonly active: boolean;
  readonly linkClass: string;
  readonly onHover: (index: number | null) => void;
  readonly onSelect?: (item: NavItem) => void;
}

/**
 * A single row. Framer wraps the label in `padding: 6px; margin: -6px` so the hit
 * area grows without disturbing the 20px/33px pitch, then stacks two copies of the
 * label for the blur crossfade.
 */
function NavRow({ item, index, active, linkClass, onHover, onSelect }: NavRowProps) {
  const transition = { duration: 0.45, ease: EASE };

  return (
    <a
      href={item.href}
      className={`${linkClass} block`}
      onMouseEnter={() => onHover(index)}
      onFocus={() => onHover(index)}
      onClick={(event) => {
        if (!onSelect) return;
        event.preventDefault();
        onSelect(item);
      }}
    >
      <span className="-m-1.5 inline-block p-1.5">
        <span className="hu-blur-stack">
          <motion.span
            className="block"
            initial={false}
            animate={{ opacity: active ? 0 : 1, filter: active ? "blur(8px)" : "blur(0px)" }}
            transition={transition}
          >
            {item.label}
          </motion.span>
          <motion.span
            aria-hidden
            className="block"
            initial={false}
            animate={{ opacity: active ? 1 : 0, filter: active ? "blur(0px)" : "blur(8px)" }}
            transition={transition}
          >
            {item.label}
          </motion.span>
        </span>
      </span>
    </a>
  );
}
