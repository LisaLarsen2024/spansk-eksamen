import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spansk Muntlig — Du klarer dette!",
  description: "Alt du trenger for å bestå muntlig eksamen i spansk på vgs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={inter.className}>
      <body className="min-h-screen pb-20">
        {children}
        <Navigation />
      </body>
    </html>
  );
}
