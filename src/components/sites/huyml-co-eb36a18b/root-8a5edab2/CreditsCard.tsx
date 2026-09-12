"use client";

import { AnimatePresence, motion } from "framer-motion";

import CloseButton from "./CloseButton";
import { SITE, STAMP_FACES, assetUrl } from "./data";
import { EASE } from "./primitives";

interface CreditsCardProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

/**
 * `aria-label="contact-credits"` — the `Credits` sticker.
 *
 * Framer rotates the container by `-2deg` and gives the card
 * `background: rgb(212, 212, 212)` with the same `-2px 4px 4px rgba(0, 0, 0, .23)`
 * shadow, `padding: 48px` and `overflow: hidden`. The 344px column inside holds the
 * heading and four role rows. `huyml.riv` — a 150×128 Rive canvas pinned to the
 * bottom edge at `left: calc(45.4167% - 75px)` — plays the logotype mark; the reel
 * lives on Framer's CDN, so the stand-in below drives the two extracted faces
 * through the same drift-and-swap loop.
 */
export default function CreditsCard({ open, onClose }: CreditsCardProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="hu-credits"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-30"
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label={SITE.closeLabel}
            onClick={onClose}
            className="absolute inset-0 cursor-default"
          />

          <div
            className="absolute top-1/2 left-1/2"
            style={{ transform: "translate(-50%, -50%) rotate(-2deg)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.97 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label={SITE.creditsTitle}
                className="relative w-min overflow-hidden p-12"
                style={{
                  backgroundColor: "rgb(212, 212, 212)",
                  boxShadow: "-2px 4px 4px 0 rgba(0, 0, 0, 0.23)",
                }}
              >
                <div className="flex w-[344px] flex-col items-end gap-[42px]">
                  <h2 className="hu-card-heading block w-full text-[rgb(24,24,24)]">
                    {SITE.creditsTitle}
                  </h2>

                  <ul className="flex w-full flex-col gap-5">
                    {SITE.credits.map((row) => (
                      <li
                        key={row.role}
                        className="flex w-full items-start justify-between gap-6"
                      >
                        <span className="hu-text hu-text-quiet-ink block shrink-0">
                          {row.role}
                        </span>
                        <span className="flex flex-col items-end">
                          {row.people.map((person) => (
                            <a
                              key={person.href}
                              href={person.href}
                              target="_blank"
                              rel="noreferrer"
                              className="hu-text hu-text-ink block transition-opacity duration-300 hover:opacity-50"
                            >
                              {person.label}
                            </a>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hu-mark pointer-events-none absolute bottom-0 h-[128px] w-[150px] left-[45.4167%] -ml-[75px]">
                  {STAMP_FACES.slice(0, 2).map((face) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={face}
                      src={assetUrl(face)}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  ))}
                </div>

                <CloseButton
                  onClose={onClose}
                  className="hu-text-ink absolute right-10 bottom-10"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
