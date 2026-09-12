import { ARCHIVE, WHEEL, type ArchiveEntry } from "./data";

/**
 * The join between the wheel and the case studies.
 *
 * A card reaches its project through `slug`, and everything the card shows — the
 * cover picture and the Role / Launch copy in the hero band — is read from that
 * project instead of being copied onto the card. Editing a single `ARCHIVE` entry
 * therefore moves `/project/<slug>` and the homepage together, and every card that
 * points at a case study is drawn by the same rules at the same size.
 *
 * Returns `undefined` for the cards that have no page yet; those fall back to the
 * snapshot stored on the `WHEEL` entry itself.
 */
export function projectOf(index: number): ArchiveEntry | undefined {
  const slug = WHEEL[index]?.slug;
  if (!slug) return undefined;
  return ARCHIVE.find((entry) => entry.slug === slug);
}
