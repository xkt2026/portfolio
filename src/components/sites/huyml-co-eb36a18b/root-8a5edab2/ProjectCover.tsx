"use client";

import Link from "next/link";

import { projectOf } from "./cardProject";
import { assetUrl } from "./data";

/**
 * Cover of the card the wheel is parked on, centred on the canvas.
 *
 * `.framer-thcsc6` only fills its first six columns (logotype, Role / Launch), so the
 * middle of the band is empty canvas — the picture drops into that gap, between the
 * left-hand copy and the right-hand wheel, which is where the eye already travels when
 * a new project lands. The whole frame is the link, so the photograph itself is the
 * way into the case study.
 *
 * Every project shares one wide 16:9 frame, so rolling between cards never shifts the
 * layout and every cover lands at the same size. Nothing is cropped: a landscape shot
 * is drawn alone with `object-contain`, complete edge to edge. Projects whose artwork
 * only exists as portrait posters (`PORTRAIT_PAIRS`) place two portraits side by side
 * — a single unbreakable flex row, each frame sharing the height and filling the
 * landscape frame together. The files and the copy beside them both come from the
 * project behind the card (`projectOf`), the same record `/project/<slug>` prints, so
 * the two views are edited once.
 *
 * Keyed on the wheel index so `.hu-info-swap` cross-fades it in step with the
 * Role / Launch copy next to it.
 */

/**
 * Projects whose covers are portrait-only. The two files render side by side inside
 * the landscape frame. Add a slug here (with its two files) when a new project ships
 * portrait-only artwork.
 */
const PORTRAIT_PAIRS: Readonly<Record<string, readonly [string, string]>> = {
  "fairway-editorial": ["fairway-editorial-01.jpg", "fairway-editorial-02.jpg"],
  "ear-manual": ["ear-manual-01.jpg", "ear-manual-02.jpg"],
};

interface ProjectCoverProps {
  /** Wheel position, `0`-based. */
  readonly active: number;
  /** The archive index takes the canvas over; the picture fades with the rest. */
  readonly visible: boolean;
}

export default function ProjectCover({ active, visible }: ProjectCoverProps) {
  const project = projectOf(active);
  if (!project) return null;

  const pair = PORTRAIT_PAIRS[project.slug];

  return (
    <div
      aria-hidden={!visible}
      className="pointer-events-none absolute inset-0 z-2 flex items-center justify-center transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <Link
        key={active}
        href={`/project/${project.slug}`}
        tabIndex={visible ? 0 : -1}
        aria-label={`${project.title} — 查看案例详情`}
        className={`hu-info-swap block w-[min(580px,40vw)] ${
          visible ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
        }`}
      >
        <span className="flex aspect-[16/9] w-full items-center justify-center gap-3 overflow-hidden">
          {pair ? (
            pair.map((file) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={file}
                src={assetUrl(file)}
                alt=""
                className="block h-full w-0 flex-1 basis-0 object-contain"
              />
            ))
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={assetUrl(project.image)}
              alt=""
              className="block h-full w-full object-contain"
            />
          )}
        </span>
      </Link>
    </div>
  );
}
