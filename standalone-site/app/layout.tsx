import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baryo · Guest Adventure",
  description: "A Filipino pixel adventure. Meet friends as a guest, explore, and choose your own adventurer.",
  icons: {
    icon: "/game/icon.svg",
    shortcut: "/game/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
