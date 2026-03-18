import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Sonner } from "@/components/ui/sonner";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `Skill Barter Platform || Home | A platform for skill exchange and collaboration`,
  description: "A platform for skill exchange and collaboration, connecting individuals to share and learn new skills in a vibrant community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased`}
      >
        {children}
        <Sonner />
      </body>
    </html>
  );
}
