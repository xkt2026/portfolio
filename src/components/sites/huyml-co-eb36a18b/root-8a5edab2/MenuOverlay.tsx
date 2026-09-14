"use client";

import { AnimatePresence, motion } from "framer-motion";

import CloseButton from "./CloseButton";
import InquiryButton from "./InquiryButton";
import NavArrowList from "./NavArrowList";
import ShowreelLink from "./ShowreelLink";
import { NAV, SITE } from "./data";
import { EASE } from "./primitives";

interface MenuOverlayProps {
  readonly open: boolean;
  readonly copied: boolean;
  readonly onClose: () => void;
  readonly onCopy: () => void;
  readonly onSelect: (href: string) => void;
}

/**
 * `.framer-sv5ik4` — the full-screen menu.
 *
 * Framer ships it as `position: fixed; height: 100vh; background: #ececec;
 * padding: 16px; flex-direction: column; justify-content: flex-end` with a single
 * child that is `width: 100%; height: 71%` and `justify-content: space-between`.
 * So the copy is pinned to the top of that block, the four 30px rows float in the
 * middle, and the reel + inquiry controls settle on the bottom edge — all of it
 * left-aligned. It rests at `opacity: 0; pointer-events: none` until `Menu` fires.
 */
export default function MenuOverlay({
  open,
  copied,
  onClose,
  onCopy,
  onSelect,
}: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="hu-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="hu-menu-overlay fixed inset-0 z-20 flex flex-col items-end justify-end bg-[#ececec] p-4"
          role="dialog"
          aria-modal="true"
          aria-label={SITE.menuLabel}
        >
          {/* Framer's `hideevent`: anything outside the content closes the sheet */}
          <button
            type="button"
            tabIndex={-1}
            aria-label={SITE.closeLabel}
            onClick={onClose}
            className="absolute inset-0 z-0 cursor-default"
          />

          <div className="hu-menu-content pointer-events-none relative z-10 flex h-[71%] w-full flex-col items-start justify-between">
            <p className="hu-text hu-text-ink block w-full">
              {SITE.ownerLines[0]}
              {"\n"}
              {SITE.ownerLines[1]}
            </p>

            <div className="pointer-events-auto">
              <NavArrowList
                items={NAV}
                rowHeight={42}
                linkClass="hu-menu-link"
                onSelect={(item) => onSelect(item.href)}
              />
            </div>

            {/* the home link is internal now, so the sheet closes on the way out */}
            <ShowreelLink className="hu-text-ink pointer-events-auto" onNavigate={onClose} />
            <InquiryButton
              copied={copied}
              onCopy={onCopy}
              className="hu-text-ink pointer-events-auto"
            />
          </div>

          <CloseButton onClose={onClose} className="hu-text-ink absolute right-4 bottom-4 z-10" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
