"use client";

import Link from "next/link";

import { SITE, STAMP_FACES, assetUrl } from "./data";

/** Native size of the logo artwork, and the size the header renders it at. */
const FACE_W = 56;
const FACE_H = 123;
const DEPTH = FACE_W;

/**
 * `.framer-um322p` — the fixed header stamp.
 *
 * Framer builds it as a 4-faced rotating cube so the logotype always greets the
 * visitor from a new angle: two columns × three rows, 219px tall, pinned to the
 * top-left corner of the viewport.
 */
export default function SiteStamp() {
  return (
    <header
      aria-label="HUYML logotype"
      className="pointer-events-none fixed top-0 left-0 z-9 grid h-[219px] w-min grid-cols-2 grid-rows-[repeat(3,minmax(0,1fr))] gap-x-5 gap-y-2.5 p-5"
    >
      <div className="col-start-1 row-start-1 grid place-items-center">
        <div className="hu-stamp-stage relative" style={{ width: FACE_W, height: FACE_H }}>
          <div className="hu-stamp-cube relative h-full w-full">
            {STAMP_FACES.map((face, i) => (
              <div
                key={face}
                className="absolute inset-0"
                style={{ transform: `rotateY(${i * 90}deg) translateZ(${DEPTH / 2}px)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assetUrl(face)}
                  alt=""
                  width={FACE_W}
                  height={FACE_H}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
            {/* the two square caps close the cube top and bottom */}
            <div
              className="absolute top-0 left-0 bg-[#ececec]"
              style={{
                width: FACE_W,
                height: DEPTH,
                transform: `rotateX(90deg) translateZ(${FACE_H / 2}px)`,
              }}
            />
            <div
              className="absolute top-0 left-0 bg-[#ececec]"
              style={{
                width: FACE_W,
                height: DEPTH,
                transform: `rotateX(-90deg) translateZ(${FACE_H / 2}px)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* the third row of the header grid holds the home link */}
      <Link
        href="/"
        className="hu-text pointer-events-auto col-start-1 row-start-3 flex items-center gap-2.5 self-end mix-blend-difference transition-opacity duration-300 hover:opacity-50"
      >
        <span className="block size-[6px] shrink-0 bg-current" />
        <span className="block">{SITE.showreelLabel}</span>
      </Link>
    </header>
  );
}
