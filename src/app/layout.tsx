import type { Metadata } from "next";

import { SITE } from "@/components/sites/huyml-co-eb36a18b/root-8a5edab2/data";
import "./globals.css";

/**
 * The site ships its own self-hosted fonts (see the `@font-face` block in
 * `globals.css`), so the template's Geist loader was removed — it was unused and
 * made every build fetch from Google Fonts.
 */
export const metadata: Metadata = {
  title: {
    default: `${SITE.owner} — Award-winning designer`,
    template: `%s — ${SITE.owner}`,
  },
  description: `${SITE.owner} (${SITE.ownerAlias}) — ${SITE.role}. Selected work, playground and inquiries.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
