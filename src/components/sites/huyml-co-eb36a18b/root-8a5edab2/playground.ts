/**
 * Playground page content — modelled on https://huyml.co/playground.
 *
 * To publish a playground piece:
 * 1. Drop the image into `public/sites/huyml-co-eb36a18b/playground/`.
 * 2. Add `{ file: "my-image.jpg" }` to PLAYGROUND below — order in the array is
 *    the reading order (desktop fills four columns top-to-bottom, left-to-right).
 *
 * Entries without a `file` render as neutral placeholder blocks so the layout can
 * be reviewed before the artwork lands; `ratio` (width / height) only applies to
 * those placeholders — real images keep their natural aspect ratio.
 */
export interface PlaygroundItem {
  readonly file?: string;
  readonly ratio?: number;
}

export const PLAYGROUND_INTRO =
  "A space where I can explore different visual directions, interactions, and styles without overthinking too much. Some of these ideas eventually evolve into real projects, while others simply stay here as part of the process.";

export const PLAYGROUND: readonly PlaygroundItem[] = [
  { ratio: 1.6 },
  { ratio: 0.75 },
  { ratio: 1.33 },
  { ratio: 0.75 },
  { ratio: 1 },
  { ratio: 0.75 },
  { ratio: 1.6 },
  { ratio: 1 },
  { ratio: 1.33 },
  { ratio: 0.75 },
  { ratio: 1 },
  { ratio: 1 },
];
