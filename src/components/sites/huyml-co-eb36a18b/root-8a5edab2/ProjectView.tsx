"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import MenuOverlay from "./MenuOverlay";
import SiteNav from "./SiteNav";
import SiteStamp from "./SiteStamp";
import { SITE, assetUrl, type ArchiveEntry } from "./data";
import { PROJECT_GALLERIES } from "./galleries";

interface ProjectViewProps {
  readonly project: ArchiveEntry;
  readonly next: ArchiveEntry;
}

/**
 * `.framer-1gvdprc > div` — one frame of the case-study column.
 *
 * The live frames are `height: auto` (the picture keeps its own ratio) at 45% of
 * the column width, clipped, and they settle in with the captured
 * `transform 720ms cubic-bezier(0.22, 1, 0.36, 1)` as they cross into view. The
 * observer is rooted on the scrolling column, not the viewport, so a frame further
 * down the column still waits for its turn.
 */
function CaseFrame({ file, alt }: { readonly file: string; readonly alt: string }) {
  const frame = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { root: node.parentElement, threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frame} className="hu-project-frame relative block w-[45%] shrink-0 overflow-hidden">
      <div
        className="relative block w-full origin-center transition-transform duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: shown ? "scale(1)" : "scale(0.92)" }}
      >
        <img src={assetUrl(file)} alt={alt} className="block h-auto w-full object-cover" />
      </div>
    </div>
  );
}

/**
 * `/project/<slug>` — `.framer-j44d8`, captured from the live case studies.
 *
 * The page itself never scrolls: `.framer-15wwhxa` is a `100vh` flex row whose only
 * in-flow child is the `[Imgaeproject]` column, and *that* owns the scroll
 * (`overflow: auto`, 85px between frames, a 21.5vh lead-in, the next-project block
 * on a full viewport at the end). `.framer-ozybli` — the 290px info band — and
 * `.framer-2i0wwq` — the bottom 24% band — are absolutely positioned on top, so the
 * words hold still while the pictures move. Both bands are difference-blended white,
 * which is what turns them into ink on the light canvas.
 *
 * `Next project` walks *backwards* through `ARCHIVE`: `district2-studio` (the first
 * entry) hands over to `FROMANOTHER` (the last), verified against both live pages.
 */
export default function ProjectView({ project, next }: ProjectViewProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  /** The bottom band shows the project name. */
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gallery = PROJECT_GALLERIES[project.slug] ?? [project.image];
  const about = project.about ?? project.description;

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const copyEmail = useCallback(() => {
    void navigator.clipboard?.writeText(SITE.email).catch(() => undefined);
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1800);
  }, []);

  /**
   * The menu rows (`WORK` / `ABOUT` / `PLAYGROUND` / `CONTACT`) all point at sections
   * that only exist on the home page, so on a case study they are the way back: the
   * hash is rewritten against `/` and the row also dismisses the overlay. Setting
   * `window.location.hash` alone — what the home page does — would leave the visitor
   * stranded on `/project/<slug>`.
   */
  const goToSection = useCallback(
    (href: string) => {
      setMenuOpen(false);
      router.push(href.startsWith("#") ? `/${href}` : href);
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

      <main className="hu-project-main relative flex h-screen w-screen items-center justify-center gap-2.5 overflow-hidden bg-[#ececec]">
        <div
          className="hu-project-scroll hu-scroll-hidden relative z-2 flex h-full w-px flex-1 flex-col items-center gap-[85px] overflow-y-auto"
        >
          <div aria-hidden className="h-[21.5vh] w-full shrink-0" />

          {gallery.map((file, index) => (
            <CaseFrame key={file} file={file} alt={`${project.title} — ${index + 1}`} />
          ))}

          <Link
            href={`/project/${next.slug}`}
            className="flex h-screen w-[min(950px,100%)] shrink-0 cursor-pointer flex-col items-center justify-center gap-4"
          >
            <p className="hu-text block w-full text-center [color:rgb(5,5,5)]">
              {SITE.nextProjectLabel}
            </p>
            <span className="flex max-w-full flex-col">
              <span className="hu-next-title block min-h-[160px] text-center">{next.title}</span>
              <span className="hu-wipe block w-full [color:var(--hu-red)]">
                <span className="origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </span>
            </span>
          </Link>
        </div>

        {/* `.framer-ozybli` — the 290px info band, pinned to the vertical centre. */}
        <section className="hu-project-info-band pointer-events-none absolute inset-x-0 top-[calc(50%-145px)] z-6 grid h-[290px] grid-cols-[repeat(16,minmax(50px,1fr))] gap-x-7 gap-y-2.5 px-5 mix-blend-difference">
          <div className="hu-project-info-inner col-span-4 flex flex-col items-start gap-2.5">
            <div className="flex flex-col gap-10">
              <div className="hu-project-about flex gap-[54px]">
                <p className="hu-text shrink-0 opacity-50">{SITE.aboutLabel}</p>
                <p className="hu-text w-[310px]">{about}</p>
              </div>

              <div className="hu-project-roles grid grid-cols-[repeat(2,minmax(50px,1fr))] gap-x-5 gap-y-24">
                <div className="flex items-start gap-[19px]">
                  <p className="hu-text w-[70px] shrink-0 opacity-50">{project.ruler.join("\n")}</p>
                  <div className="hu-text flex-1">
                    <p>{project.roles.join("\n")}</p>
                    <p className="hu-roles-zh">{project.rolesZh.join("\n")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-[21px]">
                  <p className="hu-text shrink-0 opacity-50">{SITE.launchLabel}</p>
                  <p className="hu-text flex-1">{project.dateLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* `.framer-2i0wwq` — the bottom 24% band: project name. */}
        <section
          className="hu-project-bottom-band absolute inset-x-0 bottom-0 z-7 flex h-[24%] px-5 pb-5 mix-blend-difference"
        >
          <div className="flex h-full w-full flex-col items-center justify-between">
            <div className="h-px w-full" />
            <div className="flex items-center justify-center gap-2.5">
              <span className="hu-text hu-text-quiet block">
                {project.title}
              </span>
            </div>
          </div>
        </section>
      </main>

      <MenuOverlay
        open={menuOpen}
        copied={copied}
        onClose={() => setMenuOpen(false)}
        onCopy={copyEmail}
        onSelect={goToSection}
      />
    </>
  );
}
