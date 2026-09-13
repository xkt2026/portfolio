import type { Metadata } from "next";

import PlaygroundView from "@/components/sites/huyml-co-eb36a18b/root-8a5edab2/PlaygroundView";

/** `/playground` — visual experiments feed, modelled on huyml.co/playground. */

export const metadata: Metadata = {
  title: "Playground",
};

export default function PlaygroundPage() {
  return <PlaygroundView />;
}
