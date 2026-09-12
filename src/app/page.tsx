import type { Metadata } from "next";

import HomeView from "@/components/sites/huyml-co-eb36a18b/root-8a5edab2/HomeView";
import { SITE } from "@/components/sites/huyml-co-eb36a18b/root-8a5edab2/data";

export const metadata: Metadata = {
  title: `${SITE.owner} - Award-winning designer`,
  description: `${SITE.owner} (${SITE.ownerAlias}) — ${SITE.role}. Selected work, playground and inquiries.`,
};

export default function Home() {
  return <HomeView />;
}
