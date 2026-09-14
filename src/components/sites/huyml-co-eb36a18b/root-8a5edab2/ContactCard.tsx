"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SocialGroup } from "./data";
import { SITE } from "./data";
import { EASE } from "./primitives";
import CloseButton from "./CloseButton";

interface ContactCardProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

/** `.framer-ufSvN.framer-e13zc2` — the groups appear two per row. */
const PER_ROW = 2;

const ROWS: readonly (readonly SocialGroup[])[] = Array.from(
  { length: Math.ceil(SITE.contactGroups.length / PER_ROW) },
  (_, row) => SITE.contactGroups.slice(row * PER_ROW, row * PER_ROW + PER_ROW),
);

/**
 * `aria-label="contact"` — the `Come say hi` sheet.
 *
 * `.framer-icr6fd` centres it with `top: 50%; left: 50%; translate(-50%, -50%)` and
 * `z-index: 9`. The card itself is `padding: 40px`, `background: rgb(23,23,23)` with
 * `backdrop-filter: blur(17px)`, and carries `-2px 4px 4px rgba(0, 0, 0, .23)`.
 * Inside, a 390px column with a 69px gap holds the BT Glyphius heading and the
 * contact groups; `Close` sits 40px from the bottom-right corner.
 */
export default function ContactCard({ open, onClose }: ContactCardProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="hu-contact"
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

          <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%)" }}>
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.97 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label={SITE.contactTitle}
                className="hu-contact-card relative w-min overflow-hidden p-10"
                style={{
                  backgroundColor: "rgb(23, 23, 23)",
                  backdropFilter: "blur(17px)",
                  WebkitBackdropFilter: "blur(17px)",
                  boxShadow: "-2px 4px 4px 0 rgba(0, 0, 0, 0.23)",
                }}
              >
                <div className="hu-contact-inner flex w-[390px] flex-col items-start gap-[69px]">
                  <h2 className="hu-card-heading block w-full text-white">
                    {SITE.contactTitle}
                  </h2>

                  <div className="flex w-full flex-col gap-10">
                    {ROWS.map((row) => (
                      <div
                        key={row.map((group) => group.caption).join("|")}
                        className="flex w-full items-start gap-10"
                      >
                        {row.map((group) => (
                          <div key={group.caption} className="flex min-w-0 flex-1 flex-col gap-3">
                            <p className="hu-text hu-text-quiet">{group.caption}</p>
                            <ul className="flex flex-col">
                              {group.links.map((link) => (
                                <li key={link.href}>
                                  <a
                                    href={link.href}
                                    {...(link.href.startsWith("mailto:")
                                      ? {}
                                      : { target: "_blank", rel: "noreferrer" })}
                                    className="hu-text block transition-opacity duration-300 hover:opacity-60"
                                  >
                                    {link.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <CloseButton onClose={onClose} className="absolute right-10 bottom-10 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
