"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import ContactCard from "./ContactCard";
import MenuOverlay from "./MenuOverlay";
import SiteNav from "./SiteNav";
import SiteStamp from "./SiteStamp";
import { SITE } from "./data";
import {
  PLAYGROUND,
  type PlaygroundItem,
  PLAYGROUND_INTRO,
  PLAYGROUND_INTRO_ZH,
} from "./playground";

/**
 * Playground images live in their own folder (not the shared case-study pool),
 * with the GitHub Pages `basePath` prefix, mirroring `assetUrl()` in data.ts.
 */
const PLAYGROUND_BASE = "/portfolio/sites/huyml-co-eb36a18b/playground";

function PlaygroundFigure({
  item,
  index,
}: {
  readonly item: PlaygroundItem;
  readonly index: number;
}) {
  return (
    <figure className="pg-item">
      {item.file ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${PLAYGROUND_BASE}/${item.file}`}
          alt=""
          loading="lazy"
          className="pg-media"
        />
      ) : (
        <div
          className="pg-slot"
          style={{ aspectRatio: String(item.ratio ?? 1) }}
          aria-hidden
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
      )}
    </figure>
  );
}

/** Desktop round-robins items across four columns (items 1,5,9 … land in col 1). */
const DESKTOP_COLUMNS = [0, 1, 2, 3].map((col) =>
  PLAYGROUND.flatMap((item, index) =>
    index % 4 === col ? [{ item, index }] : [],
  ),
);

/**
 * `/playground` — modelled on https://huyml.co/playground.
 *
 * Mobile: intro paragraph, then the oversized piece count, then a single image
 * stream. Desktop (>=1100px): the count and intro form a fixed left rail while
 * the pieces flow down four balanced columns on the right. Layout lives in the
 * `.pg-*` classes in globals.css.
 */
export default function PlaygroundView() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  const copyEmail = useCallback(() => {
    void navigator.clipboard?.writeText(SITE.email).catch(() => undefined);
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1800);
  }, []);

  const onSelect = useCallback(
    (href: string) => {
      setMenuOpen(false);
      if (href === "/playground") return;
      if (href.startsWith("/")) {
        router.push(href);
        return;
      }
      if (href === "#contact") {
        setContactOpen(true);
        return;
      }
      // Home anchors (#work / #about) resolve against the home page on other routes.
      router.push(`/${href}`);
    },
    [router],
  );

  return (
    <>
      <SiteStamp />
      <SiteNav
        copied={copied}
        onCopyEmail={copyEmail}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <main className="pg-page">
        <p className="pg-intro">
          {PLAYGROUND_INTRO}
          <span className="pg-intro-zh">{PLAYGROUND_INTRO_ZH}</span>
        </p>
        <p
          className="pg-count"
          aria-label={`${PLAYGROUND.length} playground pieces`}
        >
          {PLAYGROUND.length}
        </p>

        {/* Mobile / narrow: single stream in natural reading order */}
        <div className="pg-gallery pg-gallery--stacked">
          {PLAYGROUND.map((item, i) => (
            <PlaygroundFigure key={item.file ?? `m-slot-${i}`} item={item} index={i} />
          ))}
        </div>

        {/* Desktop: four independently stacked columns, round-robin order */}
        <div className="pg-gallery pg-gallery--columns" aria-hidden>
          {DESKTOP_COLUMNS.map((column, col) => (
            <div className="pg-col" key={col}>
              {column.map(({ item, index }) => (
                <PlaygroundFigure
                  key={item.file ?? `d-slot-${index}`}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          ))}
        </div>
      </main>

      <MenuOverlay
        open={menuOpen}
        copied={copied}
        onClose={() => setMenuOpen(false)}
        onCopy={copyEmail}
        onSelect={onSelect}
      />
      <ContactCard open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
