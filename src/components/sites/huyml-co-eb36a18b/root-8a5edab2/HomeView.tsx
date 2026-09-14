"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import ArchiveRail from "./ArchiveRail";
import ContactCard from "./ContactCard";
import HeroBand from "./HeroBand";
import MenuOverlay from "./MenuOverlay";
import ProjectCover from "./ProjectCover";
import ProjectWheel from "./ProjectWheel";
import ScrollHint from "./ScrollHint";
import SiteNav from "./SiteNav";
import SiteStamp from "./SiteStamp";
import WorkCounter from "./WorkCounter";
import { SITE, WHEEL, assetUrl } from "./data";
import { projectOf } from "./cardProject";

/** SSR-safe media query hook: returns true once the viewport matches on the client. */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

type SheetKind = "contact" | null;

/** Minimum gap between two wheel steps so a trackpad flick reads as one move. */
const STEP_LOCK_MS = 620;

/** Shortest signed distance from `from` to `to` on a looping track of `count` cards. */
function wrapDelta(from: number, to: number, count: number): number {
  if (count <= 1) return 0;
  const raw = (((to - from) % count) + count) % count;
  return raw > count / 2 ? raw - count : raw;
}

export default function HomeView() {
  const router = useRouter();
  const count = Math.max(WHEEL.length, 1);
  /**
   * Unbounded step counter rather than a clamped index: 8 -> 1 keeps counting up,
   * so the wheel rolls straight back into the first card instead of dead-ending.
   */
  const [virtual, setVirtual] = useState(0);
  const card = ((virtual % count) + count) % count;
  const [showIndex, setShowIndex] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheet, setSheet] = useState<SheetKind>(null);
  const [copied, setCopied] = useState(false);

  const locked = useRef(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayOpen = menuOpen || sheet !== null;

  const step = useCallback(
    (direction: 1 | -1) => {
      if (showIndex) {
        if (direction === -1) setShowIndex(false);
        return;
      }
      setVirtual((value) => value + direction);
    },
    [showIndex],
  );

  /** Clicking a card walks the shortest way round the loop instead of spinning past it. */
  const selectCard = useCallback(
    (index: number) => {
      setVirtual((value) => value + wrapDelta(((value % count) + count) % count, index, count));
    },
    [count],
  );

  /**
   * The centred card doubles as the entry to its case study: the wheel has already
   * parked the project in the middle, so a click on it should carry on rather than
   * re-select it. Cards without a `slug` have no page yet and stay inert.
   */
  const openCard = useCallback(
    (index: number) => {
      const slug = WHEEL[index]?.slug;
      if (slug) router.push(`/project/${slug}`);
    },
    [router],
  );

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (overlayOpen) return;
      event.preventDefault();
      if (locked.current || Math.abs(event.deltaY) < 4) return;
      locked.current = true;
      window.setTimeout(() => {
        locked.current = false;
      }, STEP_LOCK_MS);
      step(event.deltaY > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [overlayOpen, step]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSheet(null);
        setShowIndex(false);
        return;
      }
      if (overlayOpen) return;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") step(1);
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayOpen, step]);

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

  /** Menu rows: real routes navigate, hashes dismiss the sheet and set the anchor. */
  const goToSection = useCallback(
    (href: string) => {
      setMenuOpen(false);
      if (href.startsWith("/")) {
        router.push(href);
        return;
      }
      window.location.hash = href;
    },
    [router],
  );

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <SiteStamp />
      <SiteNav
        copied={copied}
        onCopyEmail={copyEmail}
        onOpenMenu={() => setMenuOpen(true)}
      />

      {isMobile ? (
        <main className="hu-home-mobile bg-[#ececec]">
          <p className="hu-home-mobile-section-label">{SITE.selectedLabel}</p>
          {WHEEL.map((item, i) => {
            const project = projectOf(i);
            const slug = item.slug;
            const href = slug ? `/project/${slug}` : "#";
            const img = project?.image;
            return (
              <a
                key={`${i}-${item.title}`}
                href={href}
                className="hu-home-mobile-card"
                onClick={(e) => {
                  if (!slug) e.preventDefault();
                }}
              >
                <div className="hu-home-mobile-cover">
                  {img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={assetUrl(img)} alt={item.title} />
                  )}
                </div>
                <span className="hu-home-mobile-tag">{item.tag}</span>
                <span className="hu-home-mobile-title">{item.title}</span>
                <span className="hu-home-mobile-desc">{item.description}</span>
              </a>
            );
          })}
          <button
            type="button"
            onClick={() => setSheet("contact")}
            className="hu-home-mobile-section-label"
            style={{ cursor: "pointer", textAlign: "left" }}
          >
            {SITE.contactTitle}
          </button>
        </main>
      ) : (
        <main className="relative h-screen w-screen overflow-hidden bg-[#ececec]">
          <HeroBand active={card} />
          <ProjectCover active={card} visible={!showIndex} />
          <ProjectWheel
            active={card}
            visible={!showIndex}
            onSelect={selectCard}
            onOpen={openCard}
          />
          <WorkCounter
            index={card}
            totalCount={count}
            visible={!showIndex}
            archiveOpen={showIndex}
            onToggleArchive={() => setShowIndex((value) => !value)}
            onOpenContact={() => setSheet("contact")}
          />
          <ArchiveRail visible={showIndex} />
          <ScrollHint />
        </main>
      )}

      <MenuOverlay
        open={menuOpen}
        copied={copied}
        onClose={() => setMenuOpen(false)}
        onCopy={copyEmail}
        onSelect={goToSection}
      />
      <ContactCard open={sheet === "contact"} onClose={() => setSheet(null)} />
    </>
  );
}
