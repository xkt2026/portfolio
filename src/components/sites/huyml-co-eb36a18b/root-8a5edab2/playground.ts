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

export const PLAYGROUND_INTRO_ZH =
  "这是一个让我可以尽情探索不同视觉方向、交互方式和风格的空间";

export const PLAYGROUND: readonly PlaygroundItem[] = [
  { file: "01-amsterdam-street.jpg" },
  { file: "02-street-food.jpg" },
  { file: "03-tram-interior.jpg" },
  { file: "04-tram-platform.jpg" },
  { file: "05-tingting-design.png" },
  { file: "06-nunu-brand.jpg" },
  { file: "07-jili-packaging.png" },
  { file: "08-book-some-in-the-middle.png" },
  { file: "09-via-watercolor.jpg" },
  { file: "10-pink-red-collage.jpg" },
  { file: "11-still-life-zucchini.jpg" },
  { file: "12-still-life-radish.jpg" },
  { file: "13-shield-app-ui.png" },
  { file: "14-push-berlin.jpg" },
  { file: "15-potsdamer-platz.jpg" },
];
