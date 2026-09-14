"use client";

import { projectOf } from "./cardProject";
import { SITE, WHEEL } from "./data";

const CANVAS_GRID =
  "grid-cols-[repeat(16,minmax(50px,1fr))] grid-rows-[repeat(3,minmax(0,1fr))] gap-x-7 gap-y-2.5";

/**
 * `ruler` labels the band keeps off the home page. `Team` — the client or studio a project
 * was made for — is the one that goes: the band introduces the work and the role, while who
 * commissioned it belongs to the case study. Rows are matched on their own label, so a
 * `Role` value is never caught by mistake.
 */
const HOME_HIDDEN_RULERS = ["team"];

interface HeroBandProps {
  /** Wheel position, `0`-based — the band re-reads `WHEEL[active]` on every step. */
  readonly active: number;
}

/**
 * `.framer-thcsc6` — the 194px info band pinned to the vertical centre of the canvas
 * (`top: calc(50% - 97px)`). Cells carry a 20px inset, the copy inside another 24px,
 * and the whole band is `mix-blend-difference` so white type lands as ink on #ececec.
 *
 * Launch used to be a fixed snapshot of the live site; it now tracks the wheel. The band
 * reads the *case study* rather than the card: whenever a card points at a project, each
 * row is that project's own pairing of `ruler` label and `roles` value, so Role and Launch
 * are the very strings `/project/<slug>` prints and the two pages cannot disagree. The rows
 * named in `HOME_HIDDEN_RULERS` (`Team`) are dropped on the way out. A card without a page
 * keeps its single `Role` row. The keyed wrapper replays `.hu-info-swap` so the copy
 * cross-fades on every step.
 */
export default function HeroBand({ active }: HeroBandProps) {
  const item = WHEEL[active];
  const project = projectOf(active);
  /**
   * `ruler` names the values in `roles` one by one (`Team`, `Role`); a value without a
   * label of its own — some entries list two values under one `Role` — falls back to
   * `roleLabel` rather than leaving the column blank.
   */
  const rows = project
    ? project.roles
        .map((value, i) => ({ label: project.ruler[i] ?? SITE.roleLabel, value, zh: project.rolesZh[i] ?? "" }))
        .filter((row) => !HOME_HIDDEN_RULERS.includes(row.label.toLowerCase()))
    : [{ label: SITE.roleLabel, value: item.roles.join("\n"), zh: item.rolesZh.join("\n") }];
  const launch = project?.dateLabel ?? item.launch;

  return (
    <section
      aria-label="Introduction"
      className={`pointer-events-none absolute inset-x-0 top-[calc(50%-97px)] z-1 grid h-[194px] ${CANVAS_GRID} p-5 mix-blend-difference`}
    >
      {/* `.framer-7p0nok` — span 2, two stacked logotype lines (ghost + live) */}
      <div className="col-span-2 row-start-1 flex items-start gap-8">
        <div className="flex w-[87px] flex-col gap-[45px]">
          <p className="hu-text hu-text-quiet h-[29px]">
            {SITE.owner}
            {"\n"}
            {SITE.ownerAlias}
          </p>
          <p className="hu-text h-[29px]">
            {SITE.owner}
            {"\n"}
            {SITE.ownerAlias}
          </p>
        </div>
      </div>

      {/* `.framer-byaoxr` — span 4, Role / Launch for the active card */}
      <div className="col-span-4 row-start-1 flex flex-col items-start gap-2.5">
        <div key={active} className="hu-info-swap flex flex-col items-start gap-12">
          <div className="flex flex-col items-start gap-1">
            {rows.map((row, i) => (
              <div key={`${row.label}-${i}`} className="hu-text flex items-start">
                <span className="hu-text-quiet block w-[64px] shrink-0">{row.label}</span>
                <div className="block">
                  <p>{row.value}</p>
                  {row.zh && <p className="hu-roles-zh">{row.zh}</p>}
                </div>
              </div>
            ))}
          </div>
          <p className="hu-text flex h-4 w-[120px] items-center">
            <span className="hu-text-quiet block w-[64px] shrink-0">{SITE.launchLabel}</span>
            <span className="block">{launch}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
