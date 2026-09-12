"use client";

import { ARCHIVE, assetUrl } from "./data";

interface ArchiveRailProps {
  readonly visible: boolean;
}

/**
 * `.framer-1ikkddz` — the archive index.
 *
 * Framer hangs it 199px above the bottom edge, centred with
 * `left: 50%; translateX(-50%)`, and lays it out as a `min-content` column of
 * `min-content` rows with a 20px gap. Each row is one project: thumbnail, then
 * title / slug / date / palette / category, all sliding past in a
 * difference-blended white so the type inverts against the canvas.
 *
 * Every row is an `<a href="./project/<slug>">` on the live site — the archive is
 * the entry point to the 19 case-study pages — so the rows stay anchors here.
 */
export default function ArchiveRail({ visible }: ArchiveRailProps) {
  const rows = [...ARCHIVE, ...ARCHIVE];

  return (
    <div
      aria-hidden={!visible}
      className="pointer-events-none absolute top-0 bottom-[199px] left-1/2 z-10 flex w-max -translate-x-1/2 flex-col items-start justify-end overflow-hidden mix-blend-difference transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="flex flex-col items-start gap-5"
        style={{ animation: "hu-rows-up 90s linear infinite" }}
      >
        {rows.map((row, i) => (
          <a
            key={`${row.slug}-${i}`}
            href={`/portfolio/project/${row.slug}`}
            tabIndex={visible ? 0 : -1}
            className={`flex w-min items-center gap-2.5 transition-opacity duration-300 hover:opacity-60 ${
              visible ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <span className="relative block h-[28px] w-[36px] shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetUrl(row.image)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </span>
            <span className="hu-archive-title block">{row.title}</span>
            <span className="hu-text block lowercase">{row.slug}</span>
            <span className="hu-text block">{row.date}</span>
            <span className="flex shrink-0 items-center gap-[2px]">
              {row.colors.map((color) => (
                <span
                  key={color}
                  className="block size-2"
                  style={{ backgroundColor: color }}
                />
              ))}
            </span>
            <span className="hu-text block">{row.category}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
