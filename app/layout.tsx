import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jobbsökaraktiviteter Stockholm",
  description:
    "Verifierade jobbsökaraktiviteter i Stockholm – mässor, öppet hus, nätverksträffar och mer. Uppdateras löpande.",
  openGraph: {
    title: "Jobbsökaraktiviteter Stockholm",
    description:
      "Verifierade jobbsökaraktiviteter i Stockholm – mässor, öppet hus, nätverksträffar och mer.",
    type: "website",
    locale: "sv_SE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
