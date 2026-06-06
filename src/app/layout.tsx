import type { Metadata } from "next";
import "../styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

export const metadata: Metadata = {
  title: {
    default: "Ogun DOT Connect – Free TB Testing & Treatment in Ogun State",
    template: "%s | Ogun DOT Connect",
  },
  description:
    "Find free tuberculosis (TB) testing and treatment centres near you in Ogun State, Nigeria. Directly Observed Therapy (DOT) clinic directory, symptom checker, and referral support.",
  keywords: [
    "tuberculosis",
    "TB treatment",
    "DOT clinic",
    "Ogun State",
    "free TB testing",
    "NTBLCP",
    "Nigeria TB",
  ],
  openGraph: {
    title: "Ogun DOT Connect",
    description: "Find free TB testing and treatment in Ogun State",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
